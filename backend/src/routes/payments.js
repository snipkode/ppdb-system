import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { uploadSingle } from '#config/multer';
import { sendEmail, emailTemplates } from '#config/email';
import admin, { db } from '#config/firebase';

const router = express.Router();

// Middleware to check if Firebase is initialized
const requireFirebase = (req, res, next) => {
  if (!db) {
    return res.status(503).json({ error: 'Firebase Admin not initialized. Check your credentials.' });
  }
  next();
};

// Middleware to validate request
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware to verify Firebase token
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth()?.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check admin role
export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

// Export validate for use in other routes
export { validate };

/**
 * @route POST /api/payments/upload
 * @desc Upload payment proof (bukti transfer)
 * @access Private (Student)
 */
router.post('/upload', 
  verifyToken,
  requireFirebase,
  uploadSingle('bukti_transfer'),
  [
    body('studentId').notEmpty().withMessage('Student ID is required')
  ],
  validate,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { studentId } = req.body;
      const filePath = req.file.path;
      const fileName = req.file.filename;

      const studentRef = db.collection('students').doc(studentId);
      const studentSnap = await studentRef.get();

      if (!studentSnap.exists) {
        return res.status(404).json({ error: 'Student not found' });
      }

      await studentRef.update({
        'pembayaran.status': 'pending',
        'pembayaran.bukti_transfer': filePath,
        'pembayaran.uploaded_at': admin.firestore.FieldValue.serverTimestamp(),
        'pembayaran.file_name': fileName
      });

      await db.collection('notifications').add({
        userId: studentId,
        userType: 'student',
        title: '📄 Bukti Transfer Diupload',
        message: 'Pembayaran sedang diverifikasi oleh admin',
        type: 'info',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({
        success: true,
        message: 'Bukti transfer berhasil diupload',
        data: {
          filePath,
          fileName
        }
      });
    } catch (error) {
      console.error('Error uploading payment proof:', error);
      res.status(500).json({ error: 'Failed to upload payment proof' });
    }
  }
);

/**
 * @route POST /api/payments/:studentId/verify
 * @desc Verify payment (Admin only)
 * @access Private (Admin)
 */
router.post('/:studentId/verify',
  verifyToken,
  requireFirebase,
  requireAdmin,
  [
    param('studentId').notEmpty().withMessage('Student ID is required'),
    body('status').isIn(['paid', 'rejected']).withMessage('Invalid status'),
    body('rejected_reason').optional().isString()
  ],
  validate,
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const { status, rejected_reason } = req.body;

      const studentRef = db.collection('students').doc(studentId);
      const studentSnap = await studentRef.get();

      if (!studentSnap.exists) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const student = studentSnap.data();

      const updateData = {
        'pembayaran.status': status,
        'pembayaran.verified_at': admin.firestore.FieldValue.serverTimestamp(),
        'pembayaran.verified_by': req.user.uid
      };

      if (status === 'rejected') {
        updateData['pembayaran.rejected_reason'] = rejected_reason || 'Tidak disebutkan';
      }

      await studentRef.update(updateData);

      const email = student.data_siswa?.email || student.data_ortu?.email_ortu;
      if (email) {
        let template = null;
        let subject = '';

        if (status === 'paid') {
          template = emailTemplates.paymentVerified(student);
          subject = `Pembayaran Terverifikasi - ${student.nomor_pendaftaran}`;
        } else if (status === 'rejected') {
          template = emailTemplates.paymentRejected({
            ...student,
            pembayaran: { rejected_reason }
          });
          subject = `Pembayaran Ditolak - ${student.nomor_pendaftaran}`;
        }

        if (template) {
          await sendEmail({
            to: email,
            subject,
            html: template
          });
        }
      }

      await db.collection('notifications').add({
        userId: studentId,
        userType: 'student',
        title: status === 'paid' ? '✅ Pembayaran Terverifikasi' : '⚠️ Pembayaran Ditolak',
        message: status === 'paid' 
          ? 'Pembayaran Anda telah terverifikasi' 
          : `Pembayaran ditolak: ${rejected_reason || 'Tidak disebutkan'}`,
        type: status === 'paid' ? 'success' : 'warning',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({
        success: true,
        message: `Payment ${status === 'paid' ? 'verified' : 'rejected'} successfully`
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  }
);

/**
 * @route GET /api/payments/pending
 * @desc Get all pending payments
 * @access Private (Admin)
 */
router.get('/pending', verifyToken, requireFirebase, requireAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('students')
      .where('pembayaran.status', '==', 'pending')
      .get();

    const payments = [];
    snapshot.forEach(doc => {
      payments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    res.status(500).json({ error: 'Failed to fetch pending payments' });
  }
});

export default router;
