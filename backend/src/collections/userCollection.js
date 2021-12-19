let user = require("../modules/user");
const { v4: uuidv4 } = require('uuid');

let userList = [];

//create 2 new users
let newUser1 = new user("Henk Pieters", "pieter@gmail.com", "$2a$12$JiWleFdm7fCHz9dwBbNMle2ZqJDii9dv8jJR9wFGyGWGmAp2cTvr6", uuidv4(), ["user"] , uuidv4()); //Pieter1234
let newUser2 = new user("Jan Klaasen", "jan@gmail.com", "$2a$12$IuvwQLQi9LFPuuFgRf/Ja.0oROP3vTNz2CCFAMPwrLShfDkWvI4ei", uuidv4() ,["user", "admin"], uuidv4()); //Jan1234


userList.push(newUser1);
userList.push(newUser2);

module.exports = userList;