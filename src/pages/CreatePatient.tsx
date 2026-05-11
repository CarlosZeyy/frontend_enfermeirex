import React, { useState } from "react";
import api from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Home from "../components/Home";

const CreatePatient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [obs, setObs] = useState("");

  const navigate = useNavigate();

  async function handleCreatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/patients", {
        name,
        address,
        phone,
        obs,
      });

      navigate("/dashboard");

      toast.success(
        <div>
          <p className="font-semibold">Usuario criado com sucesso!</p>
          <br />
        </div>,
      );
    } catch (error) {
      toast.error(
        <div>
          <span className="font-semibold">Erro ao cadastrar paciente!</span>
          <br />
          Verifique se os dados foram preenchidos corretamente.
        </div>,
      );
    }
  }

  return (
    <div>
      <div>
        <Home />
        <Logout />
      </div>
      <form onSubmit={handleCreatePatient}>
        <label htmlFor="">Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="">Telefone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="">Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="">Observação:</label>
        <textarea
          placeholder="Campo de observação"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          maxLength={2000}
        ></textarea>

        <button type="submit" className="cursor-pointer">
          Cadastrar Paciente
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
