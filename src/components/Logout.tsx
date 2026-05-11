import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      <FaSignOutAlt />
    </button>
  );
};

export default Logout;
