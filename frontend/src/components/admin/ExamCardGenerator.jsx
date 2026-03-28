import { useState } from 'react';
import { FiX, FiDownload, FiPrinter } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExamCardGenerator = ({ exam, onClose }) => {
  const [generating, setGenerating] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const student = exam.student;
      const studentData = student?.data_siswa || {};

      // Header
      doc.setFillColor(51, 65, 85);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('KARTU PESERTA UJIAN', 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('PPDB SMK TAHUN 2024', 105, 30, { align: 'center' });

      // Reset text color
      doc.setTextColor(0, 0, 0);

      // Photo box (placeholder)
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(245, 245, 245);
      doc.rect(150, 50, 40, 50, 'FD');
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Foto 3x4', 170, 75, { align: 'center' });

      // Student Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMASI PESERTA', 20, 55);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const infoLines = [
        ['Nomor Peserta', ':', exam.nomor_peserta || '-'],
        ['Nomor Pendaftaran', ':', student?.nomor_pendaftaran || '-'],
        ['Nama Lengkap', ':', studentData.nama_lengkap || '-'],
        ['NISN', ':', studentData.nisn || '-'],
        ['NIK', ':', studentData.nik || '-'],
        ['Tempat/Tgl Lahir', ':', `${studentData.tempat_lahir || '-'}, ${studentData.tanggal_lahir ? new Date(studentData.tanggal_lahir).toLocaleDateString('id-ID') : '-'}`],
        ['Jenis Kelamin', ':', studentData.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan']
      ];

      let yPos = 65;
      infoLines.forEach(([label, sep, value]) => {
        doc.setFont('helvetica', 'normal');
        doc.text(label, 20, yPos);
        doc.text(sep, 75, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(value, 80, yPos);
        yPos += 7;
      });

      // Exam Info
      yPos += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMASI UJIAN', 20, yPos);

      doc.setFont('helvetica', 'normal');
      yPos += 10;

      const examLines = [
        ['Tanggal Ujian', ':', exam.tanggal_ujian ? new Date(exam.tanggal_ujian).toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : '-'],
        ['Waktu', ':', exam.waktu_ujian || '-'],
        ['Ruangan', ':', exam.ruangan || '-'],
        ['Lokasi', ':', exam.lokasi || '-']
      ];

      examLines.forEach(([label, sep, value]) => {
        doc.setFont('helvetica', 'normal');
        doc.text(label, 20, yPos);
        doc.text(sep, 75, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(value, 80, yPos);
        yPos += 7;
      });

      // Subjects
      yPos += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('MATA UJIAN', 20, yPos);

      yPos += 7;
      doc.setFont('helvetica', 'normal');
      const subjects = exam.mata_ujian || ['TPQ', 'Akademik', 'Wawancara'];
      subjects.forEach((subject, index) => {
        doc.text(`${index + 1}. ${subject}`, 25, yPos + (index * 7));
      });

      // Important notes
      yPos += 40;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('PENTING:', 20, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const notes = [
        '1. Hadir 30 menit sebelum ujian dimulai',
        '2. Membawa kartu tanda peserta ini',
        '3. Membawa alat tulis sendiri',
        '4. Menggunakan pakaian rapi dan sopan',
        '5. Tidak membawa HP/tas ke ruangan'
      ];

      notes.forEach((note, index) => {
        doc.text(note, 25, yPos + 7 + (index * 5));
      });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Dokumen ini sah dan ditandatangani secara elektronik', 105, 270, { align: 'center' });

      // Barcode placeholder
      doc.setDrawColor(0, 0, 0);
      doc.rect(75, 250, 60, 15);
      doc.setFontSize(8);
      doc.text(exam.nomor_peserta, 105, 260, { align: 'center' });

      // Save PDF
      doc.save(`Kartu-Ujian-${exam.nomor_peserta}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal generate PDF: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Kartu Peserta Ujian</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Preview Card */}
          <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 bg-white print:border-black">
            {/* Header */}
            <div className="bg-gray-800 text-white p-4 rounded-t mb-4 print:bg-black">
              <h3 className="text-xl font-bold text-center">KARTU PESERTA UJIAN</h3>
              <p className="text-center text-sm mt-1">PPDB SMK TAHUN 2024</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Student Info */}
              <div className="md:col-span-3 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-600">Nomor Peserta</span>
                  <span className="text-sm font-bold col-span-2">{exam.nomor_peserta || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-600">Nama</span>
                  <span className="text-sm font-medium col-span-2">{exam.student?.data_siswa?.nama_lengkap || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-600">NISN</span>
                  <span className="text-sm col-span-2">{exam.student?.data_siswa?.nisn || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-gray-600">Tanggal Lahir</span>
                  <span className="text-sm col-span-2">
                    {exam.student?.data_siswa?.tanggal_lahir 
                      ? new Date(exam.student.data_siswa.tanggal_lahir).toLocaleDateString('id-ID') 
                      : '-'}
                  </span>
                </div>
              </div>

              {/* Photo Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-xs">Foto 3x4</p>
                </div>
              </div>
            </div>

            {/* Exam Info */}
            <div className="mt-6 border-t pt-4">
              <h4 className="font-bold mb-3">INFORMASI UJIAN</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tanggal Ujian</p>
                  <p className="font-medium">{formatDate(exam.tanggal_ujian)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Waktu</p>
                  <p className="font-medium">{exam.waktu_ujian || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ruangan</p>
                  <p className="font-medium">{exam.ruangan || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lokasi</p>
                  <p className="font-medium">{exam.lokasi || '-'}</p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mt-4 border-t pt-4">
              <h4 className="font-bold mb-2">MATA UJIAN</h4>
              <ol className="list-decimal list-inside space-y-1">
                {(exam.mata_ujian || ['TPQ', 'Akademik', 'Wawancara']).map((subject, idx) => (
                  <li key={idx} className="text-sm">{subject}</li>
                ))}
              </ol>
            </div>

            {/* Notes */}
            <div className="mt-4 border-t pt-4">
              <h4 className="font-bold mb-2 text-sm">PENTING:</h4>
              <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600">
                <li>Hadir 30 menit sebelum ujian dimulai</li>
                <li>Membawa kartu tanda peserta ini</li>
                <li>Membawa alat tulis sendiri</li>
                <li>Menggunakan pakaian rapi dan sopan</li>
                <li>Tidak membawa HP/tas ke ruangan</li>
              </ol>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t text-center text-xs text-gray-500">
              <p>Dokumen ini sah dan ditandatangani secara elektronik</p>
              <p className="font-mono mt-1">{exam.nomor_peserta}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FiPrinter className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={generatePDF}
              disabled={generating}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FiDownload className="w-5 h-5" />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCardGenerator;
