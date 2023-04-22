const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true,
    },
    student_id: {
        type: String,
        required: true,
    },
    submit_date: {
        type: Date,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },


}, {
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;



