import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
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
