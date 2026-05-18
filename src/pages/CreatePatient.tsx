import React, { useState } from "react";
import api from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Home from "../components/Home";
import { UserPlus } from "lucide-react";

const CreatePatient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [obs, setObs] = useState("");

  const navigate = useNavigate();

  async function handleCreatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post("/patients", {
        name,
        address,
        phone,
        obs,
      });

      toast.success(
        <div>
          <p className="font-semibold">Usuario criado com sucesso!</p>
          <br />
        </div>,
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        <div>
          <span className="font-semibold">Erro ao cadastrar paciente!</span>
          <br />
          Verifique se os dados foram preenchidos corretamente.
        </div>,
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-12">
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <Home />
        <Logout />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-red-100 rounded-lg">
            <UserPlus className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Cadastrar Novo Paciente
          </h1>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleCreatePatient} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Nome do paciente"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Telefone / Celular
                </label>
                <input
                  type="tel"
                  value={phone}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Endereço Completo
              </label>
              <input
                type="text"
                value={address}
                placeholder="Rua, Número, Bairro, Cidade - Estado"
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Observações Clínicas / Gerais
              </label>
              <textarea
                placeholder="Alergias, detalhes do local de atendimento ou outras observações..."
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                maxLength={2000}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                Salvar Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
