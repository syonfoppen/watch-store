const express = require('express');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser')

let product = require('../modules/product');
let productCollection = require("../collections/productCollection")
let userCollection = require("../collections/userCollection");


const router = express.Router();
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



//get all products
router.get('',(req, res ) => {
    res.status(StatusCodes.OK).send(productCollection);
});

router.get('/:id',(req, res ) => {

    let obj = productCollection.find(obj => obj._iD === parseInt(req.params.id));
    if (obj){
        res.status(StatusCodes.OK).send(obj);
    }
    else{
        res.status(StatusCodes.NOT_FOUND).send();
    }

});

//create a new product
router.post('',(req, res ) => {
    let newProduct = new product(((productCollection.length > 0) ? productCollection[productCollection.length - 1]._iD + 1 : 1 ), req.body.brand, req.body.model, req.body.startingPrice, req.body.description, req.body.year,req.body.diameter, req.body.material, req.body.waterResistance);
    console.log(req.body);

    productCollection.push(newProduct);


    res.
        status(StatusCodes.CREATED).send(newProduct);
});

//delete a product
router.delete('/:id',(req, res ) => {
    let obj = productCollection.find(obj => obj._iD === parseInt(req.params.id));


    productCollection.splice(productCollection.indexOf(obj), 1);
    res.status(StatusCodes.OK).send(productCollection);
});


module.exports = router;