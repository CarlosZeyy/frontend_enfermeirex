import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeartPulse,
  Stethoscope,
  ArrowRight,
  Calendar,
  Pill,
  ClipboardList,
} from "lucide-react";
import { FaUserMd } from "react-icons/fa";

const features = [
  {
    icon: <Calendar className="w-8 h-8 text-red-600" />,
    title: "Agendamentos Inteligentes",
    desc: "Organize seus horários de atendimento home care em tempo real com controle automático de status expirados.",
  },
  {
    icon: <Pill className="w-8 h-8 text-red-600" />,
    title: "Gestão de Medicamentos",
    desc: "Controle prescrições, dosagens e alertas de medicamentos contínuos para garantir a segurança do tratamento.",
  },
  {
    icon: <ClipboardList className="w-8 h-8 text-red-600" />,
    title: "Prontuários Eletrônicos",
    desc: "Acesse históricos médicos completos, evoluções clínicas e faça upload seguro de documentos e exames.",
  },
];

const Welcome = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }

    if (localStorage.getItem("refreshToken")) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900">
      <nav className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tighter">
              Enferm<span className="text-red-600">EX</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="flex gap-2 justify-center items-center">
                <FaUserMd />
                <p>Entrar</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-700 mb-4">
              <Stethoscope className="w-4 h-4 mr-2" />
              Gestão Inteligente para Profissionais da Saúde
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-tight">
              Sua clínica,
              <br />
              organizada <span className="text-red-600">como nunca.</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
              O EnfermEX simplifica o agendamento de pacientes, prontuários e
              documentos. Foque no cuidado, nós cuidamos da organização.
            </p>

            <div className="pt-8">
              <Link
                to="/login"
                className="inline-flex items-center px-10 py-4 bg-red-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 md:mt-0 flex justify-center">
            <img
              src="/welcomePage.png"
              alt="Profissional de saúde segurando tablet"
              className="w-full h-auto max-w-md mx-auto md:max-w-full rounded-3xl shadow-2xl drop-shadow-xl"
            />
          </div>
        </div>
      </main>

      <div className="w-full bg-white border-y border-gray-100 py-12 mt-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 shadow-sm min-h-55 flex flex-col items-center justify-center transition-all duration-300">
            <div className="p-3 bg-white rounded-full shadow-sm mb-4">
              {features[currentSlide].icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {features[currentSlide].title}
            </h3>
            <p className="text-gray-600 text-sm max-w-sm">
              {features[currentSlide].desc}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-red-600"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-100 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EnfermEX. Todos os direitos
          reservados. Projeto de Gestão Home Care.
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          Desenvolvido por{" "}
          <a
            href="https://github.com/CarlosZeyy"
            className="cursor-pointer underline"
          >
            Carlos Moises
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
