import { useState } from 'react';
import { FiUpload, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { paymentAPI } from '@services/api';

const PaymentUpload = ({ studentId, onUploadSuccess, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bank_name: '',
    transfer_date: '',
    amount: '150000'
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    setError('');
    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    setError('');
    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Silakan pilih file bukti transfer');
      return;
    }

    if (!formData.bank_name || !formData.transfer_date) {
      setError('Lengkapi informasi pembayaran');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload file to backend using multer
      await paymentAPI.uploadProof(selectedFile, studentId);

      // Call parent callback
      await onUploadSuccess({
        status: 'pending',
        bank_name: formData.bank_name,
        transfer_date: formData.transfer_date,
        amount: parseInt(formData.amount),
        uploaded_at: new Date().toISOString()
      });

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setFormData({
        bank_name: '',
        transfer_date: '',
        amount: '150000'
      });

      onClose();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Gagal mengupload file. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Upload Bukti Transfer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <FiAlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Informasi Pembayaran</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Transfer <span className="text-red-500">*</span>
                </label>
                <select
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Bank</option>
                  <option value="BCA">BCA</option>
                  <option value="BRI">BRI</option>
                  <option value="BNI">BNI</option>
                  <option value="MANDIRI">Mandiri</option>
                  <option value="LAINNYA">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Transfer <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="transfer_date"
                  value={formData.transfer_date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nominal Transfer (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Upload Bukti Transfer</h3>
            
            {!selectedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag & drop file di sini, atau <span className="text-blue-600 font-semibold">klik untuk memilih</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Format: JPG, PNG, PDF | Maksimal 2MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiUpload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {!preview && selectedFile.type === 'application/pdf' && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600">📄 File PDF akan diupload</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="text-gray-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={uploading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  <FiCheck className="w-5 h-5" />
                  Upload & Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentUpload;
