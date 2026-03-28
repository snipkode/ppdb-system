import { create } from 'zustand';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  error: null,

  // Initialize auth listener
  initAuth: () => {
    return onAuthStateChanged(auth, (user) => {
      set({ 
        user: user || null,
        loading: false 
      });
    });
  },

  // Login
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ 
        user: userCredential.user,
        loading: false 
      });
      return { success: true, user: userCredential.user };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false 
      });
      return { success: false, error: error.message };
    }
  },

  // Register
  register: async (email, password, displayName) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      if (displayName) {
        await updateFirebaseProfile(userCredential.user, {
          displayName
        });
      }
      
      set({ 
        user: userCredential.user,
        loading: false 
      });
      return { success: true, user: userCredential.user };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false 
      });
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await signOut(auth);
      set({ 
        user: null,
        loading: false 
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false 
      });
      return { success: false, error: error.message };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const { user } = get();
      if (!user) {
        throw new Error('No user logged in');
      }

      set({ loading: true, error: null });

      // Update Firebase profile
      if (profileData.nama_lengkap) {
        await updateFirebaseProfile(user, {
          displayName: profileData.nama_lengkap
        });
      }

      // Update local user state
      set({ 
        user: { ...user, ...profileData },
        loading: false 
      });

      return { success: true };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false 
      });
      return { success: false, error: error.message };
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Set loading
  setLoading: (loading) => set({ loading }),
}));
