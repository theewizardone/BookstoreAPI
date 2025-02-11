var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Import functions directly from the book and genre files
var { getGenres, addGenre, updateGenre, deleteGenre } = require('./models/genre');
var { getBooks, getBookById, addBook, updateBook, deleteBook } = require('./models/book');  // Removed .default

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/Bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes for genres
app.get('/api/genres', getGenres);           // Get all genres
app.post('/api/genre', addGenre);            // Add a genre
app.put('/api/genres/:id', updateGenre);     // Update a genre
app.delete('/api/genres/:id', deleteGenre);  // Delete a genre

// Routes for books
app.get('/api/books', getBooks);             // Get all books
app.get('/api/books/:id', getBookById);      // Get book by ID
app.post('/api/books', addBook);             // Add a book
app.put('/api/books/:id', updateBook);       // Update a book
app.delete('/api/books/:id', deleteBook);    // Delete a book

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000...');
});



