const router = require('express').Router();
const courseController = require('../controllers/course.controller');
const {verifyToken} = require('../middlewares/authJwt.middleware');

// POST new course
router.post('/', [verifyToken], courseController.addCourse);

// GET all courses
router.get('/', [verifyToken], courseController.getAllCourses);

// GET course by id
router.get('/:id', [verifyToken], courseController.getCourseById);

// PUT update course by id
router.put('/:id', [verifyToken], courseController.updateCourseById);

// DELETE course by id
router.delete('/:id', [verifyToken], courseController.deleteCourseById);

// Delete user from course
router.delete('/:id/user/:userId', [verifyToken], courseController.deleteUserFromCourse);

module.exports = router;
