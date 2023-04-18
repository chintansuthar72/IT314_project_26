const {Comment} = require('../models/index.model');
const response = require('../utils/responses.util');

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return response.successResponse(res, comments);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        return response.successResponse(res, comment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const postCommentInAnnouncement = async (req, res) => {
    try {
        const comment = await Comment.create({
            description: req.body.description,
            commentator : req.id,
            announcement: req.params.id,
        });
        return response.successResponse(res, comment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const postCommentInAssignment = async (req, res) => {
    try {
        const comment = await Comment.create({
            description: req.body.description,
            commentator : req.id,
            assignment: req.params.id,
        });
        return response.successResponse(res, comment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const postCommentInSubmission = async (req, res) => {
    try {
        const comment = await Comment.create({
            description: req.body.description,
            commentator : req.id,
            submission : req.params.id,
        });
        return response.successResponse(res, comment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const updateCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.commentator != req.id) return response.unauthorizedResponse(res, "You are not authorized to update this comment.");
        const updatedComment = Comment.findByIdAndUpdate(req.params.id, {
            description: req.body.description,
        });
        return response.successResponse(res, updatedComment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        return response.successResponse(res, comment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

module.exports = {
    getAllComments,
    getCommentById,
    postCommentInAnnouncement,
    postCommentInSubmission,
    postCommentInAssignment,
    deleteCommentById,
    updateCommentById
};
