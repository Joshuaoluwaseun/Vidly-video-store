//This is the async middleware function, it is used in place of try and catch to catch errors
// in this middleware, we chech if there is an error, 
//then we catch the eroors, and pass it to the error handling function in node.
module.exports = function(handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex) {
            next(ex);
        }
    }
}