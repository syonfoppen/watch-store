
const express = require('express');
const {StatusCodes} = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')


let bid = require('../modules/bid');
let productCollection = require("../collections/productCollection")
let userCollection = require("../collections/userCollection");
const isLoggedIn = require('../middleware/is-logged-in');


const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


router.post('', isLoggedIn,(req, res ) => {

    let user = userCollection.find(obj => obj.mail === req.body.email);
    console.log(user);
    let newBid = new bid( uuidv4() ,parseInt(req.body.amount), req.body.productId, user._iD);
    let product = productCollection.find(obj => obj._iD === parseInt(req.body.productId));

    if (user != null && product != null){
        if (product._startingPrice < req.body.amount)
        {
            if (typeof product._bids[0] === 'undefined'){
                product._bids.push(newBid);
                res.
                status(StatusCodes.CREATED).send(newBid);
            }else{
                if ( Math.max.apply(Math, product._bids.map(function(o) { return o._amount; })) < parseInt(req.body.amount)){
                        product._bids.push(newBid);
                        res.
                        status(StatusCodes.CREATED).send(newBid);

                }
                else{
                    res.
                    status(StatusCodes.BAD_REQUEST).send("Your bid must be higher than the highest bid");
                }
            }
        }
        else{
            res.
            status(StatusCodes.BAD_REQUEST).send("Your bid cant be lower than the starting price");
        }
    }else{
        res.
        status(StatusCodes.BAD_REQUEST).send("please fill in all inputs");
    }


    console.log(req.body);


});

router.delete('/:productid/:bidid',(req, res ) => {
    if (productCollection.find(obj => obj._iD === parseInt(req.params.productid)))
    {
        let product = productCollection.find(obj => obj._iD === parseInt(req.params.productid));
        let index = product._bids.findIndex(t => t._id === req.params.bidid);
        productCollection.find(obj => obj._iD === parseInt(req.params.productid))._bids.splice(index, 1);
    }
    res.status(StatusCodes.OK).send(productCollection.find(obj => obj._iD === parseInt(req.params.productid))._bids);


});

module.exports = router;