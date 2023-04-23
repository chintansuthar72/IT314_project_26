// import routes
const userRoute = require('./user.route.js');
const courseRoute = require('./course.route');
const assignmentRoute = require('./assignment.route');
const submissionRoute = require('./submission.route');
const commentRoute = require('./comment.route');
const gradeRoute = require('./grade.route');
const announcementRoute = require('./announcement.route');
const messageRoute = require('./message.route');
const feedbackRoute = require('./feedback.route');
// const notificationRoute = require('./notification.route');
// const fileRoute = require('./file.route');
// const folderRoute = require('./folder.route');

// export routes
module.exports = {
    userRoute,
    courseRoute,
    assignmentRoute,
    submissionRoute,
    commentRoute,
    gradeRoute,
    announcementRoute,
    messageRoute,
    feedbackRoute,
    // notificationRoute,
    // fileRoute,
    // folderRoute,
};
