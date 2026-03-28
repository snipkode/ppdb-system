import { useState, useEffect } from 'react';
import { FiBarChart2, FiUsers, FiDollarSign, FiAward, FiDownload, FiTrendingUp, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui';
import AdminLayout from '@/components/layout/AdminLayout';
import StatCard from '@/components/ui/StatCard';
import Breadcrumb from '@/components/ui/Breadcrumb';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [reportData, setReportData] = useState({ students: [], payments: [], exams: [] });
  const [stats, setStats] = useState({
    totalRegistrations: 0,
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
    const byMajor = {};
    const byGender = { L: 0, P: 0 };
    const registrationTrend = {};

    students.forEach(student => {
      const major = student.pilihan_jurusan?.pilihan_1 || 'Unknown';
      byMajor[major] = (byMajor[major] || 0) + 1;
      const gender = student.data_siswa?.jenis_kelamin || 'Unknown';
      byGender[gender] = (byGender[gender] || 0) + 1;
      const date = student.created_at?.toDate ? student.created_at.toDate().toLocaleDateString('id-ID', { month: 'short' }) : 'Unknown';
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

  const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  if (loading) return (
    <LoadingState message="Memuat laporan..." />
  );

  if (reportData.students.length === 0) {
    return (
      <EmptyState
        type="noStudents"
        title="Belum Ada Data Laporan"
        message="Laporan akan tersedia setelah ada siswa yang mendaftar"
      />
    );
  }

  return (
    <AdminLayout title="Laporan & Analytics" subtitle="Dashboard komprehensif PPDB">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumb showHome={false} items={[{ label: 'Laporan', href: '/admin/reports' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FiBarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-white">Laporan & Analytics</h1>
                <p className="text-xs text-white/80 hidden md:block">Dashboard komprehensif PPDB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={exportXLSX} className="flex items-center gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-xs md:text-sm font-semibold text-white">
                <FiDownload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden md:inline">XLSX</span>
              </button>
              <button onClick={exportPDF} className="flex items-center gap-1.5 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-xs md:text-sm font-semibold text-white">
                <FiDownload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden md:inline">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total Siswa" value={stats.totalRegistrations} color="from-blue-500 to-cyan-500" icon={<FiUsers />} size="md" />
          <StatCard label="Pembayaran" value={stats.totalPayments} color="from-green-500 to-emerald-500" icon={<FiDollarSign />} size="md" />
          <StatCard label="Lunas" value={stats.paymentStatus[0]?.value || 0} color="from-purple-500 to-pink-500" icon={<FiCheck />} size="md" />
          <StatCard label="Pending" value={stats.pendingPayments} color="from-yellow-500 to-orange-500" icon={<FiCalendar />} size="md" />
          <StatCard label="Total Ujian" value={stats.totalExams} color="from-indigo-500 to-blue-500" icon={<FiAward />} size="md" />
          <StatCard label="Lulus" value={stats.passedExams} color="from-red-500 to-rose-500" icon={<FiTrendingUp />} size="md" />
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-2">
          <div className="flex gap-1 overflow-x-auto">
            {['overview', 'registrations', 'payments', 'majors'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-4 mb-8">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'registrations' && <RegistrationsTab stats={stats} />}
        {activeTab === 'payments' && <PaymentsTab stats={stats} />}
        {activeTab === 'majors' && <MajorsTab stats={stats} />}
      </div>
    </AdminLayout>
  );
};

// Overview Tab
const OverviewTab = ({ stats }) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      {/* Registration Trend */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FiTrendingUp className="w-4 h-4 text-purple-600" />
          Trend Pendaftaran
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.registrationTrend}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} />
              <YAxis stroke="#9CA3AF" fontSize={10} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FiDollarSign className="w-4 h-4 text-green-600" />
          Status Pembayaran
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.paymentStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={({ name, value }) => `${name}: ${value}`} fontSize={10}>
                {stats.paymentStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Gender Distribution */}
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <FiUsers className="w-4 h-4 text-blue-600" />
        Distribusi Gender
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <p className="text-3xl font-bold text-blue-600">{stats.byGender.L || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Laki-laki</p>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-xl">
          <p className="text-3xl font-bold text-pink-600">{stats.byGender.P || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Perempuan</p>
        </div>
      </div>
    </div>
  </div>
);

// Registrations Tab
const RegistrationsTab = ({ stats }) => (
  <div className="space-y-4">
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Trend Pendaftaran per Bulan</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.registrationTrend}>
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} />
            <YAxis stroke="#9CA3AF" fontSize={10} />
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
            <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Payments Tab
const PaymentsTab = ({ stats }) => (
  <div className="space-y-4">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Status Pembayaran</h3>
        <div className="space-y-3">
          {stats.paymentStatus.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.name === 'Lunas' ? 'bg-green-500' :
                  item.name === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Ringkasan</h3>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-600">Total Lunas</p>
            <p className="text-lg font-bold text-green-700">Rp {stats.paidAmount.toLocaleString('id-ID')}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-600">Menunggu</p>
            <p className="text-lg font-bold text-yellow-700">{stats.pendingPayments} pembayaran</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Majors Tab
const MajorsTab = ({ stats }) => (
  <div className="space-y-4">
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Distribusi Jurusan</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={stats.majorDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`} fontSize={10}>
              {stats.majorDistribution.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      {stats.majorDistribution.map((major, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
            <span className="text-sm font-medium text-gray-800">{major.name}</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{major.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AdminReports;
