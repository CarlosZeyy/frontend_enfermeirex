import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useEffect, useState } from "react";
import api from "../service/api";
import type { Appointment } from "../types/Appointment";

const Home = () => {
  const [userData, setUserData] = useState<any>(null);
  const [dayAppointments, setDayAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("users/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      }
    };

    const getAppointmentsOfDay = async () => {
      try {
        const response = await api.get("/appointments/today");
        setDayAppointments(response.data);
      } catch (error) {}
    };

    getUser();
    getAppointmentsOfDay();
  }, []);

  return (
    <div>
      <Logout />
      <div>Bem vindo, {userData?.name || "Nome não encontrado"}</div>
      <p>Por onde vamos começar hoje?</p>
      <p>Use os atalhos abaixo para navegar pelo sistema</p>

      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/me"}>Meu Perfil</Link>
      <Link to={"/appointments"}>Ver Agendamentos</Link>
      <Link to={"/appointments/new"}>Criar um novo Agendamento</Link>
      <Link to={"/patient/new"}>Criar novo paciente</Link>

      <h2>Agendamentos do dia:</h2>
      {dayAppointments.map((appointment) => (
        <div key={appointment.appointmentId}>
          <p>Nome do paciente: {appointment.patientName}</p>
          <p>Data: {new Date(appointment.data).toLocaleString("pt-BR")}</p>
          <p>Status: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
