const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const auth = require('../middleware/auth');

// following
router.put('/follow', auth, (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        {
            $push: { followers: req.user._id },
        },
        {
            new: true,
        },
        (err, result) => {
            if (err) res.status(422).json({ msFg: err });
            User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { following: req.body.followId },
                },
                {
                    new: true,
                },
            )
                .then((result) => res.json(result))
                .catch((err) => res.status(422).json({ msg: err }));
        },
    );
});

// unfollowing
router.put('/unfollow', auth, (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        {
            $pull: { followers: req.user._id },
        },
        {
            new: true,
        },
        (err, result) => {
            if (err) res.status(422).json({ msg: err });
            User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { following: req.body.unfollowId },
                },
                {
                    new: true,
                },
            )
                .then((result) => res.json(result))
                .catch((err) => res.status(422).json({ msg: err }));
        },
    );
});

// uploading images
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// @route   PUT /api/users/:id/photo
// @desc    Update user photo
// @access  Private
router.put('/:id/photo', upload.single('fileImage'), (req, res) => {
    const profile_image = req.file.path;
    User.findByIdAndUpdate({ _id: req.params.id }, { profile_image }).then(() => {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                return res.json(user);
            })
            .catch((err) => console.log(err));
    });
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', (req, res) => {
    const { first_name, last_name, user_bio } = req.body;
    User.findByIdAndUpdate({ _id: req.params.id }, { first_name, last_name, user_bio }).then(() => {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                return res.json(user);
            })
            .catch((err) => console.log(err));
    });
});

// @route   POST /api/users
// @desc    Create new user
// @access  Public

router.post('/', (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Filed validation
    if (!first_name || !last_name || !email || !password) res.status(400).json({ msg: 'Fields cannot be empty.' });

    // Finding user by email, creating new user if not existing
    User.findOne({ email })
        .then((user) => {
            if (user) res.status(400).json({ msg: `Email '${email}' is already in use.` });

            const newUser = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            });

            // Create hash and salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;

                    newUser.save().then((user) => {
                        jwt.sign({ id: user._id }, config.get('jwtSecret'), (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email,
                                },
                            });
                        });
                    });
                });
            });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
