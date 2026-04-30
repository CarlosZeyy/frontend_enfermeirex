import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const Maps = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Maps("/");
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      <FaSignOutAlt />
    </button>
  );
};

export default Logout;
