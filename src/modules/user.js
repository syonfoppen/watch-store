class User {

    get name() {
        return this._name;
    }

    get mail() {
        return this._mail;
    }

    get id() {
        return this._iD;
    }
    get pass() {
        return this._pass;
    }
    set name(value) {
        this._name = value;
    }

    set mail(value) {
        this._mail = value;
    }

    set pass(value) {
        this._pass = value;
    }


    //connection to bids is with the user and productID (see UML diagram)
    constructor(name, mail, pass, id) {
        this._name = name;
        this._mail = mail;
        this._pass = pass;
        this._iD = id;
        this._bids = [];
    }
}

module.exports = User;