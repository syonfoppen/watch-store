let user = require("../modules/user");
let userList = [];
//random pass copied from "https://stackoverflow.com/questions/34095126/express-router-id"
function randomPass(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
//create random test data
for (let i = 0; i < 10; i++) {
    let newUser = new user("henk", "henk.steen@gmail.com", randomPass(10),i + 1);
    userList.push(newUser)
}

module.exports = userList;