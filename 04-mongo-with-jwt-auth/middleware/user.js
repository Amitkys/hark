const jwt = require('jsonwebtoken');
const {jwtPassword} = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const word = req.headers.authorization.split(" ");
    const JwtToken = word[1];
    const decodedValue = jwt.verify(JwtToken, jwtPassword);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }else{
        res.status(403).json({
            message: "You are not authentic user"
        });
    }
    
}

module.exports = userMiddleware;