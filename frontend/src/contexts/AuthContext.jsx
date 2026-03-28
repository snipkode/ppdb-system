import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '@/services/firebase';

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

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      let errorMessage = 'Gagal login dengan Google';
      
      // Handle specific errors
      if (err.code === 'auth/popup-closed-by-user') {
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
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.email?.endsWith('@smk.sch.id') // Optional: admin check
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
