import { DIFFICULTY_COLORS, COLORS, ICONS } from "../../constants";
import { getIconLabel } from "../../utils";

// ── Botão padrão ──────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = "primary", fullWidth, style = {} }) {
  const base = {
    border: "none", borderRadius: 12, padding: "0.85rem 1.2rem",
    fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
    fontFamily: "inherit", width: fullWidth ? "100%" : "auto",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    transition: "opacity 0.15s",
    ...style,
  };
  const variants = {
    primary:  { background: "#0e7490", color: "#fff" },
    ghost:    { background: "none", color: "#38bdf8", border: "1px solid #2a2b3d" },
    danger:   { background: "none", color: "#ef4444", border: "none", padding: "4px 6px", fontSize: 18 },
    text:     { background: "none", color: "#555", border: "none", padding: "0.8rem" },
    orange:   { background: "none", color: "#f97316", border: "none", padding: 0, fontSize: "0.88rem" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

// ── Input de texto ────────────────────────────────────────────────────────
export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      {label && <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#e8eaf0", marginBottom: 8 }}>{label}</label>}
      <input style={{ width: "100%", background: "#1a1b26", border: "1px solid #2a2b3d", borderRadius: 10, padding: "0.8rem 1rem", color: "#e8eaf0", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", display: "block" }} {...props} />
    </div>
  );
}

// ── Seletor numérico 1–5 ──────────────────────────────────────────────────
export function ScaleSelector({ label, value, onChange, hint, activeColor }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#e8eaf0", marginBottom: 8 }}>{label}</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => onChange(n)}
            style={{ width: 48, height: 48, borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "1rem", fontFamily: "inherit", transition: "all 0.15s",
              background: value === n ? (activeColor ?? DIFFICULTY_COLORS[n - 1]) : "#1e2030",
              color: value === n ? "#fff" : "#9ca3af",
            }}>
            {n}
          </button>
        ))}
      </div>
      {hint && <p style={{ color: "#555", fontSize: "0.78rem" }}>{hint}</p>}
    </div>
  );
}

// ── Seletor de cor ────────────────────────────────────────────────────────
export function ColorSelector({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      {label && <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#e8eaf0", marginBottom: 8 }}>{label}</label>}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {COLORS.map((c) => (
          <div key={c} onClick={() => onChange(c)}
            style={{ width: 38, height: 38, borderRadius: "50%", background: c, cursor: "pointer", border: value === c ? "3px solid #fff" : "3px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.15s", transform: value === c ? "scale(1.15)" : "scale(1)" }}>
            {value === c && <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Seletor de ícone ──────────────────────────────────────────────────────
export function IconSelector({ label, value, onChange, activeColor }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      {label && <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#e8eaf0", marginBottom: 8 }}>{label}</label>}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {ICONS.map((ic) => (
          <button key={ic.id} onClick={() => onChange(ic.id)}
            style={{ width: 44, height: 44, borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit", transition: "all 0.15s",
              border:      value === ic.id ? `2px solid ${activeColor}` : "2px solid #2a2b3d",
              background:  value === ic.id ? `${activeColor}22` : "#1e2030",
              color:       value === ic.id ? activeColor : "#9ca3af",
            }}>
            {ic.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Barra de progresso ────────────────────────────────────────────────────
export function ProgressBar({ pct, gradient = "linear-gradient(90deg,#f97316,#eab308)" }) {
  return (
    <div style={{ height: 8, background: "#2a2b3d", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: gradient, borderRadius: 99, transition: "width 0.5s" }} />
    </div>
  );
}

// ── Card de matéria (ciclo) ───────────────────────────────────────────────
export function SubjectCard({ subject, onToggleBloco }) {
  const concluidos = subject.concluidos || 0;
  const pct = subject.horas > 0 ? Math.round((concluidos / subject.horas) * 100) : 0;

  return (
    <div style={{ background: "#1a1b26", borderRadius: 14, padding: "1.2rem", marginBottom: 12, borderTop: `3px solid ${subject.cor}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 3 }}>{subject.nome}</h3>
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>{subject.horas} HORAS</p>
        </div>
        <div style={{ background: "#2a2b3d", borderRadius: 8, padding: "4px 10px", fontSize: "0.82rem", fontWeight: 700, color: pct > 0 ? subject.cor : "#9ca3af" }}>
          {pct}%
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
        {Array.from({ length: subject.horas }).map((_, i) => (
          <div key={i} className="bloco" onClick={() => onToggleBloco(subject.id, i)}
            style={{ width: 36, height: 36, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
              background: i < concluidos ? subject.cor : "#2a2b3d",
              border: i < concluidos ? "none" : "1px solid #3a3b4d",
            }}>
            {i < concluidos && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Row da lista de matérias ──────────────────────────────────────────────
export function SubjectRow({ subject, onEdit, onRemove }) {
  return (
    <div className="rh" style={{ display: "flex", alignItems: "center", gap: 12, background: "#1a1b26", borderRadius: 12, padding: "0.85rem 1rem", transition: "background 0.15s" }}>
      <span style={{ color: "#444", fontSize: 16 }}>⋮⋮</span>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: subject.cor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
        {getIconLabel(subject.icone)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subject.nome}</p>
        <p style={{ color: "#555", fontSize: "0.75rem" }}>D:{subject.dificuldade} C:{subject.conteudo} P:{subject.peso}</p>
      </div>
      <Button variant="danger" onClick={() => onEdit(subject)}>✏️</Button>
      <Button variant="danger" onClick={() => onRemove(subject.id)}>🗑</Button>
    </div>
  );
}
