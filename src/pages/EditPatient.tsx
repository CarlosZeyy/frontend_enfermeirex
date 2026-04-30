import { useEffect, useState } from "react";
import api from "../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Logout from "../components/Logout";
import Home from "../components/Home";

const EditPatient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [obs, setObs] = useState("");

  const location = useLocation();
  const patient = location.state;

  const Maps = useNavigate();

  async function handleUpdatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.put(`/patients/${patient.id}`, {
        id: patient.id,
        name,
        address,
        phone,
        obs,
      });

      Maps("/dashboard");

      toast.success(
        <div>
          <p className="font-semibold">Usuario atualizado com sucesso!</p>
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
          <span className="font-semibold">Erro ao atualizar paciente!</span>
          <br />
          Verifique se os dados foram preenchidos corretamente.
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
  }

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setPhone(patient.phone);
      setAddress(patient.address);
      setObs(patient.obs);
    }
  }, [patient]);

  return (
    <div>
      <div>
        <Home />
        <Logout />
      </div>
      <form onSubmit={handleUpdatePatient}>
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
          Atualizar Paciente
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
