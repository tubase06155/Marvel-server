const axios = require('axios');
const API_KEY = "74c8e74174a71acfad0277780643889f";

const getTvAPI = content =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=marvel`;
    axios
      .get(URI)
      .then(
        result =>
        result.data.results ?
        resolve(
          result.data.results.map(element => {
            const obj = {};
            obj.id = element.id;
            obj.posterUrl = "https://image.tmdb.org/t/p/w500" + element.poster_path;
            obj.backdrop_path = "https://image.tmdb.org/t/p/w500" + element.backdrop_path;
            obj.title = element.title ? element.title : element.original_name;
            obj.vote_average = element.vote_average;
            obj.overview = element.overview;
            return obj;
          })
        ) :
        resolve({})
      )
      .catch(err => reject(err));
  });
const getTVDataById = (movieId) =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}`;
    axios
      .get(URI)
      .then(data =>
        resolve({
          homepage: data.data.homepage,
          id: data.data.id,
          overview: data.data.overview,
          posterUrl: "https://image.tmdb.org/t/p/w500" + data.data.poster_path,
          backdrop_path: "https://image.tmdb.org/t/p/w500" + data.data.backdrop_path,
          title: data.data.title ? data.data.title : data.data.original_name,
        })
      )
      .catch(err => reject(err));
  });
module.exports = {
  getTvAPI,
  getTVDataById
};