import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import FormStepper from '@/components/ppdb/FormStepper';
import StudentForm from '@/components/ppdb/StudentForm';
import ParentForm from '@/components/ppdb/ParentForm';
import SchoolForm from '@/components/ppdb/SchoolForm';
import MajorForm from '@/components/ppdb/MajorForm';
import DocumentUpload from '@/components/ppdb/DocumentUpload';
import ConfirmationPage from '@/components/ppdb/ConfirmationPage';
import { studentApi } from '@/services/api';
import { wilayahApi } from '@/services/wilayah';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Wilayah state
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [loadingWilayah, setLoadingWilayah] = useState(false);

  const [formData, setFormData] = useState({
    // Data Siswa
    nama_lengkap: '',
    nisn: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    agama: 'Islam',
    alamat: '',
    rt_rw: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
    kode_pos: '',
    telepon: '',
    email: '',

    // Data Orang Tua
    nama_ayah: '',
    pendidikan_ayah: '',
    pekerjaan_ayah: '',
    penghasilan_ayah: '',
    nama_ibu: '',
    pendidikan_ibu: '',
    pekerjaan_ibu: '',
    penghasilan_ibu: '',
    telepon_ortu: '',
    email_ortu: '',
    nama_wali: '',
    telepon_wali: '',

    // Data Sekolah
    npsn: '',
    nama_sekolah: '',
    alamat_sekolah: '',
    tahun_lulus: new Date().getFullYear(),
    nilai_bahasa_indonesia: '',
    nilai_matematika: '',
    nilai_ipa: '',
    nilai_bahasa_inggris: '',
    nama_prestasi: '',
    tingkat_prestasi: '',
    tahun_prestasi: '',

    // Pilihan Jurusan
    pilihan_1: '',
    pilihan_2: '',

    // Dokumen
    foto_3x4: null,
    kk_file: null,
    akta_kelahiran: null,
    ktp_ortu: null,
    ijazah_skl: null,
    transkrip_nilai: null,
    surat_prestasi: null,
  });

  const [errors, setErrors] = useState({});

  // Steps definition
  const steps = [
    { number: 1, title: 'Data Siswa', icon: null },
    { number: 2, title: 'Data Orang Tua', icon: null },
    { number: 3, title: 'Data Sekolah', icon: null },
    { number: 4, title: 'Pilihan Jurusan', icon: null },
    { number: 5, title: 'Upload Dokumen', icon: null },
  ];

  // Load provinces on mount
  useEffect(() => {
    loadProvinsi();
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      provinsi: provinsiId,
      kota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
    }));

    if (provinsiId) {
      setLoadingWilayah(true);
      try {
        const data = await wilayahApi.getKabupaten(provinsiId);
        setKabupatenList(data);
      } catch (err) {
        console.error('Failed to load kabupaten:', err);
      } finally {
        setLoadingWilayah(false);
      }
    } else {
      setKabupatenList([]);
      setKecamatanList([]);
      setKelurahanList([]);
    }
  };

  const handleKabupatenChange = async (e) => {
    const kabupatenId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      kota: kabupatenId,
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
    }));

    if (kabupatenId) {
      setLoadingWilayah(true);
      try {
        const data = await wilayahApi.getKecamatan(kabupatenId);
        setKecamatanList(data);
      } catch (err) {
        console.error('Failed to load kecamatan:', err);
      } finally {
        setLoadingWilayah(false);
      }
    } else {
      setKecamatanList([]);
      setKelurahanList([]);
    }
  };

  const handleKecamatanChange = async (e) => {
    const kecamatanId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      kecamatan: kecamatanId,
      kelurahan: '',
      kode_pos: '',
    }));

    if (kecamatanId) {
      setLoadingWilayah(true);
      try {
        const data = await wilayahApi.getKelurahan(kecamatanId);
        setKelurahanList(data);
      } catch (err) {
        console.error('Failed to load kelurahan:', err);
      } finally {
        setLoadingWilayah(false);
      }
    } else {
      setKelurahanList([]);
    }
  };

  const handleKelurahanChange = (e) => {
    const kelurahan = e.target.value;
    const selectedKelurahan = kelurahanList.find((k) => k.id === kelurahan);
    setFormData((prev) => ({
      ...prev,
      kelurahan,
      kode_pos: selectedKelurahan?.postal_code || '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    setError(null);

    switch (step) {
      case 1: // Student data
        if (!formData.nama_lengkap.trim()) newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
        if (!formData.nisn) {
          newErrors.nisn = 'NISN wajib diisi';
        } else if (formData.nisn.length !== 10) {
          newErrors.nisn = 'NISN harus 10 digit';
        }
        if (!formData.nik) {
          newErrors.nik = 'NIK wajib diisi';
        } else if (formData.nik.length !== 16) {
          newErrors.nik = 'NIK harus 16 digit';
        }
        if (!formData.tempat_lahir.trim()) newErrors.tempat_lahir = 'Tempat lahir wajib diisi';
        if (!formData.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
        if (!formData.agama) newErrors.agama = 'Agama wajib dipilih';
        if (!formData.alamat.trim()) newErrors.alamat = 'Alamat wajib diisi';
        if (!formData.provinsi) newErrors.provinsi = 'Provinsi wajib dipilih';
        if (!formData.kota) newErrors.kota = 'Kota/Kabupaten wajib dipilih';
        if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib dipilih';
        if (!formData.kelurahan) newErrors.kelurahan = 'Kelurahan wajib dipilih';
        if (!formData.kode_pos) newErrors.kode_pos = 'Kode pos wajib diisi';
        if (!formData.telepon) {
          newErrors.telepon = 'No. telepon wajib diisi';
        } else if (!/^08[0-9]{8,}$/.test(formData.telepon)) {
          newErrors.telepon = 'Format no. telepon tidak valid';
        }
        break;

      case 2: // Parent data
        if (!formData.nama_ayah.trim()) newErrors.nama_ayah = 'Nama ayah wajib diisi';
        if (!formData.pendidikan_ayah) newErrors.pendidikan_ayah = 'Pendidikan ayah wajib dipilih';
        if (!formData.pekerjaan_ayah) newErrors.pekerjaan_ayah = 'Pekerjaan ayah wajib dipilih';
        if (!formData.penghasilan_ayah) newErrors.penghasilan_ayah = 'Penghasilan ayah wajib dipilih';
        if (!formData.nama_ibu.trim()) newErrors.nama_ibu = 'Nama ibu wajib diisi';
        if (!formData.pendidikan_ibu) newErrors.pendidikan_ibu = 'Pendidikan ibu wajib dipilih';
        if (!formData.pekerjaan_ibu) newErrors.pekerjaan_ibu = 'Pekerjaan ibu wajib dipilih';
        if (!formData.penghasilan_ibu) newErrors.penghasilan_ibu = 'Penghasilan ibu wajib dipilih';
        if (!formData.telepon_ortu) {
          newErrors.telepon_ortu = 'No. telepon wajib diisi';
        } else if (!/^08[0-9]{8,}$/.test(formData.telepon_ortu)) {
          newErrors.telepon_ortu = 'Format no. telepon tidak valid';
        }
        break;

      case 3: // School data
        if (!formData.npsn) {
          newErrors.npsn = 'NPSN wajib diisi';
        } else if (formData.npsn.length !== 8) {
          newErrors.npsn = 'NPSN harus 8 digit';
        }
        if (!formData.nama_sekolah.trim()) newErrors.nama_sekolah = 'Nama sekolah wajib diisi';
        if (!formData.alamat_sekolah.trim()) newErrors.alamat_sekolah = 'Alamat sekolah wajib diisi';
        if (!formData.tahun_lulus) newErrors.tahun_lulus = 'Tahun lulus wajib dipilih';
        break;

      case 4: // Major selection
        if (!formData.pilihan_1) newErrors.pilihan_1 = 'Pilihan jurusan pertama wajib diisi';
        if (!formData.pilihan_2) newErrors.pilihan_2 = 'Pilihan jurusan kedua wajib diisi';
        if (formData.pilihan_1 && formData.pilihan_2 && formData.pilihan_1 === formData.pilihan_2) {
          newErrors.pilihan_2 = 'Pilihan jurusan 1 dan 2 tidak boleh sama';
        }
        break;

      case 5: // Document upload
        if (!formData.foto_3x4) newErrors.foto_3x4 = 'Pas foto wajib diupload';
        if (!formData.kk_file) newErrors.kk_file = 'Kartu keluarga wajib diupload';
        if (!formData.akta_kelahiran) newErrors.akta_kelahiran = 'Akta kelahiran wajib diupload';
        if (!formData.ktp_ortu) newErrors.ktp_ortu = 'KTP orang tua wajib diupload';
        if (!formData.transkrip_nilai) newErrors.transkrip_nilai = 'Transkrip nilai wajib diupload';
        break;

      default:
        break;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setError('Mohon lengkapi semua field yang wajib diisi');
      window.scrollTo(0, 0);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setLoading(true);
    setError(null);

    try {
      // Prepare data for submission (exclude files for now)
      const submissionData = {
        ...formData,
        // In production, upload files first and get URLs
        foto_3x4: formData.foto_3x4?.name || null,
        kk_file: formData.kk_file?.name || null,
        akta_kelahiran: formData.akta_kelahiran?.name || null,
        ktp_ortu: formData.ktp_ortu?.name || null,
        ijazah_skl: formData.ijazah_skl?.name || null,
        transkrip_nilai: formData.transkrip_nilai?.name || null,
        surat_prestasi: formData.surat_prestasi?.name || null,
      };

      const result = await studentApi.create(submissionData);
      if (result.success) {
        navigate('/success', {
          state: {
            studentId: result.data?.id || 'PPDB-2024-0001',
            nomorPendaftaran: result.data?.nomor_pendaftaran || 'PPDB-2024-0001',
            studentName: formData.nama_lengkap,
          },
        });
      } else {
        setError(result.error || 'Terjadi kesalahan saat mendaftar');
      }
    } catch (err) {
      setError('Gagal menyimpan data. Periksa koneksi internet Anda.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = () => {
    handleSubmit();
  };

  const renderStepContent = () => {
    const wilayahData = {
      provinsiList,
      kabupatenList,
      kecamatanList,
      kelurahanList,
      handleProvinsiChange,
      handleKabupatenChange,
      handleKecamatanChange,
      handleKelurahanChange,
    };

    switch (currentStep) {
      case 1:
        return (
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            wilayahData={wilayahData}
            loadingWilayah={loadingWilayah}
          />
        );
      case 2:
        return (
          <ParentForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <SchoolForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <MajorForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <DocumentUpload
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <ConfirmationPage
            formData={formData}
            onConfirm={handleFinalSubmit}
            onBack={() => {
              setShowConfirmation(false);
              setCurrentStep(5);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pendaftaran PPDB Online
          </h1>
          <p className="text-gray-600">
            SMK Nusantara - Tahun Ajaran 2024/2025
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Terjadi Kesalahan</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Stepper */}
          {!showConfirmation && currentStep <= 5 && (
            <div className="mb-8">
              <FormStepper steps={steps} currentStep={currentStep} />
            </div>
          )}

          {/* Step Content */}
          <div className="mt-8">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          {!showConfirmation && currentStep <= 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1 || loading}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FiChevronLeft className="w-5 h-5" />
                Kembali
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Lanjut
                  <FiChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronRight className="w-5 h-5" />
                  Periksa & Kirim
                </button>
              )}
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                <FiLoader className="w-8 h-8 text-primary-600 animate-spin" />
                <p className="text-gray-700 font-medium">Memproses data...</p>
              </div>
            </div>
          )}
        </div>

        {/* Help Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Butuh bantuan? Hubungi kami:</p>
          <p className="font-medium text-gray-800 mt-1">
            📞 (021) 1234-5678 | 📧 ppdb@smknusantara.sch.id
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
