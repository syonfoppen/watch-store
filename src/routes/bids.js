const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let bid = require('../modules/bid');
let bidCollection = require("../collections/bidCollection")

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


router.get('',(req, res ) => {
    res.send(bidCollection);
});

router.post('',(req, res ) => {

    let newBid = new bid( req.body.amount, req.body.userId, req.body.productId, bidCollection[bidCollection.length - 1].id + 1);

    console.log(req.body);
    console.log(bidCollection);

    bidCollection.push(newBid);
    res.
    status(StatusCodes.CREATED).send(newBid);
});

module.exports = router;