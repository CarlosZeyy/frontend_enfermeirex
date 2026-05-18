import React, { useEffect } from "react";
import { useState } from "react";
import api from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HeartPulse, Lock, User } from "lucide-react";

const Login = () => {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }

    if (localStorage.getItem("refreshToken")) {
      navigate("/home");
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/login`, {
        login: identification,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/home");

      toast.success(
        <div>
          <span className="font-semibold">Seja bem vindo!</span>
          <br />
        </div>,
      );
    } catch (error) {
      console.error(error)
      toast.error(
        <div>
          <span className="font-semibold">Erro ao logar usuário!</span>
          <br />
          Verifique se o email e senha estão corretos
        </div>,
      );
    }
  };

  return (
<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 flex flex-col">
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-red-50 rounded-full mb-3">
            <HeartPulse className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Acessar o Enferm<span className="text-red-600">EX</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Insira suas credenciais para entrar no sistema
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              E-mail ou COREN
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="email@email.com ou COREN"
                value={identification}
                minLength={1}
                onChange={(e) => setIdentification(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mt-2"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Não possui uma conta?{" "}
            <Link
              to="/register"
              className="font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
