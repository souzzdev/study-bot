import { ICON_MAP, STORAGE_KEY } from "../constants";

// ── Distribuição de horas por matéria ──────────────────────────────────────
export function calcDistribuicao(subjects, totalHoras) {
  if (!subjects.length) return [];

  const pesos = subjects.map(s => s.dificuldade * s.conteudo * s.peso);
  const soma = pesos.reduce((a, b) => a + b, 0);

  if (soma === 0) {
    return subjects.map(s => ({ ...s, horas: 0 }));
  }

  // distribuição inicial (decimal)
  const distribuicao = pesos.map(p => (p / soma) * totalHoras);

  // parte inteira
  let horas = distribuicao.map(h => Math.floor(h));

  let restante = totalHoras - horas.reduce((a, b) => a + b, 0);

  // distribuir o restante baseado nas maiores frações
  const indices = distribuicao
    .map((h, i) => ({ i, frac: h - Math.floor(h) }))
    .sort((a, b) => b.frac - a.frac);

  for (let j = 0; j < restante; j++) {
    horas[indices[j].i]++;
  }

  return subjects.map((s, i) => ({
    ...s,
    horas: horas[i],
  }));
}

// ── Ícone ──────────────────────────────────────────────────────────────────
export function getIconLabel(id) {
  return ICON_MAP[id] ?? "📖";
}

// ── LocalStorage ───────────────────────────────────────────────────────────
export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ── Conversão de formato externo (Studyn) ↔ interno ───────────────────────
export function fromExternalSubject(s, checkedSessions = {}) {
  const sessions = checkedSessions[s.id] ?? {};
  const concluidos = Object.values(sessions).filter(Boolean).length;
  return {
    id:          s.id,
    nome:        s.name,
    dificuldade: s.difficulty,
    conteudo:    s.content,
    peso:        s.weight,
    cor:         s.color,
    icone:       s.icon ?? "default",
    concluidos,
  };
}

export function toExternalSubject(s, horas) {
  const sessions = {};
  for (let i = 0; i < horas; i++) {
    sessions[`session_${i}`] = i < (s.concluidos || 0);
  }
  return {
    id:         s.id,
    name:       s.nome,
    difficulty: s.dificuldade,
    content:    s.conteudo,
    weight:     s.peso,
    color:      s.cor,
    icon:       s.icone,
    _sessions:  sessions,
  };
}

// ── Export / Import de arquivo JSON ───────────────────────────────────────
export function exportCycleFile(subjects, totalHoras, dist) {
  const checkedSessions = {};
  const externSubjects = subjects.map((s) => {
    const sd = dist.find((d) => d.id === s.id);
    const horas = sd?.horas ?? 1;
    const sessions = {};
    for (let i = 0; i < horas; i++) sessions[`session_${i}`] = i < (s.concluidos || 0);
    checkedSessions[s.id] = sessions;
    return { id: s.id, name: s.nome, difficulty: s.dificuldade, content: s.conteudo, weight: s.peso, color: s.cor, icon: s.icone };
  });

  const payload = {
    subjects: externSubjects,
    totalCycleTime: totalHoras,
    checkedSessions,
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ciclo.json";
  a.click();
}

export function parseImportedFile(json) {
  const d = JSON.parse(json);

  // Formato externo Studyn
  if (d.subjects?.length && d.subjects[0].name !== undefined) {
    const checked = d.checkedSessions ?? {};
    return {
      subjects:   d.subjects.map((s) => fromExternalSubject(s, checked)),
      totalHoras: d.totalCycleTime ?? null,
    };
  }

  // Formato interno legado
  if (d.subjects) {
    return { subjects: d.subjects, totalHoras: d.totalHoras ?? null };
  }

  throw new Error("Formato de arquivo não reconhecido.");
}
