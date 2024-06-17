const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Get all artists
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single artist by ID
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: 'Artist not found' });
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new artist
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        genre: req.body.genre,
        bio: req.body.bio,
        socialLinks: req.body.socialLinks
    });

    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an artist
router.put('/:id', async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArtist) return res.status(404).json({ message: 'Artist not found' });
        res.json(updatedArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an artist
router.delete('/:id', async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if (!deletedArtist) return res.status(404).json({ message: 'Artist not found' });
        res.json({ message: 'Artist deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
