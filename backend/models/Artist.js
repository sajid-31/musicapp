const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    bio: String,
    socialLinks: {
        youtube: String,
        instagram: String,
        spotify: String,
        twitter: String,
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', artistSchema);