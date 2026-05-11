import React from "react";
import { useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");

  const Maps = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/login`, {
        login: identification,
        password: password,
      });

      localStorage.setItem("token", response.data.token);

      Maps("/home");

      toast.success(
        <div>
          <span className="font-semibold">Seja bem vindo!</span>
          <br />
        </div>,
      );
    } catch (error) {
      console.error(error)
      toast.error(
        <div>
          <span className="font-semibold">Erro ao logar usuário!</span>
          <br />
          Verifique se o email e senha estão corretos
        </div>,
      );
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="">Email ou COREN:</label>
          <input
            type="text"
            placeholder="email@email.com ou COREN-SP 123456-SP"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
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
