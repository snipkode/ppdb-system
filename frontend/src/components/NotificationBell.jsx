import { useState, useEffect } from 'react';
import { FiBell, FiX, FiCheck, FiAlertCircle, FiInfo, FiMail } from 'react-icons/fi';
import { collection, query, where, orderBy, limit, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase';

/**
 * In-App Notification System
 * Displays notifications for students and admin
 */

const NotificationBell = ({ userId, userType = 'student' }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      
      const snapshot = await getDocs(q);
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const notifRef = doc(db, 'notifications', notificationId);
      await updateDoc(notifRef, { read: true });
      
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter(n => !n.read);
      const promises = unreadNotifs.map(n =>
        updateDoc(doc(db, 'notifications', n.id), { read: true })
      );
      await Promise.all(promises);
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <FiAlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <FiX className="w-5 h-5 text-red-500" />;
      case 'info':
        return <FiInfo className="w-5 h-5 text-blue-500" />;
      case 'email':
        return <FiMail className="w-5 h-5 text-purple-500" />;
      default:
        return <FiBell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    return `${diffInDays} hari yang lalu`;
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Notifikasi</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Tandai semua dibaca
                </button>
              )}
            </div>

            {/* Notifications List */}
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-600 text-sm mt-2">Memuat notifikasi...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <FiBell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Belum ada notifikasi</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      notification.read ? 'opacity-60' : ''
                    } ${getNotificationColor(notification.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Menampilkan {notifications.length} notifikasi
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
