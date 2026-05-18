import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { BadgeInfo, ShieldAlert, UserCog } from "lucide-react";
import Home from "../components/Home";
import Logout from "../components/Logout";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [coren, setCoren] = useState("");
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
      setEmail(response.data.email);
      setCoren(response.data.coren);
    }

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <UserCog className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Meu Perfil
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* COLUNA ESQUERDA: AVATAR */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-fit">
            <img
              src={icon ? `/icons/${icon}` : "/icons/anonimo.png"}
              alt="Avatar"
              onClick={() => setIsModalOpen(true)}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md cursor-pointer hover:opacity-80 transition-all hover:scale-105 mb-4"
            />
            <p className="text-sm text-gray-500 mb-6">
              Clique na imagem para alterar
            </p>
            <button
              onClick={handleSwitchAvatar}
              className="w-full py-2.5 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Salvar Imagem
            </button>
          </div>

          {/* COLUNA DIREITA: DADOS E SENHA */}
          <div className="md:col-span-2 space-y-6">
            {/* SEUS DADOS: NOME, EMAIL E COREN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2 flex items-center gap-2">
                <BadgeInfo className="w-5 h-5 text-red-600" /> Informações
                Pessoais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    E-mail Cadastrado
                  </span>
                  <p className="text-sm font-medium text-gray-800">
                    {email || "Carregando..."}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Registro COREN
                  </span>
                  <p className="text-sm font-medium text-gray-800">
                    {coren || "Carregando..."}
                  </p>
                </div>
              </div>

              {/* SEU FORMULÁRIO DE NOME */}
              <form
                className="flex gap-4 items-end"
                onSubmit={handleSwitchUsername}
              >
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-100 text-gray-800 font-bold rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Atualizar Nome
                </button>
              </form>
            </div>

            {/* SEU FORMULÁRIO DE SENHA */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">
                Segurança da Conta
              </h2>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      placeholder="Confirme a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* SEU TEXTO DE DICA DE SENHA */}
                <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-2 border border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    A senha precisa ter pelo menos 6 caracteres, é recomendado
                    colocar letras Maiúsculas, Minúsculas, Números e Caracteres
                    especiais. ex:(Senh@123)
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md w-full md:w-auto cursor-pointer"
                  >
                    {isLoading ? "Enviando..." : "Redefinir Senha"}
                  </button>
                </div>
              </form>
            </div>

            {/* SEU LINK DE VOLTAR */}
            <div className="text-center pt-2">
              <Link
                to={"/home"}
                className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
              >
                &larr; Voltar para a página principal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE AVATARES */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
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
                  className={`w-16 h-16 rounded-full cursor-pointer transition-all hover:scale-110 object-cover ${icon === iconName ? "border-4 border-red-500 shadow-md" : "opacity-60 hover:opacity-100"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
