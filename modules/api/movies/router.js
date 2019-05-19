const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/:movieId", (req, res) => {
   
    controller
      .getMovieDBById(req.params.movieId)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
  });

router.get("/", (req, res) => {
  controller
      .getAllLisMovieDB()
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
  console.log("root");
});

router.get("/search/:name", (req, res) => {
    controller
        .getMovieByName(req.params.name)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err+"loi roi"));
  console.log("search.")
  });
  router.get("/searchyear/:year", (req, res) => {
    controller
        .getMovieByYear(req.params.year)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err+"loi roi"));
  console.log("searchyear.")
  });

router.post("/create", (req, res) => {
  console.log(req.body);
  controller
      .createMovie(req.body)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
});  
  
module.exports = router;