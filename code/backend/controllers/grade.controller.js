const response = require('../utils/responses.util');
const Grade = require('../models/grade.model');

const updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (grade) {
            grade.grade = req.body.grade;
            const updatedGrade = await grade.save();
            return response.successResponse(res, updatedGrade);
        } else {
            return response.badRequestResponse(res, 'Grade not found');
        }
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getGradeBySubmission = async (req, res) => {
    try {
        const grade = await Grade.find({submission: req.params.id});
        if (grade) {
            return response.successResponse(res, grade);
        } else {
            return response.badRequestResponse(res, 'Grade not found');
        }
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getGradeByStudent = async (req, res) => {
    try {
        const grade = await Grade.find({student: req.params.id});
        if (grade) {
            return response.successResponse(res, grade);
        } else {
            return response.badRequestResponse(res, 'Grade not found');
        }
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

module.exports = {
    updateGrade,
    getGradeBySubmission,
    getGradeByStudent,
};

