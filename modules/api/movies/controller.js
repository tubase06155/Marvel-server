const axios = require('axios');
const listMovieModel = require("./model");
const API_KEY = "74c8e74174a71acfad0277780643889f";


const createMovie = body =>
  new Promise((resolve, reject) => {
    listMovieModel
      .create({
        moviesId: body.moviesId,
        name: body.name,
        imdb_id: body.imdb_id,
        homepage: body.homepage,
        overview:  body.overview,
        posterUrl:  body.posterUrl,
        backdrop_path: body.backdrop_path,
        release_date:  body.release_date,
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });


const getAllLisMovieDB = () =>
  new Promise((resolve, reject) => {
    listMovieModel
      .find()
      .select("_id moviesId name imdb_id homepage overview posterUrl backdrop_path release_date")
      .exec()
      .then( data => {


        // let a = [];
        // for (var i = 0; i < data.length; i++) {
        //   await getMovieDataById(data[i].moviesId)
        //     .then(data => a.push(data))
        //     .catch(err => console.log("abc: " + err));
        // }


        //  a=data.map( async id =>  await getMovieDataById(id.moviesId) );
        //       console.log("a: "+a);
        resolve(data);

      })
      .catch(err => reject(err));
  });

const getMovieDataById = (movieId) =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    axios
      .get(URI)
      .then(data =>
        resolve({
          imdb_id: data.data.imdb_id,
          homepage: data.data.homepage,
          id: data.data.id,
          overview: data.data.overview,
          posterUrl: "https://image.tmdb.org/t/p/w500" + data.data.poster_path,
          backdrop_path: "https://image.tmdb.org/t/p/w500" + data.data.backdrop_path,
          release_date: data.data.release_date,
          title: data.data.title,
        })
      )
      .catch(err => reject(err));
  });
const getMovieByName = (name) =>
  new Promise((resolve, reject) => {
    listMovieModel
      .find()
      .select("_id moviesId name imdb_id homepage overview posterUrl backdrop_path release_date")
      .exec()
      .then(async data => {
        //  console.log(data);
        let value = [];
        data.map(vl => {
          if (!(vl.name.toLowerCase().indexOf(name) == -1)) {
            value.push(vl);
          }
        });
        if (value.length==0 ) {
          resolve({success: 0,mess : "khong tim thay"});
        } else {
          resolve(value);
        }
      })
      .catch(err => reject(err));
  });
  const getMovieDBById = (id) =>
  new Promise((resolve, reject) => {
    listMovieModel
      .find()
      .select("_id moviesId name imdb_id homepage overview posterUrl backdrop_path release_date")
      .exec()
      .then(async data => {
        //  console.log(data);
        let value = [];
        data.map(vl => {
          if (vl.moviesId ==id) {
            value.push(vl);
          }
        });
        if (value.length==0 ) {
          resolve({success: 0,mess : "khong tim thay"});
        } else {
          resolve(value);
        }
      })
      .catch(err => reject(err));
  });
  const getMovieByYear = (year) =>
  new Promise((resolve, reject) => {
    listMovieModel
      .find()
      .select("_id moviesId name imdb_id homepage overview posterUrl backdrop_path release_date")
      .exec()
      .then(async data => {
        //  console.log(data);
        let value = [];
        data.map(vl => {
          if (!(vl.release_date.indexOf(year) == -1)) {
            value.push(vl);
          }
        });
        if (value.length==0 ) {
          resolve({success: 0,mess : "khong tim thay"});
        } else {
          resolve(value);
        }
      })
      .catch(err => reject(err));
  });

module.exports = {
  getMovieDataById,
  createMovie,
  getAllLisMovieDB,
  getMovieByName,
  getMovieByYear,
  getMovieDBById
};