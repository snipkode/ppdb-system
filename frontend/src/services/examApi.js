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
import { db } from './firebase';

const COLLECTION_NAME = 'exams';

export const examApi = {
  /**
   * Create exam schedule
   */
  create: async (examData) => {
    try {
      // Generate nomor peserta
      const timestamp = Date.now();
      const nomorPeserta = `EXAM-${timestamp}`;

      const dataToSave = {
        student_id: examData.studentId,
        nomor_peserta: nomorPeserta,
        tanggal_ujian: examData.tanggal_ujian,
        waktu_ujian: examData.waktu_ujian,
        ruangan: examData.ruangan,
        lokasi: examData.lokasi,
        mata_ujian: examData.mata_ujian || ['TPQ', 'Akademik', 'Wawancara'],
        status: 'scheduled',
        nilai: {
          tpq: null,
          akademik: null,
          wawancara: null,
          total: null
        },
        keterangan: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), dataToSave);

      // Update student status to 'ujian'
      const studentRef = doc(db, 'students', examData.studentId);
      await updateDoc(studentRef, {
        status: 'ujian',
        'status_detail.ujian_at': serverTimestamp(),
        updated_at: serverTimestamp()
      });

      return {
        success: true,
        data: {
          id: docRef.id,
          nomor_peserta: nomorPeserta
        }
      };
    } catch (error) {
      console.error('Error creating exam:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get exam by student ID
   */
  getByStudentId: async (studentId) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('student_id', '==', studentId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Exam not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get exam by nomor peserta
   */
  getByNomorPeserta: async (nomorPeserta) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('nomor_peserta', '==', nomorPeserta)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      } else {
        return { success: false, error: 'Exam not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update exam schedule
   */
  updateSchedule: async (examId, examData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, examId);
      await updateDoc(docRef, {
        ...examData,
        updated_at: serverTimestamp()
      });

      return { success: true, message: 'Exam schedule updated' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Input exam results
   */
  inputResults: async (examId, scores) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, examId);
      
      // Calculate total
      const total = (scores.tpq || 0) + (scores.akademik || 0) + (scores.wawancara || 0);
      
      // Determine pass/fail (minimum 60 per subject, 180 total)
      const minScore = 60;
      const minTotal = 180;
      const passed = scores.tpq >= minScore && 
                     scores.akademik >= minScore && 
                     scores.wawancara >= minScore && 
                     total >= minTotal;

      await updateDoc(docRef, {
        nilai: {
          tpq: scores.tpq,
          akademik: scores.akademik,
          wawancara: scores.wawancara,
          total: total
        },
        status: 'completed',
        keterangan: passed ? 'Lulus' : 'Tidak Lulus',
        updated_at: serverTimestamp()
      });

      // Update student status
      const exam = await getDoc(docRef);
      const examData = exam.data();
      const studentRef = doc(db, 'students', examData.student_id);
      
      await updateDoc(studentRef, {
        status: passed ? 'accepted' : 'rejected',
        'status_detail.pengumuman_at': serverTimestamp(),
        'pilihan_jurusan.diterima_di': passed ? examData.pilihan_jurusan?.pilihan_1 : null,
        updated_at: serverTimestamp()
      });

      return { 
        success: true, 
        data: { 
          total, 
          passed,
          keterangan: passed ? 'Lulus' : 'Tidak Lulus'
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all exams with filters
   */
  getAll: async (filters = {}) => {
    try {
      let q = collection(db, COLLECTION_NAME);
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      const querySnapshot = await getDocs(q);
      const exams = [];

      // Get student data for each exam
      for (const doc of querySnapshot.docs) {
        const examData = doc.data();
        let studentData = null;

        if (examData.student_id) {
          const studentDoc = await getDoc(doc(db, 'students', examData.student_id));
          if (studentDoc.exists()) {
            studentData = studentDoc.data();
          }
        }

        exams.push({
          id: doc.id,
          ...examData,
          student: studentData
        });
      }

      return { success: true, data: exams };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Generate exam number for a student
   */
  generateNomorPeserta: async (major) => {
    try {
      const timestamp = Date.now();
      const majorCode = major.substring(0, 3).toUpperCase();
      const nomorPeserta = `EXAM-${majorCode}-${timestamp}`;
      
      return { success: true, data: nomorPeserta };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete exam
   */
  delete: async (examId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, examId));
      return { success: true, message: 'Exam deleted' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get exam statistics
   */
  getStats: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      
      const stats = {
        total: 0,
        scheduled: 0,
        completed: 0,
        passed: 0,
        failed: 0,
        averageScore: 0,
        byMajor: {}
      };

      let totalScore = 0;
      let completedCount = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stats.total++;

        if (data.status === 'scheduled') stats.scheduled++;
        else if (data.status === 'completed') {
          stats.completed++;
          completedCount++;
          
          if (data.nilai?.total) {
            totalScore += data.nilai.total;
          }
          
          if (data.keterangan === 'Lulus') stats.passed++;
          else if (data.keterangan === 'Tidak Lulus') stats.failed++;
        }
      });

      stats.averageScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0;

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default examApi;
