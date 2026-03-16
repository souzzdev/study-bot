export function Header({ onMenuClick, savedToast }) {
  return (
    <>
      {savedToast && <div className="toast">✓ Progresso salvo</div>}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #1e2030", background: "#111318", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
          <div>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#38bdf8" }}>StudyBot</span>
            <span style={{ fontSize: "0.6rem", color: "#2a5c3a", background: "#1e3a2a", borderRadius: 4, padding: "1px 6px", marginLeft: 7, verticalAlign: "middle" }}>💾 local</span>
          </div>
        </div>
        <button onClick={onMenuClick} style={{ background: "none", border: "none", color: "#38bdf8", fontSize: 24, padding: 4, cursor: "pointer" }}>≡</button>
      </header>
    </>
  );
}

const NAV_TABS = [
  { id: "home",      label: "Início",    icon: "🏠" },
  { id: "ciclo",     label: "Ciclo",     icon: "📊" },
  { id: "lista",     label: "Matérias",  icon: "📚" },
  { id: "historico", label: "Histórico", icon: "🕘" },
];

export function BottomNav({ page, onNavigate }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#111318", borderTop: "1px solid #1e2030", display: "flex", zIndex: 10 }}>
      {NAV_TABS.map((tab) => (
        <button key={tab.id} onClick={() => onNavigate(tab.id)}
          style={{ flex: 1, background: "none", border: "none", padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", transition: "color 0.15s", color: page === tab.id ? "#38bdf8" : "#555", fontFamily: "inherit" }}>
          <span style={{ fontSize: 16 }}>{tab.icon}</span>
          <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.03em" }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
