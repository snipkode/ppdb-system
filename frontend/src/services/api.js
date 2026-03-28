import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'students';

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

  create: async (studentData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        nama_lengkap: studentData.nama_lengkap || '',
        nisn: studentData.nisn || '',
        tanggal_lahir: studentData.tanggal_lahir || '',
        jenis_kelamin: studentData.jenis_kelamin || '',
        agama: studentData.agama || '',
        alamat: studentData.alamat || '',
        kota: studentData.kota || '',
        provinsi: studentData.provinsi || '',
        kode_pos: studentData.kode_pos || '',
        nama_ortu: studentData.nama_ortu || '',
        no_telp_ortu: studentData.no_telp_ortu || '',
        email_ortu: studentData.email_ortu || '',
        asal_sekolah: studentData.asal_sekolah || '',
        jurusan_dipilih: studentData.jurusan_dipilih || '',
        tanggal_daftar: new Date().toISOString().split('T')[0],
        status: 'pending',
        keterangan: studentData.keterangan || ''
      });
      
      return { 
        success: true, 
        data: { 
          id: docRef.id, 
          message: 'Pendaftaran berhasil!' 
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  update: async (studentData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, studentData.id);
      await updateDoc(docRef, studentData);
      
      return { success: true, message: 'Data updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      
      return { success: true, message: 'Student deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export const statsApi = {
  getStats: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      
      const stats = {
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
        byGender: { L: 0, P: 0 },
        byMajor: {}
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;
        
        const status = data.status;
        const gender = data.jenis_kelamin;
        const major = data.jurusan_dipilih;

        if (status === 'pending') stats.pending++;
        else if (status === 'accepted') stats.accepted++;
        else if (status === 'rejected') stats.rejected++;

        if (gender === 'L') stats.byGender.L++;
        else if (gender === 'P') stats.byGender.P++;

        if (major) {
          stats.byMajor[major] = (stats.byMajor[major] || 0) + 1;
        }
      });

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default { db };
