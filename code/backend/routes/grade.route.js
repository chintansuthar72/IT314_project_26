const router = require('express').Router();
const Grade = require('../models/grade.model');

// update grade
router.put('/update/:id',updateGrade);

// get grade by submission id
router.get('/submission/:id',getGradeBySubmission);

// get grade by student id
router.get('/student/:id',getGradeByStudent);