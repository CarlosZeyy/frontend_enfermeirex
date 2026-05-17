import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../service/api";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const icons = [
    "cerebro.png",
    "pico-pico.png",
    "choquinha.png",
    "zina.png",
    "pitinha.png",
    "jao.png",
    "maria.png",
    "nina.png",
    "ivonete.png",
    "nega.png",
    "zefa.png",
  ];

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
      await api.put("/users/username", {
        name: username,
      });

      toast.success("Nome atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar nome");
    }
  };

  const handleSwitchAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/users/avatar", {
        avatar: icon,
      });

      toast.success("Avatar atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar avatar de perfil");
    }
  };

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/users/me`);
      setIcon(response.data.avatar);
      setUsername(response.data.name);
    }

    getData();
  }, []);

  return (
    <>
      <div>Area do usuário</div>

      <div className="flex flex-col items-center mb-8 mt-4">
        <img
          src={icon ? `/icons/${icon}` : "/icons/anonimo.png"}
          alt="Meu Avatar"
          onClick={() => setIsModalOpen(true)}
          className="w-24 h-24 rounded-full object-cover border-4 bg-amber-300 border-blue-500 shadow-lg cursor-pointer hover:opacity-80 transition-all hover:scale-105"
        />

        <p className="mt-2 text-sm text-gray-600 font-medium">
          Clique na imagem para alterar
        </p>

        <button
          onClick={handleSwitchAvatar}
          className="mt-4 px-6 py-2 cursor-pointer bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salvar Avatar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              Escolha seu Avatar
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {icons.map((iconName) => (
                <img
                  key={iconName}
                  src={`/icons/${iconName}`}
                  alt={iconName}
                  onClick={() => {
                    setIcon(iconName);
                    setIsModalOpen(false);
                  }}
                  className={`w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 object-cover ${
                    icon === iconName
                      ? "border-4 border-blue-500 scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
