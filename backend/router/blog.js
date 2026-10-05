const express = require("express");

const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
} = require("./../controller/blogcontroller");

const upload = require("./../config/multer");

const router = express.Router();

router.get("/:id", getBlog);

router.get("/", getBlogs);

// IMPORTANT: multer middleware
router.post("/", upload.single("image"), createBlog);

router.put("/:id", upload.single("image"), updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;