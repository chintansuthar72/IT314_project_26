const router = require('express').Router();
const { userController } = require('../controllers/index.controller');
const { verifyToken } = require('../middlewares/index.middleware');

// POST new user
router.post('/signup', userController.addUser);

// Login user
router.post('/login', userController.loginUser);

// GET all users
router.get('/', [ verifyToken ], userController.getAllUsers);

// GET all courses of a user
router.get('/courses', [ verifyToken ] , userController.getAllCoursesOfUser);

// GET user by id
router.get('/:id', [ verifyToken ], userController.getUserById);

// PUT update user by id
router.put('/:id', [ verifyToken ] , userController.updateUserById);

// DELETE user by id
router.delete('/:id', [ verifyToken ] , userController.deleteUserById);

// Add course to user
router.get('/course/:id', [ verifyToken ] , userController.addCourseToUser);

// Forgot password generate token and send email
router.get('/change/generateToken', [  ] , userController.generateToken);

// Forgot password verify token and reset password
router.get('/change/resetPassword', [  ] , userController.resetPassword);

// change password
router.put('/change/password', [ verifyToken ] , userController.changePassword);

module.exports = router;