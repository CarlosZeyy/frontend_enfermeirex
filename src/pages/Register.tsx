import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../service/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coren, setCoren] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!coren) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!password) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    if (!name) {
      toast.warning("Preencha todos os campos corretamente");
      return;
    }

    try {
      await api.post(`/auth/register`, {
        email: email,
        password: password,
        coren: coren,
        name: name,
      });

      navigate("/login");

      toast.success(
        <div>
          <span className="font-semibold">Conta criada com sucesso!</span>
          <br />
        </div>,
      );
    } catch (error: any) {
      console.error(error);

      const backendMessage =
        error.response?.data?.message || "Erro desconhecido ao criar usuário!";

      toast.error(
        <div>
          <span className="font-semibold">Erro ao criar usuário!</span>
          <br />
          {backendMessage}
        </div>,
      );
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleRegister}>
          <label htmlFor="">Nome:</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            value={email}
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Coren:</label>
          <input
            type="text"
            placeholder="COREN-SP 123456-ENF"
            value={coren}
            onChange={(e) => setCoren(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            placeholder="Senh@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            Registrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
