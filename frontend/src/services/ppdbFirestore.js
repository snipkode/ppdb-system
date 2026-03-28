import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// ==================== STUDENT OPERATIONS ====================

/**
 * Create new student registration
 */
export const createStudent = async (studentData) => {
  try {
    const studentsRef = collection(db, 'students');
    
    // Generate nomor pendaftaran
    const year = new Date().getFullYear();
    const countSnapshot = await getDocs(studentsRef);
    const count = countSnapshot.size + 1;
    const nomorPendaftaran = `PPDB-${year}-${String(count).padStart(4, '0')}`;
    
    const data = {
      ...studentData,
      nomor_pendaftaran: nomorPendaftaran,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    const docRef = await addDoc(studentsRef, data);
    
    return {
      success: true,
      id: docRef.id,
      nomor_pendaftaran: nomorPendaftaran
    };
  } catch (error) {
    console.error('Error creating student:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get student by ID
 */
export const getStudentById = async (id) => {
  try {
    const docRef = doc(db, 'students', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() }
      };
    }
    
    return {
      success: false,
      error: 'Student not found'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get student by nomor pendaftaran
 */
export const getStudentByNomorPendaftaran = async (nomor) => {
  try {
    const q = query(
      collection(db, 'students'),
      where('nomor_pendaftaran', '==', nomor)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        success: true,
        data: { id: doc.id, ...doc.data() }
      };
    }
    
    return {
      success: false,
      error: 'Nomor pendaftaran tidak ditemukan'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update student data
 */
export const updateStudent = async (id, data) => {
  try {
    const docRef = doc(db, 'students', id);
    await updateDoc(docRef, {
      ...data,
      updated_at: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Data berhasil diupdate'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update student status
 */
export const updateStudentStatus = async (id, status, notes = null) => {
  try {
    const docRef = doc(db, 'students', id);
    const updateData = {
      status,
      'status_detail.notes': notes,
      updated_at: serverTimestamp()
    };
    
    // Set timestamp based on status
    if (status === 'verified') {
      updateData['status_detail.verified_at'] = serverTimestamp();
    } else if (status === 'ujian') {
      updateData['status_detail.ujian_at'] = serverTimestamp();
    } else if (status === 'accepted' || status === 'rejected') {
      updateData['status_detail.pengumuman_at'] = serverTimestamp();
    }
    
    await updateDoc(docRef, updateData);
    
    return {
      success: true,
      message: 'Status berhasil diupdate'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete student
 */
export const deleteStudent = async (id) => {
  try {
    await deleteDoc(doc(db, 'students', id));
    return {
      success: true,
      message: 'Data berhasil dihapus'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get students by filter
 */
export const getStudentsByFilter = async (filters = {}) => {
  try {
    let q = collection(db, 'students');
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.jurusan) {
      constraints.push(where('pilihan_jurusan.pilihan_1', '==', filters.jurusan));
    }
    
    if (filters.pembayaran_status) {
      constraints.push(where('pembayaran.status', '==', filters.pembayaran_status));
    }
    
    if (filters.orderBy) {
      constraints.push(orderBy(filters.orderBy, filters.order || 'desc'));
    } else {
      constraints.push(orderBy('created_at', 'desc'));
    }
    
    if (filters.limit) {
      constraints.push(limit(filters.limit));
    }
    
    q = query(q, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const students = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      success: true,
      data: students
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== DOCUMENT UPLOAD OPERATIONS ====================

/**
 * Upload student document
 */
export const uploadStudentDocument = async (file, studentId, docType) => {
  try {
    if (!file) {
      return {
        success: false,
        error: 'File tidak ditemukan'
      };
    }
    
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(
      storage,
      `students/${studentId}/${docType}_${timestamp}_${safeFileName}`
    );
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update student document with URL
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      [`dokumen.${docType}`]: downloadURL,
      updated_at: serverTimestamp()
    });
    
    return {
      success: true,
      url: downloadURL
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Upload multiple documents
 */
export const uploadMultipleDocuments = async (documents, studentId) => {
  try {
    const uploadPromises = [];
    
    for (const [docType, file] of Object.entries(documents)) {
      if (file) {
        uploadPromises.push(
          uploadStudentDocument(file, studentId, docType)
        );
      }
    }
    
    const results = await Promise.all(uploadPromises);
    
    return {
      success: true,
      data: results
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete document
 */
export const deleteDocument = async (studentId, docType) => {
  try {
    // Get current URL
    const studentRef = doc(db, 'students', studentId);
    const studentSnap = await getDoc(studentRef);
    
    if (!studentSnap.exists()) {
      return {
        success: false,
        error: 'Student not found'
      };
    }
    
    const studentData = studentSnap.data();
    const fileURL = studentData.dokumen?.[docType];
    
    if (fileURL) {
      // Delete from storage
      const fileRef = ref(storage, fileURL);
      await deleteObject(fileRef);
      
      // Update Firestore
      await updateDoc(studentRef, {
        [`dokumen.${docType}`]: null,
        updated_at: serverTimestamp()
      });
    }
    
    return {
      success: true,
      message: 'Dokumen berhasil dihapus'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== PAYMENT OPERATIONS ====================

/**
 * Update payment status
 */
export const updatePaymentStatus = async (studentId, paymentData) => {
  try {
    const docRef = doc(db, 'students', studentId);
    await updateDoc(docRef, {
      pembayaran: {
        ...paymentData,
        updated_at: serverTimestamp()
      },
      updated_at: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Payment status updated'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Upload payment proof
 */
export const uploadPaymentProof = async (studentId, file) => {
  try {
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(
      storage,
      `payments/${studentId}/bukti_${timestamp}_${safeFileName}`
    );
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update student document
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      'pembayaran.bukti_transfer': downloadURL,
      'pembayaran.status': 'pending',
      'pembayaran.uploaded_at': serverTimestamp(),
      updated_at: serverTimestamp()
    });
    
    return {
      success: true,
      url: downloadURL
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Verify payment (admin)
 */
export const verifyPayment = async (studentId, status, notes = null) => {
  try {
    const docRef = doc(db, 'students', studentId);
    const updateData = {
      'pembayaran.status': status,
      'pembayaran.verified_at': serverTimestamp(),
      updated_at: serverTimestamp()
    };
    
    if (notes) {
      updateData['pembayaran.notes'] = notes;
    }
    
    await updateDoc(docRef, updateData);
    
    // If payment verified, update student status
    if (status === 'paid') {
      await updateStudentStatus(studentId, 'verified');
    }
    
    return {
      success: true,
      message: 'Payment verified'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== STATS & ANALYTICS ====================

/**
 * Get PPDB statistics
 */
export const getPPDBStats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = querySnapshot.docs.map(doc => doc.data());
    
    const stats = {
      total: students.length,
      pending: students.filter(s => s.status === 'pending').length,
      verified: students.filter(s => s.status === 'verified').length,
      ujian: students.filter(s => s.status === 'ujian').length,
      accepted: students.filter(s => s.status === 'accepted').length,
      rejected: students.filter(s => s.status === 'rejected').length,
      
      // Payment stats
      unpaid: students.filter(s => s.pembayaran?.status === 'unpaid').length,
      payment_pending: students.filter(s => s.pembayaran?.status === 'pending').length,
      paid: students.filter(s => s.pembayaran?.status === 'paid').length,
      
      // By major
      by_major: {}
    };
    
    // Count by major
    const majors = ['RPL', 'TKJ', 'AKL', 'OTKP', 'DKV', 'TBSM', 'TAV', 'TB'];
    majors.forEach(major => {
      stats.by_major[major] = students.filter(
        s => s.pilihan_jurusan?.pilihan_1 === major
      ).length;
    });
    
    return {
      success: true,
      data: stats
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get quota status
 */
export const getQuotaStatus = async () => {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'kuota'));
    
    if (settingsDoc.exists()) {
      return {
        success: true,
        data: settingsDoc.data()
      };
    }
    
    // Default quota
    return {
      success: true,
      data: {
        kuota_per_jurusan: {
          RPL: { total: 120, terdaftar: 0, diterima: 0 },
          TKJ: { total: 90, terdaftar: 0, diterima: 0 },
          AKL: { total: 60, terdaftar: 0, diterima: 0 },
          OTKP: { total: 60, terdaftar: 0, diterima: 0 },
          DKV: { total: 90, terdaftar: 0, diterima: 0 },
          TBSM: { total: 60, terdaftar: 0, diterima: 0 },
          TAV: { total: 60, terdaftar: 0, diterima: 0 },
          TB: { total: 60, terdaftar: 0, diterima: 0 }
        }
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== SETTINGS ====================

/**
 * Get PPDB settings
 */
export const getPPDBSettings = async () => {
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'ppdb'));
    
    if (settingsDoc.exists()) {
      return {
        success: true,
        data: settingsDoc.data()
      };
    }
    
    return {
      success: true,
      data: {
        ppdb_open: true,
        ppdb_start_date: Timestamp.fromDate(new Date('2024-01-01')),
        ppdb_end_date: Timestamp.fromDate(new Date('2024-12-31')),
        biaya_pendaftaran: 150000
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update PPDB settings (admin)
 */
export const updatePPDBSettings = async (settings) => {
  try {
    const settingsRef = doc(db, 'settings', 'ppdb');
    await updateDoc(settingsRef, {
      ...settings,
      updated_at: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Settings updated'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== EXPORTS ====================

export default {
  // Student
  createStudent,
  getStudentById,
  getStudentByNomorPendaftaran,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
  getStudentsByFilter,
  
  // Documents
  uploadStudentDocument,
  uploadMultipleDocuments,
  deleteDocument,
  
  // Payment
  updatePaymentStatus,
  uploadPaymentProof,
  verifyPayment,
  
  // Stats
  getPPDBStats,
  getQuotaStatus,
  
  // Settings
  getPPDBSettings,
  updatePPDBSettings
};
