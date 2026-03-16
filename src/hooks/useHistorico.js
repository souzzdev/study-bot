import { useState } from "react";

const HISTORY_KEY = "studybot_historico";

function loadHistorico() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistorico(data) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  } catch {}
}

export function useHistorico() {
  const [historico, setHistorico] = useState(loadHistorico);

  function registrarCiclo({ subjects, dist, totalHoras, progressoPct }) {
    const snapshot = {
      id:          crypto.randomUUID(),
      data:        new Date().toISOString(),
      totalHoras,
      progressoPct,
      materias: subjects.map((s) => {
        const d = dist.find((x) => x.id === s.id);
        return {
          nome:       s.nome,
          cor:        s.cor,
          horas:      d?.horas ?? 0,
          concluidos: s.concluidos ?? 0,
        };
      }),
    };

    setHistorico((prev) => {
      const atualizado = [snapshot, ...prev].slice(0, 20); // mantém últimos 20
      saveHistorico(atualizado);
      return atualizado;
    });
  }

  function limparHistorico() {
    setHistorico([]);
    saveHistorico([]);
  }

  return { historico, registrarCiclo, limparHistorico };
}
