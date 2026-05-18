import { useEffect, useState } from "react";
import api from "../service/api";
import Home from "../components/Home";
import Logout from "../components/Logout";
import type { Appointment } from "../types/Appointment";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { CalendarDays } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function fetchAppointments() {
    const response = await api.get("/appointments");
    setAppointments(response.data);
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/appointments/${id}`);

      const updatedList = appointments.filter(
        (appointment) => appointment.appointmentId !== id,
      );

      setAppointments(updatedList);

      toast.success(
        <div>
          <span className="font-semibold">Agendamento apagado com sucesso</span>
        </div>,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        <div>
          <span className="font-semibold">Erro ao apagar agendamentro!</span>
        </div>,
      );
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <CalendarDays className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Histórico de Agendamentos
          </h1>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">
              Nenhum agendamento encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentId}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {appointment.patientName}
                  </h3>
                  <div className="space-y-1 mb-6">
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-800">Data/Hora:</strong>{" "}
                      {new Date(appointment.data).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-800">Status:</strong>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-md text-xs font-bold ${
                          appointment.status === "CONCLUIDO"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "CANCELADO"
                              ? "bg-red-100 text-red-700"
                              : appointment.status === "EXPIRADO"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleDelete(appointment.appointmentId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Apagar"
                  >
                    <FaTrash size={16} />
                  </button>
                  <button
                    onClick={() =>
                      navigate("/appointments/edit", { state: appointment })
                    }
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Editar"
                  >
                    <FaEdit size={18} />
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

export default Appointments;
