const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const userModel = require("../models/userModels");

// get All Blogs....
exports.getAllblogs = async (req, res) => {
  try {
    const result = await Blog.find();
    if (result) {
      return res.status(200).send({
        message: "Dispaly All Bloged Application..",
        success: true,
        result,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Intenral Server Error", success: false, error });
  }
};

// get All Blogs....
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res
        .status(400)
        .send({ message: "All feilds are Required..", success: false });
    }

    const existingUser = await userModel.findById(user );

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const result = new Blog({ title, description, image,user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await result.save({ session });
    existingUser.blogs.push(result);
    await existingUser.save({ session });
    await session.commitTransaction();
    await result.save();
    return res
      .status(201)
      .send({ message: "Succesfully Created...", success: true, result });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Internal server error", success: false ,error});
  }
};

// get All Blogs....
exports.updateBlog = async (req, res) => {
  try {
    let results = await Blog.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );

    return res
      .status(200)
      .send({ message: "Succesfully Updated..", message: true, results });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Internal Server Error", message: false, error });
  }
};

// get All Blogs....
exports.getsingleBlog = async (req, res) => {
  try {
    let { _id } = req.params.id;

    const results = await Blog.findOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ message: "All Singile Blog Id", message: true, results });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Internal Server Error", message: false, error });
  }
};

// get All Blogs....
exports.deleteBlog = async (req, res) => {
  try {
    const results = await Blog.deleteOne({ _id: req.params.id });

    return res.send(results);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Internal Server Error", message: false, error });
  }
};

// search Blog

exports.blogSearch = async (req, res) => {
  const { key } = req.params.key;
  try {
    const results = await Blog.find({
      $or: [
        {
          title: { $regex: req.params.key },
        },
      ],
    });

    if (results) {
      return res.send(results);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Intenral Server Eroror", message: false, error });
  }
};
