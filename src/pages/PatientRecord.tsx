import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../service/api";
import { Bounce, toast } from "react-toastify";
import Home from "../components/Home";
import Logout from "../components/Logout";
import type { Medications } from "../types/Medications";
import { FaTrash } from "react-icons/fa";

const PatientRecord = () => {
  const location = useLocation();
  const patient = location.state;

  const [medications, setMedications] = useState<Medications[]>([]);
  const [medicationName, setmedicationName] = useState("");
  const [medicationDosage, setmedicationDosage] = useState("");

  async function searchMedications() {
    try {
      const response = await api.get(`/medications/patient/${patient.id}`);
      setMedications(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao carregar medicações do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
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

  async function handleCreateMedication(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/medications", {
        patientId: patient.id,
        medicationName,
        medicationDosage,
      });

      searchMedications();

      setmedicationName("");
      setmedicationDosage("");

      toast.success(
        <div>
          <p className="font-semibold">Novo medicamento salvo com sucesso!</p>
          <br />
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
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
          <span className="font-semibold">
            Erro ao salvar nova medicação do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
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

  async function handleDeleteMedication(id: number) {
    try {
      await api.delete(`/medications/${id}`);

      const listMedicationUpdated = medications.filter(
        (medication) => medication.medicationId !== id,
      );

      setMedications(listMedicationUpdated);
      toast.success(
        <div>
          <span className="font-semibold">Medicamento apagado com sucesso</span>
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
          <span className="font-semibold">Erro ao apagar Medicamento!</span>
          <br />
          <p>Verifique sua conexão com a internet.</p>
          <p>Recarregue a pagina e veja se o medicamento foi apagado.</p>
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
    searchMedications();
  }, []);

  return (
    <div>
      <div>
        <Home />
        <Logout />
      </div>

      <h2>
        Lista de medicamentos do paciente{" "}
        <span className="font-semibold">{patient.name}</span>
      </h2>

      <h3>Deseja adicionar um novo medicamento?</h3>
      <form onSubmit={handleCreateMedication}>
        <label>Medicamento:</label>
        <input
          type="text"
          value={medicationName}
          onChange={(e) => setmedicationName(e.target.value)}
          placeholder="nome do medicamento"
        />
        <label>Dosagem:</label>
        <input
          type="text"
          value={medicationDosage}
          onChange={(e) => setmedicationDosage(e.target.value)}
          placeholder="dosagem da medicação"
        />
        <button type="submit" className="cursor-pointer">
          Adicionar Medicamento
        </button>
      </form>

      {medications.map((medication) => (
        <div key={medication.medicationId}>
          <p>Medicamento: {medication.medicationName}</p>
          <p>Dosagem: {medication.medicationDosage}</p>

          <FaTrash
            className="cursor-pointer"
            onClick={() => handleDeleteMedication(medication.medicationId)}
          />

          <button className="cursor-pointer" onClick={() => Maps("/dashboard")}>
            Atualizar medicação
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientRecord;
