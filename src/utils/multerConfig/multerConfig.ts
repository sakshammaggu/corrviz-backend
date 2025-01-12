import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadDir = path.resolve(__dirname, '../../uploads');
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['text/csv'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
  },
});

export default upload;