# Portfolio — Análise Financeira & Dados

Site pessoal com portfólio profissional e hub de análise financeira interativa.

## Stack

| Camada     | Tecnologia                        |
|------------|-----------------------------------|
| Frontend   | React + Vite + TailwindCSS        |
| Gráficos   | Recharts                          |
| Backend    | Node.js + Express                 |
| HTTP       | Axios                             |
| Deploy     | Vercel (frontend) + Railway/Render (backend) |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend rodará em **http://localhost:3001**

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend rodará em **http://localhost:5173**

> O Vite já está configurado com proxy `/api → localhost:3001`, então nenhuma configuração extra é necessária.

---

## 📁 Estrutura de Pastas

```
portfolio/
├── backend/
│   ├── index.js              # Entry point Express
│   ├── routes/
│   │   ├── market.js         # GET /api/market, /api/market/history/:id
│   │   ├── insights.js       # GET /api/insights
│   │   └── chat.js           # POST /api/chat
│   ├── services/
│   │   ├── marketService.js  # Dados de mercado (mock → real)
│   │   ├── insightsService.js# Geração de insights automáticos
│   │   └── chatService.js    # Lógica do chatbot mentor
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navegação fixa
    │   │   ├── MarketTicker.jsx  # Cards de ativos em tempo real
    │   │   ├── PriceChart.jsx    # Gráfico histórico (Recharts)
    │   │   ├── InsightsPanel.jsx # Insights automáticos
    │   │   ├── ChatBot.jsx       # Interface do mentor
    │   │   └── ProjectCard.jsx   # Card de projeto
    │   ├── pages/
    │   │   ├── Home.jsx          # Página principal
    │   │   ├── Projects.jsx      # Lista + detalhe de projetos
    │   │   └── About.jsx         # Sobre + certificados
    │   ├── hooks/
    │   │   └── useData.js        # Hooks: useMarket, useHistory, useInsights, useChat
    │   ├── services/
    │   │   └── api.js            # Camada Axios centralizada
    │   ├── App.jsx               # Router principal
    │   ├── main.jsx              # Entry point React
    │   └── index.css             # Tailwind + estilos globais
    ├── tailwind.config.js
    ├── vite.config.js
    └── index.html
```

---

## 🔌 Endpoints da API

| Método | Rota                        | Descrição                         |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/health`               | Health check                      |
| GET    | `/api/market`               | Dados atuais de mercado           |
| GET    | `/api/market/history/:id`   | Histórico 30 dias de um ativo     |
| GET    | `/api/insights`             | Insights automáticos              |
| POST   | `/api/chat`                 | Chatbot mentor (body: {message})  |

**IDs de ativos disponíveis:** `ibovespa`, `usdbrl`, `bitcoin`, `petr4`, `vale3`

---

## 🗺️ Roadmap / Melhorias Futuras

### Curto prazo
- [ ] Integrar API real (Brapi.dev — gratuita para ações BR)
- [ ] Substituir chatbot mock por OpenAI / Claude API
- [ ] Adicionar autenticação para área admin

### Médio prazo
- [ ] Página de projeto com upload de notebooks Jupyter
- [ ] Dashboard com filtros avançados por setor / período
- [ ] Alertas de preço via email/webhook

### Longo prazo
- [ ] Integrar modelos Python/R via subprocess ou API dedicada
- [ ] Sistema de blog para publicar análises
- [ ] Deploy automatizado com CI/CD (GitHub Actions)

---

## 📊 Integrações de API Reais Sugeridas

| Dado                | API Gratuita              | Documentação                      |
|---------------------|---------------------------|-----------------------------------|
| Ações BR (B3)       | brapi.dev                 | https://brapi.dev                 |
| Crypto              | CoinGecko                 | https://coingecko.com/api         |
| Câmbio              | AwesomeAPI                | https://docs.awesomeapi.com.br    |
| Dados globais       | Alpha Vantage             | https://alphavantage.co           |

---

## ⚠️ Aviso Legal

Este projeto tem fins educacionais e não constitui recomendação de investimento.
