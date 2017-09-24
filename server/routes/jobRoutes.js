const express = require('express');
const router = express.Router();

const jobController = require('../controllers').jobsController;

console.log('bout to post the damn job..');
router.post('/create', jobController.create);

module.exports = router;