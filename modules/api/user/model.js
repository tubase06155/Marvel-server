const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userModel = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    gender: { type: String },
    role: {type:Number},
    active: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: "createdAt" } }
);

userModel.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt
    .genSalt(12)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

module.exports = mongoose.model("users", userModel);
