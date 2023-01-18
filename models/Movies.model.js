const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: {
    type: [Schema.Types.ObjectId],
    ref: "Celebrity",
  },
});

const Movies = mongoose.model("Movie", moviesSchema);
module.exports = Movies;
