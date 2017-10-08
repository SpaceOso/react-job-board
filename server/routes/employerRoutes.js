const express = require('express');
const router = express.Router();

const employerController = require('../controllers').employerController;

router.post('/createJob', employerController.createJob);
router.get('/:employerId/get-jobs', employerController.getJobs);

module.exports = router;