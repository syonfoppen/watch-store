const {StatusCodes} = require('http-status-codes');
let userCollection = require("../collections/userCollection");
const jwt = require("jsonwebtoken");
const formatError = require('../modules/error') ;

//look if the current user is loggedin
const isLoggedIn = (req, res, next) =>
{
    const token = getTokenFromRequest(req);

    if(token){
        const payload = verifyToken(token);
        if(payload){
            req.user = payload
            return next();
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send(formatError(StatusCodes.UNAUTHORIZED, 'Authentication required') )
};

//get the token from te reqeust
const getTokenFromRequest = (req) =>{
    const authHeader = req.headers['authorization'];

    if(authHeader){
        return authHeader.split(' ')[1];
    }

    return false;
}

//verify it the token is valid
const verifyToken = (token) =>{

    const tokenPayload = jwt.decode(token);
    if(tokenPayload){
        const user = userCollection.find(user => user.mail === tokenPayload.username);
        if(user){
            try {
                return jwt.verify(token, user.secret);
            } catch (error) {
                return false;
            }
        }
    }
    return false;

};

module.exports = isLoggedIn;