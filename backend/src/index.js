const express = require('express');
const cors = require("cors");
const app = express();


const port = 3001;

app.use(cors());


app.use(express.json());

let products = require("./collections/productCollection");
let users = require("./collections/userCollection");
console.log(products);


//specify the routes
app.use('/api/bids', require('./routes/bids'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/credentials', require('./routes/credentials'));

//start the server
app.listen(port,() => {
    console.log(`API listening at http://localhost:${port}`)
});