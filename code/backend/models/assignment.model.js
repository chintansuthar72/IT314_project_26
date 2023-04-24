const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        // required: true,
        trim: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    link : {
        type : String,
        required : true
    }
    // files: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'File',
    // }],
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

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment