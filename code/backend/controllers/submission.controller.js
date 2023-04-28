const response = require('../utils/responses.util');
const {Submission,User} = require('../models/index.model');

// POST new submission
exports.addSubmission = async (req, res) => {
    try {
        req.body.student = req.id;
        req.body.comments = [];
        req.body.assignment = req.params.id;
        req.body.graded = false;
        req.body.grade = 0;
        req.body.files = [];
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
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const submissions = await Submission.find();
        return response.successResponse(res, submissions);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET submission by id
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission)
            return response.notFoundResponse(res, 'Submission not found');
        return response.successResponse(res, submission);
    } catch (err) {
        return response.serverErrorResponse(res, err);
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
        if(!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const deletedSubmission = await Submission.findByIdAndDelete(req.id);
        return response.successResponse(res, deletedSubmission);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// Get submissions by assignment id
exports.getSubmissionsByAssignmentId = async (req, res) => {
    try {
        if(!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        // const submissions = await Submission.find({assignment: req.params.id, student: req.id});
        const submissions = await Submission.find({assignment: req.params.id});
        const submissionWithUserName = [];
        for(let i = 0; i < submissions.length; i++) {
            const submission = submissions[i];
            const user = await User.findById(submission.student);
            submissionWithUserName.push({
                ...submission._doc,
                studentName: user.username
            });
        }
        return response.successResponse(res, submissionWithUserName);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.updateGradeById = async (req, res) => {
    try {
        if(!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const updatedSubmission = await Submission.findByIdAndUpdate(req.params.id, {
            grade: req.body.grade,
            graded: true,
            feedback: req.body.feedback
        });
        return response.successResponse(res, updatedSubmission);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}
