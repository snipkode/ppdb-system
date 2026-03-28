import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION_NAME = 'students';

// Firebase-based Student API
export const studentApi = {
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, data: students };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Student not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getByNomorPendaftaran: async (nomor) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('nomor_pendaftaran', '==', nomor)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Nomor pendaftaran tidak ditemukan' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  create: async (data) => {
    try {
      // Generate nomor pendaftaran
      const timestamp = Date.now();
      const nomorPendaftaran = `PPDB-${timestamp}`;

      const dataToSave = {
        ...data,
        nomor_pendaftaran: nomorPendaftaran,
        status: 'submitted',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), dataToSave);

      return { 
        success: true, 
        data: { id: docRef.id, ...dataToSave, nomor_pendaftaran: nomorPendaftaran },
        message: 'Pendaftaran berhasil'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const dataToUpdate = {
        ...data,
        updated_at: serverTimestamp()
      };

      await updateDoc(docRef, dataToUpdate);

      return { success: true, message: 'Data berhasil diupdate' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return { success: true, message: 'Data berhasil dihapus' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  uploadDocument: async (file, studentId, docType) => {
    try {
      const storageRef = ref(storage, `students/${studentId}/${docType}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Alias for backwards compatibility
export const studentAPI = studentApi;

// Payment API (Firebase version)
export const paymentAPI = {
  uploadProof: async (formData, studentId) => {
    try {
      const file = formData.get('bukti_transfer');
      if (!file) {
        return { success: false, error: 'File bukti transfer tidak ditemukan' };
      }

      const storageRef = ref(storage, `payments/${studentId}/bukti_${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const studentRef = doc(db, COLLECTION_NAME, studentId);
      await updateDoc(studentRef, {
        'pembayaran.bukti_url': downloadURL,
        'pembayaran.status': 'pending',
        'pembayaran.uploaded_at': serverTimestamp(),
        updated_at: serverTimestamp()
      });

      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  verifyPayment: async (studentId, status, rejected_reason = '') => {
    try {
      const studentRef = doc(db, COLLECTION_NAME, studentId);
      const updateData = {
        'pembayaran.status': status,
        'pembayaran.verified_at': serverTimestamp(),
        updated_at: serverTimestamp()
      };

      if (status === 'rejected') {
        updateData['pembayaran.rejected_reason'] = rejected_reason;
      }

      await updateDoc(studentRef, updateData);

      return { success: true, message: 'Pembayaran berhasil diverifikasi' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Notification API (Firebase version)
export const notificationAPI = {
  create: async (data) => {
    try {
      const notificationRef = collection(db, 'notifications');
      const docRef = await addDoc(notificationRef, {
        ...data,
        created_at: serverTimestamp(),
        read: false
      });

      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getByUserId: async (userId) => {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('user_id', '==', userId),
        where('read', '==', false)
      );
      const querySnapshot = await getDocs(q);
      const notifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { success: true, data: notifications };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Document API (Firebase version)
export const documentAPI = {
  upload: async (file, studentId, docType) => {
    try {
      const storageRef = ref(storage, `students/${studentId}/${docType}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Stats API
export const statsApi = {
  getStats: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const students = querySnapshot.docs.map(doc => doc.data());

      const stats = {
        total: students.length,
        pending: students.filter(s => s.status === 'submitted' || s.status === 'pending').length,
        accepted: students.filter(s => s.status === 'accepted').length,
        rejected: students.filter(s => s.status === 'rejected').length,
        exam: students.filter(s => s.status === 'exam').length
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default { studentApi, paymentAPI, notificationAPI, documentAPI, statsApi };
