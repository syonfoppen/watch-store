const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

const bcrypt = require("bcrypt");
let user = require('../modules/user');
let userCollection = require("../collections/userCollection")
let productCollection = require("../collections/productCollection")
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const formatError = require("../modules/error");
const {v4: uuidv4} = require("uuid");
const Console = require("console");

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//create new user
router.post('',(req, res ) => {
    //create new user, if the user id is zero or lower give userID 1
    let newUser = new user( req.body.name, req.body.username, bcrypt.hashSync(req.body.password, 10), uuidv4() ,["user"], uuidv4());
    Console.log(bcrypt.hashSync(req.body.password, 10));
    userCollection.push(newUser);

    res.status(StatusCodes.CREATED).send(newUser);
});

//all users
router.get('',isLoggedIn,(req, res ) => {
    let users = [];

    userCollection.forEach((user) => {
       let userModel = JSON.parse(JSON.stringify(user));
       userModel._pass = "classified";
       userModel._secret = "classified";
       users.push(userModel)
    });

    res.send(users);
});
//get user with specific ID
router.get('/:id',isLoggedIn,(req, res ) => {
    let userModel = Object.assign({} ,userCollection.find(obj => obj._iD == req.params.id));
    userModel._pass = "classified";
    userModel._secret = "classified";

    let userObj = userModel;
    let bids = []

    productCollection.forEach(product => {
        productBids = [].concat(product._bids.filter(t => t._userId === req.params.id)) ;
        productBids.forEach(bid => {
            if (bid != null){
                bids.push(bid);
            }
        });
    });
    userObj._bids = bids;
    res.send(userObj);
});

//change user with given id
router.put('',isLoggedIn,(req,res ) =>{
    let oldUser = userCollection.find(obj => obj._iD === req.body.uuid);
    if (oldUser){
        oldUser._name = req.body.name;
        oldUser._mail = req.body.username;
        oldUser._pass = bcrypt.hashSync(req.body.password, 10);
        res.status(StatusCodes.OK).send(oldUser);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).send(formatError(StatusCodes.NOT_FOUND, "user not found!"));
    }


});

//remove user with specific id
router.delete('',isLoggedIn,isAdmin ,(req, res) => {
    let userObj = userCollection.find(obj => obj._iD == req.body.uuid);
    userCollection.splice(userCollection.indexOf(userObj), 1);
    res.status(StatusCodes.OK).send(userCollection);
});

module.exports = router;

