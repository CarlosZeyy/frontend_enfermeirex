import React from "react";
import { useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Maps = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/login`, {
        login: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      Maps("/home");

      toast.success(
        <div>
          <span className="font-semibold">Seja bem vindo!</span>
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
          <span className="font-semibold">Erro ao logar usuário!</span>
          <br />
          Verifique se o email e senha estão corretos
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
        <form onSubmit={handleLogin}>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            placeholder="Ex: Senh@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
