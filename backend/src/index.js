const express = require('express');
const cors = require("cors");
const app = express();


const port = 3001;

app.use(cors());

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
});

app.use(express.json());

let products = require("./collections/productCollection");
let users = require("./collections/userCollection");
console.log(products);

app.use('/api/bids', require('./routes/bids'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/credentials', require('./routes/credentials'));

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
});