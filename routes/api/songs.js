const express = require('express');
const router = express.Router();

// Load song model
const Song = require('../../models/Song');

// @route GET api/songs
// @description Get all songs
// @access Public
router.get('/', (req, res) => {
  Song.find()
    .then(songs => res.json(songs))
    .catch(err => res.status(404).json({ noSongs: 'No songs found' }));
});

// @route GET api/songs/:id
// @description Get single song by id
// @access Public
router.get('/:id', (req, res) => {
  Song.findById(req.params.id)
    .then(song => res.json(song))
    .catch(err => res.status(404).json({ noSong: 'Song not found' }));
});

// @route GET api/songs
// @description add/save song
// @access Public
router.post('/', (req, res) => {

  const VIDEO_ID_CHARACTERS = 11;

  var video_id_position = req.body.url.search("v=") + 2;
  var video_id = req.body.url.substr(video_id_position, video_id_position + VIDEO_ID_CHARACTERS);
  
  req.body.thumbnail_url = "https://i.ytimg.com/vi/" + video_id + "/hqdefault.jpg";

  Song.create(req.body)
  .then(song => res.json({ msg: 'Song added' }))
  .catch(err => res.status(400).json({ error: 'Unable to add this song' })
  );
  
});

// @route GET api/songs/:id
// @description Update song
// @access Public
router.put('/:id', (req, res) => {
  Song.findByIdAndUpdate(req.params.id, req.body)
    .then(song => res.json({ msg: 'Updated' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the database' })
    );
});

// @route GET api/songs/:id
// @description Delete song by id
// @access Public
router.delete('/:id', (req, res) => {
  Song.findByIdAndRemove(req.params.id, req.body)
    .then(song => res.json({ mgs: 'Song deleted' }))
    .catch(err => res.status(404).json({ error: 'Song not found' }));
});

// @route DELETE api/songs
// @description Delete all songs
// @access Public
router.delete('/', (req, res) => {
  Song.deleteMany({})
    .then(songs => res.json({ mgs: 'All songs deleted' }))
    .catch(err => res.status(404).json({ noSongs: 'No songs found' }));
});

module.exports = router;