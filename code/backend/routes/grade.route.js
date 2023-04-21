const router = require('express').Router();
const {verifyToken} = require('../middlewares/authJwt.middleware');
const {gradeController} = require('../controllers/index.controller');

// update grade
router.put('/update/:id', [verifyToken], gradeController.updateGrade);

// get grade by submission id
router.get('/submission/:id',[verifyToken], gradeController.getGradeBySubmission);

// get grade by student id
router.get('/student/:id',[verifyToken], gradeController.getGradeByStudent);

module.exports = router;