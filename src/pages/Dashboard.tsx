import { useState, useEffect } from "react";
import api from "../service/api";
import type { Patient } from "../types/Patients";
import Logout from "../components/Logout";
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  async function searchPatients() {
    try {
      const response = await api.get("/patients");
      setPatients(response.data.content);
    } catch (error) {
      toast.error(
        <div>
          <span className="font-semibold">Erro ao carregar pacientes!</span>
          <br />
          Verifique sua conexão e tente novamente!
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

  async function handleDeletePatient(id: number) {
    try {
      await api.delete(`/patients/${id}`);

      const patientsListUpdated = patients.filter(
        (patient) => patient.id !== id,
      );

      setPatients(patientsListUpdated);

      toast.success(
        <div>
          <span className="font-semibold">Paciente apagado com sucesso</span>
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
    } catch (error) {
      console.error(error);

      toast.error(
        <div>
          <span className="font-semibold">Erro ao apagar paciente!</span>
          <br />
          <p>Verifique se o paciente não possui nenhum agendamento marcado.</p>
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

  const Maps = useNavigate();

  useEffect(() => {
    searchPatients();
  }, []);

  return (
    <div>
      <div>
        <Home />
        <Logout />
      </div>
      <h1>Lista de pacientes</h1>

      {patients.map((patient) => (
        <div key={patient.id}>
          <p>Nome: {patient.name}</p>
          <p>Telefone: {patient.phone}</p>
          <p>Endereço: {patient.address}</p>
          <p>Observação: {patient.obs}</p>
          <FaTrash
            className="cursor-pointer"
            onClick={() => handleDeletePatient(patient.id)}
          />

          <FaEdit
            className="cursor-pointer"
            onClick={() => Maps("/patient/edit", { state: patient })}
          />

          <FaClipboardList
            className="cursor-pointer"
            onClick={() => Maps("/patient/record", { state: patient })}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
