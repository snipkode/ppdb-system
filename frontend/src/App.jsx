import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Notification from '@/components/Notification';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import Status from '@/pages/Status';

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <Header />
        <Notification />
        <main className="container mx-auto px-4 py-6 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="container mx-auto px-4 py-6 text-center text-white/80 text-sm">
          <p>© {new Date().getFullYear()} PPDB Online. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
