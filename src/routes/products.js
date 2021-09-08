const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let product = require('../modules/product');
let productCollection = require("../collections/productCollection")

const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));




router.get('',(req, res ) => {
    res.send(productCollection);
});

router.post('',(req, res ) => {
    let newProduct = new product(1, req.body.brand, req.body.model, req.body.startingPrice, req.body.description, req.body.year,req.body.diameter, req.body.material, req.body.waterResistance);
    console.log(req.body);

    productCollection.push(newProduct);


    res.
        status(StatusCodes.CREATED).send(newProduct);
});

module.exports = router;