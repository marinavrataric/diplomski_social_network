const express = require('express')
const router = express.Router()

const Image = require('../models/Image')

// uploading images
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// @route   POST /api/image/
// @desc    Upload image
// @access  Public
router.post('/', upload.single('fileImage'), (req, res) => {

    const image = new Image({
        fileImage: req.file.path
    })

    image
        .save()
        .then(item => res.json(item))
        .catch(err => res.json(err))
})

// @route   GET /api/image/
// @desc    Get image
// @access  Public
router.get('/', (req, res) => {
    Image
        .find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

module.exports = router