const response = require('../utils/responses.util');
const Course = require('../models/course.model');

// POST new course
exports.addCourse = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.teacher = req.id;
        req.body.students = [];
        req.body.assignments = [];
        req.body.announcements = [];
        req.body.files = [];
        const course = new Course(req.body);
        await course.save();
        return response.successfullyCreatedResponse(res, course);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        response.success(res, courses);
    } catch (err) {
        response.error(res, err);
    }
}

// GET course by id
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        response.success(res, course);
    } catch (err) {
        response.error(res, err);
    }
}

// PUT update course by id
exports.updateCourseById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.params.id);
        if (course.teacher != req.id)
            return response.unauthorizedResponse(res);
        const updatedCourse = await Course.findByIdAndUpdate(req.id, {
            name: req.body.name,
            description: req.body.description,
            courseCode: req.body.courseCode,
        });
        return response.successResponse(res, updatedCourse);
    }
    catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// DELETE course by id
exports.deleteCourseById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.params.id);
        if (course.teacher != req.id)
            return response.unauthorizedResponse(res);
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        return response.successResponse(res,deletedCourse);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}