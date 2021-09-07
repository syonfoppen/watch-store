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
    constructor(amount, productId, userId) {

        this._amount = amount;
        this._productId = productId;
        this._userId = userId;
    }

    getUsers() {
        return `
      UserID: ${this._userId}
      ProductID: ${this._productId}
      Amount: ${this._amount}
    `;
    }
}

module.exports = Bid;