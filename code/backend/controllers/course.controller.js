const response = require('../utils/responses.util');
const Course = require('../models/course.model');
const File = require('../models/file.model');
const User = require('../models/user.model');

// POST new course
exports.addCourse = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res, 'You are not authorized to create a course');
        req.body.teacher = req.id;
        req.body.students = [];
        req.body.assignments = [];
        req.body.announcements = [];
        req.body.files = [];
        req.body.messages = [];
        const course = await Course.create(req.body);
        const user = await User.findById(req.id);
        user.courses.push(course._id);
        await user.save();
        return response.successfullyCreatedResponse(res, course);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        const user_id = req.id;
        const userCourses = await User.findById(user_id);
        const userCoursesArray = userCourses.courses;
        const coursesArray = [];
        for(let i=0; i<courses.length; i++){
            if(userCoursesArray.includes(courses[i]._id)){
                continue;
            }
            const teacher = await User.findById(courses[i].teacher);
            let data = {
                instructor: teacher.username,
                course : courses[i]
            }
            coursesArray.push(data);
        }
        return response.successResponse(res, coursesArray);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET course by id
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        return response.successResponse(res, course);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// PUT update course by id
exports.updateCourseById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.params.id);
        if (!course)
            return response.notFoundResponse(res, 'Course not found');
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
        if (!course)
            return response.notFoundResponse(res, 'Course not found');
        if (course.teacher != req.id)
            return response.unauthorizedResponse(res);
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        return response.successResponse(res,deletedCourse);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.uploadMaterial = async (req,res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.params.id);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        if(course.teacher != req.id) 
            return response.unauthorizedResponse(res);
        const file = await File.create({
            filename : req.body.filename,
            data : req.body.data,
            description: req.body.description,
        })
        course.files.push(file._id);
        const updatedCourse = await course.save();
        return response.successResponse(res, updatedCourse);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.getMaterials = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        const files = [] 
        for(let i = course.files.length-1; i >= 0; --i) {
            const data = await File.findById(course.files[i]._id);
            files.push(data);
        }
        return response.successResponse(res,files);
    } catch(err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.deleteMaterial = async (req, res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const course = await Course.findById(req.query.course_id);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        const files = [] 
        for(let i = 0; i < course.files.length; ++i) {
            if(course.files[i]._id != req.params.id) {
                files.push(course.files[i]);
            }
        }
        course.files = files;
        await course.save();
        return response.successResponse(res,course);
    } catch(err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.getUsers = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        const users = [];
        for(let i=0; i<course.students.length; i++){
            const user = await User.findById(course.students[i]);
            users.push(user);
        }
        return response.successResponse(res, users);
    } catch(err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.deleteUserFromCourse = async (req, res) => {
    try {
        if(!['ADMIN','TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const courseId = req.query.courseId;
        const userId = req.params.id;
        const course = await Course.findById(courseId);
        if(!course)
            return response.notFoundResponse(res, 'Course not found');
        if(course.teacher != req.id)
            return response.unauthorizedResponse(res, 'You are not authorized to delete user from this course');
        const user = await User.findById(userId);
        course.students = course.students.filter(student => student != userId);
        await course.save();
        user.courses = user.courses.filter(course => course != courseId);
        await user.save();
        return response.successResponse(res, course);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}