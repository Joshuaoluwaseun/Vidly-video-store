const winston = require("winston")

//this is the error middleware,
//this is the function that catches all the errors passed to it, in the node application
// here we are using winston logger, we are also using the error level.
//So here, if there is an error, we catch the error, 
//else, we respond with an error 500, which means internal server errorjwt

module.exports = function(err, req, res, next) {
    winston.error(err.message, err);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    
    res.status(500).send('Something failed!!!')

}