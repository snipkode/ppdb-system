/**
 * Email Template HTML
 * Professional email templates for PPDB notifications
 */

export const registrationTemplate = (data) => `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pendaftaran Berhasil</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 PPDB Online</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Pendaftaran Siswa Baru</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Pendaftaran Berhasil! ✅</h2>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Yth. <strong>${data.nama_siswa}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Terima kasih telah mendaftar di sekolah kami. Pendaftaran Anda telah berhasil kami terima.
              </p>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-left: 4px solid #667eea; margin: 20px 0; padding: 20px;">
                <tr>
                  <td>
                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">Nomor Pendaftaran Anda:</p>
                    <p style="color: #667eea; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">
                      ${data.nomor_pendaftaran}
                    </p>
                    <p style="color: #999999; font-size: 12px; margin: 10px 0 0 0;">
                      Tanggal: ${data.tanggal_daftar}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <h3 style="color: #333333; margin: 30px 0 15px 0; font-size: 18px;">📋 Langkah Selanjutnya:</h3>
              <ol style="color: #555555; font-size: 15px; line-height: 2; margin: 0 0 20px 0; padding-left: 20px;">
                <li>Lakukan pembayaran biaya pendaftaran</li>
                <li>Upload bukti transfer di halaman pembayaran</li>
                <li>Tunggu verifikasi dari admin</li>
                <li>Pantau status pendaftaran Anda secara berkala</li>
              </ol>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.link_status}" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: bold;">
                      📊 Cek Status Pendaftaran
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Jika ada pertanyaan, silakan hubungi panitia PPDB melalui email atau telepon yang tersedia di website.
              </p>
              
              <p style="color: #555555; font-size: 15px; margin: 30px 0 0 0;">
                Hormat kami,<br>
                <strong>Panitia PPDB Online</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0;">
                © 2024 PPDB Online. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                Email ini dikirim secara otomatis, mohon tidak membalas email ini.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const paymentVerifiedTemplate = (data) => `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pembayaran Terverifikasi</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Pembayaran Berhasil</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Verifikasi Pembayaran</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Pembayaran Terverifikasi! 🎉</h2>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Yth. <strong>${data.nama_siswa}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Pembayaran biaya pendaftaran Anda telah berhasil diverifikasi.
              </p>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fff4; border: 1px solid #38ef7d; border-radius: 6px; margin: 20px 0; padding: 20px;">
                <tr>
                  <td>
                    <p style="color: #11998e; font-size: 18px; font-weight: bold; margin: 0 0 15px 0; text-align: center;">
                      ✓ LUNAS
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">Nomor Pendaftaran</td>
                        <td style="color: #333333; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: bold;">${data.nomor_pendaftaran}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">Nominal</td>
                        <td style="color: #333333; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: bold;">${data.nominal}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; padding: 8px 0;">Tanggal Verifikasi</td>
                        <td style="color: #333333; font-size: 14px; padding: 8px 0; text-align: right;">${data.tanggal_verifikasi}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <h3 style="color: #333333; margin: 30px 0 15px 0; font-size: 18px;">📋 Langkah Selanjutnya:</h3>
              <ol style="color: #555555; font-size: 15px; line-height: 2; margin: 0 0 20px 0; padding-left: 20px;">
                <li>Tunggu jadwal ujian seleksi diumumkan</li>
                <li>Pantau email dan status pendaftaran Anda</li>
                <li>Download kartu ujian ketika sudah tersedia</li>
                <li>Ikuti ujian seleksi sesuai jadwal</li>
              </ol>
              
              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Selamat mengikuti ujian seleksi! Kami doakan kesuksesan untuk Anda.
              </p>
              
              <p style="color: #555555; font-size: 15px; margin: 30px 0 0 0;">
                Hormat kami,<br>
                <strong>Panitia PPDB Online</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0;">
                © 2024 PPDB Online. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const paymentRejectedTemplate = (data) => `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pembayaran Ditolak</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">⚠️ Pembayaran Ditolak</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Verifikasi Pembayaran</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Pembayaran Ditolak</h2>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Yth. <strong>${data.nama_siswa}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Mohon maaf, pembayaran Anda tidak dapat diverifikasi dengan alasan berikut:
              </p>
              
              <!-- Rejection Reason -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff5f5; border-left: 4px solid #eb3349; margin: 20px 0; padding: 20px;">
                <tr>
                  <td>
                    <p style="color: #eb3349; font-size: 14px; font-weight: bold; margin: 0 0 10px 0;">Alasan Penolakan:</p>
                    <p style="color: #333333; font-size: 15px; margin: 0; font-style: italic;">
                      "${data.alasan_penolakan}"
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin: 20px 0; padding: 20px;">
                <tr>
                  <td>
                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">Nomor Pendaftaran:</p>
                    <p style="color: #333333; font-size: 18px; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">
                      ${data.nomor_pendaftaran}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <h3 style="color: #333333; margin: 30px 0 15px 0; font-size: 18px;">📋 Yang Harus Dilakukan:</h3>
              <ol style="color: #555555; font-size: 15px; line-height: 2; margin: 0 0 20px 0; padding-left: 20px;">
                <li>Periksa kembali bukti transfer Anda</li>
                <li>Pastikan nominal transfer sesuai (Rp 150.000)</li>
                <li>Upload ulang bukti transfer yang jelas dan terbaca</li>
                <li>Tunggu verifikasi ulang dari admin</li>
              </ol>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.link_upload}" style="display: inline-block; background-color: #eb3349; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: bold;">
                      📤 Upload Ulang Bukti Transfer
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Jika Anda mengalami kesulitan, silakan hubungi panitia PPDB untuk bantuan lebih lanjut.
              </p>
              
              <p style="color: #555555; font-size: 15px; margin: 30px 0 0 0;">
                Hormat kami,<br>
                <strong>Panitia PPDB Online</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #999999; font-size: 13px; margin: 0 0 10px 0;">
                © 2024 PPDB Online. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default {
  registrationTemplate,
  paymentVerifiedTemplate,
  paymentRejectedTemplate
};
