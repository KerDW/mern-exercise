const router = require('express').Router();
const books = require('./api/books');

router.use('/api/books', books);

module.exports = router;