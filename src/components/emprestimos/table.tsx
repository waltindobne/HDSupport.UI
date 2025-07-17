"use client"
import { Equipamentos } from "@/context/DataInterface";
import { EquipamentosSevice } from "@/service/ApiConnection";
import { Edit, Info, Trash, X } from "lucide-react";
import { useState, useEffect } from "react"
import Details from "@/components/emprestimos/detail";
import NovoEmprestimo from "@/components/emprestimos/novo";
import EditarEmprestimo from "@/components/emprestimos/editar";

const status = [
    "N/A",
    "Disponivel",
    "Emprestado",
    "Danificado",
    "Concerto",
]

// Mock de dados para exemplo visual
const mockEmprestimos = [
    { id: 1, equipamento: "Laptop", usuario: "João", dataEmprestimo: "10/04/2024", dataDevolucao: "17/04/2024" },
    { id: 2, equipamento: "Monitor", usuario: "Maria", dataEmprestimo: "12/04/2024", dataDevolucao: "19/04/2024" },
    { id: 3, equipamento: "Teclado", usuario: "Pedro", dataEmprestimo: "15/04/2024", dataDevolucao: "22/04/2024" },
    { id: 4, equipamento: "Mouse", usuario: "Ana", dataEmprestimo: "18/04/2024", dataDevolucao: "25/04/2024" },
];

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchTerm, setSearchTerm] = useState("");
    const [filterTipo, setFilterTipo] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filteredEquipamentos, setFilteredEquipamentos] = useState<Equipamentos[]>([]);

    const [equipamentos, setEquipamentos] = useState<Equipamentos[]>([])
    const [selectedEquipamento, setSelectedEquipamento] = useState<Equipamentos | null>(null)
    const [details, setDetails] = useState(false);
    const [showNovo, setShowNovo] = useState(false);
    const [emprestimos, setEmprestimos] = useState(mockEmprestimos);
    const [editando, setEditando] = useState<null | typeof mockEmprestimos[0]>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        EquipamentosSevice.ListarEquipamentos(token)
            .then((response) => {
                console.log(response.data);
                setEquipamentos(response.data);
            })
            .catch((error) => {
                console.log("erro ao tentar listar os equipamentos", error);
            })
    }, [])

    useEffect(() => {
        let tempEquipamentos = equipamentos;

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.idf_Patrimonio.toString().toLowerCase().includes(lowerSearch) ||
                equip.modelo_Equipamento.toLowerCase().includes(lowerSearch) ||
                (equip.dtl_Equipamento && equip.dtl_Equipamento.toLowerCase().includes(lowerSearch))
            );
        }

        if (filterTipo) {
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.tpo_Equipamento.toString().toLowerCase() === filterTipo.toLowerCase()
            );
        }

        if (filterStatus) {
            tempEquipamentos = tempEquipamentos.filter(equip =>
                equip.stt_Equipamento.toString().toLowerCase() === filterStatus.toLowerCase()
            );
        }

        setFilteredEquipamentos(tempEquipamentos);
        setCurrentPage(1);
    }, [searchTerm, filterTipo, filterStatus, equipamentos]);

    const detailEquipamento = (equipamento: Equipamentos) => {
        setDetails(true);
        setSelectedEquipamento(equipamento);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEquipamentos = filteredEquipamentos.slice(indexOfFirstItem, indexOfLastItem);

    const handleExcluir = (id: number) => {
        setEmprestimos(emprestimos.filter(e => e.id !== id));
    };

    const handleSalvarEdicao = (novo: typeof mockEmprestimos[0]) => {
        setEmprestimos(emprestimos.map(e => e.id === novo.id ? novo : e));
    };

    return (
        <div className="w-full flex flex-col items-center mt-16 px-4 md:px-10 lg:px-32">
            <div className="w-full max-w-3xl bg-[#18181b] rounded-xl p-8 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Empréstimos</h2>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                        onClick={() => setShowNovo(true)}
                    >
                        + Novo Empréstimo
                    </button>
                </div>
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full min-w-[650px] text-white">
                        <thead>
                            <tr className="bg-[#23232a]">
                                <th className="py-2 px-2 text-left">ID</th>
                                <th className="py-2 px-2 text-left">Equipamento</th>
                                <th className="py-2 px-2 text-left">Usuário</th>
                                <th className="py-2 px-2 text-left">Data de Empréstimo</th>
                                <th className="py-2 px-2 text-left">Data de Devolução</th>
                                <th className="py-2 px-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprestimos.map((e) => (
                                <tr key={e.id} className="border-b border-[#23232a]">
                                    <td className="py-2 px-2">{e.id}</td>
                                    <td className="py-2 px-2">{e.equipamento}</td>
                                    <td className="py-2 px-2">{e.usuario}</td>
                                    <td className="py-2 px-2">{e.dataEmprestimo}</td>
                                    <td className="py-2 px-2">{e.dataDevolucao}</td>
                                    <td className="py-2 px-2 flex gap-2">
                                        <button onClick={() => setEditando(e)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1 rounded transition flex items-center"><Edit size={16} className="mr-1"/>Editar</button>
                                        <button onClick={() => handleExcluir(e.id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded transition flex items-center"><Trash size={16} className="mr-1"/>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showNovo && <NovoEmprestimo onClose={() => setShowNovo(false)} />}
            {details && (
                <div>
                    <Details equipamento={selectedEquipamento} />
                    <button onClick={() => setDetails(false)} className="cursor-pointer fixed top-10 right-10 z-60"><X className="animate-pulse" size={40} /></button>
                </div>
            )}
            {editando && (
                <EditarEmprestimo
                    emprestimo={editando}
                    onSave={handleSalvarEdicao}
                    onClose={() => setEditando(null)}
                />
            )}
        </div>
    )
} 