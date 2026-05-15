import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useEffect, useState } from "react";
import api from "../service/api";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("users/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <Logout />
      <div>Bem vindo, {userData?.name || "Nome não encontrado"}</div>
      <p>Por onde vamos começar hoje?</p>
      <p>Use os atalhos abaixo para navegar pelo sistema</p>

      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/me"}>Meu Perfil</Link>
      <Link to={"/appointments"}>Ver Agendamentos</Link>
      <Link to={"/appointments/new"}>Criar um novo Agendamento</Link>
      <Link to={"/patient/new"}>Criar novo paciente</Link>
    </div>
  );
};

export default Home;
