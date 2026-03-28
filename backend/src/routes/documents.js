import express from 'express';
import { body } from 'express-validator';
import { uploadSingle } from '#config/multer';
import admin, { db } from '#config/firebase';
import { verifyToken, validate } from '#routes/payments';

const router = express.Router();

/**
 * @route POST /api/documents/upload
 * @desc Upload student documents
 * @access Private (Student)
 */
router.post('/upload',
  verifyToken,
  uploadSingle('dokumen'),
  [
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('documentType').notEmpty().withMessage('Document type is required')
  ],
  validate,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { studentId, documentType } = req.body;
      const filePath = req.file.path;
      const fileName = req.file.filename;

      const studentRef = db.collection('students').doc(studentId);
      const studentSnap = await studentRef.get();

      if (!studentSnap.exists) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const documentPath = `dokumen_${documentType}`;
      const updateData = {
        [documentPath]: filePath,
        [`dokumen_${documentType}_name`]: fileName,
        [`dokumen_${documentType}_uploaded_at`]: admin.firestore.FieldValue.serverTimestamp()
      };

      await studentRef.update(updateData);

      res.json({
        success: true,
        message: 'Document uploaded successfully',
        data: {
          filePath,
          fileName
        }
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      res.status(500).json({ error: 'Failed to upload document' });
    }
  }
);

/**
 * @route GET /api/documents/:studentId
 * @desc Get student documents
 * @access Private
 */
router.get('/:studentId', verifyToken, async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentSnap = await db.collection('students').doc(studentId).get();

    if (!studentSnap.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentSnap.data();
    const documents = {
      kk: student.dokumen_kk || null,
      akta: student.dokumen_akta || null,
      foto_siswa: student.foto_siswa || null,
      surat_pindah: student.dokumen_surat_pindah || null,
      nilai: student.dokumen_nilai || null,
      sertifikat: student.dokumen_sertifikat || null
    };

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

export default router;
