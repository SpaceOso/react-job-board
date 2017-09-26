const express = require('express');
const router = express.Router();

const employerController = require('../controllers').employerController;

router.post('/createJob', employerController.createJob);

module.exports = router;