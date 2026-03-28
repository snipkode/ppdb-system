/**
 * Email Service Configuration
 * 
 * Options for sending emails:
 * 1. EmailJS (Frontend-only, free 200 emails/month)
 * 2. Firebase Extension + SendGrid (Free 10,000 emails/month)
 * 3. Custom SMTP (Unlimited, depends on provider)
 */

// EmailJS Configuration (Recommended for quick setup)
export const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Get from https://emailjs.com
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateIds: {
    registration: 'template_registration',
    paymentVerified: 'template_payment_verified',
    paymentRejected: 'template_payment_rejected',
    examSchedule: 'template_exam_schedule',
    acceptance: 'template_acceptance',
    rejection: 'template_rejection'
  }
};

// Email Templates Data
export const EMAIL_TEMPLATES = {
  registration: {
    subject: 'Pendaftaran PPDB Berhasil - {{nomor_pendaftaran}}',
    to: '{{email}}',
    variables: {
      nomor_pendaftaran: '{{nomor_pendaftaran}}',
      nama_siswa: '{{nama_siswa}}',
      tanggal_daftar: '{{tanggal_daftar}}',
      link_status: '{{link_status}}'
    }
  },

  paymentVerified: {
    subject: 'Pembayaran Terverifikasi - {{nomor_pendaftaran}}',
    to: '{{email}}',
    variables: {
      nomor_pendaftaran: '{{nomor_pendaftaran}}',
      nama_siswa: '{{nama_siswa}}',
      tanggal_verifikasi: '{{tanggal_verifikasi}}',
      nominal: '{{nominal}}'
    }
  },

  paymentRejected: {
    subject: 'Pembayaran Ditolak - {{nomor_pendaftaran}}',
    to: '{{email}}',
    variables: {
      nomor_pendaftaran: '{{nomor_pendaftaran}}',
      nama_siswa: '{{nama_siswa}}',
      alasan_penolakan: '{{alasan_penolakan}}',
      link_upload: '{{link_upload}}'
    }
  },

  examSchedule: {
    subject: 'Jadwal Ujian Seleksi - {{nomor_peserta}}',
    to: '{{email}}',
    variables: {
      nomor_peserta: '{{nomor_peserta}}',
      nama_siswa: '{{nama_siswa}}',
      tanggal_ujian: '{{tanggal_ujian}}',
      waktu_ujian: '{{waktu_ujian}}',
      lokasi_ujian: '{{lokasi_ujian}}',
      ruangan: '{{ruangan}}'
    }
  },

  acceptance: {
    subject: 'Selamat! Anda Diterima - {{nomor_pendaftaran}}',
    to: '{{email}}',
    variables: {
      nomor_pendaftaran: '{{nomor_pendaftaran}}',
      nama_siswa: '{{nama_siswa}}',
      jurusan_diterima: '{{jurusan_diterima}}',
      tanggal_daftar_ulang: '{{tanggal_daftar_ulang}}',
      link_daftar_ulang: '{{link_daftar_ulang}}'
    }
  },

  rejection: {
    subject: 'Hasil Seleksi PPDB - {{nomor_pendaftaran}}',
    to: '{{email}}',
    variables: {
      nomor_pendaftaran: '{{nomor_pendaftaran}}',
      nama_siswa: '{{nama_siswa}}',
      alasan: '{{alasan}}',
      kontak_panitia: '{{kontak_panitia}}'
    }
  }
};

/**
 * Send Email using EmailJS
 * @param {string} templateId - Email template ID
 * @param {object} templateParams - Template variables
 * @returns {Promise}
 */
export const sendEmail = async (templateId, templateParams) => {
  try {
    // Check if emailjs is loaded
    if (typeof window === 'undefined' || !window.emailjs) {
      console.warn('EmailJS not loaded. Email not sent.');
      return { success: false, error: 'Email service not available' };
    }

    const response = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      templateParams
    );

    return {
      success: true,
      messageId: response.text
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send Registration Confirmation Email
 */
export const sendRegistrationEmail = async (studentData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_pendaftaran: studentData.nomor_pendaftaran,
    nama_siswa: studentData.nama_siswa,
    tanggal_daftar: new Date().toLocaleDateString('id-ID'),
    link_status: `${window.location.origin}/status`
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.registration, templateParams);
};

/**
 * Send Payment Verified Email
 */
export const sendPaymentVerifiedEmail = async (studentData, paymentData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_pendaftaran: studentData.nomor_pendaftaran,
    nama_siswa: studentData.nama_siswa,
    tanggal_verifikasi: new Date().toLocaleDateString('id-ID'),
    nominal: new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(paymentData.amount)
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.paymentVerified, templateParams);
};

/**
 * Send Payment Rejected Email
 */
export const sendPaymentRejectedEmail = async (studentData, paymentData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_pendaftaran: studentData.nomor_pendaftaran,
    nama_siswa: studentData.nama_siswa,
    alasan_penolakan: paymentData.rejected_reason || 'Tidak disebutkan',
    link_upload: `${window.location.origin}/payment/${studentData.id}`
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.paymentRejected, templateParams);
};

/**
 * Send Exam Schedule Email
 */
export const sendExamScheduleEmail = async (studentData, examData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_peserta: examData.nomor_peserta,
    nama_siswa: studentData.nama_siswa,
    tanggal_ujian: new Date(examData.tanggal_ujian).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    waktu_ujian: examData.waktu_ujian,
    lokasi_ujian: examData.lokasi,
    ruangan: examData.ruangan
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.examSchedule, templateParams);
};

/**
 * Send Acceptance Email
 */
export const sendAcceptanceEmail = async (studentData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_pendaftaran: studentData.nomor_pendaftaran,
    nama_siswa: studentData.nama_siswa,
    jurusan_diterima: studentData.pilihan_jurusan.diterima_di,
    tanggal_daftar_ulang: '1-10 Agustus 2024',
    link_daftar_ulang: `${window.location.origin}/daftar-ulang`
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.acceptance, templateParams);
};

/**
 * Send Rejection Email
 */
export const sendRejectionEmail = async (studentData) => {
  const templateParams = {
    to_email: studentData.email || studentData.email_ortu,
    nomor_pendaftaran: studentData.nomor_pendaftaran,
    nama_siswa: studentData.nama_siswa,
    alasan: 'Kuota penuh / Nilai belum mencukupi',
    kontak_panitia: '0812-3456-7890'
  };

  return await sendEmail(EMAILJS_CONFIG.templateIds.rejection, templateParams);
};

export default {
  EMAILJS_CONFIG,
  EMAIL_TEMPLATES,
  sendEmail,
  sendRegistrationEmail,
  sendPaymentVerifiedEmail,
  sendPaymentRejectedEmail,
  sendExamScheduleEmail,
  sendAcceptanceEmail,
  sendRejectionEmail
};
