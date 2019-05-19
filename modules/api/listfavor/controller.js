const axios = require('axios');
const listModel = require("./model");
const API_KEY = "74c8e74174a71acfad0277780643889f";


const createlist = body =>
  new Promise((resolve, reject) => {
    listModel
      .create({
        username: body.username,
        listfv: body.listfv
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getAllListDB = (username) =>
  new Promise((resolve, reject) => {
    listModel
      .findOne({
        username: username
      })
      .select()
      .exec()
      .then(async data => {
        console.log(data.listfv);
        let a = [];
        for (var i = 0; i < data.listfv.length; i++) {
          await getDataById(data.listfv[i].Id)
            .then(data => a.push(data))
            .catch(err => console.log("abc: " + err));
        }
        console.log("a: " + a);
        resolve(a);

      })
      .catch(err => {
        reject(err);
        console.log(err)
      });
  });
const addToList = (username, ob) =>
  new Promise((resolve, reject) => {
    listModel
      .findOne({
        username: username
      })
      .select()
      .exec()
      .then(data => {
        let check = false;
        if (data.listfv) {
          data.listfv.map(item => {
            if (item.Id == ob.Id) {
              check = true;

            }
          });
        }

        if (!check) data.listfv.push(ob);
        data.save()
          .then(dataUpdated => {
            resolve(dataUpdated);
          }).catch(err => console.log(err));


      })
      .catch(err => {
        reject(err);
        console.log(err + " loi roi")
      });
  });
const DeleteToList = (username, Id) =>
  new Promise((resolve, reject) => {
    listModel
      .findOne({
        username: username
      })
      .select()
      .exec()
      .then(data => {

        for (var i = 0; i < data.listfv.length; i++) {
          if (data.listfv[i].Id == Id) {
            data.listfv.splice(i, 1);
          }
        }
        data.save()
          .then(dataUpdated => {
            resolve(dataUpdated);
          }).catch(err => console.log(err));


      })
      .catch(err => {
        reject(err);
        console.log(err + " loi roi")
      });
  });
const getDataById = (movieId) =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/${movieId}?api_key=${API_KEY}`;
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
  createlist,
  getDataById,
  getAllListDB,
  addToList,
  DeleteToList
};