const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db/index');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check this user is already exit in our database

    await User.create({
        username,
        password
    });
    res.json({message: "User created successfully"});

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic

    const allCourses = await Course.find({});

    res.json({allCourses});

    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;

    const updateResult = await User.updateOne(
        { username: username, password: password },
        { $push: { purchasedCourses: courseId } }
    );

    res.json({message: 'Course purchased successfully'});
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    });

    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    }); 
});

module.exports = router