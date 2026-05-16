import { useState, useEffect } from "react";
import api from "../service/api";
import type { Patient } from "../types/Patients";
import Logout from "../components/Logout";
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

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
      );
    } catch (error) {
      console.error(error);

      toast.error(
        <div>
          <span className="font-semibold">Erro ao apagar paciente!</span>
          <br />
          <p>Verifique se o paciente não possui nenhum agendamento marcado.</p>
        </div>,
      );
    }
  }

  const navigate = useNavigate();

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase()),
  );

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

      <input
        type="text"
        placeholder="Digite o nome do paciente aqui"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPatients.map((patient) => (
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
            onClick={() => navigate("/patient/edit", { state: patient })}
          />

          <FaClipboardList
            className="cursor-pointer"
            onClick={() => navigate("/patient/record", { state: patient })}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
