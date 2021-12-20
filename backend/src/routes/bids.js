
const express = require('express');
const {StatusCodes} = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')
const formatError = require('../modules/error') ;

let bid = require('../modules/bid');
let productCollection = require("../collections/productCollection")
let userCollection = require("../collections/userCollection");
const isLoggedIn = require('../middleware/is-logged-in');


const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Place a new bid
router.post('', isLoggedIn,(req, res ) => {

    //get the current logged in user object
    let user = userCollection.find(obj => obj.mail === req.user.username);

    //create a new bid
    let newBid = new bid( uuidv4() ,parseInt(req.body.amount), req.body.productId, user._iD);

    //get the selected product
    let product = productCollection.find(obj => obj._iD === parseInt(req.body.productId));

    //look if the selected user and the selected product is not empty
    if (user != null && product != null){
        //look if the placed bid isnt hire than the starting price
        if (product._startingPrice < req.body.amount)
        {
            //look if there has already been a bid
            if (typeof product._bids[0] === 'undefined'){
                //if there hasnt been a bid on this product yet, place the new bid
                product._bids.push(newBid);
                res.
                status(StatusCodes.CREATED).send(newBid);
            }else{
                //look if the new bid is higher than the highest bid
                if ( Math.max.apply(Math, product._bids.map(function(o) { return o._amount; })) < parseInt(req.body.amount)){
                        product._bids.push(newBid);
                        res.
                        status(StatusCodes.CREATED).send(newBid);

                }
                else{
                    res.
                    status(StatusCodes.BAD_REQUEST).send(formatError(StatusCodes.BAD_REQUEST, "Your bid must be higher than the highest bid"));
                }
            }
        }
        else{
            res.
            status(StatusCodes.BAD_REQUEST).send(formatError(StatusCodes.BAD_REQUEST, "Your bid cant be lower than the starting price"));
        }
    }else{
        res.
        status(StatusCodes.BAD_REQUEST).send(formatError(StatusCodes.BAD_REQUEST, "please fill in all inputs"));
    }


    console.log(req.body);


});

router.delete('/:productid/:bidid', isLoggedIn,(req, res ) => {
    //look if the selected product exists
    if (productCollection.find(obj => obj._iD === parseInt(req.params.productid)))
    {
        //get the selected product from the product collection
        let product = productCollection.find(obj => obj._iD === parseInt(req.params.productid));
        //get the index of the selected bid
        let index = product._bids.findIndex(t => t._id === req.params.bidid);
        //remove the bid of the product
        productCollection.find(obj => obj._iD === parseInt(req.params.productid))._bids.splice(index, 1);
        res.status(StatusCodes.OK).send(productCollection.find(obj => obj._iD === parseInt(req.params.productid))._bids);
    }
    else{
        res.status(StatusCodes.NOT_FOUND).send(formatError(StatusCodes.NOT_FOUND, "Selected product is not found!"));
    }



});

module.exports = router;