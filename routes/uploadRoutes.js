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

// console.log(path.join(__dirnamedirname));
// console.log(path.join(__dirname, '..', 'uploads'));

const uploadPath = path.join(__dirname, '..', '/public/assets/uploads');

const multerOpts = {
    fileFilter: function (req, file, next) {
        "use strict";
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            next(null, true);
        } else {
            next({message: "That filetype isn't allowed"}, false);
        }
    },
    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname);
            cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
        }
    })
};

const upload = multer(multerOpts);

router.post('/', upload.single('file'), (req, res) => {
    // console.log('upload req.file', req.file);
    // console.log("upload req.body;", req.body);
    //this is the name given by multer.diskstorage.fileName
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