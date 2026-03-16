import { useDragSort } from "../../hooks/useDragSort";
import { Button } from "../ui";
import { getIconLabel } from "../../utils";

function DraggableSubjectRow({ subject, isDragging, isOver, dragProps, onEdit, onRemove }) {
  return (
    <div
      {...dragProps}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        background: isOver ? "#252640" : "#1a1b26",
        borderRadius: 12, padding: "0.85rem 1rem",
        border: `1px solid ${isOver ? "#38bdf8" : "transparent"}`,
        opacity: isDragging ? 0.4 : 1,
        transition: "all 0.15s",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {/* Handle visual */}
      <span style={{ color: "#444", fontSize: 16, cursor: "grab", flexShrink: 0 }}>⋮⋮</span>

      {/* Ícone colorido */}
      <div style={{ width: 40, height: 40, borderRadius: 10, background: subject.cor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
        {getIconLabel(subject.icone)}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {subject.nome}
        </p>
        <p style={{ color: "#555", fontSize: "0.75rem" }}>
          D:{subject.dificuldade} C:{subject.conteudo} P:{subject.peso}
        </p>
      </div>

      {/* Ações */}
      <button onClick={() => onEdit(subject)}
        style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 18, padding: "4px 6px", cursor: "pointer" }}>
        ✏️
      </button>
      <button onClick={() => onRemove(subject.id)}
        style={{ background: "none", border: "none", color: "#ef4444", fontSize: 18, padding: "4px 6px", cursor: "pointer" }}>
        🗑
      </button>
    </div>
  );
}

export function ListaPage({ subjects, onEditar, onRemover, onReordenar, onAdicionar, onVerCiclo }) {
  const { draggingId, overIndex, getDragProps } = useDragSort(subjects, onReordenar);

  return (
    <div className="fade" style={{ padding: "1.5rem 16px 3rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.2rem" }}>
        <h1 style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}>Matérias Adicionadas</h1>
        {subjects.length > 1 && (
          <span style={{ fontSize: "0.72rem", color: "#555" }}>arraste para reordenar</span>
        )}
      </div>

      {subjects.length === 0 && (
        <p style={{ color: "#555", textAlign: "center", marginTop: "2rem" }}>Nenhuma matéria cadastrada.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {subjects.map((s, index) => (
          <DraggableSubjectRow
            key={s.id}
            subject={s}
            isDragging={draggingId === s.id}
            isOver={overIndex === index && draggingId !== s.id}
            dragProps={getDragProps(index, s.id)}
            onEdit={onEditar}
            onRemove={(id) => onRemover(id, s.nome)}
          />
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
