const response = require('../utils/responses.util');
const Announcement = require('../models/announcement.model');


const addAnnouncement = async (req, res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.course = req.params.id;
        req.body.teacher = req.id;
        const newAnnouncement = await Announcement.create(req.body);
        return response.successfullyCreatedResponse(res, newAnnouncement);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const deleteAnnouncementById = async (req, res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        return response.successResponse(res, deletedAnnouncement);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        return response.successResponse(res, announcement);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        return response.successResponse(res, announcements);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const updateAnnouncementById = async (req, res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const announcement = await Announcement.findById(req.params.id);
        if(announcement.teacher != req.id)
            return response.unauthorizedResponse(res);
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.id,{
            title: req.body.title,
            description: req.body.description,
        });
        return response.successResponse(res, updatedAnnouncement);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllAnnouncementsByCourseId = async (req, res) => {
    try {
        const announcements = await Announcement.find({course : req.params.id});
        return response.successResponse(res, announcements);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

module.exports = {
    addAnnouncement,
    deleteAnnouncementById,
    getAnnouncementById,
    getAllAnnouncements,
    updateAnnouncementById,
    getAllAnnouncementsByCourseId
}
