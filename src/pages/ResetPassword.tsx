import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../service/api";
import { ShieldCheck, Unlock } from "lucide-react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warning(
        "Senha inválida, confira se os campos foram preenchidos corretamente",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.warning(
        "Senhas não coincidem, confira se as senhas foram digitadas corretamente",
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "A senha precisa ter pelo menos 6 caracteres, é recomendado colocar letras Maisculas, Minusculas, Números e Caracteres especiais. ex:(Senh@123)",
      );
      return;
    }

    try {
      setIsLoading(true);

      await api.post(`auth/reset-password`, {
        token: token,
        newPassword: password,
      });

      toast.success("Senha redefinida com sucesso.");
      toast.info(
        "Aguarde alguns segundos estamos te redirecionando para a tela de login",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error: any) {
      const backendError =
        error.response?.data?.message || "Erro ao solicitar nova senha";

      console.error(error);
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
        
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-red-50 rounded-full mb-3">
            <Unlock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Criar Nova Senha
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Escolha uma senha forte para acessar o sistema
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              value={password}
              placeholder="Digite sua nova senha"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirme a Nova Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirme sua nova senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Dica de Segurança */}
          <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3 mt-4 border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              Sua senha deve ter pelo menos <span className="font-bold">6 caracteres</span>. Recomendamos o uso de letras maiúsculas, minúsculas, números e símbolos (ex: Senh@123).
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-bold rounded-xl transition-all shadow-md transform mt-6 ${
              isLoading 
                ? "bg-red-400 cursor-not-allowed" 
                : "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? "Salvando..." : "Redefinir e Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
