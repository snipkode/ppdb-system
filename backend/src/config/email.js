import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

// Email transporter configuration
let transporter = null;

// Initialize email service
export const initializeEmail = () => {
  if (process.env.SENDGRID_API_KEY) {
    // Use SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return 'sendgrid';
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    // Use SMTP/Nodemailer
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    return 'smtp';
  }
  return null;
};

// Send email using SMTP
export const sendEmailSMTP = async (options) => {
  if (!transporter) {
    throw new Error('Email transporter not initialized');
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'PPDB Online <noreply@yourdomain.com>',
    to: options.to,
    subject: options.subject,
    html: options.html
  };

  return await transporter.sendMail(mailOptions);
};

// Send email using SendGrid
export const sendEmailSendGrid = async (options) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured');
  }

  const msg = {
    to: options.to,
    from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
    subject: options.subject,
    html: options.html
  };

  return await sgMail.send(msg);
};

// Universal send method
export const sendEmail = async (options) => {
  try {
    if (process.env.SENDGRID_API_KEY) {
      return await sendEmailSendGrid(options);
    } else {
      return await sendEmailSMTP(options);
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  registration: (student) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Pendaftaran Berhasil!</h1>
          </div>
          <div class="content">
            <p>Yth. <strong>${student.data_siswa?.nama_lengkap || 'Calon Siswa'}</strong>,</p>
            <p>Terima kasih telah mendaftar di PPDB Online. Pendaftaran Anda telah berhasil diterima.</p>
            
            <div class="info-box">
              <h3>📋 Informasi Pendaftaran</h3>
              <p><strong>Nomor Pendaftaran:</strong> ${student.nomor_pendaftaran || '-'}</p>
              <p><strong>Tanggal Daftar:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
            </div>
            
            <p>Langkah selanjutnya:</p>
            <ol>
              <li>Lakukan pembayaran biaya pendaftaran</li>
              <li>Upload bukti transfer</li>
              <li>Tunggu verifikasi dari admin</li>
              <li>Ikuti jadwal ujian seleksi</li>
            </ol>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/status" class="button">Cek Status Pendaftaran</a>
          </div>
          <div class="footer">
            <p>PPDB Online - Sistem Pendaftaran Peserta Didik Baru</p>
            <p>© ${new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  paymentVerified: (student) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Pembayaran Terverifikasi!</h1>
          </div>
          <div class="content">
            <p>Yth. <strong>${student.data_siswa?.nama_lengkap || 'Calon Siswa'}</strong>,</p>
            
            <div class="success-box">
              <h3>🎉 Selamat!</h3>
              <p>Pembayaran biaya pendaftaran Anda telah terverifikasi.</p>
              <p><strong>Nomor Pendaftaran:</strong> ${student.nomor_pendaftaran || '-'}</p>
            </div>
            
            <p>Terima kasih atas pembayaran Anda. Silakan tunggu informasi selanjutnya mengenai jadwal ujian seleksi.</p>
          </div>
          <div class="footer">
            <p>PPDB Online - Sistem Pendaftaran Peserta Didik Baru</p>
          </div>
        </div>
      </body>
    </html>
  `,

  paymentRejected: (student) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .warning-box { background: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Pembayaran Ditolak</h1>
          </div>
          <div class="content">
            <p>Yth. <strong>${student.data_siswa?.nama_lengkap || 'Calon Siswa'}</strong>,</p>
            
            <div class="warning-box">
              <p>Maaf, pembayaran Anda ditolak dengan alasan:</p>
              <p><em>"${student.pembayaran?.rejected_reason || 'Tidak disebutkan'}"</em></p>
            </div>
            
            <p>Silakan upload ulang bukti transfer yang benar melalui dashboard Anda.</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="display: inline-block; padding: 12px 30px; background: #eb3349; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Buka Dashboard</a>
          </div>
          <div class="footer">
            <p>PPDB Online - Sistem Pendaftaran Peserta Didik Baru</p>
          </div>
        </div>
      </body>
    </html>
  `,

  acceptance: (student) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Selamat! Anda Diterima!</h1>
          </div>
          <div class="content">
            <p>Yth. <strong>${student.data_siswa?.nama_lengkap || 'Calon Siswa'}</strong>,</p>
            
            <div class="success-box">
              <h3>🏆 Selamat Atas Pencapaian Anda!</h3>
              <p>Anda dinyatakan <strong>LULUS</strong> seleksi PPDB dan diterima di:</p>
              <p><strong style="font-size: 18px; color: #f5576c;">${student.pilihan_jurusan?.diterima_di || 'Jurusan yang dipilih'}</strong></p>
            </div>
            
            <p>Silakan lakukan daftar ulang sesuai jadwal yang ditentukan.</p>
          </div>
          <div class="footer">
            <p>PPDB Online - Sistem Pendaftaran Peserta Didik Baru</p>
          </div>
        </div>
      </body>
    </html>
  `,

  rejection: (student) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #603813 0%, #b29f94 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hasil Seleksi PPDB</h1>
          </div>
          <div class="content">
            <p>Yth. <strong>${student.data_siswa?.nama_lengkap || 'Calon Siswa'}</strong>,</p>
            
            <p>Terima kasih atas minat Anda terhadap sekolah kami.</p>
            <p>Mohon maaf, pada seleksi kali ini Anda belum dapat kami terima.</p>
            <p>Kami menghargai usaha Anda dan berharap sukses di masa depan.</p>
          </div>
          <div class="footer">
            <p>PPDB Online - Sistem Pendaftaran Peserta Didik Baru</p>
          </div>
        </div>
      </body>
    </html>
  `,

  test: () => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { padding: 20px; }
          h1 { color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Test Email</h1>
          <p>This is a test email from PPDB Online backend.</p>
          <p>If you receive this, the email configuration is working correctly.</p>
        </div>
      </body>
    </html>
  `
};
