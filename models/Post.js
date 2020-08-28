const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userID: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    postDate: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: String,
        },
    ],
    isPublic: {
        type: Boolean,
        default: true,
    },
    comments: [
        {
            text: String,
            userID: String,
        },
    ],
});

module.exports = User = mongoose.model('posts', PostSchema);
