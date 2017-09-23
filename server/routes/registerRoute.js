const express = require('express');
const router = express.Router();
//models
const JbUser = require('../models').JbUser;
//controllers
const userController = require('../controllers').userController;
const employerController = require('../controllers').employerController;
const upload = require('../controllers/uploadController');

let jwt = require('jsonwebtoken');


router.post('/', userController.create);
router.post('/employer', upload.single('file'), userController.addEmployer);

module.exports = router;