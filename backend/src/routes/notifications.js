import express from 'express';
import { body, validationResult } from 'express-validator';
import { sendEmail, emailTemplates, initializeEmail } from '#config/email';
import admin, { db } from '#config/firebase';
import { verifyToken, requireAdmin, validate } from '#routes/payments';

const router = express.Router();

/**
 * @route POST /api/notifications/test-email
 * @desc Send test email
 * @access Private (Admin)
 */
router.post('/test-email',
  verifyToken,
  requireAdmin,
  [
    body('email').isEmail().withMessage('Valid email is required')
  ],
  validate,
  async (req, res) => {
    try {
      const { email } = req.body;

      await sendEmail({
        to: email,
        subject: 'Test Email - PPDB Online',
        html: emailTemplates.test()
      });

      res.json({
        success: true,
        message: 'Test email sent successfully'
      });
    } catch (error) {
      console.error('Error sending test email:', error);
      res.status(500).json({ 
        error: 'Failed to send test email',
        details: error.message 
      });
    }
  }
);

/**
 * @route POST /api/notifications/send
 * @desc Send notification email to student/parent
 * @access Private (Admin)
 */
router.post('/send',
  verifyToken,
  requireAdmin,
  [
    body('to').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('template').isIn(['registration', 'paymentVerified', 'paymentRejected', 'acceptance', 'rejection', 'custom']).withMessage('Invalid template'),
    body('studentData').optional().isObject(),
    body('customHtml').optional().isString()
  ],
  validate,
  async (req, res) => {
    try {
      const { to, subject, template, studentData, customHtml } = req.body;

      let html = customHtml;
      if (template !== 'custom' && studentData) {
        html = emailTemplates[template](studentData);
      }

      await sendEmail({
        to,
        subject,
        html
      });

      res.json({
        success: true,
        message: 'Email sent successfully'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        error: 'Failed to send email',
        details: error.message 
      });
    }
  }
);

/**
 * @route GET /api/notifications/settings
 * @desc Get notification settings
 * @access Private (Admin)
 */
router.get('/settings', verifyToken, requireAdmin, async (req, res) => {
  try {
    const settingsDoc = await db.collection('settings').doc('notifications').get();
    
    let settings = {
      emailEnabled: true,
      notificationsEnabled: true,
      sendOnRegistration: true,
      sendOnPaymentVerified: true,
      sendOnPaymentRejected: true,
      sendOnExamSchedule: true,
      sendOnAcceptance: true,
      sendOnRejection: true,
      adminEmail: ''
    };

    if (settingsDoc.exists) {
      settings = { ...settings, ...settingsDoc.data() };
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

/**
 * @route PUT /api/notifications/settings
 * @desc Update notification settings
 * @access Private (Admin)
 */
router.put('/settings',
  verifyToken,
  requireAdmin,
  async (req, res) => {
    try {
      const settings = req.body;

      await db.collection('settings').doc('notifications').set(settings, { merge: true });

      res.json({
        success: true,
        message: 'Settings saved successfully'
      });
    } catch (error) {
      console.error('Error saving notification settings:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  }
);

/**
 * @route GET /api/notifications
 * @desc Get notifications for current user
 * @access Private
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const { userId } = req.query;
    const uid = userId || req.user.uid;

    const snapshot = await db.collection('notifications')
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

/**
 * @route PUT /api/notifications/:id/read
 * @desc Mark notification as read
 * @access Private
 */
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('notifications').doc(id).update({
      read: true,
      readAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

export default router;
