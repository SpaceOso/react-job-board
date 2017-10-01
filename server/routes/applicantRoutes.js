const express = require('express');
const router = express.Router();

const applicantController = require('../controllers').applicantController;

// router.post('/create', jobController.create);
// router.get('/:jobId', jobController.getById);
router.post('/', applicantController.create);

module.exports = router;