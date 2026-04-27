import { useState, useEffect } from "react";
import api from "../service/api";
import type { Patient } from "../types/Patients";

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  async function searchPatients() {
    try {
      const response = await api.get("/patients");
      console.log(response.data);
      setPatients(response.data.content);
    } catch (error) {}
  }

  useEffect(() => {
    searchPatients();
  }, []);

  return (
    <div>
      <h1>Lista de pacientes</h1>

      {patients.map((patient) => (
        <div key={patient.id}>
          <p>Nome: {patient.name}</p>
          <p>Telefone: {patient.phone}</p>
          <p>Endereço: {patient.address}</p>
          <p>Observação: {patient.obs}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
