import { ICON_MAP, STORAGE_KEY } from "../constants";

// ── Distribuição de horas — Largest Remainder Method ──────────────────────
// Garante que a soma sempre fecha exato no totalHoras, sem erro de arredondamento.
// Mínimo de 1h por matéria aplicado apenas quando o total comporta.
export function calcDistribuicao(subjects, totalHoras) {
  const n = subjects.length;
  if (n === 0) return [];

  const pesos  = subjects.map((s) => Math.sqrt(s.dificuldade * s.conteudo * s.peso));
  const soma   = pesos.reduce((a, b) => a + b, 0);

  // 1. Horas exatas proporcionais (float)
  const exatas = pesos.map((p) => (p / soma) * totalHoras);

  // 2. Parte inteira (floor) de cada matéria
  const floors  = exatas.map(Math.floor);
  let restante  = totalHoras - floors.reduce((a, b) => a + b, 0);

  // 3. Distribuir o restante pelos maiores restos decimais
  const resultado = [...floors];
  const indices   = [...Array(n).keys()].sort(
    (a, b) => (exatas[b] - floors[b]) - (exatas[a] - floors[a])
  );
  for (let i = 0; i < restante; i++) {
    resultado[indices[i]] += 1;
  }

  // 4. Garantir mínimo de 1h apenas quando o total comporta (totalHoras >= n)
  //    Matérias que ficaram com 0h recebem 1h da que tem mais horas
  if (totalHoras >= n) {
    for (let i = 0; i < n; i++) {
      if (resultado[i] === 0) {
        const doador = resultado.indexOf(Math.max(...resultado));
        if (resultado[doador] > 1) {
          resultado[doador] -= 1;
          resultado[i] = 1;
        }
      }
    }
  }

  return subjects.map((s, i) => ({ ...s, horas: resultado[i] }));
}

// Retorna IDs das matérias que ficaram com apenas 1h (aviso ao usuário)
export function getMateriasComMinimoHoras(dist) {
  return dist.filter((s) => s.horas === 1).map((s) => s.nome);
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
