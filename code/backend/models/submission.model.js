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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    grades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
    }],
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }],
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
