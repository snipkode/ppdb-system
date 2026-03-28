import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

const USERS_COLLECTION = 'users';

/**
 * Check if user is admin by UID
 * @param {string} uid - User UID
 * @returns {Promise<boolean>}
 */
export const checkIfAdmin = async (uid) => {
  if (!uid) return false;

  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    
    if (!userDoc.exists()) return false;
    
    const userData = userDoc.data();
    const role = userData?.role;
    const active = userData?.active;
    
    // Admin jika role adalah super_admin, admin, atau staff DAN active = true
    const isAdminRole = ['super_admin', 'admin', 'staff'].includes(role);
    return isAdminRole && active !== false;
  } catch (error) {
    console.error('Error checking admin:', error);
    return false;
  }
};

/**
 * Get user data by UID
 * @param {string} uid - User UID
 * @returns {Promise<Object|null>}
 */
export const getUserData = async (uid) => {
  if (!uid) return null;

  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    
    if (!userDoc.exists()) return null;

    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Get admin data by UID (alias for getUserData with role check)
 * @param {string} uid - User UID
 * @returns {Promise<Object|null>}
 */
export const getAdminData = async (uid) => {
  const userData = await getUserData(uid);
  
  if (!userData) return null;
  
  const role = userData?.role;
  const isAdminRole = ['super_admin', 'admin', 'staff'].includes(role);
  
  if (!isAdminRole) return null;
  
  return userData;
};

/**
 * Add admin user (create user document with admin role)
 * @param {Object} adminData - Admin data
 * @param {string} adminData.uid - User UID (from Firebase Auth)
 * @param {string} adminData.email - Admin email
 * @param {string} adminData.name - Admin name
 * @param {string} adminData.role - Admin role (super_admin, admin, staff)
 * @param {string[]} adminData.permissions - Array of permissions
 * @param {string} adminData.photoURL - Profile photo URL
 * @returns {Promise<Object>}
 */
export const addAdmin = async (adminData) => {
  try {
    if (!adminData.uid) {
      return {
        success: false,
        error: 'UID is required. User must sign in first.'
      };
    }

    const userRef = doc(db, USERS_COLLECTION, adminData.uid);
    const userDoc = await getDoc(userRef);

    const existingData = userDoc.exists() ? userDoc.data() : {};

    const admin = {
      ...existingData,
      email: adminData.email?.toLowerCase() || existingData.email,
      name: adminData.name || existingData.name,
      role: adminData.role || 'admin',
      permissions: adminData.permissions || ['read', 'write'],
      active: adminData.active !== undefined ? adminData.active : true,
      photoURL: adminData.photoURL || existingData.photoURL,
      updatedAt: new Date().toISOString()
    };

    // Add createdAt if new user
    if (!existingData.createdAt) {
      admin.createdAt = new Date().toISOString();
    }

    await setDoc(userRef, admin, { merge: true });

    return {
      success: true,
      id: adminData.uid,
      ...admin
    };
  } catch (error) {
    console.error('Error adding admin:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update admin status
 * @param {string} adminId - Admin document ID (UID)
 * @param {boolean} active - Active status
 * @returns {Promise<Object>}
 */
export const updateAdminStatus = async (adminId, active) => {
  try {
    const adminRef = doc(db, USERS_COLLECTION, adminId);
    await updateDoc(adminRef, {
      active,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating admin:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update admin role
 * @param {string} adminId - Admin document ID (UID)
 * @param {string} role - New role
 * @returns {Promise<Object>}
 */
export const updateAdminRole = async (adminId, role) => {
  try {
    const adminRef = doc(db, USERS_COLLECTION, adminId);
    await updateDoc(adminRef, {
      role,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating admin role:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get all admins (users with admin role)
 * @returns {Promise<Array>}
 */
export const getAllAdmins = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));

    const admins = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(user => ['super_admin', 'admin', 'staff'].includes(user.role));

    return admins;
  } catch (error) {
    console.error('Error getting all admins:', error);
    return [];
  }
};

/**
 * Get all users (for admin management)
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};

/**
 * Update user role (for super admin only)
 * @param {string} userId - User document ID (UID)
 * @param {string} role - New role
 * @returns {Promise<Object>}
 */
export const updateUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      role,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  checkIfAdmin,
  getUserData,
  getAdminData,
  addAdmin,
  updateAdminStatus,
  updateAdminRole,
  getAllAdmins,
  getAllUsers,
  updateUserRole
};
