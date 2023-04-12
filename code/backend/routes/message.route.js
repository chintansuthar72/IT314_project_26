const router = require('express').Router();
const messageController = require('../controllers/message.controller');
const {verifyToken} = require('../middlewares/index.middleware');

// POST new message
router.post('/course/:id', [verifyToken], messageController.addMessage);

// GET all messages
router.get('/', [verifyToken], messageController.getAllMessages);

// GET message by id
router.get('/:id', [verifyToken], messageController.getMessageById);

// DELETE message by id
router.delete('/:id', [verifyToken], messageController.deleteMessageById);

// GET all messages by course id
router.get('/course/:id', [verifyToken], messageController.getAllMessagesByCourseId);

module.exports = router;