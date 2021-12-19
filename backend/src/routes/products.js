const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let product = require('../modules/product');
const formatError = require('../modules/error') ;
let productCollection = require("../collections/productCollection")
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const Module = require("module");
const Console = require("console");

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//get all products or with a filter
router.get('',isLoggedIn,(req, res ) => {
    let result = productCollection

    //filter on everyting using a search term
    if (req.query.search !== undefined){
        result = result.filter(product => JSON.stringify(product).includes(req.query.search));
    }

    //filter on brand
    if (req.query.brand !== undefined){
        result = result.filter(product => product._brand === req.query.brand);
    }

    //filter on material
    if (req.query.material !== undefined){
        result = result.filter(product => product._material === req.query.material);
    }

    //filter on year
    if (req.query.year !== undefined){
        result = result.filter(product => product._year == req.query.year);
    }
    //filter on maxDia
    if (req.query.maxDia !== undefined){
        result = result.filter(product => product._diameter <= req.query.maxDia);
    }

    //filter on MinDia
    if (req.query.minDia !== undefined){
        result = result.filter(product => product._diameter >= req.query.minDia);
    }

    //filter on max price
    if (req.query.maxPrice !== undefined){
        result = result.filter(product => product._startingPrice <= req.query.maxPrice);
    }

    //filter on min price
    if (req.query.minPrice !== undefined){
        result = result.filter(product => product._startingPrice >= req.query.minPrice);
    }

    //filter on water resistance
    if (req.query.waterResistance !== undefined){
        result = result.filter(product => product._waterResistance = req.query.waterResistance);
    }

    //filter on highest bid
    if (req.query.maxBid !== undefined){
        result = result.filter(product => product._bids[product._bids.length - 1]._amount <= req.query.maxBid);
    }

    //if results are found, else return a error
    if (result.length >0){
        res.status(StatusCodes.OK).send(result);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).send(formatError(StatusCodes.NOT_FOUND, "no product found for the given filters!"));
    }

});

//get specific product
router.get('/:id',isLoggedIn,(req, res ) => {

    //find the product in the product collection
    let obj = productCollection.find(obj => obj._iD === parseInt(req.params.id));

    //if object is found, else return a error
    if (obj){
        res.status(StatusCodes.OK).send(obj);
    }
    else{
        res.status(StatusCodes.NOT_FOUND).send(formatError(StatusCodes.NOT_FOUND, "product not found!"));
    }

});

//create a new product
router.post('',isLoggedIn, isAdmin,(req, res ) => {

    //create  new product
    let newProduct = new product(((productCollection.length > 0) ? productCollection[productCollection.length - 1]._iD + 1 : 1 ), req.body.brand, req.body.model, req.body.startingPrice, req.body.description, req.body.year,req.body.diameter, req.body.material, req.body.waterResistance);

    //add the product to the product collection
    productCollection.push(newProduct);
    res.
        status(StatusCodes.CREATED).send(newProduct);
});

//delete a product
router.delete('/:id',isLoggedIn, isAdmin,(req, res ) => {

    //find the selected product
    let obj = productCollection.find(obj => obj._iD === parseInt(req.params.id));

    //if product exist, else return a error
    if (obj){
        //remove the product
        productCollection.splice(productCollection.indexOf(obj), 1);
        res.status(StatusCodes.OK).send(productCollection);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).send(formatError(StatusCodes.NOT_FOUND, "product not found!"));
    }
});


module.exports = router;