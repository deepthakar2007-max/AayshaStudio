const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadvideo,
  getVideos,
  deleteVideos,
} = require("../controller/videocontroller");

// Upload Video
router.post(
  "/",
  upload.single("video"),
  uploadvideo
);

// Get Videos
router.get(
  "/",
  getVideos
);

// Delete Video
router.delete(
  "/:id",
  deleteVideos
);

module.exports = router;