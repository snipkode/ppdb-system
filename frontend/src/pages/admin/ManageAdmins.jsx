import { useState, useEffect } from 'react';
import { FiPlus, FiCheck, FiX, FiShield, FiUsers, FiEdit2, FiSearch, FiMoreVertical } from 'react-icons/fi';
import { getAllAdmins, updateAdminStatus, updateUserRole, getAllUsers } from '@/services/adminService';
import { useAuth } from '@/contexts/AuthContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import StatCard from '@/components/ui/StatCard';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SearchFilter from '@/components/ui/SearchFilter';

const ManageAdmins = () => {
  const { user, isAdmin: isCurrentUserAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ email: '', role: 'admin' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('admins');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenuId, setShowMenuId] = useState(null);

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
    const targetUser = allUsers.find(u => u.email?.toLowerCase() === newAdmin.email.toLowerCase());

    if (!targetUser) {
      setMessage({ type: 'error', text: 'User tidak ditemukan. User harus login dulu.' });
      return;
    }

    const result = await updateUserRole(targetUser.id, newAdmin.role);
    if (result.success) {
      setMessage({ type: 'success', text: '✅ User jadi admin!' });
      setShowAddModal(false);
      setNewAdmin({ email: '', role: 'admin' });
      loadAdmins();
      loadAllUsers();
    } else {
      setMessage({ type: 'error', text: 'Gagal: ' + result.error });
    }
  };

  const handleToggleStatus = async (adminId, currentStatus) => {
    const result = await updateAdminStatus(adminId, !currentStatus);
    if (result.success) {
      setMessage({ type: 'success', text: currentStatus ? 'Dinonaktifkan' : 'Diaktifkan' });
      loadAdmins();
      loadAllUsers();
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    const result = await updateUserRole(userId, newRole);
    if (result.success) {
      setMessage({ type: 'success', text: 'Role updated!' });
      setShowUserModal(false);
      loadAdmins();
      loadAllUsers();
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = allUsers.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: admins.length,
    active: admins.filter(a => a.active).length,
    superAdmin: admins.filter(a => a.role === 'super_admin').length,
    admin: admins.filter(a => a.role === 'admin').length
  };

  return (
    <AdminLayout title="Kelola Admin" subtitle="Manage users & permissions">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumb showHome={false} items={[{ label: 'Kelola Admin', href: '/admin/manage-admins' }]} />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Kelola Admin</h1>
              <p className="text-xs md:text-sm text-white/90">Manage users & permissions</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FiShield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.total} color="from-blue-500 to-cyan-500" icon={<FiUsers />} size="md" />
          <StatCard label="Aktif" value={stats.active} color="from-green-500 to-emerald-500" icon={<FiCheck />} size="md" />
          <StatCard label="Super" value={stats.superAdmin} color="from-purple-500 to-pink-500" icon={<FiShield />} size="md" />
          <StatCard label="Admin" value={stats.admin} color="from-orange-500 to-red-500" icon={<FiUsers />} size="md" />
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="container mx-auto px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'admins'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admins ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('all-users')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'all-users'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Users ({allUsers.length})
            </button>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari email atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className="container mx-auto px-4 mt-4">
          <div className={`p-3 rounded-lg text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        </div>
      )}

      {/* Content List */}
      <div className="container mx-auto px-4 mt-4 mb-8">
        {loading ? (
          <LoadingState message="Memuat data..." />
        ) : activeTab === 'admins' ? (
          <div className="space-y-2">
            {filteredAdmins.length === 0 ? (
              <EmptyState 
                type="noAdmins"
                title={searchTerm ? 'Admin Tidak Ditemukan' : 'Belum Ada Admin'}
                message={searchTerm 
                  ? `Tidak ada admin yang cocok dengan "${searchTerm}"`
                  : 'Tambahkan admin pertama Anda untuk mengelola sistem PPDB'
                }
                actionLabel={!searchTerm ? 'Tambah Admin' : null}
                onAction={!searchTerm ? () => setShowAddModal(true) : () => setSearchTerm('')}
              />
            ) : (
              filteredAdmins.map((admin) => (
                <AdminCard
                  key={admin.id}
                  admin={admin}
                  onToggleStatus={handleToggleStatus}
                  onEdit={() => {
                    setSelectedUser(admin);
                    setShowUserModal(true);
                  }}
                  showMenu={showMenuId === admin.id}
                  onToggleMenu={() => setShowMenuId(showMenuId === admin.id ? null : admin.id)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.length === 0 ? (
              <EmptyState 
                type="noStudents"
                title={searchTerm ? 'User Tidak Ditemukan' : 'Belum Ada User'}
                message={searchTerm 
                  ? `Tidak ada user yang cocok dengan "${searchTerm}"`
                  : 'User akan muncul ketika sudah ada yang login ke sistem'
                }
                actionLabel={searchTerm ? 'Reset Pencarian' : null}
                onAction={searchTerm ? () => setSearchTerm('') : null}
              />
            ) : (
              filteredUsers.map((userItem) => (
                <UserCard
                  key={userItem.id}
                  user={userItem}
                  onMakeAdmin={() => {
                    setSelectedUser(userItem);
                    setNewAdmin({ ...newAdmin, email: userItem.email });
                    setShowAddModal(true);
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Jadikan Admin</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email User</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  Batal
                </button>
                <button type="submit" className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg text-sm font-medium">
                  Set Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Edit Admin</h2>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {selectedUser.name?.charAt(0) || selectedUser.email?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{selectedUser.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{selectedUser.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Role</label>
                <select
                  defaultValue={selectedUser.role}
                  onChange={(e) => handleUpdateRole(selectedUser.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <button
                  onClick={() => handleToggleStatus(selectedUser.id, selectedUser.active)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedUser.active
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {selectedUser.active ? '✓ Aktif' : '✗ Nonaktif'}
                </button>
              </div>

              <button onClick={() => setShowUserModal(false)} className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium mt-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Compact Admin Card
const AdminCard = ({ admin, onToggleStatus, onEdit, showMenu, onToggleMenu }) => (
  <div className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
    admin.active ? 'border-transparent hover:border-purple-200' : 'border-red-200 bg-red-50'
  }`}>
    <div className="p-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0 ${
          admin.role === 'super_admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
          : admin.role === 'admin' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
          : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
        }`}>
          {admin.name?.charAt(0) || admin.email?.charAt(0) || 'A'}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-gray-800 text-sm md:text-base truncate">{admin.name || 'User'}</p>
            {admin.role === 'super_admin' && (
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">Super</span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">{admin.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              admin.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {admin.active ? '✓ Aktif' : '✗ Nonaktif'}
            </span>
            <span className="text-xs text-gray-500">{admin.role}</span>
          </div>
        </div>

        {/* Menu Button */}
        <button onClick={onToggleMenu} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FiMoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
          <button
            onClick={onToggleStatus}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              admin.active
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {admin.active ? 'Nonaktifkan' : 'Aktifkan'}
          </button>
          <button
            onClick={onEdit}
            className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-xs font-semibold"
          >
            Edit Role
          </button>
        </div>
      )}
    </div>
  </div>
);

// Compact User Card
const UserCard = ({ user, onMakeAdmin }) => (
  <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
      {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-800 text-sm md:text-base truncate">{user.name || 'User'}</p>
      <p className="text-xs text-gray-500 truncate">{user.email}</p>
      <p className="text-xs text-gray-400 mt-0.5">Role: {user.role || 'user'}</p>
    </div>
    <button
      onClick={onMakeAdmin}
      className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg text-xs font-semibold"
    >
      Set Admin
    </button>
  </div>
);

export default ManageAdmins;
