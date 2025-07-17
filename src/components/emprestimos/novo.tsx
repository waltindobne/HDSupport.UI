"use client";
import { useState } from "react";

export default function NovoEmprestimo({ onClose }: { onClose: () => void }) {
  const [equipamento, setEquipamento] = useState("");
  const [usuario, setUsuario] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#23232a] rounded-xl p-6 w-[350px] shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Novo Empréstimo</h3>
        <form className="flex flex-col gap-3">
          <input
            className="bg-[#18181b] text-white rounded px-3 py-2 outline-none"
            placeholder="Equipamento"
            value={equipamento}
            onChange={e => setEquipamento(e.target.value)}
          />
          <input
            className="bg-[#18181b] text-white rounded px-3 py-2 outline-none"
            placeholder="Usuário"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="date"
              className="bg-[#18181b] text-white rounded px-3 py-2 outline-none w-1/2"
              value={dataEmprestimo}
              onChange={e => setDataEmprestimo(e.target.value)}
            />
            <input
              type="date"
              className="bg-[#18181b] text-white rounded px-3 py-2 outline-none w-1/2"
              value={dataDevolucao}
              onChange={e => setDataDevolucao(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition">Salvar</button>
            <button type="button" className="flex-1 bg-[#333] hover:bg-[#444] text-white font-semibold py-2 rounded transition" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
} 