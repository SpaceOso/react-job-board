const express = require('express');
const router = express.Router();
// const cors = require('cors');
const multer = require('multer');
const passwordHash = require('password-hash');
const Employer = require('../models/employer');
const jwt = require('jsonwebtoken');
const Jobs = require('../models/jobs');
const User = require('../models/user');
const path = require('path');
//


// console.log(path.join(__dirnamedirname));
// console.log(path.join(__dirname, '..', 'uploads'));

const uploadPath = path.join(__dirname, '..', 'src/assets/uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
});


const upload = multer({storage: storage});


router.post('/', upload.any(), (req, res) => {
    res.json(req.files.map(file => {
        let ext = path.extname(file.originalname);
        return {
            originalName: file.originalname,
            filename: file.filename,
            ext: ext
        }
    }));
});


module.exports = router;