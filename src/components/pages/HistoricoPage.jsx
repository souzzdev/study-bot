import { Button } from "../ui";

function formatData(isoString) {
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function CicloCard({ ciclo }) {
  const horasConcluidas = ciclo.materias.reduce((a, m) => a + m.concluidos, 0);

  return (
    <div style={{ background: "#1a1b26", borderRadius: 14, padding: "1.2rem", marginBottom: 12 }}>
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: "0.72rem", color: "#555", marginBottom: 3 }}>{formatData(ciclo.data)}</p>
          <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>
            <span style={{ color: ciclo.progressoPct >= 80 ? "#22c55e" : ciclo.progressoPct >= 40 ? "#eab308" : "#ef4444" }}>
              {ciclo.progressoPct}%
            </span>
            <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: "0.85rem" }}> concluído</span>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.72rem", color: "#555", marginBottom: 3 }}>Horas</p>
          <p style={{ fontWeight: 700, fontSize: "1rem" }}>
            {horasConcluidas}
            <span style={{ color: "#555", fontWeight: 400 }}>/{ciclo.totalHoras}h</span>
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ height: 5, background: "#2a2b3d", borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ height: "100%", width: `${ciclo.progressoPct}%`, borderRadius: 99, background: ciclo.progressoPct >= 80 ? "#22c55e" : ciclo.progressoPct >= 40 ? "#eab308" : "#ef4444", transition: "width 0.5s" }} />
      </div>

      {/* Matérias */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {ciclo.materias.map((m, i) => {
          const pct = m.horas > 0 ? Math.round((m.concluidos / m.horas) * 100) : 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: m.cor, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: "0.82rem", color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.nome}</span>
              <span style={{ fontSize: "0.75rem", color: "#555", flexShrink: 0 }}>{m.concluidos}/{m.horas}h</span>
              <div style={{ width: 48, height: 4, background: "#2a2b3d", borderRadius: 99, flexShrink: 0 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: m.cor, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HistoricoPage({ historico, onLimpar }) {
  return (
    <div className="fade" style={{ padding: "1.5rem 16px 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
        <h1 style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}>Histórico de Ciclos</h1>
        {historico.length > 0 && (
          <button onClick={onLimpar}
            style={{ background: "none", border: "none", color: "#555", fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
            Limpar
          </button>
        )}
      </div>

      {historico.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "#444" }}>
          <p style={{ fontSize: "2rem", marginBottom: 12 }}>📭</p>
          <p style={{ fontSize: "0.9rem" }}>Nenhum ciclo concluído ainda.</p>
          <p style={{ fontSize: "0.8rem", marginTop: 6, color: "#333" }}>Ao resetar um ciclo com progresso, ele aparecerá aqui.</p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: "0.78rem", color: "#555", marginBottom: "1.2rem" }}>
            {historico.length} ciclo{historico.length !== 1 ? "s" : ""} registrado{historico.length !== 1 ? "s" : ""}
          </p>
          {historico.map((ciclo) => (
            <CicloCard key={ciclo.id} ciclo={ciclo} />
          ))}
        </>
      )}
    </div>
  );
}
