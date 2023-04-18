// import controllers
const userController = require('./user.controller');
const courseController = require('./course.controller');
const assignmentController = require('./assignment.controller');
const submissionController = require('./submission.controller');
const commentController = require('./comment.controller');
const gradeController = require('./grade.controller');
const announcementController = require('./announcement.controller');
const messageController = require('./message.controller');
// const notificationController = require('./notification.controller');
// const fileController = require('./file.controller');
// const folderController = require('./folder.controller');

// export controllers
module.exports = {
    userController,
    courseController,
    assignmentController,
    submissionController,
    commentController,
    gradeController,
    announcementController,
    messageController,
    // notificationController,
    // fileController,
    // folderController,
};
