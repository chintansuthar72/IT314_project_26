const response = require('../utils/responses.util');
const Assignment = require('../models/assignment.model');
const Course = require('../models/course.model');
const Submission = require('../models/submission.model');

// POST new assignment
exports.addAssignment = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        req.body.course = req.params.id;
        req.body.submissions = [];
        req.body.comments = [];
        const assignment = await Assignment.create(req.body);        

        // Add submission for all students in course
        const course = await Course.findById(req.params.id);
        if (!course)
            return response.notFoundResponse(res, 'Course not found');

        // add assignment in course
        course.assignments.push(assignment._id);
        await course.save();

        for (let i = 0; i < course.students.length; i++) {
            const submission = await Submission.create({
                student: course.students[i],
                assignment: assignment._id,
                files : [],
                grade: 0,
                graded: false,
                comments: [],
                feedback : ""
            });
            assignment.submissions.push(submission._id);
        }
        const updatedAssignment = await Assignment.findByIdAndUpdate(assignment._id, {
            submissions: assignment.submissions
        });
        return response.successfullyCreatedResponse(res, updatedAssignment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET all assignments
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        return response.successResponse(res, assignments);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// GET assignment by id
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if(!assignment)
            return response.notFoundResponse(res, 'Assignment not found');
        return response.successResponse(res, assignment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

// PUT update assignment by id
exports.updateAssignmentById = async (req, res) => {
    try {
        if (!['ADMIN', 'TEACHER'].includes(req.role))
            return response.unauthorizedResponse(res);
        const assignment = await Assignment.findById(req.params.id);
        if(!assignment)
            return response.notFoundResponse(res, 'Assignment not found');
        console.log()
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            due_date: req.body.due_date,
            link : req.body.link
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
        if(!assignment)
            return response.notFoundResponse(res, 'Assignment not found');
        const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
        return response.successResponse(res, deletedAssignment);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

exports.getAssignmentsByCourseId = async (req,res) => {
    try {
        const assignments = await Assignment.find({course : req.params.id});
        const assignmentWithGrade = [];
        if(req.role === 'STUDENT'){
            for(let i = 0; i < assignments.length; i++){
                const submission = await Submission.findOne({student : req.id, assignment : assignments[i]._id});
                if(submission){
                    assignmentWithGrade.push({
                        ...assignments[i]._doc,
                        grade : submission.grade,
                        graded : submission.graded ? "Graded" : "Not Graded"
                    });
                }
            }
            return response.successResponse(res,assignmentWithGrade);
        }
        return response.successResponse(res,assignments);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}