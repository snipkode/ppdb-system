import express from 'express';
import admin, { db } from '#config/firebase';
import { verifyToken, requireAdmin } from '#routes/payments';

const router = express.Router();

/**
 * @route GET /api/students
 * @desc Get all students (with filters)
 * @access Private (Admin)
 */
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status, pembayaran, search, limit = 100 } = req.query;
    
    let query = db.collection('students');

    if (status) {
      query = query.where('status', '==', status);
    }
    if (pembayaran) {
      query = query.where('pembayaran.status', '==', pembayaran);
    }
    if (search) {
      query = query.orderBy('nomor_pendaftaran');
    }

    query = query.limit(parseInt(limit));
    const snapshot = await query.get();

    const students = [];
    snapshot.forEach(doc => {
      students.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

/**
 * @route GET /api/students/:id
 * @desc Get student by ID
 * @access Private
 */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const studentSnap = await db.collection('students').doc(id).get();

    if (!studentSnap.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentSnap.data();
    const isOwner = req.user.uid === student.user_id;
    const isAdmin = req.user.admin === true;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json({
      success: true,
      data: {
        id: id,
        ...student
      }
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

/**
 * @route PUT /api/students/:id
 * @desc Update student data
 * @access Private
 */
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const studentSnap = await db.collection('students').doc(id).get();

    if (!studentSnap.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentSnap.data();
    const isOwner = req.user.uid === student.user_id;
    const isAdmin = req.user.admin === true;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    delete updateData.id;
    delete updateData.nomor_pendaftaran;
    delete updateData.created_at;

    await db.collection('students').doc(id).update({
      ...updateData,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      message: 'Student data updated successfully'
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

/**
 * @route GET /api/students/stats/overview
 * @desc Get student statistics
 * @access Private (Admin)
 */
router.get('/stats/overview', verifyToken, requireAdmin, async (req, res) => {
  try {
    const [total, registered, paid, accepted, rejected] = await Promise.all([
      db.collection('students').count().get(),
      db.collection('students').where('status', '==', 'registered').count().get(),
      db.collection('students').where('pembayaran.status', '==', 'paid').count().get(),
      db.collection('students').where('status', '==', 'accepted').count().get(),
      db.collection('students').where('status', '==', 'rejected').count().get()
    ]);

    res.json({
      success: true,
      data: {
        total: total.data().count,
        registered: registered.data().count,
        paid: paid.data().count,
        accepted: accepted.data().count,
        rejected: rejected.data().count
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
