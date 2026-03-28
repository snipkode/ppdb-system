import { useState, useEffect } from 'react';
import { FiPlus, FiCheck, FiX, FiShield, FiUsers, FiEdit2 } from 'react-icons/fi';
import { getAllAdmins, updateAdminStatus, updateUserRole, getAllUsers } from '@/services/adminService';
import { useAuth } from '@/contexts/AuthContext';

const ManageAdmins = () => {
  const { user, isAdmin: isCurrentUserAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    role: 'admin',
    permissions: ['read', 'write']
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('admins'); // 'admins' or 'all-users'

  useEffect(() => {
    loadAdmins();
    loadAllUsers();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    const data = await getAllAdmins();
    setAdmins(data);
    setLoading(false);
  };

  const loadAllUsers = async () => {
    const data = await getAllUsers();
    setAllUsers(data);
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Cari user dengan email yang sesuai
    const targetUser = allUsers.find(u => u.email?.toLowerCase() === newAdmin.email.toLowerCase());

    if (!targetUser) {
      setMessage({
        type: 'error',
        text: '❌ User dengan email tersebut tidak ditemukan. User harus login terlebih dahulu.'
      });
      return;
    }

    // Update role user tersebut
    const result = await updateUserRole(targetUser.id, newAdmin.role);

    if (result.success) {
      setMessage({
        type: 'success',
        text: '✅ User berhasil dijadikan admin!'
      });
      setShowAddModal(false);
      setNewAdmin({ email: '', role: 'admin', permissions: ['read', 'write'] });
      loadAdmins();
      loadAllUsers();
    } else {
      setMessage({
        type: 'error',
        text: '❌ Gagal menambahkan admin: ' + result.error
      });
    }
  };

  const handleToggleStatus = async (adminId, currentStatus) => {
    const newStatus = !currentStatus;
    const result = await updateAdminStatus(adminId, newStatus);

    if (result.success) {
      setMessage({
        type: 'success',
        text: newStatus ? '✅ Admin diaktifkan!' : '⏸️ Admin dinonaktifkan!'
      });
      loadAdmins();
      loadAllUsers();
    } else {
      setMessage({
        type: 'error',
        text: '❌ Gagal update status'
      });
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    const result = await updateUserRole(userId, newRole);

    if (result.success) {
      setMessage({
        type: 'success',
        text: '✅ Role berhasil diupdate!'
      });
      loadAdmins();
      loadAllUsers();
      setShowUserModal(false);
    } else {
      setMessage({
        type: 'error',
        text: '❌ Gagal update role: ' + result.error
      });
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Manage Admins</h1>
              <p className="text-sm text-slate-500">Kelola akses admin sistem PPDB</p>
            </div>
          </div>

          {/* Current User Info */}
          {user && (
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
              <div className="flex items-center gap-3">
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-slate-800">{user.displayName}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                {user.role && (
                  <span className={`ml-auto px-3 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'super_admin' 
                      ? 'bg-purple-100 text-purple-700'
                      : user.role === 'admin'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'admins'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FiShield className="inline w-4 h-4 mr-2" />
            Admins ({admins.length})
          </button>
          <button
            onClick={() => setActiveTab('all-users')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'all-users'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FiUsers className="inline w-4 h-4 mr-2" />
            All Users ({allUsers.length})
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<FiUsers />}
            label="Total Admin"
            value={admins.length}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={<FiCheck />}
            label="Aktif"
            value={admins.filter(a => a.active !== false).length}
            color="from-green-500 to-emerald-500"
          />
          <StatCard
            icon={<FiShield />}
            label="Super Admin"
            value={admins.filter(a => a.role === 'super_admin').length}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<FiUsers />}
            label="Total Users"
            value={allUsers.length}
            color="from-orange-500 to-amber-500"
          />
        </div>

        {/* Add Admin Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
          >
            <FiPlus className="w-5 h-5" />
            Jadikan User Sebagai Admin
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'admins' ? (
          /* Admin List */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-slate-600">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                        Belum ada admin. Klik "Jadikan User Sebagai Admin" untuk memulai.
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                              {admin.name?.charAt(0) || admin.email?.charAt(0) || 'A'}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{admin.name || 'N/A'}</p>
                              <p className="text-sm text-slate-500">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-700'
                              : admin.role === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {admin.permissions?.map((perm, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.active !== false
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {admin.active !== false ? '✓ Aktif' : '✗ Nonaktif'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleStatus(admin.id, admin.active !== false)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                admin.active !== false
                                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                            >
                              {admin.active !== false ? 'Nonaktifkan' : 'Aktifkan'}
                            </button>
                            <button
                              onClick={() => openUserModal(admin)}
                              className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* All Users List */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                        Belum ada user
                      </td>
                    </tr>
                  ) : (
                    allUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="font-semibold text-slate-800">{user.name || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-700'
                              : user.role === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : user.role === 'staff'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openUserModal(user)}
                            className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                          >
                            <FiEdit2 className="inline w-4 h-4 mr-1" />
                            Edit Role
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Jadikan User Sebagai Admin</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email User
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="user@smk.sch.id"
                    required
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    💡 User harus sudah pernah login agar terdaftar di database
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Jadikan Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Role Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Edit Role User</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <img src={selectedUser.photoURL} alt={selectedUser.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-800">{selectedUser.name || 'N/A'}</p>
                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role
                  </label>
                  <select
                    value={selectedUser.role || 'user'}
                    onChange={(e) => handleUpdateRole(selectedUser.id, e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="user">User (Tidak ada akses admin)</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleStatus(selectedUser.id, selectedUser.active !== false);
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                    selectedUser.active !== false
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {selectedUser.active !== false ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl p-4 shadow-md">
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <p className="text-xs text-slate-500">{label}</p>
  </div>
);

export default ManageAdmins;
