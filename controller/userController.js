const Usermodel = require("../models/userModels");

const bcrypt = require("bcrypt");

// get all user
exports.getAlluser = async (req, res) => {
  try {
    const user = await Usermodel.find({});

    return res.status(200).send({
      userount: user.length,
      message: "All data User information",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .json(500)
      .send({ message: "Interal Server Error", success: false, error });
  }
};

// create register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // vaidation
    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "please  fill all  required..." });
    }
    // existing user
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send({ message: "User already Exist...", success: false });
    }

    const passwordChianged = await bcrypt.hash(password, 10);
    const user = new Usermodel({ username, email, password: passwordChianged });
    // save the user name
    await user.save();

    return res.send({ message: "Succesfully Register", success: true, user });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ message: "Error In Register Callback", success: false, error });
  }
};

// login user

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        message: "Please Provide Email or Password ",
        success: true,
      });
    }

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user is not register..", success: true, user });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid User name or Passworkd" });
    }

return res.status(200).send({message:"Detailes Matched",success:true,user})

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false, error });
  }
};

//  all deleted

exports.allUserdataDeleted = async (req, res) => {
  try {
    const userdata = await Usermodel.deleteMany({});
    return res
      .status(200)
      .send({
        message: "Succefully Deleted All User Data",
        success: true,
        userdata,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Serer Error", success: false, error });
  }
};
