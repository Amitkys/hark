const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db/index');
const jwt = require('jsonwebtoken');
const {jwtPassword} = require('../config');

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username,
        password
    });
    res.json({
        message: 'Admin created successfully'
    });
});


router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({username, password});
    // console.log(admin);

    if(admin.length === 0){
        res.status(403).json({message: "Wrong username or password"});
        
    }else{
        const token = jwt.sign({username}, jwtPassword);
        res.json({
            token
        });
    }


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title= req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    });
    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    });  
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({allCourses});
});

module.exports = router;