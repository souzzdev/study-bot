import { Button, ProgressBar } from "../ui";
import { CYCLE_HOURS_MIN, CYCLE_HOURS_MAX } from "../../constants";

export function HomePage({ totalHoras, onChangeTotalHoras, onExportar, onImportar, onAdicionarMateria, onVerCiclo }) {
  return (
    <div className="fade">
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "2.5rem 1.5rem 1.5rem" }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "#1e2030", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 1.2rem" }}>📊</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8", lineHeight: 1.2, marginBottom: "0.7rem" }}>Ciclo de Estudos</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.5, maxWidth: 320, margin: "0 auto 1.8rem" }}>
          Planeje seus estudos distribuindo seus ciclos de forma inteligente.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onExportar} style={{ display: "flex", alignItems: "center", gap: 7, background: "#1e2030", border: "1px solid #2a2b3d", color: "#38bdf8", borderRadius: 10, padding: "0.6rem 1.2rem", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, fontFamily: "inherit" }}>
            ⬇ Exportar Ciclo
          </button>
          <button onClick={onImportar} style={{ display: "flex", alignItems: "center", gap: 7, background: "#1e2030", border: "1px solid #2a2b3d", color: "#38bdf8", borderRadius: 10, padding: "0.6rem 1.2rem", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, fontFamily: "inherit" }}>
            ⬆ Importar Ciclo
          </button>
        </div>
      </div>

      {/* Intensidade do Ciclo */}
      <div style={{ margin: "0 16px 16px", background: "#1a1b26", borderRadius: 16, padding: "1.4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.2rem" }}>
          <span style={{ fontSize: 18 }}>🕐</span>
          <h2 style={{ color: "#38bdf8", fontWeight: 700, fontSize: "1.05rem" }}>Intensidade do Ciclo</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Horas Totais</span>
          <span style={{ fontSize: "2rem", fontWeight: 800 }}>
            {totalHoras}<span style={{ fontSize: "1rem", fontWeight: 400, color: "#9ca3af" }}> h</span>
          </span>
        </div>
        <input type="range" min={CYCLE_HOURS_MIN} max={CYCLE_HOURS_MAX} value={totalHoras}
          onChange={(e) => onChangeTotalHoras(Number(e.target.value))}
          style={{ width: "100%", marginBottom: 6, accentColor: "#eab308", cursor: "pointer" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#555", fontSize: "0.8rem" }}>{CYCLE_HOURS_MIN}h</span>
          <span style={{ color: "#555", fontSize: "0.8rem" }}>{CYCLE_HOURS_MAX}h</span>
        </div>

        <div style={{ marginTop: "1rem", background: "#111318", borderRadius: 10, padding: "0.9rem 1rem", display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ color: "#38bdf8", fontWeight: 600, fontSize: "0.82rem", marginBottom: 4 }}>Obs: Cada bloco representa 1 hora de estudo.</p>
            <p style={{ color: "#9ca3af", fontSize: "0.78rem", lineHeight: 1.5 }}>
              Os ciclos não precisam ser feitos em uma janela de tempo específica, você pode completá-los ao longo de dias ou semanas. A intensidade representa o tamanho total do seu ciclo, não a velocidade.
            </p>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div style={{ padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <Button fullWidth onClick={onAdicionarMateria}>+ Adicionar Matéria</Button>
        <Button fullWidth variant="ghost" onClick={onVerCiclo}>Ver Ciclo de Estudos</Button>
      </div>
    </div>
  );
}
