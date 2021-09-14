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




router.get('',(req, res ) => {
    res.send(userCollection);
});

router.post('',(req, res ) => {

    let newUser = new user( req.body.name, req.body.mail, req.body.pass, ((userCollection.length > 0) ? userCollection[userCollection.length - 1].id + 1 : 1 ));

    console.log(req.body);
    console.log(userCollection);

    userCollection.push(newUser);

1
    res.
    status(StatusCodes.CREATED).send(newUser);
});

module.exports = router;