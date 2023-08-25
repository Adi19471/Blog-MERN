const express = require("express");
const {
  getAlluser,
  registerController,
  loginController,
  allUserdataDeleted,
} = require("../controller/userController");

// router Objects
const router = express.Router();

// get all user
router.get("/all-user", getAlluser);

// CREATR USER ||  POST
router.post("/register", registerController);
// LOGIN || POST

router.post("/login", loginController);

//  ALl user data Deleted at a Time   || PORT
router.delete("/all-user-delete-data", allUserdataDeleted);

module.exports = router;
