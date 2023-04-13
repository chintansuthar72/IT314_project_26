const router = require('express').Router();
const submissionController = require('../controllers/submission.controller');
const {verifyToken} = require('../middlewares/authJwt.middleware');

// POST new submission
router.post('/assignment/:id', [verifyToken], submissionController.addSubmission);

// GET all submissions
router.get('/', [verifyToken], submissionController.getAllSubmissions);

// GET submission by id
router.get('/:id', [verifyToken], submissionController.getSubmissionById);

// PUT update submission by id
router.put('/:id', [verifyToken], submissionController.updateSubmissionById);

// DELETE submission by id
router.delete('/:id', [verifyToken], submissionController.deleteSubmissionById);

// Get submissions by assignment id
router.get('/assignment/:id', [verifyToken], submissionController.getSubmissionsByAssignmentId);

// update grade by submission id
router.put('/grade/:id', [verifyToken], submissionController.updateGradeById);

module.exports = router;
