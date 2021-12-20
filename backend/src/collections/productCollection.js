let product = require('../modules/product');
let listOfProducts = [];


//add random generated products to the products collection
for (let i = 1; i < 5; i++) {
    let newProduct = new product(i, "Rolex", "model" + i, 5000 + i, "This is watch number " + i, 2021 + i, 6 + i, "Silver", true);
    listOfProducts.push(newProduct);
}

for (let i = 1; i < 5; i++) {
    let newProduct = new product(5+i, "Casio", "model" + i, 5000 + i, "This is watch number " + i, 2021 + i, 6 + i, "Gold", true);
    listOfProducts.push(newProduct);
}
for (let i = 1; i < 5; i++) {
    let newProduct = new product(10+i, "Omega", "model" + i, 2000 + i, "This is watch number " + i, 2005 + i, 10 + i, "Metal", false);
    listOfProducts.push(newProduct);
}

module.exports = listOfProducts;