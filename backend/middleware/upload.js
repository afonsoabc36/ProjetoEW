const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Helper function to ensure the uploads directory exists
const createUploadsDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Function to create multer instance with dynamic storage options
const createAvatarMulterInstance = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `uploads/${folderName}`;
      createUploadsDirectory(uploadPath);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
  });
};

const createCourseDocMulterInstance = (courseSilga, folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `uploads/${folderName}/${courseSilga}`;
      createUploadsDirectory(uploadPath);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|mov|pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Only specific file types are allowed!");
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
  });
};

module.exports = {
  createAvatarMulterInstance,
  createCourseDocMulterInstance,
};
