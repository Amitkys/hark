const jwt = require('jsonwebtoken');
const {jwtPassword} = require('../config');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const response = req.headers.authorization.split(" ");
    const JwtToken = response[1];
    const decodedValue = jwt.verify(JwtToken, jwtPassword);
    if(decodedValue.username){
        next();
    }else{
        res.status(403).json({
            message: "You are not authencticated admin."
        });
    }
    

    
}

module.exports = adminMiddleware;