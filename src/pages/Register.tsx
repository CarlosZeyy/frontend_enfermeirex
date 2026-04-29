import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import api from "../service/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coren, setCoren] = useState("");

  const Maps = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/register`, {
        email: email,
        password: password,
        coren: coren,
      });

      localStorage.setItem("token", response.data.token);

      Maps("/login");

      toast.success(
        <div>
          <span className="font-semibold">Conta criada com sucesso!</span>
          <br />
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        },
      );
    } catch (error) {
      toast.error(
        <div>
          <span className="font-semibold">Erro ao criar usuário!</span>
          <br />
          Verifique se os campos de email, COREN e senha estão corretos.
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        },
      );
    }
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Coren:</label>
          <input
            type="text"
            value={coren}
            onChange={(e) => setCoren(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister} className="cursor-pointer">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
