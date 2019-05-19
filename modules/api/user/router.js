const express = require("express");
const router = express.Router();
// const multer = require("multer");

const userController = require("./controller");
const authMiddleware = require("../auth/auth");
const listController = require('../listfavor/controller');

router.get("/", (req, res) => {
    userController
        .getAllUsers(req.query.page || 1)
        .then(users => res.send(users))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});
router.post("/", (req, res) => {
    userController
        .createUser(req.body)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
    let body = {username : req.body.username, listfv:[{}]};
    listController.createlist(body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
    userController
        .getOneUser(req.params.id)
        .then(user => res.send(user))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.use("/:id/*", authMiddleware.authorize, (req, res, next) => {
    if (req.session.userInfo.id != req.params.id) {
        res.status(401).send("Unauthorized!");
    } else next();
});
router.put("/:id/password", (req, res) => {
    userController
        .updatePassword(req.params.id, req.body.password)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});
router.delete("/:id", (req, res) => {
    if (req.session.id !== req.params.id) {
        return res.status(401).send("Unauthorized!");
    }

    userController
        .deleteUser(req.params.id)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});
module.exports = router;