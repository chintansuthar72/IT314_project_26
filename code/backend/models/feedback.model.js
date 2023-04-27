const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
}, {
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;