const express = require('express');
const connectDB = require('./config/db');
const app = express();
const router = express.Router();

// routes
const books = require('./routes/api/books');

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));