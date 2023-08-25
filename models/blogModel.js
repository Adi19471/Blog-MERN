const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
  },

  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  image: {
    type: String,
    required: [true, "Images is Required"],
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: [true, "User id is Required"],
  },
},{timestamps:true});

const Blogmodel = mongoose.model("Blog", BlogSchema);
module.exports = Blogmodel;
