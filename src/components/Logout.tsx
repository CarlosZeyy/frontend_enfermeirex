import { useNavigate } from "react-router-dom";

const Logout = () => {
  const Maps = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Maps("/");
  };
  return <button onClick={handleLogout} className="cursor-pointer">Sair</button>;
};

export default Logout;
