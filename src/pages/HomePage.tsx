import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const Home = () => {
  return (
    <div>
      <Logout />
      <h1>Bem vindo, {"nome do usuario"}</h1>
      <p>Por onde vamos começar hoje?</p>
      <p>Use os atalhos abaixo para navegar pelo sistema</p>

      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/appointments"}>Agendamentos</Link>
      <Link to={"/patient/new"}>Criar novo paciente</Link>
    </div>
  );
};

export default Home;
