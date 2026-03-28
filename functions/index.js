/**
 * Firebase Cloud Functions for Email Notifications
 * 
 * Deploy instructions:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Login: firebase login
 * 3. Initialize: firebase init functions
 * 4. Deploy: firebase deploy --only functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Email service (choose one)
// Option 1: SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);

// Option 2: Nodemailer with SMTP
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.password
  }
});

/**
 * Trigger: Send email on student registration
 */
exports.onStudentRegistered = functions.firestore
  .document('students/{studentId}')
  .onCreate(async (snap, context) => {
    const student = snap.data();
    const studentId = context.params.studentId;

    // Get student email
    const email = student.data_siswa?.email || student.data_ortu?.email_ortu;
    if (!email) return;

    // Email content
    const mailOptions = {
      from: '"PPDB Online" <noreply@yourdomain.com>',
      to: email,
      subject: `Pendaftaran PPDB Berhasil - ${student.nomor_pendaftaran}`,
      html: getRegistrationEmailHTML(student)
    };

    try {
      await transporter.sendMail(mailOptions);
      
      // Create notification
      await db.collection('notifications').add({
        userId: studentId,
        userType: 'student',
        title: '📧 Email Terkirim',
        message: 'Email konfirmasi pendaftaran telah dikirim',
        type: 'success',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Registration email sent to ${email}`);
    } catch (error) {
      console.error('Error sending registration email:', error);
    }
  });

/**
 * Trigger: Send email on payment status change
 */
exports.onPaymentStatusChanged = functions.firestore
  .document('students/{studentId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const studentId = context.params.studentId;

    // Check if payment status changed
    const beforeStatus = before.pembayaran?.status;
    const afterStatus = after.pembayaran?.status;

    if (!beforeStatus || beforeStatus === afterStatus) return;

    // Get student email
    const email = after.data_siswa?.email || after.data_ortu?.email_ortu;
    if (!email) return;

    let mailOptions = null;

    if (afterStatus === 'paid') {
      // Payment verified
      mailOptions = {
        from: '"PPDB Online" <noreply@yourdomain.com>',
        to: email,
        subject: `Pembayaran Terverifikasi - ${after.nomor_pendaftaran}`,
        html: getPaymentVerifiedEmailHTML(after)
      };
    } else if (afterStatus === 'rejected') {
      // Payment rejected
      mailOptions = {
        from: '"PPDB Online" <noreply@yourdomain.com>',
        to: email,
        subject: `Pembayaran Ditolak - ${after.nomor_pendaftaran}`,
        html: getPaymentRejectedEmailHTML(after)
      };
    }

    if (mailOptions) {
      try {
        await transporter.sendMail(mailOptions);
        
        // Create notification
        await db.collection('notifications').add({
          userId: studentId,
          userType: 'student',
          title: afterStatus === 'paid' ? '✅ Pembayaran Terverifikasi' : '⚠️ Pembayaran Ditolak',
          message: afterStatus === 'paid' 
            ? 'Email konfirmasi pembayaran telah dikirim' 
            : 'Email penolakan pembayaran telah dikirim',
          type: afterStatus === 'paid' ? 'success' : 'warning',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log(`Payment email sent to ${email}, status: ${afterStatus}`);
      } catch (error) {
        console.error('Error sending payment email:', error);
      }
    }
  });

/**
 * Trigger: Send email on exam schedule created
 */
exports.onExamScheduleCreated = functions.firestore
  .document('exams/{examId}')
  .onCreate(async (snap, context) => {
    const exam = snap.data();
    const examId = context.params.examId;

    // Get student data
    const studentRef = db.collection('students').doc(exam.student_id);
    const studentSnap = await studentRef.get();
    
    if (!studentSnap.exists) return;

    const student = studentSnap.data();
    const email = student.data_siswa?.email || student.data_ortu?.email_ortu;
    if (!email) return;

    const mailOptions = {
      from: '"PPDB Online" <noreply@yourdomain.com>',
      to: email,
      subject: `Jadwal Ujian Seleksi - ${exam.nomor_peserta}`,
      html: getExamScheduleEmailHTML(student, exam)
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Exam schedule email sent to ${email}`);
    } catch (error) {
      console.error('Error sending exam email:', error);
    }
  });

/**
 * Trigger: Send email on acceptance/rejection
 */
exports.onStudentStatusChanged = functions.firestore
  .document('students/{studentId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const studentId = context.params.studentId;

    const beforeStatus = before.status;
    const afterStatus = after.status;

    if (!beforeStatus || beforeStatus === afterStatus) return;

    const email = after.data_siswa?.email || after.data_ortu?.email_ortu;
    if (!email) return;

    let mailOptions = null;

    if (afterStatus === 'accepted') {
      mailOptions = {
        from: '"PPDB Online" <noreply@yourdomain.com>',
        to: email,
        subject: `Selamat! Anda Diterima - ${after.nomor_pendaftaran}`,
        html: getAcceptanceEmailHTML(after)
      };
    } else if (afterStatus === 'rejected') {
      mailOptions = {
        from: '"PPDB Online" <noreply@yourdomain.com>',
        to: email,
        subject: `Hasil Seleksi PPDB - ${after.nomor_pendaftaran}`,
        html: getRejectionEmailHTML(after)
      };
    }

    if (mailOptions) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Status email sent to ${email}, status: ${afterStatus}`);
      } catch (error) {
        console.error('Error sending status email:', error);
      }
    }
  });

/**
 * Callable: Send test email
 */
exports.sendTestEmail = functions.https.onCall(async (data, context) => {
  // Check if caller is admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can send test emails');
  }

  const mailOptions = {
    from: '"PPDB Online" <noreply@yourdomain.com>',
    to: data.email,
    subject: 'Test Email - PPDB Online',
    html: '<h1>Test Email</h1><p>This is a test email from PPDB Online.</p>'
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Test email sent successfully' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Helper functions for email HTML
function getRegistrationEmailHTML(student) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1>Pendaftaran Berhasil!</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Pendaftaran Anda telah berhasil diterima.</p>
        <p><strong>Nomor Pendaftaran:</strong> ${student.nomor_pendaftaran}</p>
        <p>Silakan lakukan pembayaran biaya pendaftaran.</p>
      </body>
    </html>
  `;
}

function getPaymentVerifiedEmailHTML(student) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1 style="color: green;">Pembayaran Terverifikasi!</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Pembayaran Anda telah terverifikasi.</p>
        <p>Terima kasih! Silakan tunggu jadwal ujian.</p>
      </body>
    </html>
  `;
}

function getPaymentRejectedEmailHTML(student) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1 style="color: red;">Pembayaran Ditolak</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Pembayaran Anda ditolak dengan alasan:</p>
        <p><em>${student.pembayaran?.rejected_reason || 'Tidak disebutkan'}</em></p>
        <p>Silakan upload ulang bukti transfer yang benar.</p>
      </body>
    </html>
  `;
}

function getExamScheduleEmailHTML(student, exam) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1>Jadwal Ujian Seleksi</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Berikut jadwal ujian seleksi Anda:</p>
        <ul>
          <li><strong>Tanggal:</strong> ${new Date(exam.tanggal_ujian).toLocaleDateString('id-ID')}</li>
          <li><strong>Waktu:</strong> ${exam.waktu_ujian}</li>
          <li><strong>Lokasi:</strong> ${exam.lokasi}</li>
          <li><strong>Ruangan:</strong> ${exam.ruangan}</li>
        </ul>
      </body>
    </html>
  `;
}

function getAcceptanceEmailHTML(student) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1 style="color: green;">🎉 Selamat! Anda Diterima!</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Selamat! Anda diterima di jurusan:</p>
        <p><strong>${student.pilihan_jurusan?.diterima_di || '-'}</strong></p>
        <p>Silakan lakukan daftar ulang sesuai jadwal yang ditentukan.</p>
      </body>
    </html>
  `;
}

function getRejectionEmailHTML(student) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <h1 style="color: red;">Hasil Seleksi PPDB</h1>
        <p>Yth. ${student.data_siswa?.nama_lengkap},</p>
        <p>Mohon maaf, Anda belum diterima di sekolah kami.</p>
        <p>Terima kasih atas minat Anda.</p>
      </body>
    </html>
  `;
}

module.exports = {
  onStudentRegistered,
  onPaymentStatusChanged,
  onExamScheduleCreated,
  onStudentStatusChanged,
  sendTestEmail
};
