import createError from 'http-errors';
import multer from 'multer';
import path from 'path';

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const FILE_MIMES = ['image/png', 'image/jpeg', 'image/jpg'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (FILE_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(createError(400, 'Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;
