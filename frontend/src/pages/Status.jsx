import StatusChecker from '@/components/StatusChecker';

const Status = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Cek Status Pendaftaran
        </h1>
        <p className="text-white/90">
          Masukkan ID pendaftaran Anda untuk melihat status
        </p>
      </div>
      <StatusChecker />
    </div>
  );
};

export default Status;
