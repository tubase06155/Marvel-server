const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listMovieModel = new Schema(
  {
    moviesId: { type: String,unique:true, required: true },
    name: { type: String, requied: true },
    imdb_id:  { type: String },
		homepage:  { type: String },
		overview:  { type: String, requied: true },
		posterUrl:  { type: String, requied: true },
		backdrop_path: { type: String, requied: true },
		release_date:  { type: String, requied: true },
	
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("lists", listMovieModel);
