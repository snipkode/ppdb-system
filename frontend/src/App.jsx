import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Notification from '@/components/Notification';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import Status from '@/pages/Status';

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-8">
        <Header />
        <Notification />
        <main className="container mx-auto px-4 py-6 md:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
