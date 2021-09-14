const express = require('express');
const app = express();


const port = 8080;


app.use(express.json());

let products = require("./collections/productCollection");
let users = require("./collections/userCollection");

console.log(products);
console.log(users);


app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});