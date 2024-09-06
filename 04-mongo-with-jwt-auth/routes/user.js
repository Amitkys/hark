const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const {User, Course} = require('../db/index');
const {kys} = require('../config'); // testing
const {jwtPassword} = require('../config');

// User Routes
router.post('/signup', async (req, res) => {
    // console.log(kys);  working
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    // make sure this user should not be in our database

    const isExistingUser = await User.find({username, password});
    console.log(isExistingUser);
    // if user not exist, create new user
    if(isExistingUser.length === 0){
        User.create({
            username,
            password
        });
        res.json({
            message: 'User created successfully'
        })
    }else{
        res.status(403).json({message: "User already exist"});
    }

});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isExistingUser = await User.findOne({ username, password });
    // console.log(isExistingUser);

    if (isExistingUser) {
        // User exists, generate token
        const token = jwt.sign({ username }, jwtPassword);
        res.json({
            token
        });
    } else {
        // User does not exist, send an error response
        res.status(403).json({ message: "user does not exist" });
    }
});



router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.json({allCourses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;
    await User.updateOne(
        {username}, 
        {$push: {purchasedCourses: courseId}}
    );
    res.json({
        message: 'Course purchased successfully'
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username; // middleware is putting username in req
    const user = await User.findOne({username});
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({courses});

});

module.exports = router