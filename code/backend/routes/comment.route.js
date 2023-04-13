const router = require('express').Router();
const {commentController} = require('../controllers/index.controller');

// GET all comments
router.get('/', commentController.getAllComments);

// GET comment by id
router.get('/:id', commentController.getCommentById);

// POST new comment in announcement
router.post('/announcement/:id', commentController.postCommentInAnnouncement);

// POST new comment in assignment
router.post('/assignment/:id', commentController.postCommentInAssignment);

// POST new comment in submission
router.post('/submission/:id', commentController.postCommentInSubmission);

// PUT comment by id
router.put('/:id', commentController.updateCommentById);

// DELETE comment by id
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;