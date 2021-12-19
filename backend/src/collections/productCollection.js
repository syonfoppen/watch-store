let product = require('../modules/product');
let listOfProducts = [];

for (let i = 1; i < 5; i++) {
    let newProduct = new product(i, "Rolex", "model" + i, 5000 + i, "This is watch number " + i, 2021 + i, 6 + i, "Silver", true);
    listOfProducts.push(newProduct);
}

for (let i = 1; i < 5; i++) {
    let newProduct = new product(i, "Casio", "model" + i, 5000 + i, "This is watch number " + i, 2021 + i, 6 + i, "Gold", true);
    listOfProducts.push(newProduct);
}


module.exports = listOfProducts;