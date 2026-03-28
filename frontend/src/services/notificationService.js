/**
 * Notification Service
 * Creates in-app notifications and triggers email sending
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Create In-App Notification
 */
export const createNotification = async (data) => {
  try {
    const notificationData = {
      userId: data.userId,           // User/Student ID
      userType: data.userType || 'student', // 'student' | 'admin'
      title: data.title,
      message: data.message,
      type: data.type || 'info',     // 'success' | 'error' | 'warning' | 'info' | 'email'
      read: false,
      actionUrl: data.actionUrl || null,
      metadata: data.metadata || {},
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'notifications'), notificationData);
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error creating notification:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send Payment Notification
 * Creates notification and triggers email
 */
export const sendPaymentNotification = async (studentId, studentData, paymentData, status) => {
  const notifications = [];

  // Create in-app notification
  if (status === 'paid') {
    notifications.push(
      createNotification({
        userId: studentId,
        userType: 'student',
        title: '✅ Pembayaran Terverifikasi',
        message: `Pembayaran Anda sebesar ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(paymentData.amount)} telah terverifikasi.`,
        type: 'success',
        actionUrl: `/payment/${studentId}`,
        metadata: {
          paymentId: paymentData.id,
          amount: paymentData.amount
        }
      })
    );
  } else if (status === 'rejected') {
    notifications.push(
      createNotification({
        userId: studentId,
        userType: 'student',
        title: '⚠️ Pembayaran Ditolak',
        message: `Pembayaran Anda ditolak: ${paymentData.rejected_reason}. Silakan upload ulang bukti transfer.`,
        type: 'warning',
        actionUrl: `/payment/${studentId}`,
        metadata: {
          paymentId: paymentData.id,
          reason: paymentData.rejected_reason
        }
      })
    );
  }

  // Create notification for admin (log)
  notifications.push(
    createNotification({
      userId: 'admin',
      userType: 'admin',
      title: `Pembayaran ${status === 'paid' ? 'Diverifikasi' : 'Ditolak'}`,
      message: `Pembayaran ${studentData.nama_lengkap} (${studentData.nomor_pendaftaran}) telah ${status === 'paid' ? 'diverifikasi' : 'ditolak'}`,
      type: status === 'paid' ? 'success' : 'warning',
      metadata: {
        studentId,
        status
      }
    })
  );

  return Promise.all(notifications);
};

/**
 * Send Registration Notification
 */
export const sendRegistrationNotification = async (studentId, studentData) => {
  return await createNotification({
    userId: studentId,
    userType: 'student',
    title: '📝 Pendaftaran Berhasil',
    message: `Pendaftaran Anda dengan nomor ${studentData.nomor_pendaftaran} telah berhasil dikirim.`,
    type: 'success',
    actionUrl: `/payment/${studentId}`,
    metadata: {
      nomor_pendaftaran: studentData.nomor_pendaftaran
    }
  });
};

/**
 * Send Exam Schedule Notification
 */
export const sendExamNotification = async (studentId, studentData, examData) => {
  return await createNotification({
    userId: studentId,
    userType: 'student',
    title: '📅 Jadwal Ujian Seleksi',
    message: `Ujian seleksi akan dilaksanakan pada ${new Date(examData.tanggal_ujian).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} pukul ${examData.waktu_ujian}`,
    type: 'info',
    actionUrl: `/exam/${studentId}`,
    metadata: {
      examId: examData.id,
      tanggal: examData.tanggal_ujian,
      lokasi: examData.lokasi
    }
  });
};

/**
 * Send Acceptance Notification
 */
export const sendAcceptanceNotification = async (studentId, studentData) => {
  return await createNotification({
    userId: studentId,
    userType: 'student',
    title: '🎉 Selamat! Anda Diterima',
    message: `Selamat! Anda diterima di jurusan ${studentData.pilihan_jurusan.diterima_di}. Silakan lakukan daftar ulang.`,
    type: 'success',
    actionUrl: '/daftar-ulang',
    metadata: {
      jurusan: studentData.pilihan_jurusan.diterima_di
    }
  });
};

/**
 * Broadcast Notification to All Students
 */
export const broadcastNotification = async (title, message, filters = {}) => {
  try {
    // This would typically be done via Cloud Functions
    // For now, we'll just create a broadcast document
    const broadcastData = {
      title,
      message,
      type: filters.type || 'info',
      targetAudience: filters.audience || 'all', // 'all' | 'students' | 'pending' | 'accepted'
      filters,
      createdAt: serverTimestamp(),
      createdBy: 'admin'
    };

    const docRef = await addDoc(collection(db, 'broadcasts'), broadcastData);
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error) {
    console.error('Error creating broadcast:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  createNotification,
  sendPaymentNotification,
  sendRegistrationNotification,
  sendExamNotification,
  sendAcceptanceNotification,
  broadcastNotification
};
