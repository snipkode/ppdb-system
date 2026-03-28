import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { studentApi } from '@/services/api';
import { wilayahApi } from '@/services/wilayah';
import { db, storage } from '@/services/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Import form components
import StudentForm from '@/components/ppdb/StudentForm';
import ParentForm from '@/components/ppdb/ParentForm';
import SchoolForm from '@/components/ppdb/SchoolForm';
import MajorForm from '@/components/ppdb/MajorForm';
import DocumentUpload from '@/components/ppdb/DocumentUpload';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Wilayah state
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [loadingWilayah, setLoadingWilayah] = useState(false);

  // Load saved data from localStorage
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem('ppdb_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('✅ Restored data from localStorage');
        return parsed;
      }
    } catch (err) {
      console.error('Failed to load saved data:', err);
    }
    return null;
  };

  const [formData, setFormData] = useState(() => {
    const saved = loadSavedData();
    return saved || {
      nama_lengkap: '', nisn: '', nik: '', tempat_lahir: '', tanggal_lahir: '',
      jenis_kelamin: 'L', agama: 'Islam', alamat: '', rt_rw: '', kelurahan: '',
      kecamatan: '', kota: '', provinsi: '', kode_pos: '', telepon: '', email: '',
      nama_ayah: '', pendidikan_ayah: '', pekerjaan_ayah: '', penghasilan_ayah: '',
      nama_ibu: '', pendidikan_ibu: '', pekerjaan_ibu: '', penghasilan_ibu: '',
      telepon_ortu: '', email_ortu: '', nama_wali: '', telepon_wali: '',
      npsn: '', nama_sekolah: '', alamat_sekolah: '', tahun_lulus: new Date().getFullYear(),
      nilai_bahasa_indonesia: '', nilai_matematika: '', nilai_ipa: '', nilai_bahasa_inggris: '',
      nama_prestasi: '', tingkat_prestasi: '', tahun_prestasi: '',
      pilihan_1: '', pilihan_2: '',
      foto_3x4: null, kk_file: null, akta_kelahiran: null, ktp_ortu: null,
      ijazah_skl: null, transkrip_nilai: null, surat_prestasi: null,
    };
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Data Siswa', icon: '👤' },
    { number: 2, title: 'Orang Tua', icon: '👨‍👩‍👧' },
    { number: 3, title: 'Sekolah', icon: '🏫' },
    { number: 4, title: 'Jurusan', icon: '📚' },
    { number: 5, title: 'Dokumen', icon: '📄' },
  ];

  useEffect(() => { 
    loadProvinsi();
    loadDefaultKelurahan();
  }, []);

  const loadDefaultKelurahan = async () => {
    try {
      const defaultKelurahan = await wilayahApi.getDefaultKelurahan();
      console.log('✅ Default kelurahan loaded:', defaultKelurahan.length, 'items');
      // Set as initial kelurahan list for testing
      if (defaultKelurahan.length > 0) {
        setKelurahanList(defaultKelurahan);
      }
    } catch (err) {
      console.error('❌ Failed to load default kelurahan:', err);
    }
  };

  const loadProvinsi = async () => {
    setLoadingWilayah(true);
    try {
      const data = await wilayahApi.getProvinsi();
      setProvinsiList(data);
    } catch (err) {
      console.error('Failed to load provinsi:', err);
    } finally {
      setLoadingWilayah(false);
    }
  };

  const handleProvinsiChange = async (e) => {
    const provinsiId = e.target.value;
    setFormData(prev => ({ ...prev, provinsi: provinsiId, kota: '', kecamatan: '', kelurahan: '', kode_pos: '' }));
    if (provinsiId) {
      setLoadingWilayah(true);
      try {
        const data = await wilayahApi.getKabupaten(provinsiId);
        setKabupatenList(data);
      } catch (err) { setKabupatenList([]); } finally { setLoadingWilayah(false); }
    } else { setKabupatenList([]); setKecamatanList([]); setKelurahanList([]); }
  };

  const handleKabupatenChange = async (e) => {
    const kabupatenId = e.target.value;
    setFormData(prev => ({ ...prev, kota: kabupatenId, kecamatan: '', kelurahan: '', kode_pos: '' }));
    if (kabupatenId) {
      setLoadingWilayah(true);
      try { const data = await wilayahApi.getKecamatan(kabupatenId); setKecamatanList(data); }
      catch (err) { console.error(err); } finally { setLoadingWilayah(false); }
    } else { setKecamatanList([]); setKelurahanList([]); }
  };

  const handleKecamatanChange = async (e) => {
    const kecamatanId = e.target.value;
    setFormData(prev => ({ ...prev, kecamatan: kecamatanId, kelurahan: '', kode_pos: '' }));
    if (kecamatanId) {
      setLoadingWilayah(true);
      try { 
        const data = await wilayahApi.getKelurahan(kecamatanId); 
        console.log('🏘️ Kelurahan loaded:', data.length, 'items');
        setKelurahanList(data); 
      }
      catch (err) { 
        console.error('❌ Failed to load kelurahan:', err);
        setKelurahanList([]); 
      } finally { setLoadingWilayah(false); }
    } else { setKelurahanList([]); }
  };

  const handleKelurahanChange = (e) => {
    const kelurahanId = e.target.value;
    const selectedKelurahan = kelurahanList.find(k => k.id === kelurahanId);
    const postalCode = selectedKelurahan?.postal_code || '';
    
    console.log('🏘️ Kelurahan selected:', selectedKelurahan?.name, '| Kode Pos:', postalCode);
    
    setFormData(prev => ({ 
      ...prev, 
      kelurahan: kelurahanId, 
      kode_pos: postalCode 
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    
    // Auto-save to localStorage
    setTimeout(() => {
      const newData = { ...formData, [name]: value };
      localStorage.setItem('ppdb_draft', JSON.stringify(newData));
    }, 300);
  };

  // Auto-save on step change
  useEffect(() => {
    localStorage.setItem('ppdb_draft', JSON.stringify(formData));
  }, [currentStep]);

  const validateStep = (step) => {
    const newErrors = {};
    setError(null);

    switch (step) {
      case 1:
        if (!formData.nama_lengkap.trim()) newErrors.nama_lengkap = 'Nama wajib diisi';
        if (!formData.nisn) newErrors.nisn = 'NISN wajib diisi';
        else if (formData.nisn.length !== 10) newErrors.nisn = 'NISN harus 10 digit';
        if (!formData.nik) newErrors.nik = 'NIK wajib diisi';
        else if (formData.nik.length !== 16) newErrors.nik = 'NIK harus 16 digit';
        if (!formData.tempat_lahir.trim()) newErrors.tempat_lahir = 'Tempat lahir wajib diisi';
        if (!formData.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
        if (!formData.agama) newErrors.agama = 'Agama wajib dipilih';
        if (!formData.alamat.trim()) newErrors.alamat = 'Alamat wajib diisi';
        if (!formData.provinsi) newErrors.provinsi = 'Provinsi wajib dipilih';
        if (!formData.kota) newErrors.kota = 'Kota wajib dipilih';
        if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib dipilih';
        if (!formData.kelurahan) newErrors.kelurahan = 'Kelurahan wajib dipilih';
        if (!formData.kode_pos) newErrors.kode_pos = 'Kode pos wajib diisi';
        if (!formData.telepon) newErrors.telepon = 'Telepon wajib diisi';
        else if (!/^08[0-9]{8,}$/.test(formData.telepon)) newErrors.telepon = 'Format tidak valid';
        break;
      case 2:
        if (!formData.nama_ayah.trim()) newErrors.nama_ayah = 'Nama ayah wajib diisi';
        if (!formData.pendidikan_ayah) newErrors.pendidikan_ayah = 'Pendidikan wajib dipilih';
        if (!formData.pekerjaan_ayah) newErrors.pekerjaan_ayah = 'Pekerjaan wajib dipilih';
        if (!formData.penghasilan_ayah) newErrors.penghasilan_ayah = 'Penghasilan wajib dipilih';
        if (!formData.nama_ibu.trim()) newErrors.nama_ibu = 'Nama ibu wajib diisi';
        if (!formData.pendidikan_ibu) newErrors.pendidikan_ibu = 'Pendidikan wajib dipilih';
        if (!formData.pekerjaan_ibu) newErrors.pekerjaan_ibu = 'Pekerjaan wajib dipilih';
        if (!formData.penghasilan_ibu) newErrors.penghasilan_ibu = 'Penghasilan wajib dipilih';
        if (!formData.telepon_ortu) newErrors.telepon_ortu = 'Telepon wajib diisi';
        else if (!/^08[0-9]{8,}$/.test(formData.telepon_ortu)) newErrors.telepon_ortu = 'Format tidak valid';
        break;
      case 3:
        if (!formData.npsn) newErrors.npsn = 'NPSN wajib diisi';
        else if (formData.npsn.length !== 8) newErrors.npsn = 'NPSN harus 8 digit';
        if (!formData.nama_sekolah.trim()) newErrors.nama_sekolah = 'Nama sekolah wajib diisi';
        if (!formData.alamat_sekolah.trim()) newErrors.alamat_sekolah = 'Alamat wajib diisi';
        if (!formData.tahun_lulus) newErrors.tahun_lulus = 'Tahun lulus wajib dipilih';
        break;
      case 4:
        if (!formData.pilihan_1) newErrors.pilihan_1 = 'Jurusan pertama wajib dipilih';
        if (!formData.pilihan_2) newErrors.pilihan_2 = 'Jurusan kedua wajib dipilih';
        if (formData.pilihan_1 && formData.pilihan_2 && formData.pilihan_1 === formData.pilihan_2)
          newErrors.pilihan_2 = 'Tidak boleh sama';
        break;
      case 5:
        if (!formData.foto_3x4) newErrors.foto_3x4 = 'Foto wajib diupload';
        if (!formData.kk_file) newErrors.kk_file = 'KK wajib diupload';
        if (!formData.akta_kelahiran) newErrors.akta_kelahiran = 'Akta wajib diupload';
        if (!formData.ktp_ortu) newErrors.ktp_ortu = 'KTP wajib diupload';
        if (!formData.transkrip_nilai) newErrors.transkrip_nilai = 'Transkrip wajib diupload';
        break;
      default: break;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setError('Mohon lengkapi data yang wajib diisi');
      window.scrollTo(0, 0);
      return false;
    }
    return true;
  };

  const handleBack = () => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  // Clear saved draft
  const handleClearDraft = () => {
    if (confirm('Hapus data yang tersimpan? Anda harus mengisi form dari awal.')) {
      localStorage.removeItem('ppdb_draft');
      setFormData({
        nama_lengkap: '', nisn: '', nik: '', tempat_lahir: '', tanggal_lahir: '',
        jenis_kelamin: 'L', agama: 'Islam', alamat: '', rt_rw: '', kelurahan: '',
        kecamatan: '', kota: '', provinsi: '', kode_pos: '', telepon: '', email: '',
        nama_ayah: '', pendidikan_ayah: '', pekerjaan_ayah: '', penghasilan_ayah: '',
        nama_ibu: '', pendidikan_ibu: '', pekerjaan_ibu: '', penghasilan_ibu: '',
        telepon_ortu: '', email_ortu: '', nama_wali: '', telepon_wali: '',
        npsn: '', nama_sekolah: '', alamat_sekolah: '', tahun_lulus: new Date().getFullYear(),
        nilai_bahasa_indonesia: '', nilai_matematika: '', nilai_ipa: '', nilai_bahasa_inggris: '',
        nama_prestasi: '', tingkat_prestasi: '', tahun_prestasi: '',
        pilihan_1: '', pilihan_2: '',
        foto_3x4: null, kk_file: null, akta_kelahiran: null, ktp_ortu: null,
        ijazah_skl: null, transkrip_nilai: null, surat_prestasi: null,
      });
      setCurrentStep(1);
      setError(null);
      setSubmitAttempted(false);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    // Set loading state - button will show loading spinner
    setLoading(true);
    setError(null);
    setSubmitAttempted(true);
    
    console.log('🔥 Starting submission to Firestore...');
    
    try {
      // Step 1: Create student record with basic data
      const submissionData = {
        // Data Siswa
        data_siswa: {
          nama_lengkap: formData.nama_lengkap,
          nisn: formData.nisn,
          nik: formData.nik,
          tempat_lahir: formData.tempat_lahir,
          tanggal_lahir: formData.tanggal_lahir,
          jenis_kelamin: formData.jenis_kelamin,
          agama: formData.agama,
          alamat: formData.alamat,
          rt_rw: formData.rt_rw,
          kelurahan: formData.kelurahan,
          kecamatan: formData.kecamatan,
          kota: formData.kota,
          provinsi: formData.provinsi,
          kode_pos: formData.kode_pos,
          telepon: formData.telepon,
          email: formData.email
        },
        
        // Data Ortu
        data_ortu: {
          nama_ayah: formData.nama_ayah,
          pendidikan_ayah: formData.pendidikan_ayah,
          pekerjaan_ayah: formData.pekerjaan_ayah,
          penghasilan_ayah: formData.penghasilan_ayah,
          nama_ibu: formData.nama_ibu,
          pendidikan_ibu: formData.pendidikan_ibu,
          pekerjaan_ibu: formData.pekerjaan_ibu,
          penghasilan_ibu: formData.penghasilan_ibu,
          nama_wali: formData.nama_wali,
          telepon_ortu: formData.telepon_ortu,
          email_ortu: formData.email_ortu
        },
        
        // Data Sekolah
        data_sekolah: {
          npsn: formData.npsn,
          nama_sekolah: formData.nama_sekolah,
          alamat_sekolah: formData.alamat_sekolah,
          tahun_lulus: formData.tahun_lulus,
          nilai_rapor: [
            {
              semester: 5,
              rata_rata: (
                Number(formData.nilai_bahasa_indonesia || 0) +
                Number(formData.nilai_matematika || 0) +
                Number(formData.nilai_ipa || 0) +
                Number(formData.nilai_bahasa_inggris || 0)
              ) / 4
            }
          ]
        },
        
        // Pilihan Jurusan
        pilihan_jurusan: {
          pilihan_1: formData.pilihan_1,
          pilihan_2: formData.pilihan_2,
          diterima_di: null
        },
        
        // Dokumen (will be updated after upload)
        dokumen: {
          foto_3x4: null,
          kk_file: null,
          akta_kelahiran: null,
          ktp_ortu: null,
          ijazah_skl: null,
          transkrip_nilai: null,
          surat_prestasi: null
        },
        
        // Status
        status: 'pending',
        status_detail: {
          submitted_at: serverTimestamp(),
          verified_at: null,
          verified_by: null,
          ujian_at: null,
          pengumuman_at: null,
          notes: null
        },
        
        // Pembayaran
        pembayaran: {
          status: 'unpaid',
          amount: 150000,
          bank_name: null,
          transfer_date: null,
          bukti_transfer: null,
          verified_at: null,
          verified_by: null,
          notes: null
        },
        
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      console.log('📝 Submitting data to Firestore:', submissionData);

      // Create student record
      const result = await studentApi.create(submissionData);
      
      console.log('📦 Firestore result:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Gagal menyimpan data');
      }

      const studentId = result.data.id;
      const nomorPendaftaran = result.data.nomor_pendaftaran;
      
      console.log('✅ Student created:', { studentId, nomorPendaftaran });
      
      // Step 2: Upload documents to Firebase Storage
      const uploadPromises = [];
      const documentMap = {
        foto_3x4: formData.foto_3x4,
        kk_file: formData.kk_file,
        akta_kelahiran: formData.akta_kelahiran,
        ktp_ortu: formData.ktp_ortu,
        ijazah_skl: formData.ijazah_skl,
        transkrip_nilai: formData.transkrip_nilai,
        surat_prestasi: formData.surat_prestasi
      };

      console.log('📤 Starting document upload...', Object.keys(documentMap).length, 'files');

      // Upload each document
      for (const [docType, file] of Object.entries(documentMap)) {
        if (file) {
          console.log(`⬆️ Uploading ${docType}...`);
          const promise = uploadDocument(file, studentId, docType);
          uploadPromises.push(promise.then(url => ({ docType, url })));
        }
      }

      // Wait for all uploads
      const uploadResults = await Promise.all(uploadPromises);
      console.log('✅ Documents uploaded:', uploadResults.length, 'files');
      
      // Update student record with document URLs
      const dokumenUpdate = {};
      uploadResults.forEach(({ docType, url }) => {
        dokumenUpdate[docType] = url;
      });

      if (Object.keys(dokumenUpdate).length > 0) {
        console.log('🔄 Updating Firestore with document URLs...');
        const studentRef = doc(db, 'students', studentId);
        await updateDoc(studentRef, {
          dokumen: dokumenUpdate,
          updated_at: serverTimestamp()
        });
        console.log('✅ Firestore updated with document URLs');
      }

      console.log('🎉 Registration complete!');
      
      // Clear localStorage on success
      localStorage.removeItem('ppdb_draft');
      
      // Navigate to success page
      navigate('/success', { 
        state: { 
          studentId: studentId,
          nomorPendaftaran: nomorPendaftaran,
          studentName: formData.nama_lengkap 
        } 
      });
      
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.message || 'Gagal menyimpan data. Silakan coba lagi.');
      // Keep loading false so user can retry
    } finally {
      setLoading(false);
    }
  };

  // Helper function to upload document
  const uploadDocument = async (file, studentId, docType) => {
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `students/${studentId}/${docType}_${timestamp}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error(`Upload error (${docType}):`, error);
      throw new Error(`Gagal upload ${docType}: ${error.message}`);
    }
  };

  const handleConfirm = () => { setShowConfirmation(true); window.scrollTo(0, 0); };
  const handleFinalSubmit = () => { handleSubmit(); };

  // Clear saved draft
  const handleClearDraft = () => {
    if (confirm('Hapus data yang tersimpan? Anda harus mengisi form dari awal.')) {
      localStorage.removeItem('ppdb_draft');
      setFormData({
        nama_lengkap: '', nisn: '', nik: '', tempat_lahir: '', tanggal_lahir: '',
        jenis_kelamin: 'L', agama: 'Islam', alamat: '', rt_rw: '', kelurahan: '',
        kecamatan: '', kota: '', provinsi: '', kode_pos: '', telepon: '', email: '',
        nama_ayah: '', pendidikan_ayah: '', pekerjaan_ayah: '', penghasilan_ayah: '',
        nama_ibu: '', pendidikan_ibu: '', pekerjaan_ibu: '', penghasilan_ibu: '',
        telepon_ortu: '', email_ortu: '', nama_wali: '', telepon_wali: '',
        npsn: '', nama_sekolah: '', alamat_sekolah: '', tahun_lulus: new Date().getFullYear(),
        nilai_bahasa_indonesia: '', nilai_matematika: '', nilai_ipa: '', nilai_bahasa_inggris: '',
        nama_prestasi: '', tingkat_prestasi: '', tahun_prestasi: '',
        pilihan_1: '', pilihan_2: '',
        foto_3x4: null, kk_file: null, akta_kelahiran: null, ktp_ortu: null,
        ijazah_skl: null, transkrip_nilai: null, surat_prestasi: null,
      });
      setCurrentStep(1);
      setError(null);
      setSubmitAttempted(false);
      window.scrollTo(0, 0);
    }
  };

  const wilayahData = { provinsiList, kabupatenList, kecamatanList, kelurahanList, handleProvinsiChange, handleKabupatenChange, handleKecamatanChange, handleKelurahanChange };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <StudentForm formData={formData} handleChange={handleChange} errors={errors} wilayahData={wilayahData} loadingWilayah={loadingWilayah} />;
      case 2: return <ParentForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 3: return <SchoolForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 4: return <MajorForm formData={formData} handleChange={handleChange} errors={errors} />;
      case 5: return <DocumentUpload formData={formData} setFormData={setFormData} errors={errors} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">Pendaftaran PPDB Online</h1>
          <p className="text-gray-600 text-sm">SMK Nusantara - Tahun Ajaran 2024/2025</p>
          
          {/* Clear Draft Button */}
          <button
            onClick={handleClearDraft}
            className="mt-2 text-xs text-red-600 hover:text-red-700 hover:underline"
          >
            🗑️ Hapus Data Tersimpan
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            <div><p className="font-medium text-sm">Terjadi Kesalahan</p><p className="text-xs">{error}</p></div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-5 md:p-6">
          {/* Compact Stepper */}
          {!showConfirmation && currentStep <= 5 && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isCompleted = currentStep > step.number;
                  const isCurrent = currentStep === step.number;
                  return (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-2 ring-blue-200' : 'bg-gray-200 text-gray-500'}`}>
                          {isCompleted ? <FiCheck className="w-4 h-4" /> : step.number}
                        </div>
                        <span className={`mt-1.5 text-xs font-medium text-center hidden md:block ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>{step.title}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex-1 mx-1.5 h-0.5 bg-gray-200 rounded-full overflow-hidden hidden md:block">
                          <div className={`h-full transition-all duration-500 ${isCompleted ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-center md:hidden">
                <p className="text-xs font-medium text-blue-600">Step {currentStep}: {steps[currentStep - 1]?.title}</p>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="mt-6">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          {!showConfirmation && currentStep <= 5 && (
            <div className="flex justify-between mt-6 pt-4 border-t">
              <button type="button" onClick={handleBack} disabled={currentStep === 1 || loading} className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm">
                <FiChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Kembali</span>
              </button>
              {currentStep < 5 ? (
                <button type="button" onClick={handleNext} disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm">
                  Lanjut <FiChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={loading} 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm w-full md:w-auto justify-center"
                  title={loading ? 'Sedang mengirim data...' : 'Submit pendaftaran ke Firestore'}
                >
                  {loading ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke Firestore...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Periksa & Kirim Pendaftaran</span>
                      <FiCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Help Info */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>Butuh bantuan? <span className="font-medium text-gray-800">📞 (021) 1234-5678 | 📧 ppdb@smknusantara.sch.id</span></p>
        </div>
      </div>

      {/* Progress Bar (saat loading) */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200">
            <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-progress"></div>
          </div>
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <FiLoader className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Sedang mengirim data ke Firestore...</span>
            </div>
            <p className="text-xs text-white/70 mt-1">Mohon tunggu, jangan tutup halaman ini</p>
          </div>
        </div>
      )}

      {/* Auto-save indicator */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white shadow-lg rounded-lg px-3 py-2 text-xs text-gray-600 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${submitAttempted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Data tersimpan otomatis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
