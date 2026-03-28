import HeroSection from '@/components/home/HeroSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Placeholder sections - akan dibuat selanjutnya */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-600">
            Sections lainnya sedang dalam pengembangan
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
