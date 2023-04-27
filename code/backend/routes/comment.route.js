const router = require('express').Router();
const {commentController} = require('../controllers/index.controller');
const {verifyToken} = require('../middlewares/authJwt.middleware');


// GET all comments
router.get('/', [verifyToken], commentController.getAllComments);

// GET comment by id
router.get('/:id', [verifyToken], commentController.getCommentById);

// POST new comment in announcement
router.post('/announcement/:id', [verifyToken], commentController.postCommentInAnnouncement);

// GET comments by announcement id
router.get('/announcement/:id', [verifyToken], commentController.getCommentsByAnnouncementId);

// POST new comment in file/material
router.post('/file/:id', [verifyToken], commentController.postCommentInFile);

// GET comments by file/material id
router.get('/file/:id', [verifyToken], commentController.getCommentsByFileId);

// POST new comment in assignment
// router.post('/assignment/:id', [verifyToken], commentController.postCommentInAssignment);

// POST new comment in submission
// router.post('/submission/:id', [verifyToken], commentController.postCommentInSubmission);

// PUT comment by id
router.put('/:id', [verifyToken], commentController.updateCommentById);

// DELETE comment by id
router.delete('/:id', [verifyToken], commentController.deleteCommentById);

module.exports = router;