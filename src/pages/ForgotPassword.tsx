import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [identification, setIdentification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identification) {
      toast.error(
        <div>
          <p className="font-semibold">
            Por favor informe um EMAIL ou COREN válidos
          </p>
          <br />
          <p>Digite um EMAIL ou COREN válido e tente novamente</p>
        </div>,
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post(`auth/forgot-password`, {
        identification: identification,
      });

      console.log(response.data);

      toast.info(
        <div>
          <p className="font-semibold">{response.data.message}</p>
          <br />
        </div>,
      );

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      const backendError =
        error.response?.data?.message || "Erro ao solicitar nova senha";
      toast.error(
        <div>
          <p className="font-semibold">Erro ao solicitar nova senha</p>
          <br />
          <p>{backendError}</p>
        </div>,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleEmailMessage}>
          <label htmlFor="">
            Digite seu email ou COREN para solicitar a senha nova:
          </label>
          <input
            type="text"
            value={identification}
            placeholder="Digite seu email ou COREN aqui"
            onChange={(e) => setIdentification(e.target.value)}
          />
          <button type="submit" className="cursor-pointer" disabled={isLoading}>
            {isLoading === true ? "Enviando..." : "Solicitar nova senha"}
          </button>
        </form>
      </div>

      <div>
        Voltar para a pagina inicial?
        <Link to={"/"}>Voltar</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
