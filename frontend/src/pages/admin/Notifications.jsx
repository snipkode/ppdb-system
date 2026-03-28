import { useState, useEffect } from 'react';
import { FiMail, FiBell, FiSend, FiCheck, FiX, FiSettings, FiAlertCircle } from 'react-icons/fi';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6">
      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FiBell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Notifikasi</h1>
              <p className="text-xs text-gray-600">Pengaturan email & notifikasi sistem</p>
            </div>
          </div>
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
          <StatBox 
            label="Email Aktif" 
            value={settings.emailEnabled ? 'Ya' : 'Tidak'} 
            color={settings.emailEnabled ? 'from-green-500 to-emerald-500' : 'from-gray-500'}
          />
          <StatBox 
            label="Notifikasi" 
            value={settings.notificationsEnabled ? 'Aktif' : 'Nonaktif'} 
            color={settings.notificationsEnabled ? 'from-blue-500 to-cyan-500' : 'from-gray-500'}
          />
          <StatBox 
            label="Total Triggers" 
            value={Object.values(settings).filter(v => v === true).length - 2} 
            color="from-purple-500 to-pink-500"
          />
          <StatBox 
            label="Status" 
            value="Ready" 
            color="from-orange-500 to-red-500"
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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

          <div className="grid md:grid-cols-2 gap-2">
            {[
              'Pendaftaran Berhasil',
              'Pembayaran Diverifikasi',
              'Pembayaran Ditolak',
              'Jadwal Ujian',
              'Diterima',
              'Ditolak'
            ].map((template, index) => (
              <div key={index} className="flex items-center justify-between py-2.5 px-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 transition-all">
                <span className="text-sm font-medium text-gray-700">{template}</span>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold">
                  Preview →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm">
            <span className="text-base">📝</span>
            Setup Firebase Cloud Functions
          </h3>
          <ol className="space-y-2 text-xs text-blue-800">
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
    </div>
  );
};

// Compact Components
const StatBox = ({ label, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-3 border border-white/50">
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2`}>
      <FiCheck className="w-4 h-4" />
    </div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <p className="text-sm font-bold text-gray-800">{value}</p>
  </div>
);

const ToggleRow = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0">
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
