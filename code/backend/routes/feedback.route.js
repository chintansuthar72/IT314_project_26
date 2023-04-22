const router = require('express').Router();
const feedbackcontroller = require('../controllers/feedback.controller');
const { verifyToken } = require('../middlewares/authJwt.middleware');

// POST new feedback
router.post('/course/:id', [verifyToken], feedbackcontroller.addFeedback);


module.exports = router;
