import { FiClipboard } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';

export const EmptyState = ({ filter, hasSearch, onAdd, availableStudents }) => (
  <div className="py-16 px-4 text-center">
    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <FiClipboard className="w-12 h-12 text-blue-600" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">
      {hasSearch ? 'Tidak Ada Hasil Pencarian' : 
       filter === 'scheduled' ? 'Belum Ada Jadwal Terjadwal' :
       filter === 'completed' ? 'Belum Ada Ujian Selesai' :
       'Belum Ada Jadwal Ujian'}
    </h3>
    <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
      {hasSearch ? 'Coba kata kunci lain atau ubah filter' : 
       filter === 'scheduled' ? 'Semua jadwal sudah selesai dilaksanakan' :
       filter === 'completed' ? 'Belum ada ujian yang selesai dilaksanakan' :
       availableStudents > 0 
         ? `Ada ${availableStudents} siswa yang belum dijadwalkan ujian. Yuk buat jadwal!`
         : 'Semua siswa sudah dijadwalkan atau sudah ujian'}
    </p>
    {!hasSearch && filter !== 'completed' && availableStudents > 0 && (
      <button onClick={onAdd} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-semibold text-sm">
        <FiPlus className="w-4 h-4" /> Buat Jadwal Pertama
      </button>
    )}
    {hasSearch && (
      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Reset Pencarian</button>
    )}
  </div>
);

export const EmptyStateExamResults = ({ filter, hasSearch }) => (
  <div className="py-16 px-4 text-center">
    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center">
      <FiClipboard className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">
      {hasSearch ? 'Tidak Ada Hasil' : filter === 'scheduled' ? 'Belum Ada Ujian Terjadwal' : filter === 'completed' ? 'Belum Ada Ujian Selesai' : 'Belum Ada Data'}
    </h3>
    <p className="text-gray-500 text-sm max-w-md mx-auto">
      {hasSearch ? 'Coba kata kunci lain atau ubah filter' : 
       filter === 'scheduled' ? 'Semua peserta sudah dinilai. Bagus!' :
       filter === 'completed' ? 'Belum ada ujian yang selesai dinilai' :
       'Data ujian akan muncul setelah jadwal dibuat'}
    </p>
    {hasSearch && (
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Reset Pencarian</button>
    )}
  </div>
);
