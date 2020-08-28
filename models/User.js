const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registration_date: {
        type: Date,
        default: Date.now,
    },
    profile_image: {
        type: String,
        default: '',
    },
    user_bio: {
        type: String,
        required: false,
    },
    followers: [
        {
            type: String,
        },
    ],
    following: [
        {
            type: String,
        },
    ],
});

module.exports = User = mongoose.model('user', UserSchema);
