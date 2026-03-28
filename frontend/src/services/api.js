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
        where("nomor_pendaftaran", "==", nomor)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Student not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  create: async (studentData) => {
    try {
      // Generate nomor pendaftaran
      const timestamp = Date.now();
      const nomorPendaftaran = `PPDB-${timestamp}`;
      
      // Prepare data for Firestore
      const dataToSave = {
        nomor_pendaftaran: nomorPendaftaran,
        data_siswa: {
          nama_lengkap: studentData.nama_lengkap || '',
          nisn: studentData.nisn || '',
          nik: studentData.nik || '',
          tempat_lahir: studentData.tempat_lahir || '',
          tanggal_lahir: studentData.tanggal_lahir || '',
          jenis_kelamin: studentData.jenis_kelamin || 'L',
          agama: studentData.agama || '',
          alamat: studentData.alamat || '',
          rt_rw: studentData.rt_rw || '',
          kelurahan: studentData.kelurahan || '',
          kecamatan: studentData.kecamatan || '',
          kota: studentData.kota || '',
          provinsi: studentData.provinsi || '',
          kode_pos: studentData.kode_pos || '',
          telepon: studentData.telepon || '',
          email: studentData.email || ''
        },
        data_ortu: {
          nama_ayah: studentData.nama_ayah || '',
          pendidikan_ayah: studentData.pendidikan_ayah || '',
          pekerjaan_ayah: studentData.pekerjaan_ayah || '',
          penghasilan_ayah: studentData.penghasilan_ayah || '',
          nama_ibu: studentData.nama_ibu || '',
          pendidikan_ibu: studentData.pendidikan_ibu || '',
          pekerjaan_ibu: studentData.pekerjaan_ibu || '',
          penghasilan_ibu: studentData.penghasilan_ibu || '',
          telepon_ortu: studentData.telepon_ortu || '',
          email_ortu: studentData.email_ortu || ''
        },
        data_sekolah: {
          npsn: studentData.npsn || '',
          nama_sekolah: studentData.nama_sekolah || '',
          alamat_sekolah: studentData.alamat_sekolah || '',
          tahun_lulus: studentData.tahun_lulus || new Date().getFullYear()
        },
        pilihan_jurusan: {
          pilihan_1: studentData.pilihan_1 || '',
          pilihan_2: studentData.pilihan_2 || '',
          diterima_di: null
        },
        dokumen: {},
        status: 'pending',
        status_detail: {
          submitted_at: serverTimestamp(),
          verified_at: null,
          verified_by: null,
          ujian_at: null,
          pengumuman_at: null,
          notes: ''
        },
        pembayaran: {
          status: 'unpaid',
          amount: 0,
          bukti_transfer: null,
          verified_at: null,
          verified_by: null,
          notes: null
        },
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), dataToSave);
      
      return { 
        success: true, 
        data: { 
          id: docRef.id,
          nomor_pendaftaran: nomorPendaftaran,
          message: 'Pendaftaran berhasil!' 
        } 
      };
    } catch (error) {
      console.error('Error creating student:', error);
      return { success: false, error: error.message };
    }
  },

  uploadFile: async (file, studentId, fieldName) => {
    try {
      // Create file reference
      const fileRef = ref(storage, `students/${studentId}/${fieldName}_${file.name}`);
      
      // Upload file
      await uploadBytes(fileRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(fileRef);
      
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  update: async (studentId, studentData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, studentId);
      await updateDoc(docRef, {
        ...studentData,
        updated_at: serverTimestamp()
      });
      
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
        verified: 0,
        ujian: 0,
        accepted: 0,
        rejected: 0,
        byGender: { L: 0, P: 0 },
        byMajor: {}
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;
        
        const status = data.status;
        const gender = data.data_siswa?.jenis_kelamin;
        const major = data.pilihan_jurusan?.pilihan_1;

        if (status === 'pending') stats.pending++;
        else if (status === 'verified') stats.verified++;
        else if (status === 'ujian') stats.ujian++;
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

export default { db, storage };
