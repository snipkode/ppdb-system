import { useState, useEffect } from 'react';
import { FiBell, FiSend, FiCheck, FiX, FiSettings, FiAlertCircle, FiChevronRight, FiMail } from 'react-icons/fi';
import { notificationAPI } from '@/services/api';
import AdminLayout from '@/components/layout/AdminLayout';
import StatCard from '@/components/ui/StatCard';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';

const AdminNotifications = () => {
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [settings, setSettings] = useState({
    emailEnabled: true,
    notificationsEnabled: true,
    sendOnRegistration: true,
    sendOnPaymentVerified: true,
    sendOnPaymentRejected: true,
    sendOnExamSchedule: true,
    sendOnAcceptance: true,
    sendOnRejection: true,
    adminEmail: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await notificationAPI.getSettings();
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    if (!testEmail) return;

    setSending(true);
    setResult(null);

    try {
      const response = await notificationAPI.sendTestEmail(testEmail);
      setResult({ success: true, message: response.message });
    } catch (error) {
      setResult({ success: false, message: error.response?.data?.details || error.message });
    } finally {
      setSending(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await notificationAPI.updateSettings(settings);
      setResult({ success: true, message: 'Settings saved successfully' });
    } catch (error) {
      setResult({ success: false, message: 'Failed to save: ' + error.message });
    }
  };

  const handlePreviewTemplate = (templateName) => {
    const templates = {
      'Pendaftaran Berhasil': {
        subject: 'Konfirmasi Pendaftaran Berhasil - PPDB SMK Nusantara',
        body: `Yth. Calon Siswa SMK Nusantara,

Terima kasih telah mendaftar di SMK Nusantara. Kami telah menerima pendaftaran Anda dengan data sebagai berikut:

No. Pendaftaran: PPDB-2024-0001
Nama: [Nama Siswa]
Jurusan Pilihan 1: [Jurusan 1]
Jurusan Pilihan 2: [Jurusan 2]
Tanggal Daftar: [Tanggal]

Langkah selanjutnya:
1. Tunggu email konfirmasi pembayaran
2. Lakukan pembayaran sesuai nominal yang ditentukan
3. Ikuti ujian seleksi sesuai jadwal yang akan diinformasikan

Untuk informasi lebih lanjut, silakan hubungi:
📞 WA: 0812-3456-7890
📧 Email: info@smknusantara.sch.id

Hormat kami,
Panitia PPDB SMK Nusantara`
      },
      'Pembayaran Diverifikasi': {
        subject: 'Pembayaran Terverifikasi - PPDB SMK Nusantara',
        body: `Yth. Calon Siswa SMK Nusantara,

Pembayaran Anda telah terverifikasi:

No. Pendaftaran: PPDB-2024-0001
Nama: [Nama Siswa]
Jenis Pembayaran: [Jenis]
Nominal: Rp [Nominal]
Status: ✅ LUNAS
Tanggal Verifikasi: [Tanggal]

Selamat! Anda sekarang berhak mengikuti ujian seleksi. Jadwal ujian akan dikirimkan melalui email terpisah.

Hormat kami,
Panitia PPDB SMK Nusantara`
      },
      'Pembayaran Ditolak': {
        subject: 'Pembayaran Ditolak - PPDB SMK Nusantara',
        body: `Yth. Calon Siswa SMK Nusantara,

Mohon maaf, pembayaran Anda tidak dapat diverifikasi:

No. Pendaftaran: PPDB-2024-0001
Nama: [Nama Siswa]
Jenis Pembayaran: [Jenis]
Nominal: Rp [Nominal]
Status: ❌ DITOLAK
Alasan: [Alasan penolakan]

Silakan lakukan pembayaran ulang dan konfirmasi kembali ke panitia.

Untuk informasi lebih lanjut:
📞 WA: 0812-3456-7890
📧 Email: info@smknusantara.sch.id

Hormat kami,
Panitia PPDB SMK Nusantara`
      },
      'Jadwal Ujian': {
        subject: 'Jadwal Ujian Seleksi - PPDB SMK Nusantara',
        body: `Yth. Peserta Ujian Seleksi SMK Nusantara,

Berikut adalah jadwal ujian seleksi Anda:

No. Peserta: UJIAN-2024-0001
Nama: [Nama Siswa]
Tanggal: [Tanggal Ujian]
Waktu: [Waktu Ujian]
Lokasi: [Tempat Ujian]
Ruangan: [Nomor Ruangan]

Mata Ujian:
📖 TPQ (Tahsin Al-Qur'an)
✏️ Akademik (Matematika, IPA, Bahasa)
🎤 Wawancara

Hal yang perlu dibawa:
1. Kartu tanda peserta ujian
2. Alat tulis sendiri (pensil, pulpen, penghapus)
3. Berpakaian rapi dan sopan

Hadir 30 menit sebelum ujian dimulai.

Hormat kami,
Panitia PPDB SMK Nusantara`
      },
      'Diterima': {
        subject: '🎉 SELAMAT! Anda Diterima - PPDB SMK Nusantara',
        body: `Yth. Calon Siswa Baru SMK Nusantara,

Alhamdulillah, SELAMAT! Anda dinyatakan LULUS seleksi PPDB SMK Nusantara Tahun Ajaran 2024/2025.

No. Pendaftaran: PPDB-2024-0001
Nama: [Nama Siswa]
Jurusan: [Jurusan yang diterima]
Status: ✅ LULUS

Langkah selanjutnya (Daftar Ulang):
1. Datang ke sekolah membawa dokumen asli
2. Mengisi formulir daftar ulang
3. Membayar biaya daftar ulang
4. Menyerahkan pas foto 3x4 (3 lembar)

Jadwal Daftar Ulang:
📅 Tanggal: [Tanggal]
⏰ Waktu: [Waktu]
📍 Tempat: Sekretariat PPDB

Selamat bergabung dengan keluarga besar SMK Nusantara!

Hormat kami,
Kepala Sekolah & Panitia PPDB`
      },
      'Ditolak': {
        subject: 'Hasil Seleksi PPDB - SMK Nusantara',
        body: `Yth. Calon Siswa SMK Nusantara,

Terima kasih telah mendaftar di SMK Nusantara.

Setelah melalui proses seleksi, dengan ini kami informasikan hasil seleksi Anda:

No. Pendaftaran: PPDB-2024-0001
Nama: [Nama Siswa]
Status: ❌ BELUM LULUS

Meskipun belum lulus seleksi di SMK Nusantara, kami tetap menghargai usaha Anda dan berharap sukses di jalur lainnya.

Untuk informasi lebih lanjut atau keberatan hasil seleksi, silakan hubungi:
📞 WA: 0812-3456-7890
📧 Email: info@smknusantara.sch.id

Hormat kami,
Panitia PPDB SMK Nusantara`
      }
    };

    setSelectedTemplate(templates[templateName] || templates['Pendaftaran Berhasil']);
    setShowPreview(true);
  };

  const emailTemplates = [
    { name: 'Pendaftaran Berhasil', icon: '📧', color: 'from-blue-500 to-cyan-500' },
    { name: 'Pembayaran Diverifikasi', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { name: 'Pembayaran Ditolak', icon: '❌', color: 'from-red-500 to-pink-500' },
    { name: 'Jadwal Ujian', icon: '📅', color: 'from-purple-500 to-pink-500' },
    { name: 'Diterima', icon: '🎉', color: 'from-yellow-500 to-orange-500' },
    { name: 'Ditolak', icon: '😞', color: 'from-gray-500 to-slate-500' }
  ];

  return (
    <AdminLayout title="Notifikasi" subtitle="Pengaturan email & notifikasi sistem">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumb showHome={false} items={[{ label: 'Notifikasi', href: '/admin/notifications' }]} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Result Toast */}
        {result && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            result.success
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {result.success ? <FiCheck className="w-5 h-5 flex-shrink-0" /> : <FiX className="w-5 h-5 flex-shrink-0" />}
            <p className="text-sm font-medium">{result.message}</p>
            <button onClick={() => setResult(null)} className="ml-auto hover:opacity-70">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Email Aktif"
            value={settings.emailEnabled ? 'Ya' : 'Tidak'}
            color={settings.emailEnabled ? 'from-green-500 to-emerald-500' : 'from-gray-500'}
            size="md"
          />
          <StatCard
            label="Notifikasi"
            value={settings.notificationsEnabled ? 'Aktif' : 'Nonaktif'}
            color={settings.notificationsEnabled ? 'from-blue-500 to-cyan-500' : 'from-gray-500'}
            size="md"
          />
          <StatCard
            label="Total Triggers"
            value={Object.values(settings).filter(v => v === true).length - 2}
            color="from-purple-500 to-pink-500"
            size="md"
          />
          <StatCard
            label="Status"
            value="Ready"
            color="from-orange-500 to-red-500"
            size="md"
          />
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
              <FiMail className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Pengaturan Email</h2>
          </div>

          <div className="space-y-3">
            <ToggleRow
              label="Aktifkan Email"
              desc="Kirim email otomatis untuk setiap event"
              checked={settings.emailEnabled}
              onChange={(v) => setSettings({ ...settings, emailEnabled: v })}
            />
            <ToggleRow
              label="Notifikasi In-App"
              desc="Tampilkan notifikasi bell di aplikasi"
              checked={settings.notificationsEnabled}
              onChange={(v) => setSettings({ ...settings, notificationsEnabled: v })}
            />
          </div>
        </div>

        {/* Email Triggers */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
              <FiSend className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Trigger Email Otomatis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              { key: 'sendOnRegistration', label: 'Pendaftaran Baru', icon: '📝' },
              { key: 'sendOnPaymentVerified', label: 'Pembayaran Diverifikasi', icon: '✅' },
              { key: 'sendOnPaymentRejected', label: 'Pembayaran Ditolak', icon: '❌' },
              { key: 'sendOnExamSchedule', label: 'Jadwal Ujian', icon: '📅' },
              { key: 'sendOnAcceptance', label: 'Diterima', icon: '🎉' },
              { key: 'sendOnRejection', label: 'Ditolak', icon: '😞' }
            ].map((item) => (
              <ToggleCard
                key={item.key}
                icon={item.icon}
                label={item.label}
                checked={settings[item.key]}
                onChange={(v) => setSettings({ ...settings, [item.key]: v })}
              />
            ))}
          </div>

          <div className="mt-5">
            <button
              onClick={handleSaveSettings}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <FiCheck className="w-5 h-5" />
              Simpan Pengaturan
            </button>
          </div>
        </div>

        {/* Test Email */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
              <FiSettings className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Test Email</h2>
          </div>

          <form onSubmit={handleSendTestEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Tujuan Test
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending || !testEmail}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Kirim Test Email
                </>
              )}
            </button>
          </form>
        </div>

        {/* Email Templates */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
              <FiAlertCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-gray-800">Template Email</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {emailTemplates.map((template) => (
              <div 
                key={template.name} 
                className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handlePreviewTemplate(template.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center text-white shadow-md`}>
                    <span className="text-lg">{template.icon}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{template.name}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1">
                  Preview <FiChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && selectedTemplate && (
          <Modal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            title="Preview Email Template"
            subtitle="Preview tampilan email"
            size="lg"
            headerClassName="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          >
            <div className="space-y-3">
              {/* Subject */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Subject Email</label>
                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm font-bold text-gray-800">{selectedTemplate.subject}</p>
                </div>
              </div>

              {/* Email Body */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Isi Email</label>
                <div className="p-3 bg-white rounded-lg border-2 border-gray-200 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedTemplate.body}
                  </pre>
                </div>
              </div>

              {/* Note */}
              <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ℹ️ <strong>Catatan:</strong> Teks dalam kurung siku [ ] akan diganti dengan data otomatis.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-3 border-t">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all font-semibold text-sm shadow-md"
              >
                Tutup Preview
              </button>
            </div>
          </Modal>
        )}

        {/* Setup Instructions */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
            <span className="text-base">📝</span>
            Setup Firebase Cloud Functions
          </h3>
          <ol className="space-y-1.5 text-xs text-blue-800">
            {[
              { step: 1, text: 'Install Firebase CLI:', code: 'npm install -g firebase-tools' },
              { step: 2, text: 'Login:', code: 'firebase login' },
              { step: 3, text: 'Install dependencies:', code: 'cd functions && npm install' },
              { step: 4, text: 'Setup environment variables untuk SendGrid/Gmail' },
              { step: 5, text: 'Deploy:', code: 'firebase deploy --only functions' }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="font-bold text-blue-600 flex-shrink-0">{item.step}.</span>
                <span className="flex-1">
                  {item.text}
                  {item.code && (
                    <code className="block mt-1 bg-blue-100 px-2 py-1 rounded text-blue-700 font-mono text-xs inline-block">
                      {item.code}
                    </code>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AdminLayout>
  );
};

// Compact Components
const ToggleRow = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-0">
    <div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const ToggleCard = ({ icon, label, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 transition-all">
    <div className="flex items-center gap-2.5">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default AdminNotifications;
