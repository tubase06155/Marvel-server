const express = require("express");
const controller = require("./controller");

const router = express.Router();


router.post("/create", (req, res) => {
    console.log(req.body);
    controller
        .createlist(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});
//middleware
function requiresLoginG(req, res, next) {
    if (req.session && req.session.userInfo && req.session.userInfo.username == req.params.username) {
        return next();
    } else {
        console.log("1011111111111111111111111")
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

router.get("/:username",requiresLoginG, (req, res) => {
    controller
        .getAllListDB(req.params.username)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
    console.log("root");
});
function requiresLogin(req, res, next) {
    if (req.session && req.session.userInfo) {
        return next();
    } else {
        console.log("1011111111111111111111111")
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}
router.put("/add",requiresLogin ,(req, res) => {
    // console.log(req.body);
    controller
        .addToList(req.body.username, req.body.ob)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});
router.put("/dele", (req, res) => {
    console.log(req.body);
    controller
        .DeleteToList(req.body.username, req.body.Id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});
module.exports = router;