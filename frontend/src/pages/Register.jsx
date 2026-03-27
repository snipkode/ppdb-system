import RegistrationForm from '@/components/RegistrationForm';

const Register = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Formulir Pendaftaran
        </h1>
        <p className="text-white/90">
          Lengkapi data di bawah ini untuk mendaftar
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Register;
