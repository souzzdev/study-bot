export function ConfirmModal({ isOpen, title, message, confirmLabel = "Confirmar", confirmColor = "#ef4444", onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 0 80px" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#1a1b26", borderRadius: 16, padding: "1.5rem", width: "100%", maxWidth: 448, margin: "0 16px", border: "1px solid #2a2b3d", animation: "slideUp .2s ease" }}
      >
        <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>{message}</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, background: "#2a2b3d", color: "#9ca3af", border: "none", borderRadius: 10, padding: "0.75rem", fontWeight: 600, fontSize: "0.9rem", fontFamily: "inherit", cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{ flex: 1, background: confirmColor, color: "#fff", border: "none", borderRadius: 10, padding: "0.75rem", fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", cursor: "pointer" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
