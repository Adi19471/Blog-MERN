const express = require("express");
const {
  createBlog,
  getAllblogs,
  updateBlog,
  deleteBlog,
  getsingleBlog,
} = require("../controller/blogController");

const router = express.Router();

router.post("/create-Blog", createBlog);
router.get("/getAll-Blog", getAllblogs);
router.put("/update/:id", updateBlog);
router.get("/single/:id", getsingleBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
