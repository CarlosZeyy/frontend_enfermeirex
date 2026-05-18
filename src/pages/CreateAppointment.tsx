import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SelectOption } from "../types/SelectOption";
import api from "../service/api";
import { toast } from "react-toastify";
import Select from "react-select";
import { CalendarPlus } from "lucide-react";
import Logout from "../components/Logout";
import Home from "../components/Home";

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
        </div>,
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

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.75rem",
      borderColor: "#e5e7eb",
      padding: "0.3rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#ef4444" },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#ef4444"
        : state.isFocused
          ? "#fef2f2"
          : "white",
      color: state.isSelected ? "white" : "#1f2937",
    }),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <CalendarPlus className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Novo Agendamento
          </h1>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleCreateAppointment} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Selecione o Paciente
              </label>
              <Select
                options={patients}
                value={selectedPatient}
                onChange={(option) => setSelectedPatient(option)}
                placeholder="Buscar nome do paciente..."
                isSearchable={true}
                styles={customSelectStyles}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Data e Hora da Visita
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
