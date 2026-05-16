import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SelectOption } from "../types/SelectOption";
import api from "../service/api";
import { toast } from "react-toastify";
import Select from "react-select";

const CreateAppointment = () => {
  const [selectedPatient, setSelectedPatient] = useState<SelectOption | null>(
    null,
  );
  const [date, setDate] = useState("");
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPatients = async () => {
      const response = await api.get(`/patients`);

      const formatedOptions = response.data.content.map((patient: any) => {
        return {
          value: patient.id,
          label: patient.name,
        };
      });

      setPatients(formatedOptions);
    };

    loadPatients();
  }, []);

  async function handleCreateAppointment(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/appointments", {
        patientId: selectedPatient?.value,
        data: date,
      });

      navigate("/appointments");

      toast.success(
        <div>
          <p className="font-semibold">Agendamento criado com sucesso!</p>
        </div>
      );
    } catch (error) {
      console.error("Erro ao criar agendamento", error);
      toast.error(
        <div>
          <p className="font-semibold">Erro ao criar agendamento</p>
        </div>,
      );
    }
  }

  return (
    <div>
      <h2>Novo Agendamento</h2>

      <form onSubmit={handleCreateAppointment}>
        <label>Selecione o paciente:</label>

        <Select
          options={patients}
          value={selectedPatient}
          onChange={(option) => setSelectedPatient(option)}
          placeholder="Digite o nome do paciente..."
          isSearchable={true}
        />

        <label>Data e Hora da visita:</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className="cursor-pointer">
          Agendar Visita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
