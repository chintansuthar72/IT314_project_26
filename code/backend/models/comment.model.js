const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // submission: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Submission',
    // },
    commentator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description : {
        type: String,
        required: true,
        trim: true,
    },
    announcement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Announcement',
    },
    // assignment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Assignment',
    // }
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;