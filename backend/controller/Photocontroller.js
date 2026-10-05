const Photo = require("../model/photo");

// =========================
// UPLOAD PHOTO
// =========================
const uploadPhoto = async (req, res) => {
  try {
    const { title, category, customer } = req.body;

    // Check title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Check category
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Check files
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Check image
    if (!req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Get image file
    const imageFile = req.files.image[0];

    // Create Photo
    const photo = await Photo.create({
      title,
      category,
      customer: customer || undefined,
      image: imageFile.filename,
    });

    res.status(201).json({
      success: true,
      message: "Photo Uploaded Successfully",
      data: photo,
    });

  } catch (error) {
    console.log("UPLOAD PHOTO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL PHOTOS
// =========================
const getPhotos = async (req, res) => {
  try {

    const photos = await Photo.find()
      .populate("customer")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: photos.length,
      photos,
    });

  } catch (error) {

    console.log("GET PHOTOS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE PHOTO
// =========================
const deletePhoto = async (req, res) => {
  try {

    const photo = await Photo.findByIdAndDelete(
      req.params.id
    );

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Photo Deleted Successfully",
    });

  } catch (error) {

    console.log("DELETE PHOTO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  uploadPhoto,
  getPhotos,
  deletePhoto,
};