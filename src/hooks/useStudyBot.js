import { useState, useEffect, useMemo } from "react";
import { CYCLE_HOURS_DEFAULT, DEFAULT_FORM, COLORS } from "../constants";
import {
  calcDistribuicao,
  loadFromStorage,
  saveToStorage,
  exportCycleFile,
  parseImportedFile,
} from "../utils";
import { useHistorico } from "./useHistorico";

export function useStudyBot() {
  // lê o storage apenas uma vez na montagem do componente
  const saved = useMemo(() => loadFromStorage(), []);

  const [totalHoras, setTotalHoras] = useState(saved?.totalHoras ?? CYCLE_HOURS_DEFAULT);
  const [subjects,   setSubjects]   = useState(saved?.subjects   ?? []);
  const [form,       setForm]       = useState(DEFAULT_FORM);
  const [editId,     setEditId]     = useState(null);
  const [savedToast, setSavedToast] = useState(false);

  const { historico, registrarCiclo, limparHistorico } = useHistorico();

  // Persiste automaticamente a cada mudança
  useEffect(() => {
    saveToStorage({ subjects, totalHoras });
    setSavedToast(true);
    const timer = setTimeout(() => setSavedToast(false), 1800);
    return () => clearTimeout(timer);
  }, [subjects, totalHoras]);

  // ── Cálculos derivados ──────────────────────────────────────────────────
  const dist            = calcDistribuicao(subjects, totalHoras);
  const totalBlocos     = dist.reduce((a, s) => a + s.horas, 0);
  const totalConcluidos = subjects.reduce((a, s) => a + (s.concluidos || 0), 0);
  const progressoPct    = totalBlocos > 0
    ? Math.round((totalConcluidos / totalBlocos) * 1000) / 10
    : 0;

  // ── Matérias ────────────────────────────────────────────────────────────
  function salvarMateria() {
    if (!form.nome.trim()) return false;
    if (editId) {
      setSubjects((prev) => prev.map((s) => (s.id === editId ? { ...s, ...form } : s)));
      setEditId(null);
    } else {
      setSubjects((prev) => [...prev, { ...form, id: crypto.randomUUID(), concluidos: 0 }]);
    }
    setForm({ ...DEFAULT_FORM, cor: COLORS[0] });
    return true;
  }

  function removerMateria(id) {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }

  function reordenarMaterias(novaOrdem) {
    setSubjects(novaOrdem);
  }

  function iniciarEdicao(subject) {
    setForm({
      nome:        subject.nome,
      dificuldade: subject.dificuldade,
      conteudo:    subject.conteudo,
      cor:         subject.cor,
      icone:       subject.icone,
      peso:        subject.peso,
    });
    setEditId(subject.id);
  }

  function cancelarEdicao() {
    setForm(DEFAULT_FORM);
    setEditId(null);
  }

  // ── Blocos de progresso ─────────────────────────────────────────────────
  function toggleBloco(subjectId, blocoIndex) {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        const atual = s.concluidos || 0;
        if (blocoIndex === atual)     return { ...s, concluidos: atual + 1 };
        if (blocoIndex === atual - 1) return { ...s, concluidos: atual - 1 };
        return s;
      })
    );
  }

  function resetarCiclo() {
    if (totalConcluidos > 0) {
      registrarCiclo({ subjects, dist, totalHoras, progressoPct });
    }
    setSubjects((prev) => prev.map((s) => ({ ...s, concluidos: 0 })));
  }

  // ── Import / Export ─────────────────────────────────────────────────────
  function exportar() {
    exportCycleFile(subjects, totalHoras, dist);
  }

  function importar() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const { subjects: imported, totalHoras: horas } = parseImportedFile(ev.target.result);
          setSubjects(imported);
          if (horas) setTotalHoras(horas);
        } catch {
          alert("Arquivo JSON inválido.");
        }
      };
      reader.readAsText(e.target.files[0]);
    };
    input.click();
  }

  return {
    totalHoras, setTotalHoras,
    subjects,
    form, setForm,
    editId,
    savedToast,
    dist, totalBlocos, totalConcluidos, progressoPct,
    salvarMateria, removerMateria, reordenarMaterias,
    iniciarEdicao, cancelarEdicao,
    toggleBloco, resetarCiclo,
    exportar, importar,
    historico, limparHistorico,
  };
}
