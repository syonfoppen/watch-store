class Product {
    get waterResistance() {
        return this._waterResistance;
    }

    set waterResistance(value) {
        this._waterResistance = value;
    }
    get material() {
        return this._material;
    }

    set material(value) {
        this._material = value;
    }
    get diameter() {
        return this._diameter;
    }

    set diameter(value) {
        this._diameter = value;
    }
    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
    get startingPrice() {
        return this._startingPrice;
    }

    set startingPrice(value) {
        this._startingPrice = value;
    }
    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value;
    }
    get iD() {
        return this._iD;
    }
    constructor(iD,brand, model, startingPrice, description, year, diameter, material, waterResistance) {
        this._iD = iD;
        this._brand = brand;
        this._model = model;
        this._startingPrice = startingPrice;
        this._description = description;
        this._year = year;
        this._diameter = diameter;
        this._material = material;
        this._waterResistance = waterResistance;

    }
}

module.exports = Product;