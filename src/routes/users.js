const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let user = require('../modules/user');
let userCollection = require("../collections/userCollection")

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//all users
router.get('',(req, res ) => {
    res.send(userCollection);
});
//get user with specific ID
router.get('/:id',(req, res ) => {
    let userObj = userCollection.find(obj => obj._id == req.params.id);
    res.send(userObj);
});

//create new user
router.post('',(req, res ) => {
    //create new user, if the user id is zero or lower give userID 1
    let newUser = new user( req.body.name, req.body.mail, req.body.pass, userCollection.length > 0 ? userCollection[userCollection.length - 1].id + 1 : 1);

    userCollection.push(newUser);

    res.status(StatusCodes.CREATED).send(newUser);
});

//change user with given id
router.put('/:id',(req,res ) =>{
    let userObj = userCollection.find(obj => obj._id == req.params.id);

});

//remove user with specific id
router.delete('/:id',(req, res) => {
    let userObj = userCollection.find(obj => obj._id == req.params.id);
    userCollection.splice(userCollection.indexOf(userObj), 1);
    res.status(StatusCodes.OK).send(userCollection);
});

module.exports = router;