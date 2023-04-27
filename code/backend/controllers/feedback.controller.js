const response = require('../utils/responses.util');
const Feedback = require('../models/feedback.model');
const Course = require('../models/course.model');

// POST new feedback
exports.addFeedback = async (req, res) => {
    try {
        if (!['STUDENT'].includes(req.role))
            return response.unauthorizedResponse(res);
        
        const course = await Course.findById(req.params.id);
        if (!course)
            return response.notFoundResponse(res, 'Course not found');

        const feedback = await Feedback.create
        ({
            topic: req.body.topic,
            description: req.body.description,
            course: req.params.id,
        });

        feedback.save();            
        return response.successfullyCreatedResponse(res, feedback);
    }
    catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all feedbacks by course id
exports.getAllFeedbacksByCourseId = async (req, res) => {
    try {
        if (!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.params.id);
        if (!course)
            return response.notFoundResponse(res, 'Course not found');
        const feedbacks = await Feedback.find({ course: req.params.id });
        return response.successResponse(res, feedbacks);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

