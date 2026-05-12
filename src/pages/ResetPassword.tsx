import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../service/api";

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
    <>
      <div>
        <form onSubmit={handleResetPassword}>
          <p></p>
          <label htmlFor="">Digite a nova senha:</label>
          <input
            type="password"
            value={password}
            placeholder="Digite sua nova senha aqui"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">confirme a nova senha:</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirme sua nova senha aqui"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="cursor-pointer" disabled={isLoading}>
            {isLoading === true ? "Enviando..." : "Redefinir senha"}
          </button>
        </form>
      </div>

      <div>
        A senha precisa ter pelo menos 6 caracteres, é recomendado colocar
        letras Maisculas, Minusculas, Números e Caracteres especiais.
        ex:(Senh@123)
      </div>
    </>
  );
};

export default ResetPassword;
