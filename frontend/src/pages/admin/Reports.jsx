import { useState, useEffect } from 'react';
import { FiBarChart2, FiUsers, FiDollarSign, FiAward, FiDownload, FiCalendar, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
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
  const [reportData, setReportData] = useState({ students: [], payments: [], exams: [] });
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    registrationsToday: 0,
    totalPayments: 0,
    paidAmount: 0,
    pendingPayments: 0,
    totalExams: 0,
    passedExams: 0,
    byMajor: {},
    byGender: {},
    registrationTrend: [],
    majorDistribution: [],
    paymentStatus: []
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const studentsSnapshot = await getDocs(collection(db, 'students'));
      const students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const payments = students.filter(s => s.pembayaran);
      const examsSnapshot = await getDocs(collection(db, 'exams'));
      const exams = examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setReportData({ students, payments, exams });
      calculateStats(students, payments, exams);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (students, payments, exams) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const byMajor = {};
    const byGender = { L: 0, P: 0 };
    const registrationTrend = {};

    students.forEach(student => {
      const createdAt = student.created_at?.toDate ? student.created_at.toDate() : new Date();
      if (createdAt >= today) stats.registrationsToday++;
      const major = student.pilihan_jurusan?.pilihan_1 || 'Unknown';
      byMajor[major] = (byMajor[major] || 0) + 1;
      const gender = student.data_siswa?.jenis_kelamin || 'Unknown';
      byGender[gender] = (byGender[gender] || 0) + 1;
      const date = createdAt.toLocaleDateString('id-ID', { month: 'short' });
      registrationTrend[date] = (registrationTrend[date] || 0) + 1;
    });

    let paidAmount = 0, pendingPayments = 0;
    payments.forEach(p => {
      if (p.pembayaran?.status === 'paid') paidAmount += p.pembayaran?.amount || 0;
      else if (p.pembayaran?.status === 'pending') pendingPayments++;
    });

    const passedExams = exams.filter(e => e.keterangan === 'Lulus').length;

    setStats({
      totalRegistrations: students.length,
      registrationsToday,
      totalPayments: payments.length,
      paidAmount,
      pendingPayments,
      totalExams: exams.length,
      passedExams,
      byMajor,
      byGender,
      registrationTrend: Object.entries(registrationTrend).map(([name, value]) => ({ name, value })),
      majorDistribution: Object.entries(byMajor).map(([name, value]) => ({ name, value })),
      paymentStatus: [
        { name: 'Lunas', value: payments.filter(p => p.pembayaran?.status === 'paid').length },
        { name: 'Pending', value: pendingPayments },
        { name: 'Belum', value: payments.filter(p => !p.pembayaran || p.pembayaran.status === 'unpaid').length }
      ]
    });
  };

  const exportXLSX = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(reportData.students.map(s => ({
      Nomor: s.nomor_pendaftaran,
      Nama: s.data_siswa?.nama_lengkap,
      Jurusan: s.pilihan_jurusan?.pilihan_1,
      Status: s.status
    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'Laporan-PPDB.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Laporan PPDB SMK Nusantara', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['No', 'Nama', 'Jurusan', 'Status']],
      body: reportData.students.map((s, i) => [i + 1, s.data_siswa?.nama_lengkap, s.pilihan_jurusan?.pilihan_1, s.status]),
    });
    doc.save('Laporan-PPDB.pdf');
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header - Compact */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FiBarChart2 className="w-7 h-7" />
                Laporan & Analytics
              </h1>
              <p className="text-white/80 text-sm mt-1">Dashboard komprehensif PPDB</p>
            </div>
            <div className="flex gap-2">
              <button onClick={exportXLSX} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-semibold">
                <FiDownload className="w-4 h-4" /> XLSX
              </button>
              <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all text-sm font-semibold">
                <FiDownload className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <StatCard icon={<FiUsers />} label="Total Daftar" value={stats.totalRegistrations} color="from-blue-500 to-cyan-500" />
          <StatCard icon={<FiTrendingUp />} label="Hari Ini" value={stats.registrationsToday} color="from-green-500 to-emerald-500" />
          <StatCard icon={<FiDollarSign />} label="Total Bayar" value={stats.totalPayments} color="from-purple-500 to-pink-500" />
          <StatCard icon={<FiCheck />} label="Lunas" value={`Rp ${(stats.paidAmount / 1000000).toFixed(1)}Jt`} color="from-orange-500 to-red-500" />
          <StatCard icon={<FiAward />} label="Total Ujian" value={stats.totalExams} color="from-indigo-500 to-blue-500" />
          <StatCard icon={<FiCheck />} label="Lulus" value={stats.passedExams} color="from-yellow-500 to-orange-500" />
        </div>

        {/* Tabs - Compact */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-white/50 overflow-hidden">
          <div className="flex gap-1 p-2 bg-slate-50 border-b">
            {['overview', 'registrations', 'payments', 'exams'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-4">
                <ChartCard title="Trend Pendaftaran" icon={<FiTrendingUp />}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stats.registrationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Distribusi Jurusan" icon={<FiUsers />}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={stats.majorDistribution} cx="50%" cy="50%" outerRadius={60} labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`} dataKey="value">
                        {stats.majorDistribution.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Status Pembayaran" icon={<FiDollarSign />}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={stats.paymentStatus}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Gender" icon={<FiUsers />}>
                  <div className="flex items-center justify-center h-[200px] gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">{stats.byGender.L || 0}</div>
                      <div className="text-sm text-gray-600 mt-1">Laki-laki</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-pink-600">{stats.byGender.P || 0}</div>
                      <div className="text-sm text-gray-600 mt-1">Perempuan</div>
                    </div>
                  </div>
                </ChartCard>
              </div>
            )}

            {activeTab === 'registrations' && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">No. Pendaftaran</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Jurusan</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.students.slice(0, 50).map((s, i) => (
                      <tr key={i} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-xs">{s.nomor_pendaftaran}</td>
                        <td className="px-4 py-3">{s.data_siswa?.nama_lengkap}</td>
                        <td className="px-4 py-3">{s.pilihan_jurusan?.pilihan_1}</td>
                        <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Siswa</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.payments.slice(0, 50).map((p, i) => (
                      <tr key={i} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-3">{p.data_siswa?.nama_lengkap}</td>
                        <td className="px-4 py-3">Rp {p.pembayaran?.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3"><StatusBadge status={p.pembayaran?.status} /></td>
                        <td className="px-4 py-3 text-xs">{p.pembayaran?.uploaded_at ? new Date(p.pembayaran.uploaded_at.toDate()).toLocaleDateString('id-ID') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">No. Peserta</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Tanggal</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.exams.slice(0, 50).map((e, i) => (
                      <tr key={i} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-xs">{e.nomor_peserta}</td>
                        <td className="px-4 py-3">{e.student?.data_siswa?.nama_lengkap}</td>
                        <td className="px-4 py-3 text-xs">{e.tanggal_ujian ? new Date(e.tanggal_ujian.toDate()).toLocaleDateString('id-ID') : '-'}</td>
                        <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all">
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2`}>
      {icon}
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const ChartCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-100">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
    </div>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    submitted: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    verified: 'bg-blue-100 text-blue-700',
    ujian: 'bg-purple-100 text-purple-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    paid: 'bg-green-100 text-green-700',
    unpaid: 'bg-red-100 text-red-700',
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700'
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
};

export default AdminReports;
