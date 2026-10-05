const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadPhoto,
  getPhotos,
  deletePhoto,
} = require("../controller/Photocontroller");

// =========================
// UPLOAD PHOTO
// =========================
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  uploadPhoto
);

// =========================
// GET ALL PHOTOS
// =========================
router.get("/", getPhotos);

// =========================
// DELETE PHOTO
// =========================
router.delete("/:id", deletePhoto);

module.exports = router;