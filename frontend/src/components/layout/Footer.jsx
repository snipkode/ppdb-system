import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock, FiFacebook, FiInstagram, FiYoutube, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Profil', href: '/about' },
    { name: 'Jurusan', href: '/majors' },
    { name: 'Berita', href: '/news' },
    { name: 'Kontak', href: '/contact' },
  ];

  const majors = [
    { name: 'RPL', href: '/majors/rpl' },
    { name: 'TKJ', href: '/majors/tkj' },
    { name: 'AKL', href: '/majors/akl' },
    { name: 'MM', href: '/majors/mm' },
    { name: 'TBSM', href: '/majors/tbsm' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FiFacebook, href: '#' },
    { name: 'Instagram', icon: FiInstagram, href: '#' },
    { name: 'YouTube', icon: FiYoutube, href: '#' },
    { name: 'Twitter', icon: FiTwitter, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">SMK Nusantara</h3>
                <p className="text-xs text-gray-400">Unggul • Kompeten • Berkarakter</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Mencetak generasi unggul, kompeten, dan berkarakter untuk menghadapi tantangan global di era digital.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jurusan */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
              Program Keahlian
            </h4>
            <ul className="space-y-2">
              {majors.map((major) => (
                <li key={major.name}>
                  <Link
                    to={major.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    • {major.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
              Kontak Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  Jl. Pendidikan No. 123, Jakarta Selatan<br />
                  DKI Jakarta 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">info@smknusantara.sch.id</span>
              </li>
              <li className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  Senin - Jumat: 07:00 - 16:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} SMK Nusantara. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
