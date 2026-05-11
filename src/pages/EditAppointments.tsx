import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../service/api";
import Home from "../components/Home";
import Logout from "../components/Logout";
import { toast } from "react-toastify";

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
    <div>
      <div>
        <Home />
        <Logout />
      </div>
      <form onSubmit={handleUpdateAppointment}>
        <label>Data: </label>
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="AGENDADO">AGENDADO</option>
          <option value="CONCLUIDO">CONCLUIDO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>

        <button type="submit" className="cursor-pointer">
          Atualizar Agendamento
        </button>
      </form>
    </div>
  );
};

export default EditAppointments;
