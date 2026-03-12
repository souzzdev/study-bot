# StudyBot — Ciclo de Estudos

Ferramenta para planejar e acompanhar ciclos de estudos com distribuição inteligente de horas por matéria.

## Estrutura do projeto

```
src/
├── constants/        # Cores, ícones, chaves — sem lógica
├── utils/            # Funções puras: cálculo, storage, import/export
├── hooks/
│   └── useStudyBot   # Todo o estado e ações da aplicação
├── components/
│   ├── ui/           # Componentes reutilizáveis (Button, Input, Card...)
│   ├── layout/       # Header, BottomNav
│   └── pages/        # HomePage, CicloPage, AdicionarPage, ListaPage
└── App.jsx           # Orquestrador de navegação
```

## Como rodar

```bash
npm install
npm run dev
```

## Como fazer build

```bash
npm run build
```

## Formato de importação (compatível com Studyn)

```json
{
  "subjects": [
    {
      "id": "abc123",
      "name": "Matemática",
      "difficulty": 3,
      "content": 4,
      "weight": 2,
      "color": "#14b8a6",
      "icon": "calculator"
    }
  ],
  "totalCycleTime": 96,
  "checkedSessions": {},
  "exportedAt": "2026-01-01T00:00:00.000Z"
}
```

## Persistência

Os dados são salvos automaticamente no `localStorage` do navegador a cada alteração. Use **Exportar Ciclo** para fazer backup em arquivo JSON.
