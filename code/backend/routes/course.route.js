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

// Upload material 
router.post('/material/:id',[verifyToken],courseController.uploadMaterial);

// Get all material for course
router.get('/material/:id', [verifyToken], courseController.getMaterials);

// remove material
router.delete('/material/:id',[verifyToken], courseController.deleteMaterial)

// Get all users for course
router.get('/user/:id', [verifyToken], courseController.getUsers);

// remove user from course
router.delete('/user/:id',[verifyToken], courseController.deleteUserFromCourse)

module.exports = router;
