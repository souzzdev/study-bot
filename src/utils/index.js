import { ICON_MAP, STORAGE_KEY } from "../constants";

// ── Distribuição de horas por matéria ──────────────────────────────────────
 export function calcDistribuicao(subjects, totalHoras) {
  if (!Array.isArray(subjects) || subjects.length === 0) return [];

  // Garante que totalHoras seja um número válido
  const total = Number(totalHoras);
  if (!Number.isFinite(total) || total <= 0) {
    return subjects.map((s) => ({ ...s, horas: 0 }));
  }

  // Sanitiza os valores
  const pesos = subjects.map((s) => {
    const dificuldade = Number(s.dificuldade) || 0;
    const conteudo = Number(s.conteudo) || 0;
    const peso = Number(s.peso) || 0;

    const valor = dificuldade * conteudo * peso;

    return valor > 0 ? valor : 0;
  });

  const soma = pesos.reduce((a, b) => a + b, 0);

  // Se tudo deu zero, distribui igualmente
  if (soma === 0) {
    const horasBase = Math.floor(total / subjects.length);
    let resto = total % subjects.length;

    return subjects.map((s) => {
      const extra = resto > 0 ? 1 : 0;
      if (resto > 0) resto--;

      return {
        ...s,
        horas: horasBase + extra,
      };
    });
  }

  // Distribuição proporcional inicial
  let distribuicao = subjects.map((s, i) => ({
    ...s,
    horas: (pesos[i] / soma) * total,
  }));

  // Arredondamento controlado
  let horasInteiras = distribuicao.map((s) => ({
    ...s,
    horas: Math.floor(s.horas),
  }));

  let somaHoras = horasInteiras.reduce((acc, s) => acc + s.horas, 0);
  let resto = total - somaHoras;

  // Distribui o resto (as horas que sobraram)
  if (resto > 0) {
    // Ordena pelos maiores decimais
    const ordenados = distribuicao
      .map((s, i) => ({
        index: i,
        decimal: s.horas - Math.floor(s.horas),
      }))
      .sort((a, b) => b.decimal - a.decimal);

    for (let i = 0; i < resto; i++) {
      horasInteiras[ordenados[i].index].horas += 1;
    }
  }

  return horasInteiras;
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
