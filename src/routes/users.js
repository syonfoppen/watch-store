const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let user = require('../modules/user');
let userCollection = require("../collections/userCollection")
let productCollection = require("../collections/productCollection")

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//create new user
router.post('',(req, res ) => {
    //create new user, if the user id is zero or lower give userID 1
    let newUser = new user( req.body.name, req.body.mail, req.body.pass, userCollection.length > 0 ? userCollection[userCollection.length - 1].id + 1 : 1);

    userCollection.push(newUser);

    res.status(StatusCodes.CREATED).send(newUser);
});

//all users
router.get('',(req, res ) => {
    res.send(userCollection);
});
//get user with specific ID
router.get('/:id',(req, res ) => {
    let userObj = Object.assign({} ,userCollection.find(obj => obj._iD == req.params.id));
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
router.put('/:id',(req,res ) =>{
    let id  = parseInt(req.params.id)
    userCollection[id - 1] = new user( req.body.name, req.body.mail, req.body.pass, id);
    res.status(StatusCodes.OK).send(userCollection);
});

//remove user with specific id
router.delete('/:id',(req, res) => {
    let userObj = userCollection.find(obj => obj._iD == req.params.id);
    userCollection.splice(userCollection.indexOf(userObj), 1);
    res.status(StatusCodes.OK).send(userCollection);
});

module.exports = router;

