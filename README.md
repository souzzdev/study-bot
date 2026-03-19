# StudyBot — Ciclo de Estudos

Ferramenta PWA para planejar e acompanhar ciclos de estudos com distribuição inteligente de horas por matéria.

## Funcionalidades

- Ciclo de estudos com blocos de 1h por matéria
- Distribuição automática por Dificuldade × Conteúdo × Peso
- Progresso salvo automaticamente no `localStorage`
- Histórico dos últimos 20 ciclos concluídos
- Reordenar matérias por drag and drop (desktop e mobile)
- Import/Export JSON compatível com Studyn
- Funciona offline (PWA — instalável na tela inicial)

## Estrutura

```
src/
├── constants/          → cores, ícones, chaves de storage
├── utils/              → funções puras: cálculo, storage, import/export
├── hooks/
│   ├── useStudyBot.js  → estado central e ações
│   ├── useHistorico.js → histórico de ciclos
│   └── useDragSort.js  → drag and drop nativo (mouse + touch)
├── components/
│   ├── ui/             → Button, Input, ConfirmModal, SubjectCard...
│   ├── layout/         → Header, BottomNav
│   └── pages/          → HomePage, CicloPage, AdicionarPage, ListaPage, HistoricoPage
└── App.jsx             → navegação e orquestração
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

## Como publicar (Vercel)

1. Suba o projeto no GitHub
2. Acesse vercel.com → New Project → selecione o repositório
3. Clique em Deploy

O app será instalável como PWA direto do navegador após o deploy.

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
