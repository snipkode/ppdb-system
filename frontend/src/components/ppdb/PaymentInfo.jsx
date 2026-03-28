import { FiCreditCard, FiDollarSign, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const PaymentInfo = ({ onUploadClick, paymentData }) => {
  // Bank accounts for payment
  const bankAccounts = [
    {
      bank: 'BCA',
      accountNumber: '1234567890',
      accountName: 'SMK Negeri 1',
      icon: '🏦'
    },
    {
      bank: 'BRI',
      accountNumber: '0987654321',
      accountName: 'SMK Negeri 1',
      icon: '🏛️'
    },
    {
      bank: 'BNI',
      accountNumber: '1122334455',
      accountName: 'SMK Negeri 1',
      icon: '🏢'
    }
  ];

  const paymentStatus = paymentData?.status || 'unpaid';
  const paymentAmount = 150000; // Biaya pendaftaran

  const getStatusInfo = () => {
    switch (paymentStatus) {
      case 'unpaid':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: <FiAlertCircle className="w-6 h-6" />,
          label: 'Belum Bayar',
          message: 'Silakan lakukan pembayaran biaya pendaftaran'
        };
      case 'pending':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <FiAlertCircle className="w-6 h-6" />,
          label: 'Menunggu Verifikasi',
          message: 'Pembayaran sedang diverifikasi oleh admin'
        };
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: <FiCheckCircle className="w-6 h-6" />,
          label: 'Lunas',
          message: 'Pembayaran telah terverifikasi'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <FiAlertCircle className="w-6 h-6" />,
          label: 'Ditolak',
          message: paymentData?.rejected_reason || 'Pembayaran ditolak',
          action: 'Silakan upload bukti transfer yang benar'
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatusInfo();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiDollarSign className="w-6 h-6 text-blue-600" />
          Informasi Pembayaran
        </h2>
        <p className="text-gray-600 mt-1">
          Biaya Pendaftaran PPDB Online
        </p>
      </div>

      {/* Payment Amount */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <p className="text-blue-100 text-sm mb-1">Biaya Pendaftaran</p>
        <p className="text-3xl font-bold">{formatCurrency(paymentAmount)}</p>
      </div>

      {/* Status Banner */}
      {statusInfo && (
        <div className={`border-l-4 ${statusInfo.color.split(' ')[0]} ${statusInfo.color} rounded-r-lg p-4`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{statusInfo.icon}</div>
            <div>
              <h3 className="font-semibold">{statusInfo.label}</h3>
              <p className="text-sm mt-1">{statusInfo.message}</p>
              {statusInfo.action && (
                <p className="text-sm mt-2 font-medium">{statusInfo.action}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bank Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiCreditCard className="w-5 h-5" />
          Transfer ke Rekening Berikut:
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {bankAccounts.map((account, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{account.icon}</div>
              <h4 className="font-semibold text-gray-800">{account.bank}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {account.accountNumber}
              </p>
              <p className="text-sm text-gray-600">{account.accountName}</p>
              <button
                onClick={() => navigator.clipboard.writeText(account.accountNumber)}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                📋 Salin Nomor Rekening
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">📝 Cara Pembayaran:</h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="font-semibold">1.</span>
            <span>Transfer biaya pendaftaran ke salah satu rekening di atas</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">2.</span>
            <span>Pastikan nominal transfer sesuai (Rp 150.000)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">3.</span>
            <span>Simpan bukti transfer dengan baik</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">4.</span>
            <span>Upload bukti transfer di form bawah</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">5.</span>
            <span>Tunggu verifikasi dari admin (maks. 2x24 jam)</span>
          </li>
        </ol>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Penting:</h3>
        <ul className="space-y-1 text-sm text-yellow-700">
          <li>• Foto bukti transfer harus jelas dan terbaca</li>
          <li>• Ukuran file maksimal 2MB</li>
          <li>• Format file: JPG, PNG, atau PDF</li>
          <li>• Pastikan nama pengirim sesuai dengan nama calon siswa</li>
          <li>• Pembayaran yang tidak sesuai akan ditolak</li>
        </ul>
      </div>

      {/* Upload Button */}
      {paymentStatus === 'unpaid' || paymentStatus === 'rejected' ? (
        <button
          onClick={onUploadClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FiAlertCircle className="w-5 h-5" />
          Upload Bukti Transfer
        </button>
      ) : paymentStatus === 'pending' ? (
        <div className="text-center py-4">
          <p className="text-gray-600">
            Menunggu verifikasi dari admin sekolah
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Proses verifikasi memakan waktu maksimal 2x24 jam
          </p>
        </div>
      ) : paymentStatus === 'paid' ? (
        <div className="text-center py-4 bg-green-50 rounded-lg">
          <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-semibold">
            Pembayaran Telah Terverifikasi
          </p>
          <p className="text-sm text-green-600 mt-1">
            Terima kasih! Silakan lanjutkan proses pendaftaran.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentInfo;
