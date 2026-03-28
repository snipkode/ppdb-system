import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    // Organize by file type
    if (file.fieldname === 'bukti_transfer') {
      uploadPath += 'payments/';
    } else if (file.fieldname === 'dokumen') {
      uploadPath += 'documents/';
    } else if (file.fieldname === 'foto_siswa') {
      uploadPath += 'students/';
    } else {
      uploadPath += 'misc/';
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, PNG) dan PDF yang diperbolehkan'));
  }
};

// Multer middleware
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 2 * 1024 * 1024 // 2MB default
  },
  fileFilter: fileFilter
});

// Single file upload
export const uploadSingle = (fieldname) => upload.single(fieldname);

// Multiple file upload
export const uploadMultiple = (fieldname, maxCount) => upload.array(fieldname, maxCount);

// Fields upload
export const uploadFields = (fields) => upload.fields(fields);
