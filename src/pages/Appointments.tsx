import { useEffect, useState } from "react";
import api from "../service/api";
import Home from "../components/Home";
import Logout from "../components/Logout";
import type { Appointment } from "../types/Appointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function fetchAppointments() {
    const response = await api.get("/appointments");
    setAppointments(response.data);
  }

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
        </div>
      ))}
    </div>
  );
};

export default Appointments;
