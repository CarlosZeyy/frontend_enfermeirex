import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../service/api";
import { toast } from "react-toastify";
import Home from "../components/Home";
import Logout from "../components/Logout";
import type { Medications } from "../types/Medications";
import type { Annotations } from "../types/Annotations";
import { FaTrash } from "react-icons/fa";
import type { Documents } from "../types/Documents";
import {
  ChevronDown,
  Copy,
  FileText,
  NotebookPen,
  Pill,
  Stethoscope,
  Upload,
} from "lucide-react";

const PatientRecord = () => {
  const location = useLocation();
  const patient = location.state;

  const [medications, setMedications] = useState<Medications[]>([]);
  const [medicationName, setmedicationName] = useState("");
  const [medicationDosage, setmedicationDosage] = useState("");
  const [annotation, setAnnotation] = useState<Annotations[]>([]);
  const [annotationText, setAnnotationText] = useState("");
  const [documents, setDocuments] = useState<Documents[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function searchMedications() {
    try {
      const response = await api.get(`/medications/patient/${patient.id}`);
      setMedications(response.data);
    } catch (error) {
      console.error("Erro ao carregar medicações: ", error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao carregar medicações do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
      );
    }
  }

  async function searchAnnotations() {
    try {
      const response = await api.get(`/annotation/patient/${patient.id}`);
      setAnnotation(response.data);
    } catch (error) {
      console.error("Erro ao carregar medicações: ", error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao carregar medicações do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
      );
    }
  }

  async function searchDocuments() {
    try {
      const response = await api.get(`/uploads/patient/${patient.id}`);

      setDocuments(response.data);
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao carregar arquivos do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
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
      );
    } catch (error) {
      console.error(error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao salvar medicação do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
      );
    }
  }

  async function handleCreateAnnotation(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/annotation", {
        patientId: patient.id,
        text: annotationText,
      });

      searchAnnotations();

      setAnnotationText("");

      toast.success(
        <div>
          <p className="font-semibold">Nova anotação salva com sucesso!</p>
          <br />
        </div>,
      );
    } catch (error) {
      console.error(error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao salvar anotação do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
      );
    }
  }

  async function handleUploadDocument(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      await api.post(`/uploads/patient/${patient.id}`, formData);

      searchDocuments();

      setSelectedFile(null);

      toast.success(
        <p className="font-semibold">Upload do arquivo feito com sucesso!</p>,
      );
    } catch (error) {
      console.error("erro ao enviar arquivo: ", error);
      toast.error(
        <div>
          <span className="font-semibold">
            Erro ao enviar arquivos do paciente!
          </span>
          <br />
          Verifique sua conexão e tente novamente!
        </div>,
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
      );
    }
  }

  async function handleDeleteDocument(id: number) {
    try {
      await api.delete(`/uploads/patient/${id}`);

      const listDocumentsUpdated = documents.filter(
        (document) => document.documentId !== id,
      );

      setDocuments(listDocumentsUpdated);
      toast.success(
        <div>
          <span className="font-semibold">Arquivo apagado com sucesso</span>
        </div>,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        <div>
          <span className="font-semibold">Erro ao apagar arquivo!</span>
          <br />
          <p>Verifique sua conexão com a internet.</p>
          <p>Recarregue a pagina e veja se o arquivo foi apagado.</p>
        </div>,
      );
    }
  }

  const handleCopyAnnotation = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Texto copiado para a área de transferência!");
  };

  useEffect(() => {
    searchMedications();
    searchAnnotations();
    searchDocuments();
    setSelectedFile(null);
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
            <Stethoscope className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Prontuário Digital
            </h1>
            <p className="text-gray-500 font-medium">
              Paciente: {patient.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* BLOCO DE MEDICAÇÕES */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Pill className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Medicamentos Contínuos
              </h2>
            </div>

            <form onSubmit={handleCreateMedication} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Nome"
                value={medicationName}
                onChange={(e) => setmedicationName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Dosagem"
                value={medicationDosage}
                onChange={(e) => setmedicationDosage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold shrink-0 cursor-pointer"
              >
                Adicionar
              </button>
            </form>

            <div className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.medicationId}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      {med.medicationName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Dosagem: {med.medicationDosage}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMedication(med.medicationId)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {medications.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  Nenhuma medicação cadastrada.
                </p>
              )}
            </div>
          </div>

          {/* BLOCO DE DOCUMENTOS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <FileText className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Exames e Documentos
              </h2>
            </div>

            <form
              onSubmit={handleUploadDocument}
              className="flex flex-col gap-3 mb-6 bg-slate-50 p-4 rounded-xl border border-dashed border-gray-300"
            >
              <input
                type="file"
                content="Faça o upload do arquivo/receita aqui"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-bold cursor-pointer"
              >
                <Upload size={16} /> Enviar Arquivo
              </button>
            </form>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.documentId}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="overflow-hidden">
                    <a
                      href={`http://localhost:8080/${doc.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-600 hover:underline truncate block max-w-50"
                    >
                      {doc.fileName}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(doc.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteDocument(doc.documentId)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  Nenhum documento anexado.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* BLOCO DE ANOTAÇÕES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
            <NotebookPen className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Evolução e Anotações
            </h2>
          </div>

          <form
            onSubmit={handleCreateAnnotation}
            className="flex flex-col md:flex-row gap-3 mb-8"
          >
            <textarea
              placeholder="Digite uma nova anotação clínica..."
              rows={5}
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-bold shrink-0 cursor-pointer"
            >
              Registrar Evolução
            </button>
          </form>

          {/* LISTAGEM EM DETAILS / SUMMARY */}
          <div className="space-y-4">
            {annotation.map((ann) => (
              <details
                key={ann.annotationId}
                className="group bg-slate-50 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-gray-700 hover:bg-slate-100 transition-colors rounded-xl group-open:rounded-b-none group-open:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Registro de Evolução -{" "}
                      {new Date(ann.createdAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>

                <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl relative">
                  <p className="text-gray-800 whitespace-pre-wrap break-all pr-14 leading-relaxed text-sm">
                    {ann.text}
                  </p>

                  {/* Botões de Ação da Anotação */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleCopyAnnotation(ann.text)}
                      className="text-gray-400 hover:text-blue-600 transition-colors p-2 cursor-pointer bg-slate-50 rounded-lg hover:bg-blue-50"
                      title="Copiar texto para usar no novo registro"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </details>
            ))}

            {annotation.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                Nenhuma evolução registrada ainda.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
