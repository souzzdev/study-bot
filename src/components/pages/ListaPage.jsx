import { SubjectRow, Button } from "../ui";

export function ListaPage({ subjects, onEditar, onRemover, onAdicionar, onVerCiclo }) {
  return (
    <div className="fade" style={{ padding: "1.5rem 16px 3rem" }}>
      <h1 style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem", marginBottom: "1.2rem" }}>
        Matérias Adicionadas
      </h1>

      {subjects.length === 0 && (
        <p style={{ color: "#555", textAlign: "center", marginTop: "2rem" }}>Nenhuma matéria cadastrada.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {subjects.map((s) => (
          <SubjectRow key={s.id} subject={s} onEdit={onEditar} onRemove={onRemover} />
        ))}
      </div>

      <Button fullWidth onClick={onAdicionar} style={{ marginTop: "1.2rem" }}>
        + Adicionar Matéria
      </Button>
      <Button fullWidth variant="ghost" onClick={onVerCiclo} style={{ marginTop: 8 }}>
        Ver Ciclo →
      </Button>
    </div>
  );
}
