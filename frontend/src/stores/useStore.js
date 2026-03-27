import { create } from 'zustand';

export const useStudentStore = create((set) => ({
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  
  setStudents: (students) => set({ students }),
  setCurrentStudent: (student) => set({ currentStudent: student }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),
  
  updateStudent: (updatedStudent) => set((state) => ({
    students: state.students.map(s => 
      s.id === updatedStudent.id ? updatedStudent : s
    )
  })),
  
  removeStudent: (id) => set((state) => ({
    students: state.students.filter(s => s.id !== id)
  })),
}));

export const useStatsStore = create((set) => ({
  stats: null,
  loading: false,
  
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
}));

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  currentView: 'home',
  notification: null,
  
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  
  setCurrentView: (view) => set({ currentView: view }),
  
  showNotification: (message, type = 'success') => {
    set({ notification: { message, type } });
    setTimeout(() => set({ notification: null }), 3000);
  },
  
  hideNotification: () => set({ notification: null }),
}));
