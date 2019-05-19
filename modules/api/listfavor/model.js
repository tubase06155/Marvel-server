const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listModel = new Schema(
  {
    username :{ type: String,unique:true, required: true },
    listfv : [{Id:String,name:String}],
    
  },
  { timestamps: { createdAt: "createdAt" } }
);

module.exports = mongoose.model("listsfavor", listModel);
