const userModel = require("./model");

const createUser = ({ username, name,role, password }) =>
  new Promise((resolve, reject) => {
    userModel
      .create({ username, name,role, password })
      .then(user => resolve(user))
      .catch(err => reject(err));
  });
const updatePassword = (id, password) =>
    new Promise((resolve, reject) => {
        userModel
            .findById(id)
            .then(user => {
                user.password = password;
                return user.save();
            })
            .then(data => resolve(data._id))
            .catch(err => reject(err));
    });
const getAllUsers = page =>
    new Promise((resolve, reject) => {
        userModel
            .find({
                active: true
            })
            .sort({
                createdAt: -1
            })
            .skip((page - 1) * 20)
            .limit(20)
            .select("_id username name")
            .exec()
            .then(data =>{
                console.log(data);
                 resolve(
                    data
                );
                console.log(data);
            }

               
            )
            .catch(err => reject(err));
    });
const getOneUser = id =>
    new Promise((resolve, reject) => {
        userModel
            .findOne({
                active: true,
                _id: id
            })
            .select("_id username name password")
            .exec()
            .then(data =>
                resolve(
                    data
                )
            )
            .catch(err => reject(err));
    });
const getUserForAuth = username =>
    new Promise((resolve, reject) => {
        userModel
            .findOne({
                username
            })
            .select("username password _id name")
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
const deleteUser = id =>
    new Promise((resolve, reject) => {
        userModel
            .update({
                _id,
                id
            }, {
                active: false
            })
            .exec()
            .then(data => resolve(data._id))
            .catch(err => reject(err));
    });
module.exports = {
    createUser,
    updatePassword,
    getUserForAuth,
    getAllUsers,
    getOneUser,
    deleteUser
};