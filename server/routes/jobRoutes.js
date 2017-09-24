const express = require('express');
const router = express.Router();

const jobController = require('../controllers').jobsController;

router.post('/create', jobController.create);
router.get('/', jobController.list);

module.exports = router;