import { useState } from "react";
import { toast } from "react-toastify";
import api from "../service/api";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !newPassword || !confirmPassword) {
      toast.warning(
        "Senha inválida, confira se os campos foram preenchidos corretamente",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning(
        "Senhas não coincidem, confira se as senhas foram digitadas corretamente",
      );
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "A senha precisa ter pelo menos 6 caracteres, é recomendado colocar letras Maisculas, Minusculas, Números e Caracteres especiais. ex:(Senh@123)",
      );
      return;
    }

    if (password === newPassword || password === confirmPassword) {
      toast.warning("A nova senha deve ser diferente da senha atual.");
      return;
    }

    try {
      setIsLoading(true);

      await api.put(`/users/password`, {
        currentPassword: password,
        newPassword: newPassword,
      });

      toast.success("Senha redefinida com sucesso.");
      toast.info(
        "Aguarde alguns segundos estamos te redirecionando para a tela de login",
      );

      localStorage.removeItem("token");

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

  const handleSwitchUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put("/users/username", {
        name: username,
      });

      console.log(response.data);
    } catch (error) {}
  };

  return (
    <>
      <div>Area do usuário</div>

      <div>
        <form onSubmit={handleSwitchUsername}>
          <label>Trocar nome de usuário:</label>
          <input
            type="text"
            placeholder="Digite o nome aqui"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Atualizar nome</button>
        </form>
      </div>

      <div>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="">Digite sua senha atual:</label>
          <input
            type="password"
            value={password}
            placeholder="Digite sua senha atual"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">Digite a nova senha:</label>
          <input
            type="password"
            value={newPassword}
            placeholder="Digite sua nova senha aqui"
            onChange={(e) => setNewPassword(e.target.value)}
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

      <div>
        Voltar para a pagina principal?
        <Link to={"/home"}>Voltar</Link>
      </div>
    </>
  );
};

export default Profile;
