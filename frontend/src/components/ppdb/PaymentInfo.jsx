import { FiCreditCard, FiCheckCircle, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

const PaymentInfo = ({ onUploadClick, paymentData, studentId }) => {
  // Cicilan configuration
  const cicilanConfig = {
    totalBiaya: 1500000, // Total biaya pendaftaran
    cicilanPeriode: 3, // 3 kali cicilan
    cicilanPerBulan: 500000, // Per bulan
    
    // Detail cicilan
    cicilan: [
      {
        bulan: 1,
        jumlah: 500000,
        jatuhTempo: 'Saat pendaftaran',
        status: paymentData?.cicilan?.[0]?.status || 'unpaid',
        paidAt: paymentData?.cicilan?.[0]?.paidAt,
        buktiUrl: paymentData?.cicilan?.[0]?.buktiUrl
      },
      {
        bulan: 2,
        jumlah: 500000,
        jatuhTempo: '30 hari setelah cicilan 1',
        status: paymentData?.cicilan?.[1]?.status || 'unpaid',
        paidAt: paymentData?.cicilan?.[1]?.paidAt,
        buktiUrl: paymentData?.cicilan?.[1]?.buktiUrl
      },
      {
        bulan: 3,
        jumlah: 500000,
        jatuhTempo: '30 hari setelah cicilan 2',
        status: paymentData?.cicilan?.[2]?.status || 'unpaid',
        paidAt: paymentData?.cicilan?.[2]?.paidAt,
        buktiUrl: paymentData?.cicilan?.[2]?.buktiUrl
      }
    ]
  };

  const totalSudahBayar = cicilanConfig.cicilan
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.jumlah, 0);
  
  const sisaYangHarusDibayar = cicilanConfig.totalBiaya - totalSudahBayar;
  const progressPersen = (totalSudahBayar / cicilanConfig.totalBiaya) * 100;

  const getStatusInfo = (status) => {
    switch (status) {
      case 'unpaid':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: <FiAlertCircle className="w-5 h-5" />,
          label: 'Belum Bayar',
          message: 'Silakan lakukan pembayaran'
        };
      case 'pending':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <FiAlertCircle className="w-5 h-5" />,
          label: 'Menunggu Verifikasi',
          message: 'Pembayaran sedang diverifikasi'
        };
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: <FiCheckCircle className="w-5 h-5" />,
          label: 'Lunas',
          message: 'Pembayaran telah terverifikasi'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: <FiAlertCircle className="w-5 h-5" />,
          label: 'Ditolak',
          message: 'Pembayaran ditolak',
          action: 'Silakan upload bukti transfer yang benar'
        };
      default:
        return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getActiveCicilan = () => {
    return cicilanConfig.cicilan.find(c => c.status === 'unpaid' || c.status === 'pending') || cicilanConfig.cicilan[0];
  };

  const activeCicilan = getActiveCicilan();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiCreditCard className="w-6 h-6 text-blue-600" />
          Informasi Cicilan Pendaftaran
        </h2>
        <p className="text-gray-600 mt-1">
          Sistem cicilan ringan untuk biaya pendaftaran
        </p>
      </div>

      {/* Total Biaya & Progress */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-blue-100 text-sm mb-1">Total Biaya Pendaftaran</p>
          <p className="text-3xl font-bold">{formatCurrency(cicilanConfig.totalBiaya)}</p>
          <div className="mt-4 flex items-center gap-2 text-blue-100 text-sm">
            <FiTrendingUp className="w-4 h-4" />
            <span>Cicilan {cicilanConfig.cicilanPeriode}x bulan</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-green-100 text-sm mb-1">Sudah Dibayar</p>
          <p className="text-3xl font-bold">{formatCurrency(totalSudahBayar)}</p>
          <div className="mt-4">
            <div className="bg-green-700/50 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${progressPersen}%` }}
              />
            </div>
            <p className="text-green-100 text-xs mt-2">{progressPersen.toFixed(0)}% lunas</p>
          </div>
        </div>
      </div>

      {/* Sisa Pembayaran */}
      {sisaYangHarusDibayar > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-800">Sisa Pembayaran</h3>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {formatCurrency(sisaYangHarusDibayar)}
              </p>
              <p className="text-sm text-orange-700 mt-2">
                Cicilan aktif: <span className="font-semibold">Bulan ke-{activeCicilan.bulan}</span> - {formatCurrency(activeCicilan.jumlah)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detail Cicilan */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiCreditCard className="w-5 h-5" />
          Detail Cicilan
        </h3>
        <div className="space-y-3">
          {cicilanConfig.cicilan.map((cicilan, index) => {
            const statusInfo = getStatusInfo(cicilan.status);
            return (
              <div
                key={index}
                className={`border rounded-xl p-4 transition-all ${
                  cicilan.status === 'paid' 
                    ? 'bg-green-50 border-green-200' 
                    : cicilan.status === 'pending'
                    ? 'bg-blue-50 border-blue-200'
                    : cicilan.status === 'rejected'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      cicilan.status === 'paid'
                        ? 'bg-green-500 text-white'
                        : cicilan.status === 'pending'
                        ? 'bg-blue-500 text-white'
                        : cicilan.status === 'rejected'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {cicilan.bulan}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Cicilan Bulan {cicilan.bulan}
                      </p>
                      <p className="text-sm text-gray-600">
                        Jatuh tempo: {cicilan.jatuhTempo}
                      </p>
                      {cicilan.paidAt && (
                        <p className="text-xs text-green-600 mt-1">
                          Lunas pada: {new Date(cicilan.paidAt).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(cicilan.jumlah)}
                    </p>
                    {statusInfo && (
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mt-1 ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bank Accounts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiCreditCard className="w-5 h-5" />
          Transfer ke Rekening Berikut:
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { bank: 'BCA', account: '1234567890', name: 'SMK Nusantara' },
            { bank: 'BRI', account: '0987654321', name: 'SMK Nusantara' },
            { bank: 'BNI', account: '1122334455', name: 'SMK Nusantara' }
          ].map((acc, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-gray-800">{acc.bank}</p>
              <p className="text-sm text-gray-600 mt-1">{acc.account}</p>
              <p className="text-xs text-gray-500">{acc.name}</p>
              <button
                onClick={() => navigator.clipboard.writeText(acc.account)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800"
              >
                📋 Salin
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      {(activeCicilan.status === 'unpaid' || activeCicilan.status === 'rejected') && (
        <button
          onClick={onUploadClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <FiAlertCircle className="w-5 h-5" />
          Upload Bukti Transfer Cicilan {activeCicilan.bulan}
        </button>
      )}

      {activeCicilan.status === 'pending' && (
        <div className="text-center py-4 bg-blue-50 rounded-xl">
          <FiAlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-blue-800 font-semibold">
            Menunggu verifikasi cicilan bulan ke-{activeCicilan.bulan}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Proses verifikasi memakan waktu maksimal 2x24 jam
          </p>
        </div>
      )}

      {progressPersen === 100 && (
        <div className="text-center py-4 bg-green-50 rounded-xl">
          <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-bold text-lg">
            🎉 Selamat! Cicilan Telah Lunas
          </p>
          <p className="text-sm text-green-600 mt-1">
            Semua pembayaran telah terverifikasi. Silakan lanjutkan ke tahap berikutnya.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
