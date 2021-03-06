const express = require('express');
const {StatusCodes} = require('http-status-codes');
let userCollection = require("../collections/userCollection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formatError = require('../modules/error') ;
const router = express.Router();

//login the user
const login = (username, password ) =>{
    const user = userCollection.find((user) =>{
        return user.mail === username;
     
    });

    if(user && user.pass){
        const result =  bcrypt.compareSync(password, user.pass);
        if(result){
            return jwt.sign({
                username: user.mail,
                roles: user.roles
            }, user.secret);
        }
    }
    return false;
};

//authenticate a user
router.post('', (req , res)  => {
    const { username, password } =  req.body;

    if (username && password){
        const token = login(username, password);
        if(token){
            res.status(StatusCodes.CREATED).send({token: token});
        }
        else{
            res.status(StatusCodes.UNAUTHORIZED).send(formatError(StatusCodes.UNAUTHORIZED, "Username and/or password incorrect"));
        }
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).send(formatError(StatusCodes.UNAUTHORIZED, "Required paramaeters missing"));
    }

});

module.exports = router;