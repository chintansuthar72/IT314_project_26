const router = require('express').Router();
const { announcementController } = require('../controllers/index.controller');
const { verifyToken } = require('../middlewares/index.middleware');

// POST new announcement
router.post('/course/:id', [ verifyToken ], announcementController.addAnnouncement);

// GET all announcements
router.get('/', [ verifyToken ], announcementController.getAllAnnouncements);

// GET announcement by id
router.get('/:id', [ verifyToken ], announcementController.getAnnouncementById);

// PUT update announcement by id
router.put('/:id', [ verifyToken ] , announcementController.updateAnnouncementById);

// DELETE announcement by id
router.delete('/:id', [ verifyToken ] , announcementController.deleteAnnouncementById);

// GET all announcements by course id
router.get('/course/:id', [ verifyToken ], announcementController.getAllAnnouncementsByCourseId);


module.exports = router;
