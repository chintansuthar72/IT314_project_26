const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    feedback : {
        type : String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    graded: {
        type: Boolean,
        required: true,
        default: false,
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }],
    // grades: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Grade',
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

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
