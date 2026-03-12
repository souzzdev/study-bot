import { ProgressBar, SubjectCard, Button } from "../ui";

export function CicloPage({ dist, totalConcluidos, totalBlocos, progressoPct, onToggleBloco, onResetar, onAdicionarMateria }) {
  return (
    <div className="fade" style={{ padding: "1.5rem 16px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ color: "#38bdf8", fontSize: 20 }}>✅</span>
        <h1 style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.4rem" }}>Seu Ciclo de Estudos</h1>
      </div>
      <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "1rem" }}>Acompanhe seu progresso em tempo real</p>

      <Button variant="orange" onClick={onResetar} style={{ marginBottom: "1.2rem" }}>
        🗑 Resetar Ciclo
      </Button>

      {/* Progresso total */}
      <div style={{ background: "#1a1b26", borderRadius: 14, padding: "1.2rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>PROGRESSO TOTAL</p>
            <p style={{ fontSize: "2rem", fontWeight: 800 }}>{progressoPct}%</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: 4 }}>Horas Concluídas</p>
            <p style={{ fontSize: "1.2rem", fontWeight: 700 }}>{totalConcluidos} / {totalBlocos}</p>
          </div>
        </div>
        <ProgressBar pct={progressoPct} />
      </div>

      {dist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#555" }}>
          <p style={{ marginBottom: 12 }}>Nenhuma matéria cadastrada.</p>
          <Button onClick={onAdicionarMateria}>+ Adicionar Matéria</Button>
        </div>
      ) : (
        dist.map((s) => (
          <SubjectCard key={s.id} subject={s} onToggleBloco={onToggleBloco} />
        ))
      )}

      <div style={{ height: 8 }} />
    </div>
  );
}
