import { useEffect, useState } from "react";
import api from "../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logout from "../components/Logout";
import Home from "../components/Home";
import { UserPen } from "lucide-react";

const EditPatient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [obs, setObs] = useState("");

  const location = useLocation();
  const patient = location.state;

  const navigate = useNavigate();

  async function handleUpdatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.put(`/patients/${patient.id}`, {
        id: patient.id,
        name,
        address,
        phone,
        obs,
      });

      navigate("/dashboard");

      toast.success(
        <div>
          <p className="font-semibold">Usuario atualizado com sucesso!</p>
          <br />
        </div>,
      );
    } catch (error) {
      toast.error(
        <div>
          <span className="font-semibold">Erro ao atualizar paciente!</span>
          <br />
          Verifique se os dados foram preenchidos corretamente.
        </div>,
      );
    }
  }

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setPhone(patient.phone);
      setAddress(patient.address);
      setObs(patient.obs);
    }
  }, [patient]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <UserPen className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Editar Paciente</h1>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleUpdatePatient} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome Completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Endereço Completo</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Observações Clínicas</label>
              <textarea value={obs} onChange={(e) => setObs(e.target.value)} maxLength={2000} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"></textarea>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button type="submit" className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer">Atualizar Cadastro</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;
