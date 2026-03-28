import { useState, useEffect, useCallback } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiSave, FiX, FiCamera, FiShield, FiBell, FiLogOut, FiClock } from 'react-icons/fi';
import { useAuthStore } from '@/stores/useAuthStore';

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    telepon: '',
    alamat: '',
    tanggal_lahir: '',
    tempat_lahir: '',
    jenis_kelamin: 'L',
    foto_profile: ''
  });

  useEffect(() => {
    // Load user data
    if (user) {
      const newFormData = {
        nama_lengkap: user.data_siswa?.nama_lengkap || user.displayName || '',
        email: user.data_siswa?.email || user.email || '',
        telepon: user.data_siswa?.telepon || '',
        alamat: user.data_siswa?.alamat || '',
        tanggal_lahir: user.data_siswa?.tanggal_lahir || '',
        tempat_lahir: user.data_siswa?.tempat_lahir || '',
        jenis_kelamin: user.data_siswa?.jenis_kelamin || 'L',
        foto_profile: user.data_siswa?.foto_profile || ''
      };
      // Use setTimeout to avoid setState in effect
      setTimeout(() => setFormData(newFormData), 0);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile berhasil diupdate!');
    } catch (error) {
      alert('Gagal update profile: ' + error.message);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil Saya', icon: FiUser },
    { id: 'security', label: 'Keamanan', icon: FiShield },
    { id: 'notifications', label: 'Notifikasi', icon: FiBell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">Kelola informasi pribadi dan pengaturan akun Anda</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-modern p-6 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}

              {/* User Info Card */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="relative inline-block mb-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto">
                      {formData.foto_profile || previewImage ? (
                        <img src={previewImage || formData.foto_profile} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        formData.nama_lengkap?.charAt(0) || 'U'
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                        <FiCamera className="w-4 h-4 text-white" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{formData.nama_lengkap || 'User'}</h3>
                  <p className="text-sm text-gray-500">{formData.email || 'email@example.com'}</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <FiLogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card-modern p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Informasi Pribadi</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isEditing
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <FiSave className="w-4 h-4" />
                        <span>Simpan</span>
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      label="Nama Lengkap"
                      name="nama_lengkap"
                      value={formData.nama_lengkap}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={FiUser}
                      required
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={FiMail}
                      required
                    />
                    <FormField
                      label="Nomor Telepon"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={FiPhone}
                    />
                    <FormField
                      label="Tempat Lahir"
                      name="tempat_lahir"
                      value={formData.tempat_lahir}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={FiMapPin}
                    />
                    <FormField
                      label="Tanggal Lahir"
                      name="tanggal_lahir"
                      type="date"
                      value={formData.tanggal_lahir}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      icon={FiCalendar}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                      <div className="flex gap-4">
                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.jenis_kelamin === 'L'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          <input
                            type="radio"
                            name="jenis_kelamin"
                            value="L"
                            checked={formData.jenis_kelamin === 'L'}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="hidden"
                          />
                          <span className="font-medium">Laki-laki</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.jenis_kelamin === 'P'
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          <input
                            type="radio"
                            name="jenis_kelamin"
                            value="P"
                            checked={formData.jenis_kelamin === 'P'}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="hidden"
                          />
                          <span className="font-medium">Perempuan</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="4"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        !isEditing
                          ? 'bg-slate-50 border-slate-200 text-gray-500'
                          : 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      } outline-none`}
                      placeholder="Masukkan alamat lengkap Anda"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4 border-t">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Simpan Perubahan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 text-gray-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                      >
                        <FiX className="w-5 h-5" />
                        Batal
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <SecurityTab />
            )}

            {activeTab === 'notifications' && (
              <NotificationsTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, disabled, icon: Icon, type = 'text', required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all ${
          disabled
            ? 'bg-slate-50 border-slate-200 text-gray-500'
            : 'bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
        } outline-none`}
        placeholder={label}
      />
    </div>
  </div>
);

const SecurityTab = () => {
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) {
      alert('Password konfirmasi tidak cocok!');
      return;
    }
    if (passwords.new_password.length < 8) {
      alert('Password minimal 8 karakter!');
      return;
    }
    alert('Password berhasil diubah!');
    setPasswords({ current_password: '', new_password: '', confirm_password: '' });
  };

  return (
    <div className="card-modern p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Keamanan Akun</h2>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FiShield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Tips Password Kuat</h3>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Minimal 8 karakter</li>
                <li>• Gunakan kombinasi huruf, angka, dan simbol</li>
                <li>• Jangan gunakan informasi pribadi</li>
                <li>• Ganti password secara berkala</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordField
            label="Password Saat Ini"
            value={passwords.current_password}
            onChange={(e) => setPasswords(prev => ({ ...prev, current_password: e.target.value }))}
            required
          />
          <PasswordField
            label="Password Baru"
            value={passwords.new_password}
            onChange={(e) => setPasswords(prev => ({ ...prev, new_password: e.target.value }))}
            required
          />
          <PasswordField
            label="Konfirmasi Password Baru"
            value={passwords.confirm_password}
            onChange={(e) => setPasswords(prev => ({ ...prev, confirm_password: e.target.value }))}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
          >
            Ubah Password
          </button>
        </form>

        <div className="pt-6 border-t">
          <h3 className="font-semibold text-slate-800 mb-4">Autentikasi Dua Faktor</h3>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">2FA (Coming Soon)</p>
              <p className="text-sm text-gray-500">Tambahkan lapisan keamanan ekstra</p>
            </div>
            <button className="px-4 py-2 bg-slate-200 text-gray-500 rounded-lg cursor-not-allowed" disabled>
              Nonaktif
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordField = ({ label, value, onChange, required }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
          placeholder={label}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? '👁️' : '👁️‍🗨️'}
        </button>
      </div>
    </div>
  );
};

const NotificationsTab = () => {
  const [settings, setSettings] = useState({
    email_notifications: true,
    payment_updates: true,
    exam_reminders: true,
    announcement_alerts: true,
    weekly_digest: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="card-modern p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Pengaturan Notifikasi</h2>

      <div className="space-y-4">
        <NotificationToggle
          icon={FiMail}
          title="Email Notifications"
          description="Terima notifikasi via email"
          checked={settings.email_notifications}
          onChange={() => toggleSetting('email_notifications')}
          gradient="from-blue-500 to-cyan-500"
        />
        <NotificationToggle
          icon={FiBell}
          title="Payment Updates"
          description="Notifikasi status pembayaran"
          checked={settings.payment_updates}
          onChange={() => toggleSetting('payment_updates')}
          gradient="from-green-500 to-emerald-500"
        />
        <NotificationToggle
          icon={FiCalendar}
          title="Exam Reminders"
          description="Pengingat jadwal ujian"
          checked={settings.exam_reminders}
          onChange={() => toggleSetting('exam_reminders')}
          gradient="from-purple-500 to-pink-500"
        />
        <NotificationToggle
          icon={FiShield}
          title="Announcement Alerts"
          description="Pengumuman penting dari sekolah"
          checked={settings.announcement_alerts}
          onChange={() => toggleSetting('announcement_alerts')}
          gradient="from-orange-500 to-red-500"
        />
        <NotificationToggle
          icon={FiClock}
          title="Weekly Digest"
          description="Ringkasan mingguan aktivitas"
          checked={settings.weekly_digest}
          onChange={() => toggleSetting('weekly_digest')}
          gradient="from-indigo-500 to-blue-500"
        />
      </div>

      <div className="mt-8 pt-6 border-t">
        <button
          onClick={() => alert('Settings saved!')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
        >
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
};

const NotificationToggle = ({ icon: IconComp, title, description, checked, onChange, gradient }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
        <IconComp className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default Profile;
