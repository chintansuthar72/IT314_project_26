const response = require('../utils/responses.util');
const Assignment = require('../models/assignment.model');

// POST new assignment
exports.addAssignment = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.teacher = req.id;
        req.body.students = [];
        req.body.files = [];
        const assignment = new Assignment(req.body);
        await assignment.save();
        return response.successfullyCreatedResponse(res, assignment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all assignments
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        response.success(res, assignments);
    } catch (err) {
        response.error(res, err);
    }
}

// GET assignment by id
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        response.success(res, assignment);
    } catch (err) {
        response.error(res, err);
    }
}

// PUT update assignment by id
exports.updateAssignmentById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.id, {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date
        });
        return response.successResponse(res, updatedAssignment);
    }
    catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// DELETE assignment by id
exports.deleteAssignmentById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const assignment = await Assignment.findById(req.params.id);
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        return response.successResponse(res, deletedAssignment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

