const MONGO_URL = 
"mongodb://localhost/27017lab-movies-celebrities"
const router = require("express").Router();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movies.model");
// all routes here

// GET- create movie page
router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrity = await Celebrity.find();
    res.render("movies/new-movie", { celebrity });
  } catch (err) {
    console.log(err);
  }
});

// POST- Create Movie Page
router.post("/movies/create", async function (req, res, next) {
  const { title, image, genre, plot, cast } = req.body;
  try {
    await Movies.create({ title, image, genre, plot, cast });

    res.redirect("/movies");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Get- Movie list page
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movies.find();
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Get- movie details Page
router.get("/movie-details/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    //get all celebrities
    const celebrities = await Celebrity.find();
    //get the specific movie
    //single populate
    const movie = await Movies.findById(movieId).populate("cast", "name");
    res.render("movies/movie-details", { movie, celebrities });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Display to Edit routes page (edit-movie.hbs)
router.get("/movies/:movieId/edit", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    const movie = await Movies.findById(req.params.movieId);
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// get the information from the EDIT form- POST (edit-movie.hbs)
router.post("/movies/:movieId/edit", async (req, res, next) => {
  try {
    const { title, image, genre, plot, cast } = req.body;
    const { movieId } = req.params;
    const editMovie = await Movies.findByIdAndUpdate(
      movieId,
      { title, image, genre, plot, cast },
      { new: true }
    );
    // it redirects to the just edited movie
    res.redirect(`/movie-details/${editMovie._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/movies");
  }
});

// Delete movie (hbs file not required)
router.post("/movies/:movieId/delete", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await Movies.findByIdAndRemove(movieId);
    res.redirect("/movies");
  } catch (err) {
    res.redirect("/movies");
    console.log(err);
  }
});

module.exports = router;
