import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useEffect, useState } from "react";
import api from "../service/api";
import type { Appointment } from "../types/Appointment";
import { CalendarDays, Clock, PlusCircle, UserCog, UserPlus, Users } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Logout/>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* BOAS VINDAS */}
        <div className="bg-red-600 rounded-2xl p-8 mb-8 text-white shadow-lg shadow-red-600/20">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo(a), {userData?.name?.split(" ")[0] || "Profissional"}!
          </h1>
          <p className="text-red-100">Por onde vamos começar hoje? Use os atalhos abaixo.</p>
        </div>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <Link to="/dashboard" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors mb-3">
              <Users className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">Meus Pacientes</span>
          </Link>

          <Link to="/me" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors mb-3">
              <UserCog className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">Meu Perfil</span>
          </Link>
          
          <Link to="/appointments" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors mb-3">
              <CalendarDays className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">Agendamentos</span>
          </Link>

          <Link to="/patient/new" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors mb-3">
              <UserPlus className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">Novo Paciente</span>
          </Link>

          <Link to="/appointments/new" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors mb-3">
              <PlusCircle className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
            </div>
            <span className="font-semibold text-gray-800 text-sm">Nova Consulta</span>
          </Link>
        </div>

        {/* AGENDAMENTOS DO DIA */}
        <div className="mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Agendamentos de Hoje</h2>
        </div>

        {dayAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Nenhum atendimento agendado para hoje.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayAppointments.map((appointment) => (
              <div key={appointment.appointmentId} className="bg-white rounded-2xl p-6 shadow-sm border border-l-4 border-l-red-500 border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{appointment.patientName}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <strong className="text-gray-800">Horário:</strong> {new Date(appointment.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong className="text-gray-800">Status:</strong> 
                    <span className={`ml-2 px-2 py-0.5 rounded-md text-xs font-bold ${
                      appointment.status === 'CONCLUIDO' ? 'bg-green-100 text-green-700' : 
                      appointment.status === 'CANCELADO' ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
