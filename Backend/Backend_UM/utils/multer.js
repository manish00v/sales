// const multer = require("multer");
// const path = require("path");

// // Define storage engine for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Save files in "uploads" folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//   },
// });

// // File filter to allow only PDFs, JPG, and PNG files
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /pdf|jpg|jpeg|png/;
//   const extname = allowedFileTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedFileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only PDF, JPG, and PNG files are allowed!"));
//   }
// };

// // Multer configuration
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
// });

// module.exports = upload;

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pics",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

// Multer Upload
const upload = multer({ storage });

module.exports = upload;
