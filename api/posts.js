const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const Post = require('../models/Post');

// @route   DELETE /api/posts/createPost/:id
// @desc    Set visibility to post (public or private)
// @access  Private

router.put('/createPost/:id', auth, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postID,
        {
            isPublic: req.body.isPublic,
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) res.status(422).json({ msg: err });
        res.json(result);
    });
});

// @route   DELETE /api/posts/comment/:id
// @desc    Delete comment
// @access  Private

router.delete('/comment/:id/:comment_id', auth, (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { comments: { _id: req.params.comment_id } },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) res.status(422).json({ msg: err });
        res.json(result);
    });
});

// @route   PUT /api/posts/comment
// @desc    Create comment
// @access  Private

router.put('/comment', auth, (req, res) => {
    const comment = {
        text: req.body.text,
        userID: req.user._id,
    };
    Post.findByIdAndUpdate(
        req.body.postID,
        {
            $push: { comments: comment },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) res.status(422).json({ msg: err });
        res.json(result);
    });
});

//obrisati
// @route   GET /api/posts/comment
// @desc    Get all posts
// @access  Private

router.get('/comment', auth, (req, res) => {
    Post.find()
        .sort({ postDate: -1 })
        .then((result) => res.json(result))
        .catch((err) => res.json({ msg: err }));
});

// @route   PUT /api/posts/like
// @desc    Like post
// @access  Private

router.put('/like', auth, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postID,
        {
            $push: { likes: req.user._id },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) res.status(422).json({ msg: err });
        res.json(result);
    });
});

// @route   PUT /api/posts/unlike
// @desc    Unlike post
// @access  Private

router.put('/unlike', auth, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postID,
        {
            $pull: { likes: req.user._id },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) res.status(422).json({ msg: err });
        res.json(result);
    });
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private

router.post('/', auth, (req, res) => {
    const newPost = new Post({
        userID: req.user._id,
        content: req.body.content,
    });

    newPost
        .save()
        .then((post) => {
            res.json(post);
        })
        .catch((err) => console.log(err));
});

// @route   GET /api/posts
// @desc    get all posts
// @access  Private

router.get('/', auth, (req, res) => {
    Post.find()
        .sort({ postDate: -1 })
        .then((post) => res.json(post))
        .catch((err) => res.json(err));
});

// @route   GET /api/posts/subscribedPost
// @desc    get all subscribed post
// @access  Private

router.get('/subscribedPost', auth, (req, res) => {
    Post.find({ userID: req.user.following })
        .sort({ postDate: -1 })
        .then((post) => res.json(post))
        .catch((err) => res.json(err));
});

// @route   GET /api/posts/:id
// @desc    get user post
// @access  Private

router.get('/user', auth, (req, res) => {
    Post.findById({ userID: req.user._id })
        .sort({ postDate: -1 })
        .then((post) => res.json(post))
        .catch((err) => res.json(err));
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id).then((post) =>
        post
            .remove()
            .then(() => {
                res.json({ success_delete: true });
            })
            .catch(() => res.json({ success_delete: false })),
    );
});

module.exports = router;
