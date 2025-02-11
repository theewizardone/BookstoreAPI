var mongoose = require('mongoose');

// Define schema for Genre
var genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Define the Genre model
var Genre = mongoose.model('Genre', genreSchema);

// Route to Add Genre
async function addGenre(req, res) {
  try {
    var genre = new Genre(req.body);
    var result = await genre.save();
    console.log("Added Genre:", result);  // Debugging log
    res.json(result);
  } catch (err) {
    console.error("Error adding genre:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Get All Genres
async function getGenres(req, res) {
  try {
    var genres = await Genre.find({});
    console.log("Fetched Genres:", genres);  // Debugging log
    res.json(genres);
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Update Genre
async function updateGenre(req, res) {
  try {
    var genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Updated Genre:", genre);  // Debugging log
    res.json(genre);
  } catch (err) {
    console.error("Error updating genre:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Route to Delete Genre
async function deleteGenre(req, res) {
  try {
    var genre = await Genre.findByIdAndDelete(req.params.id);
    console.log("Deleted Genre:", genre);  // Debugging log
    res.json(genre);
  } catch (err) {
    console.error("Error deleting genre:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Export functions and model using CommonJS
module.exports = {
  addGenre,
  getGenres,
  updateGenre,
  deleteGenre,
  Genre
};



  
