class Bid {

    get amount() {
        return this._amount;
    }

    get productId() {
        return this._productId;
    }

    get userId() {
        return this._userId;
    }
    set amount(value) {
        this._amount = value;
    }

    get id(){
        return this._id();
    }

    constructor(id,amount, productId, userId) {

        this._id = id;
        this._amount = amount;
        this._productId = productId;
        this._userId = userId;
    }
}

module.exports = Bid;