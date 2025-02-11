var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema for Book
var bookSchema = Schema({
    Title: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    Author: {
        type: String,
        required: true
    },
    Publisher: {
        type: String
    },
    Pages: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Define the Book model
var Book = mongoose.model('Book', bookSchema);

// Route to Get All Books
async function getBooks(req, res) {
  try {
    var books = await Book.find({});
    console.log("Fetched Books:", books);  // Debugging log
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Get Book by ID
async function getBookById(req, res) {
  try {
    var book = await Book.findById(req.params.id);
    console.log("Fetched Book:", book);  // Debugging log
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Add Book
async function addBook(req, res) {
  try {
    var book = await Book.create(req.body);
    console.log("Added Book:", book);  // Debugging log
    res.json(book);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Update Book
async function updateBook(req, res) {
  try {
    var book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Updated Book:", book);  // Debugging log
    res.json(book);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Delete Book
async function deleteBook(req, res) {
  try {
    var book = await Book.findByIdAndDelete(req.params.id);
    console.log("Deleted Book:", book);  // Debugging log
    res.json(book);
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Export functions and model using CommonJS
module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  Book
};

