import { useState, useEffect } from 'react';
import { FiMail, FiBell, FiSend, FiCheck, FiX, FiSettings } from 'react-icons/fi';
import { notificationAPI } from '@services/api';

const AdminNotifications = () => {
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
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

  // Load settings on mount
  useEffect(() => {
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
    loadSettings();
  }, []);

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    if (!testEmail) return;

    setSending(true);
    setResult(null);

    try {
      const response = await notificationAPI.sendTestEmail(testEmail);

      setResult({
        success: true,
        message: response.message
      });
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.details || error.message
      });
    } finally {
      setSending(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await notificationAPI.updateSettings(settings);
      alert('Settings saved successfully');
    } catch (error) {
      alert('Failed to save settings: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiBell className="w-7 h-7 text-blue-600" />
            Pengaturan Notifikasi
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola pengaturan email dan notifikasi sistem
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiMail className="w-5 h-5" />
            Pengaturan Email
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-800">Aktifkan Email</p>
                <p className="text-sm text-gray-600">Kirim email otomatis untuk setiap event</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailEnabled}
                  onChange={(e) => setSettings({ ...settings, emailEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-800">Notifikasi In-App</p>
                <p className="text-sm text-gray-600">Tampilkan notifikasi bell di aplikasi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Email Triggers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiSend className="w-5 h-5" />
            Trigger Email Otomatis
          </h2>

          <div className="space-y-3">
            {[
              { key: 'sendOnRegistration', label: 'Pendaftaran Baru', desc: 'Email konfirmasi saat siswa mendaftar' },
              { key: 'sendOnPaymentVerified', label: 'Pembayaran Diverifikasi', desc: 'Email saat pembayaran diverifikasi admin' },
              { key: 'sendOnPaymentRejected', label: 'Pembayaran Ditolak', desc: 'Email saat pembayaran ditolak' },
              { key: 'sendOnExamSchedule', label: 'Jadwal Ujian', desc: 'Email jadwal ujian ke siswa' },
              { key: 'sendOnAcceptance', label: 'Diterima', desc: 'Email selamat saat siswa diterima' },
              { key: 'sendOnRejection', label: 'Ditolak', desc: 'Email penolakan saat siswa tidak lulus' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2"
            >
              <FiCheck className="w-4 h-4" />
              Simpan Pengaturan
            </button>
          </div>
        </div>

        {/* Test Email */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiSettings className="w-5 h-5" />
            Test Email
          </h2>

          <form onSubmit={handleSendTestEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Tujuan Test
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending || !testEmail}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          {result && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                result.success
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {result.success ? (
                <FiCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <FiX className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{result.message}</p>
            </div>
          )}
        </div>

        {/* Email Templates Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Template Email</h2>
          
          <div className="space-y-3">
            {[
              'Pendaftaran Berhasil',
              'Pembayaran Diverifikasi',
              'Pembayaran Ditolak',
              'Jadwal Ujian',
              'Diterima',
              'Ditolak'
            ].map((template, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-800">{template}</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Preview
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">📝 Setup Firebase Cloud Functions</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Install Firebase CLI: <code className="bg-blue-100 px-2 py-0.5 rounded">npm install -g firebase-tools</code></span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>Login: <code className="bg-blue-100 px-2 py-0.5 rounded">firebase login</code></span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Install dependencies: <code className="bg-blue-100 px-2 py-0.5 rounded">cd functions && npm install</code></span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Setup environment variables untuk SendGrid/Gmail</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">5.</span>
              <span>Deploy: <code className="bg-blue-100 px-2 py-0.5 rounded">firebase deploy --only functions</code></span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
