const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    // assignment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Assignment',
    //     required: true,
    // },
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    // }],
    // files: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'File',
    // }],
    // folders: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Folder',
    // }],
    // notifications: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Notification',
    // }],
}, {
    timestamps: true,
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
