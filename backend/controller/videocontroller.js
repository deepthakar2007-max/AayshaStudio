const Video = require("../model/video");
const fs = require("fs");
const path = require("path");

// =========================
// UPLOAD VIDEO
// =========================
const uploadvideo = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Video title is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a video",
      });
    }

    const video = await Video.create({
      title,
      category,
      video: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video,
    });

  } catch (error) {
    console.log("UPLOAD VIDEO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL VIDEOS
// =========================
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });

  } catch (error) {
    console.log("GET VIDEOS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE VIDEO
// =========================
const deleteVideos = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE VIDEO ID:", id);

    // Check ID
    if (!id || id === "id") {
      return res.status(400).json({
        success: false,
        message: "Valid video ID is required",
      });
    }

    // Find video
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Delete database record
    await Video.findByIdAndDelete(id);

    // Delete physical video file
    if (video.video) {
      const videoPath = path.join(
        __dirname,
        "../uploads",
        video.video
      );

      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
        console.log("Video file deleted:", videoPath);
      }
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {
    console.log("DELETE VIDEO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  uploadvideo,
  getVideos,
  deleteVideos,
};