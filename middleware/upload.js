const multer = require('multer');

// Function to filter file types
function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    // console.log('File Accepted:', file);
    cb(null, true);
  } else {
    // console.log('File Rejected:', file);
    cb(null, false);
  } 
  console.log(file);
}

// Multer storage configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log('Storage Destination:', file);
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // console.log('Storage Filename:', file);
    cb(null, 'IMG-' + Date.now() + '-' + file.originalname);
  },
});

// Upload instance
var upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 5 }, // 5MB file size
  fileFilter: fileFilter, // Pass file filter here
});

module.exports = upload;
