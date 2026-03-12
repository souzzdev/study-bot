export const STORAGE_KEY = "studybot_data";

export const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
  "#a855f7", "#ec4899",
];

export const DIFFICULTY_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1",
];

// Aceita IDs internos e IDs vindos do Studyn (default, calculator, gavel etc.)
export const ICON_MAP = {
  az:          "AZ",
  book:        "📖",
  calc:        "🔢",
  screen:      "🖥",
  globe:       "🌐",
  pen:         "✏️",
  code:        "</>",
  music:       "🎵",
  flask:       "⚗️",
  atom:        "⚛️",
  brain:       "🧠",
  art:         "🎨",
  // Studyn aliases
  default:     "📖",
  calculator:  "🔢",
  gavel:       "🔨",
  stethoscope: "🩺",
  scroll:      "📜",
};

export const ICONS = Object.entries(ICON_MAP).map(([id, label]) => ({ id, label }));

export const DEFAULT_FORM = {
  nome: "",
  dificuldade: 1,
  conteudo: 1,
  cor: COLORS[0],
  icone: "az",
  peso: 1,
};

export const CYCLE_HOURS_MIN = 20;
export const CYCLE_HOURS_MAX = 100;
export const CYCLE_HOURS_DEFAULT = 96;
