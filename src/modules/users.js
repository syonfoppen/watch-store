class User {

    get name() {
        return this._name;
    }

    get mail() {
        return this._mail;
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
    constructor(name, mail, pass) {
        this.bids = [];
        this._name = name;
        this._mail = mail;
        this._pass = pass;
    }

    getUsers() {
        return `
      Name: ${this._name}
      Email: ${this._mail}
      Password: ${this._pass}
      Bids: ${this.bids}
    `;
    }
}

module.exports = User;