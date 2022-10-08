const jwt = require('jsonwebtoken');
const config = require('config');

// this is the auth middleware, in this module,
// we chech if there is a token in the header of the request.
// if there is no token, it will exit the function.
// Else, verify the token with the private key gotten from the evrironment variables,
// then catch every errror.

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token Provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
        
    }

    catch(ex) {
        res.status(400).send('invalid token');
    }
}

module.exports = auth;