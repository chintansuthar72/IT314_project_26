const response = require('../utils/responses.util');
const { Message } = require('../models/index.model');

const addMessage = async (req, res) => {
    try {
        const message = new Message({
            course: req.params.id,
            sender: req.id,
            message: req.body.message
        });

        await message.save();
        return response.successResponse(res, message);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        return response.successResponse(res, messages);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        return response.successResponse(res, message);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const deleteMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if(message.sender != req.id) {
            return response.unauthorizedResponse(res, "You are not authorized to delete this message");
        }
        await Message.findByIdAndDelete(req.params.id);
        return response.successResponse(res, message);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllMessagesByCourseId = async (req, res) => {
    try {
        const messages = await Message.find({course: req.params.id});
        return response.successResponse(res, messages);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

module.exports = {
    addMessage,
    getAllMessages,
    getMessageById,
    getAllMessagesByCourseId,
    deleteMessageById
}

