//This is the admin middleware, it is used to check if a user is an admin. 
// if the user is not an admin, deny access and return a bad request status code (400)

module.exports = function (req, res, next) {
    if (!req.user.isAdmin) 
    return res.status(403).send('Access Denied!!!'); 

    next();   
}