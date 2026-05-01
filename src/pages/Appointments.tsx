import { useEffect, useState } from "react";
import api from "../service/api";
import Home from "../components/Home";
import Logout from "../components/Logout";
import type { Appointment } from "../types/Appointment";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

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
          <span className="font-semibold">Erro ao apagar agendamentro!</span>
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
    fetchAppointments();
  }, []);

  return (
    <div>
      <div>
        <Home />
        <Logout />
      </div>
      <div>Lista de agendamentos</div>
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId}>
          <p>Nome do paciente: {appointment.patientName}</p>
          <p>Data: {new Date(appointment.data).toLocaleString("pt-BR")}</p>
          <p>Status: {appointment.status}</p>
          <FaTrash
            className="cursor-pointer"
            onClick={() => handleDelete(appointment.appointmentId)}
          />
          <button
            className="cursor-pointer"
            onClick={() => Maps("/appointments/edit", { state: appointment })}
          >
            <FaEdit />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
