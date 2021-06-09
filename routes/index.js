const router = require('express').Router();
const books = require('./api/books');
const songs = require('./api/songs');

router.use('/api/books', books);
router.use('/api/songs', songs);

module.exports = router;