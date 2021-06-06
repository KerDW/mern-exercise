const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    mood: {
        type: String
    },
    genre: {
        type: String
    },
    author: {
        type: String
    },
    comments: {
        type: String
    },
    thumbnail_url: {
        // YT CSS selector (style): .ytp-cued-thumbnail-overlay-image
        type: String
    }
});

module.exports = Song = mongoose.model('song', SongSchema);