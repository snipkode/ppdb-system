import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full blur-3xl animate-mesh-1"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-full blur-3xl animate-mesh-2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-mesh-3"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 md:space-y-8">
            {/* Badge with Glow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-lg shadow-blue-500/20 animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide">PPDB 2024/2025 TELAH DIBUKA</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block">SMK</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  NUSANTARA
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Mencetak generasi <span className="text-white font-semibold">unggul</span>, <span className="text-white font-semibold">kompeten</span>, dan <span className="text-white font-semibold">berkarakter</span> untuk menghadapi tantangan global.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
              >
                <span>Daftar Sekarang</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border border-white/30 hover:bg-white/20 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiPlay className="w-5 h-5" />
                <span>Video Profil</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 pt-6 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <QuickStat value="1.2K" label="Siswa" />
              <QuickStat value="85+" label="Guru" />
              <QuickStat value="8" label="Prodi" />
              <QuickStat value="A" label="Akreditasi" />
            </div>
          </div>

          {/* Right Content - Modern 3D Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative animate-float-slow">
              {/* Main Glass Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-purple-500/20">
                {/* SVG Illustration */}
                <svg viewBox="0 0 400 350" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background Elements */}
                  <circle cx="200" cy="175" r="160" fill="url(#heroGrad1)" className="animate-pulse-slow" />
                  <circle cx="200" cy="175" r="120" fill="url(#heroGrad2)" className="animate-pulse-slower" />
                  
                  {/* School Building */}
                  <g className="animate-float-building">
                    <rect x="130" y="120" width="140" height="130" rx="12" fill="white" opacity="0.95" />
                    <polygon points="120,120 200,65 280,120" fill="#fbbf24" opacity="0.9" />
                    <rect x="150" y="145" width="35" height="35" rx="6" fill="#3b82f6" opacity="0.8" />
                    <rect x="215" y="145" width="35" height="35" rx="6" fill="#3b82f6" opacity="0.8" />
                    <rect x="182" y="200" width="36" height="50" rx="6" fill="#10b981" opacity="0.8" />
                    <circle cx="200" cy="95" r="18" fill="white" opacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.6;0.9" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  
                  {/* Orbiting Icons */}
                  <g className="animate-orbit-slow">
                    <circle cx="330" cy="90" r="22" fill="#fbbf24" opacity="0.7" />
                    <text x="330" y="96" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">📚</text>
                  </g>
                  <g className="animate-orbit-medium">
                    <circle cx="70" cy="260" r="20" fill="#10b981" opacity="0.7" />
                    <text x="70" y="266" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">🎓</text>
                  </g>
                  <g className="animate-orbit-fast">
                    <circle cx="330" cy="280" r="18" fill="#8b5cf6" opacity="0.7" />
                    <text x="330" y="286" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">🏆</text>
                  </g>
                </svg>

                {/* Floating Badges */}
                <div className="absolute -top-5 -right-5 bg-white rounded-2xl p-4 shadow-xl shadow-purple-500/20 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-lg">A</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Akreditasi</div>
                      <div className="text-xs text-gray-500">Unggul</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl shadow-blue-500/20 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">95%</div>
                      <div className="text-xs text-gray-500">Lulusan Bekerja</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs font-medium">Scroll</span>
          <svg className="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m5-5l-5 5-5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

const QuickStat = ({ value, label }) => (
  <div className="text-center group">
    <div className="text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
      {value}
    </div>
    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
  </div>
);

export default HeroSection;
