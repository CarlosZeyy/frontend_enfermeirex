import { useState, useEffect } from "react";
import api from "../service/api";
import type { Patient } from "../types/Patients";
import Logout from "../components/Logout";
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Home from "../components/Home";
import { Search } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      {/* HEADER NAV */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        
        {/* TÍTULO E BUSCA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Meus Pacientes
          </h1>
          
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar pelo nome do paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* GRID DE PACIENTES */}
        {filteredPatients.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Nenhum paciente encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 wrap-break-word">
                    {patient.name}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-800">Tel:</strong> {patient.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-800">End:</strong> {patient.address}
                    </p>
                    {patient.obs && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-gray-600 italic border border-slate-100 line-clamp-3">
                        {patient.obs}
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleDeletePatient(patient.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Apagar Paciente"
                  >
                    <FaTrash size={18} />
                  </button>

                  <button 
                    onClick={() => navigate("/patient/edit", { state: patient })}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Editar Paciente"
                  >
                    <FaEdit size={19} />
                  </button>

                  <button 
                    onClick={() => navigate("/patient/record", { state: patient })}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-gray-700 font-semibold rounded-lg hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                    title="Acessar Prontuário"
                  >
                    <FaClipboardList size={16} />
                    <span className="text-sm">Prontuário</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
