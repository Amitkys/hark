const jwt = require('jsonwebtoken');


const value = {
    name: 'amit', 
    accountNumber: 12343563
};

const token = jwt.sign(value, "kys");

console.log(token);
