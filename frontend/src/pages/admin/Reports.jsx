import { useState, useEffect } from 'react';
import { FiBarChart2, FiUsers, FiDollarSign, FiAward, FiDownload, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/services/firebase';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all');
  const [reportData, setReportData] = useState({
    students: [],
    payments: [],
    exams: []
  });
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    registrationsToday: 0,
    registrationsThisWeek: 0,
    totalPayments: 0,
    paidAmount: 0,
    pendingPayments: 0,
    totalExams: 0,
    passedExams: 0,
    byMajor: {},
    byGender: {},
    byStatus: {},
    registrationTrend: [],
    majorDistribution: [],
    paymentStatus: []
  });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      // Fetch all students
      const studentsSnapshot = await getDocs(collection(db, 'students'));
      const students = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch payments
      const payments = students.filter(s => s.pembayaran);

      // Fetch exams
      const examsSnapshot = await getDocs(collection(db, 'exams'));
      const exams = examsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setReportData({ students, payments, exams });
      calculateStats(students, payments, exams);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (students, payments, exams) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Registration stats
    let registrationsToday = 0;
    let registrationsThisWeek = 0;
    const byMajor = {};
    const byGender = { L: 0, P: 0 };
    const byStatus = {};
    const registrationTrend = {};

    students.forEach(student => {
      const createdAt = student.created_at?.toDate ? student.created_at.toDate() : new Date();
      
      if (createdAt >= today) registrationsToday++;
      if (createdAt >= weekAgo) registrationsThisWeek++;

      // By major
      const major = student.pilihan_jurusan?.pilihan_1 || 'Unknown';
      byMajor[major] = (byMajor[major] || 0) + 1;

      // By gender
      const gender = student.data_siswa?.jenis_kelamin || 'Unknown';
      byGender[gender] = (byGender[gender] || 0) + 1;

      // By status
      const status = student.status || 'Unknown';
      byStatus[status] = (byStatus[status] || 0) + 1;

      // Trend by date
      const dateKey = createdAt.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
      registrationTrend[dateKey] = (registrationTrend[dateKey] || 0) + 1;
    });

    // Payment stats
    let totalPayments = 0;
    let paidAmount = 0;
    let pendingPayments = 0;
    const paymentStatus = {
      unpaid: 0,
      pending: 0,
      paid: 0,
      rejected: 0
    };

    payments.forEach(payment => {
      const p = payment.pembayaran;
      if (p) {
        totalPayments++;
        if (p.status === 'paid') {
          paidAmount += p.amount || 0;
        }
        if (p.status === 'pending') {
          pendingPayments++;
        }
        paymentStatus[p.status || 'unpaid'] = (paymentStatus[p.status || 'unpaid'] || 0) + 1;
      }
    });

    // Exam stats
    const passedExams = exams.filter(e => e.keterangan === 'Lulus').length;

    // Format trend data for chart
    const trendData = Object.entries(registrationTrend).map(([date, count]) => ({
      date,
      registrations: count
    })).slice(-14); // Last 14 data points

    // Format major distribution for pie chart
    const majorData = Object.entries(byMajor).map(([name, value]) => ({
      name,
      value
    }));

    // Format payment status for bar chart
    const paymentData = Object.entries(paymentStatus).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));

    setStats({
      totalRegistrations: students.length,
      registrationsToday,
      registrationsThisWeek,
      totalPayments,
      paidAmount,
      pendingPayments,
      totalExams: exams.length,
      passedExams,
      byMajor,
      byGender,
      byStatus,
      registrationTrend: trendData,
      majorDistribution: majorData,
      paymentStatus: paymentData
    });
  };

  const exportToExcel = (type) => {
    let data = [];
    let filename = '';

    if (type === 'students') {
      data = reportData.students.map(s => ({
        'No. Pendaftaran': s.nomor_pendaftaran,
        'Nama': s.data_siswa?.nama_lengkap,
        'NISN': s.data_siswa?.nisn,
        'Jurusan': s.pilihan_jurusan?.pilihan_1,
        'Status': s.status,
        'Tanggal Daftar': s.created_at?.toDate ? s.created_at.toDate().toLocaleDateString('id-ID') : '-'
      }));
      filename = 'Data_Pendaftaran.xlsx';
    } else if (type === 'payments') {
      data = reportData.payments.map(p => ({
        'No. Pendaftaran': p.nomor_pendaftaran,
        'Nama': p.data_siswa?.nama_lengkap,
        'Status Pembayaran': p.pembayaran?.status,
        'Nominal': p.pembayaran?.amount || 0,
        'Bank': p.pembayaran?.bank_name,
        'Tanggal Upload': p.pembayaran?.uploaded_at ? new Date(p.pembayaran.uploaded_at).toLocaleDateString('id-ID') : '-'
      }));
      filename = 'Data_Pembayaran.xlsx';
    } else if (type === 'exams') {
      data = reportData.exams.map(e => ({
        'No. Peserta': e.nomor_peserta,
        'Nama': e.student?.data_siswa?.nama_lengkap,
        'Tanggal Ujian': e.tanggal_ujian ? new Date(e.tanggal_ujian).toLocaleDateString('id-ID') : '-',
        'Status': e.status,
        'Total Nilai': e.nilai?.total || '-',
        'Keterangan': e.keterangan || '-'
      }));
      filename = 'Data_Ujian.xlsx';
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, filename);
  };

  const exportToPDF = (type) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Laporan PPDB Online', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 105, 30, { align: 'center' });

    let tableData = [];
    let headers = [];

    if (type === 'summary') {
      doc.text('Ringkasan Pendaftaran', 14, 45);
      tableData = [
        ['Total Pendaftaran', stats.totalRegistrations.toString()],
        ['Hari Ini', stats.registrationsToday.toString()],
        ['Minggu Ini', stats.registrationsThisWeek.toString()],
        ['Total Pembayaran', stats.totalPayments.toString()],
        ['Lunas', stats.paymentStatus.find(p => p.name === 'Paid')?.value || 0],
        ['Total Ujian', stats.totalExams.toString()],
        ['Lulus', stats.passedExams.toString()]
      ];
      headers = ['Keterangan', 'Jumlah'];
    }

    doc.autoTable = autoTable;
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 50,
    });

    doc.save(`Laporan_PPDB_${new Date().getTime()}.pdf`);
  };

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b sticky top-16 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiBarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-800">Laporan & Analytics</h1>
                <p className="text-xs text-gray-600">Dashboard laporan dan statistik PPDB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
              >
                <option value="all">Semua Waktu</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
              </select>
              <button
                onClick={() => exportToPDF('summary')}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-lg hover:shadow-xl"
              >
                <FiDownload className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={() => exportToExcel('students')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-lg hover:shadow-xl"
              >
                <FiDownload className="w-4 h-4" />
                Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Overview Stats - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <StatCard 
            title="Total Pendaftaran" 
            value={stats.totalRegistrations} 
            sub={`+${stats.registrationsToday} hari ini`}
            icon={<FiUsers className="w-5 h-5" />}
            color="from-blue-500 via-cyan-500 to-blue-600"
          />
          <StatCard 
            title="Total Pembayaran" 
            value={stats.totalPayments} 
            sub={`Rp ${stats.paidAmount.toLocaleString('id-ID')} lunas`}
            icon={<FiDollarSign className="w-5 h-5" />}
            color="from-green-500 via-emerald-500 to-green-600"
          />
          <StatCard 
            title="Total Ujian" 
            value={stats.totalExams} 
            sub={`${stats.passedExams} lulus`}
            icon={<FiAward className="w-5 h-5" />}
            color="from-purple-500 via-pink-500 to-purple-600"
          />
          <StatCard 
            title="Minggu Ini" 
            value={stats.registrationsThisWeek} 
            sub="Pendaftaran baru"
            icon={<FiCalendar className="w-5 h-5" />}
            color="from-orange-500 via-red-500 to-orange-600"
          />
        </div>

        {/* Tabs - Compact */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-white/50">
          <div className="border-b">
            <nav className="flex gap-2 px-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 border-b-2 font-bold text-sm transition-all ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('registrations')}
                className={`py-3 px-4 border-b-2 font-bold text-sm transition-all ${
                  activeTab === 'registrations'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Pendaftaran
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-3 px-4 border-b-2 font-bold text-sm transition-all ${
                  activeTab === 'payments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Pembayaran
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                className={`py-3 px-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'exams'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Ujian
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Registration Trend */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Tren Pendaftaran</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={stats.registrationTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="registrations" stroke="#667eea" strokeWidth={2} name="Pendaftaran" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Major Distribution */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Distribusi Jurusan</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={stats.majorDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {stats.majorDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600">Laki-laki</p>
                    <p className="text-2xl font-bold text-blue-800">{stats.byGender.L || 0}</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="text-sm text-pink-600">Perempuan</p>
                    <p className="text-2xl font-bold text-pink-800">{stats.byGender.P || 0}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600">Pembayaran Lunas</p>
                    <p className="text-2xl font-bold text-green-800">
                      {stats.paymentStatus.find(p => p.name === 'Paid')?.value || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Registrations Tab */}
            {activeTab === 'registrations' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Laporan Pendaftaran</h3>
                  <button
                    onClick={() => exportToExcel('students')}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export Excel
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Daftar</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jurusan</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.students.slice(0, 50).map(student => (
                        <tr key={student.id}>
                          <td className="px-4 py-3 text-sm font-mono">{student.nomor_pendaftaran}</td>
                          <td className="px-4 py-3 text-sm">{student.data_siswa?.nama_lengkap}</td>
                          <td className="px-4 py-3 text-sm">{student.pilihan_jurusan?.pilihan_1}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {student.created_at?.toDate ? student.created_at.toDate().toLocaleDateString('id-ID') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Laporan Pembayaran</h3>
                  <button
                    onClick={() => exportToExcel('payments')}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export Excel
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Status Pembayaran</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={stats.paymentStatus}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#667eea" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <div className="space-y-3">
                      {stats.paymentStatus.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-bold text-gray-800">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Laporan Ujian</h3>
                  <button
                    onClick={() => exportToExcel('exams')}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <FiDownload className="w-4 h-4" />
                    Export Excel
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600">Total Peserta</p>
                    <p className="text-2xl font-bold text-blue-800">{stats.totalExams}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600">Lulus</p>
                    <p className="text-2xl font-bold text-green-800">{stats.passedExams}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-600">Tidak Lulus</p>
                    <p className="text-2xl font-bold text-red-800">{stats.totalExams - stats.passedExams}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact Stat Card Component
const StatCard = ({ title, value, sub, icon, color }) => (
  <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-white/50">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-semibold truncate">{title}</p>
        <p className="text-2xl font-black text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-green-600 font-bold mt-1 truncate">{sub}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
        {icon}
      </div>
    </div>
  </div>
);

export default AdminReports;
