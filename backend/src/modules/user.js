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
    get secret() {
        return this._secret;
    }
    get roles() {
        return this._roles;
    }
    set secret(value) {
        this._secret = value;
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

    set roles(value) {
        this._roles = value;
    }


    //connection to bids is with the user and productID (see UML diagram)
    constructor(name, mail, pass, secret , roles,id) {
        this._name = name;
        this._mail = mail;
        this._pass = pass;
        this._iD = id;
        this._bids = [];
        this._secret = secret;
        this._roles = roles;
    }
}

module.exports = User;