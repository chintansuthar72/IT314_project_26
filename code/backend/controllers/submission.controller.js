const response = require('../utils/responses.util');
const Submission = require('../models/submission.model');

// POST new submission
exports.addSubmission = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER', 'STUDENT'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.student = req.id;
        const submission = new Submission(req.body);
        await submission.save();
        return response.successfullyCreatedResponse(res, submission);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all submissions
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();
        response.success(res, submissions);
    } catch (err) {
        response.error(res, err);
    }
}

// GET submission by id
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        response.success(res, submission);
    } catch (err) {
        response.error(res, err);
    }
}

// PUT update submission by id
exports.updateSubmissionById = async (req, res) => {
    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(req.id, {
            files:[]
        });
        return response.successResponse(res, updatedSubmission);

    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// DELETE submission by id
exports.deleteSubmissionById = async (req, res) => {
    try {
        const deletedSubmission = await Submission.findByIdAndDelete(req.id);
        return response.successResponse(res, deletedSubmission);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}
