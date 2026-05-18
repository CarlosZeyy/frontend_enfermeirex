import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import { toast } from "react-toastify";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [identification, setIdentification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identification) {
      toast.error(
        <div>
          <p className="font-semibold">
            Por favor informe um EMAIL ou COREN válidos
          </p>
          <br />
          <p>Digite um EMAIL ou COREN válido e tente novamente</p>
        </div>,
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post(`auth/forgot-password`, {
        identification: identification,
      });

      console.log(response.data);

      toast.info(
        <div>
          <p className="font-semibold">{response.data.message}</p>
          <br />
        </div>,
      );

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      const backendError =
        error.response?.data?.message || "Erro ao solicitar nova senha";
      toast.error(
        <div>
          <p className="font-semibold">Erro ao solicitar nova senha</p>
          <br />
          <p>{backendError}</p>
        </div>,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-red-50 rounded-full mb-3">
            <KeyRound className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight text-center">
            Recuperar Senha
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Digite seu E-mail ou COREN vinculado à conta para receber as
            instruções de recuperação.
          </p>
        </div>

        <form onSubmit={handleEmailMessage} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Identificação
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={identification}
                placeholder="email@provedor.com ou COREN-SP..."
                onChange={(e) => setIdentification(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-bold rounded-xl transition-all shadow-md transform ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
            } mt-2`}
          >
            {isLoading ? "Enviando..." : "Solicitar nova senha"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Lembrou da sua senha?{" "}
            <Link
              to="/"
              className="font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              <div className="flex justify-center items-center gap-1">
                <ArrowLeft /> Voltar 
              </div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
