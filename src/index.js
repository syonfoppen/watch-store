const express = require('express');
const app = express();


const port = 8080;


app.use(express.json());

let products = require("./collections/productCollection");
let users = require("./collections/userCollection");
let bids = require("./collections/bidCollection");
console.log(products);
app.use('/api/bids', require('./routes/bids'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});