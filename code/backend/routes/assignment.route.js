const router= require('express').Router();
const assignmentController = require('../controllers/assignment.controller');
const {verifyToken} = require('../middlewares/authJwt.middleware');

// POST new assignment
router.post('/course/:id', [verifyToken], assignmentController.addAssignment);

// GET all assignments
router.get('/', [verifyToken], assignmentController.getAllAssignments);

// GET assignment by id
router.get('/:id', [verifyToken], assignmentController.getAssignmentById);

// PUT update assignment by id
router.put('/:id', [verifyToken], assignmentController.updateAssignmentById);

// DELETE assignment by id
router.delete('/:id', [verifyToken], assignmentController.deleteAssignmentById);

// Get all assignments by course id
router.get('/course/:id', [verifyToken], assignmentController.getAssignmentsByCourseId);

module.exports = router;
