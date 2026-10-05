const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000);

    cb(
      null,
      uniqueName + path.extname(file.originalname).toLowerCase()
    );
  },
});

// Allowed extensions
const allowedExtensions =
  /\.(jpeg|jpg|png|jfif|webp|avif|mp4|webm|mov|mkv)$/i;

// Allowed MIME types
const allowedMimeTypes =
  /^(image\/jpeg|image\/jpg|image\/png|image\/jfif|image\/webp|image\/avif|video\/mp4|video\/webm|video\/quicktime|video\/x-matroska)$/i;

// File filter
const fileFilter = (req, file, cb) => {
  const extname = allowedExtensions.test(file.originalname);

  const mimetype = allowedMimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP, AVIF, MP4, WEBM, MOV and MKV files are allowed"
      )
    );
  }
};

// Multer
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

module.exports = upload;