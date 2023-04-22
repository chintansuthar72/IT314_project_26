const response = require('../utils/responses.util');
const Feedback = require('../models/feedback.model');
const Course = require('../models/course.model');

// POST new feedback
exports.addFeedback = async (req, res) => {
    try {
        if (!['STUDENT'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.course = req.params.id;
        const feedback_data = req.body.Feedback;
        // const feedback = await Feedback.create(req.body);

         const course = await Course.findById(req.params.id);
        if (!course)
            return response.notFoundResponse(res, 'Course not found');

            const feedback = await Feedback.create
            ({
                student_name: req.body.student_name,
                student_id: req.body.student_id,
                submit_date: req.body.submit_data,
                feedback: req.body.feedback,
                email_id: req.body.email_id,
                phone: req.body.phone,
                
            });

            feedback.save();            
            return response.successfullyCreatedResponse(res, feedback);
        }
      
    catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

