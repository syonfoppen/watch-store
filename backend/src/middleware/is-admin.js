const {StatusCodes} = require('http-status-codes');
const formatError = require('../modules/error') ;

//look if the currently logged in user is a admin
const isAdmin = (req, res, next) => {
    if(req.user.roles.indexOf("admin") !== -1){
        return next();
    }
    res.status(StatusCodes.UNAUTHORIZED).send(formatError(StatusCodes.UNAUTHORIZED, "This action needs admin privileges"));
};

module.exports = isAdmin;