const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
    controller
        .getTvAPI()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});
router.get("/:tvId", (req, res) => {
    controller
        .getTVDataById(req.params.tvId)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;