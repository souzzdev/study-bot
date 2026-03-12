import { useState } from "react";
import { useStudyBot } from "./hooks/useStudyBot";
import { Header, BottomNav } from "./components/layout";
import { HomePage }     from "./components/pages/HomePage";
import { CicloPage }    from "./components/pages/CicloPage";
import { AdicionarPage } from "./components/pages/AdicionarPage";
import { ListaPage }    from "./components/pages/ListaPage";
import { DEFAULT_FORM } from "./constants";

const GLOBAL_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #333; }
  input[type=range] { accent-color: #eab308; cursor: pointer; }
  .fade { animation: fadeIn .25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .rh:hover { background: #1e2030 !important; }
  .bloco:hover { filter: brightness(1.2); }
  button { font-family: inherit; cursor: pointer; }
  input:focus { border-color: #38bdf8 !important; }
  .toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #1e3a2a; border: 1px solid #2a5c3a; color: #6EE7B7; padding: 7px 16px; border-radius: 20px; font-size: .78rem; font-weight: 600; z-index: 99; pointer-events: none; animation: fadeIn .3s ease; }
`;

export default function App() {
  const [page, setPage] = useState("home");

  const {
    totalHoras, setTotalHoras,
    subjects, form, setForm, editId,
    savedToast, dist,
    totalBlocos, totalConcluidos, progressoPct,
    salvarMateria, removerMateria, iniciarEdicao, cancelarEdicao,
    toggleBloco, resetarCiclo,
    exportar, importar,
  } = useStudyBot();

  function abrirAdicionar() {
    setForm(DEFAULT_FORM);
    setPage("adicionar");
  }

  function handleSalvarMateria() {
    const ok = salvarMateria();
    if (ok) setPage("lista");
  }

  function handleEditar(subject) {
    iniciarEdicao(subject);
    setPage("adicionar");
  }

  function handleCancelar() {
    cancelarEdicao();
    setPage("lista");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111318", color: "#e8eaf0", fontFamily: "'Inter','Segoe UI',sans-serif", maxWidth: 480, margin: "0 auto", paddingBottom: 70 }}>
      <style>{GLOBAL_STYLES}</style>

      <Header onMenuClick={() => setPage((p) => p === "lista" ? "home" : "lista")} savedToast={savedToast} />

      {page === "home" && (
        <HomePage
          totalHoras={totalHoras}
          onChangeTotalHoras={setTotalHoras}
          onExportar={exportar}
          onImportar={importar}
          onAdicionarMateria={abrirAdicionar}
          onVerCiclo={() => setPage("ciclo")}
        />
      )}

      {page === "ciclo" && (
        <CicloPage
          dist={dist}
          totalConcluidos={totalConcluidos}
          totalBlocos={totalBlocos}
          progressoPct={progressoPct}
          onToggleBloco={toggleBloco}
          onResetar={resetarCiclo}
          onAdicionarMateria={abrirAdicionar}
        />
      )}

      {page === "adicionar" && (
        <AdicionarPage
          form={form}
          setForm={setForm}
          editId={editId}
          onSalvar={handleSalvarMateria}
          onCancelar={handleCancelar}
        />
      )}

      {page === "lista" && (
        <ListaPage
          subjects={subjects}
          onEditar={handleEditar}
          onRemover={removerMateria}
          onAdicionar={abrirAdicionar}
          onVerCiclo={() => setPage("ciclo")}
        />
      )}

      <BottomNav page={page} onNavigate={setPage} />
    </div>
  );
}
