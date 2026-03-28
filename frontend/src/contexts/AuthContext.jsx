import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/services/firebase';
import { checkIfAdmin, getUserData } from '@/services/adminService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Auto create/update user document on login
  const createUserDocument = async (currentUser) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      const userData = {
        uid: currentUser.uid,
        email: currentUser.email?.toLowerCase(),
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
        provider: currentUser.providerData[0]?.providerId,
        role: userSnap.exists() ? userSnap.data().role : 'user', // Preserve existing role
        permissions: userSnap.exists() ? userSnap.data().permissions : ['read'],
        active: userSnap.exists() ? userSnap.data().active : true,
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Only set createdAt if new user
      if (!userSnap.exists()) {
        userData.createdAt = serverTimestamp();
      }

      await setDoc(userRef, userData, { merge: true });

      return userData;
    } catch (error) {
      console.error('Error creating user document:', error);
      return null;
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Auto create/update user document
        await createUserDocument(currentUser);

        // Check if user is admin from Firestore (using UID)
        const isAdminUser = await checkIfAdmin(currentUser.uid);
        const userInfo = await getUserData(currentUser.uid);

        setIsAdmin(isAdminUser);
        setUserData(userInfo);

        setUser({
          ...currentUser,
          isAdmin: isAdminUser,
          role: userInfo?.role || 'user',
          userData: userInfo
        });
      } else {
        setUser(null);
        setIsAdmin(false);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);

      // Auto create user document
      await createUserDocument(result.user);

      // Check admin status after sign in (using UID)
      const isAdminUser = await checkIfAdmin(result.user.uid);
      const userInfo = await getUserData(result.user.uid);

      return {
        success: true,
        user: {
          ...result.user,
          isAdmin: isAdminUser,
          role: userInfo?.role || 'user',
          userData: userInfo
        }
      };
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      let errorMessage = 'Gagal login dengan Google';

      // Handle specific errors
      if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Google Sign-In belum dikonfigurasi. Silakan gunakan email/password.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login dibatalkan';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Email sudah terdaftar dengan metode lain';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid';
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setIsAdmin(false);
      setUserData(null);
      return { success: true };
    } catch (err) {
      console.error('Logout Error:', err);
      const errorMessage = 'Gagal logout';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    isAdmin,
    userData,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
