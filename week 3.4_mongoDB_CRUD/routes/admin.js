const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require('../db/index');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check is this admin, with thier username and password, already exist ?
    // (skipper here)
    await Admin.create({
        username,
        password
    });
    res.json({message: 'Admin created successfully'})
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    // use zod to verify before procecced
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    });
    res.json({message: 'Course created successfully', courseId: newCourse._id})


});

router.get('/courses', adminMiddleware, async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const allCourses = await Course.find({});
    res.json({allCourses});
});

module.exports = router;