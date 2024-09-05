const express = require('express');
const app = express();

function isOldEnoughMiddleware(req, res, next){
    let age = req.query.age;
    console.log(age);
    if(age >= 30){
        next();
    }
    else{
        res.status(302).json({
            msg: "You are not allowed to ride",
        })
    }
}

app.get('/ride1', isOldEnoughMiddleware, (req, res) => {
    
    res.json({
        msg: "You have completed ride 1",
    });
    
});


app.get('/ride2', isOldEnoughMiddleware, (req, res) => {
    
    res.json({
        msg: "You have completed ride 2",
    })
});

app.listen(3000, ()=> {
    console.log('app is listening on port 3000');
})
