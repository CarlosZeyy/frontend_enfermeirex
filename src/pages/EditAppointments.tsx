import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../service/api";
import Home from "../components/Home";
import Logout from "../components/Logout";
import { toast } from "react-toastify";
import { CalendarCheck } from "lucide-react";

const EditAppointments = () => {
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  const location = useLocation();
  const appointment = location.state;

  const navigate = useNavigate();

  async function handleUpdateAppointment(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.put(`/appointments/${appointment.appointmentId}`, {
        appointmentId: appointment.appointmentId,
        patientId: appointment.patientId,
        data,
        status,
      });

      navigate("/appointments");

      toast.success(
        <div>
          <p className="font-semibold">Agendamento atualizado com sucesso!</p>
          <br />
        </div>,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        <div>
          <span className="font-semibold">Erro ao atualizar agendamento!</span>
          <br />
          <p>Horario não disponivel para agendamento.</p>
          <br />
          <p>
            Verifique se não possui outro agendamento marcado para esse horario.
          </p>
        </div>,
      );
    }
  }

  useEffect(() => {
    if (appointment) {
      setData(appointment.data);
      setStatus(appointment.status);
    }
  }, [appointment]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <CalendarCheck className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Editar Agendamento
          </h1>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleUpdateAppointment} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Data e Hora
              </label>
              <input
                type="datetime-local"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Status do Atendimento
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all bg-white"
              >
                <option value="AGENDADO">AGENDADO</option>
                <option value="CONCLUIDO">CONCLUIDO</option>
                <option value="CANCELADO">CANCELADO</option>
                <option value="EXPIRADO">EXPIRADO</option>
              </select>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
              >
                Atualizar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAppointments;
