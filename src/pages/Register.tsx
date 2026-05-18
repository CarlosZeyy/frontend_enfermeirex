import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../service/api";
import { HeartPulse } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coren, setCoren] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!coren) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!password) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!name) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    try {
      await api.post(`/auth/register`, {
        email: email,
        password: password,
        coren: coren,
        name: name,
      });

      navigate("/login");

      toast.success(
        <div>
          <span className="font-semibold">Conta criada com sucesso!</span>
          <br />
        </div>,
      );
    } catch (error: any) {
      console.error(error);

      const backendMessage =
        error.response?.data?.message || "Erro desconhecido ao criar usuário!";

      toast.error(
        <div>
          <span className="font-semibold">Erro ao criar usuário!</span>
          <br />
          {backendMessage}
        </div>,
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-red-50 rounded-full mb-3">
            <HeartPulse className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Criar Conta Enferm<span className="text-red-600">EX</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Cadastre seu perfil profissional de Home Care
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Seu nome profissional"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu-email@provedor.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Inscrição COREN
            </label>
            <input
              type="text"
              placeholder="COREN-SP 123456-ENF"
              value={coren}
              onChange={(e) => setCoren(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Senha de Acesso
            </label>
            <input
              type="password"
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mt-4"
          >
            Concluir Cadastro
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Já possui cadastro?{" "}
            <Link
              to="/login"
              className="font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Faça login por aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
