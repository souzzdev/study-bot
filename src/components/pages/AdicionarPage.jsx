import { Input, ScaleSelector, ColorSelector, IconSelector, Button } from "../ui";

export function AdicionarPage({ form, setForm, editId, onSalvar, onCancelar }) {
  const update = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fade" style={{ padding: "1.5rem 16px 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
        <span style={{ fontSize: 22, color: "#eab308" }}>📖</span>
        <h1 style={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}>
          {editId ? "Editar Matéria" : "Adicionar Matéria"}
        </h1>
      </div>

      <Input
        label="Nome da Matéria"
        value={form.nome}
        onChange={(e) => update("nome")(e.target.value)}
        placeholder="Ex: Matemática"
      />

      <ScaleSelector
        label="Dificuldade"
        value={form.dificuldade}
        onChange={update("dificuldade")}
        hint="1 = Fácil, 5 = Muito Difícil"
      />

      <ScaleSelector
        label="Quantidade de Conteúdo"
        value={form.conteudo}
        onChange={update("conteudo")}
        hint="1 = Pouco, 5 = Muito Conteúdo"
        activeColor="#6366f1"
      />

      <ColorSelector label="Cor" value={form.cor} onChange={update("cor")} />

      <IconSelector label="Ícone" value={form.icone} onChange={update("icone")} activeColor={form.cor} />

      <Input
        label="Peso da Matéria"
        type="number"
        min={0.5}
        max={5}
        step={0.5}
        value={form.peso}
        onChange={(e) => update("peso")(Number(e.target.value))}
      />

      <Button fullWidth onClick={onSalvar}>
        + {editId ? "Salvar Alterações" : "Adicionar ao Ciclo"}
      </Button>
      <Button fullWidth variant="text" onClick={onCancelar}>Cancelar</Button>
    </div>
  );
}
