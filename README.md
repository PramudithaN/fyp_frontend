# PetroCast

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> Advanced AI-driven oil price prediction and sentiment analysis platform with interactive visualizations and explainable insights.

---

## 📸 Preview

**PetroCast Dashboard**
![Preview](public/Images/petrocast.jpeg)

---

## 📖 About This Project

PetroCast is a sophisticated frontend application designed for the energy sector, providing real-time and historical oil price analysis alongside AI-powered forecasts. It integrates multiple predictive models including ARIMA, GRU, and XGBoost to offer multi-horizon price projections.

The platform distinguishes itself by incorporating news sentiment analysis, allowing users to understand how global events influence market trends. With a focus on transparency, PetroCast includes an "Explainability" layer using SHAP-inspired metrics to break down model contributions and key drivers behind every prediction.

---

## ✨ Features

- 📈 **AI Price Forecasting** - Multi-model predictions (ARIMA, GRU, XGBoost) with median forecasts and confidence intervals.
- 🎭 **Fan Charts** - Probabilistic forecasting visualizations showing P10 to P90 price distributions.
- 📰 **Sentiment Analysis** - Real-time analysis of global news headlines and their quantified impact on oil prices.
- 🔍 **Explainable AI (XAI)** - Detailed breakdown of model contributions and top feature drivers for every prediction.
- 📅 **Historical Analysis** - Progressive loading of historical price data with high-performance charting.
- 📤 **Data Upload** - Excel-based data ingestion for running predictions on custom datasets.
- 📊 **Performance Monitoring** - Real-time tracking of application vitals and API response times.
- 🌙 **Oil-Inspired UI** - A premium dark-themed interface built with Ant Design and Tailwind CSS for professional use.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18.2.0](https://react.dev/) |
| Build Tool | [Vite 5.0.11](https://vitejs.dev/) |
| UI Components | [Ant Design 6.2.2](https://ant.design/) |
| Styling | [Tailwind CSS 4.2.1](https://tailwindcss.com/) |
| Animations | [Framer Motion 12.34.3](https://www.framer.com/motion/) |
| Visualizations | [Recharts 3.7.0](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Language | [TypeScript 5.3.3](https://www.typescriptlang.org/) |
| Testing | [Vitest 4.0.18](https://vitest.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) **v18.0.0 or higher**
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PramudithaN/fyp_frontend.git
cd fyp-frontend
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=your_api_backend_url
VITE_SENTIMENT_OVERVIEW_URL=optional_sentiment_api_url
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Compiles TypeScript and builds the project for production. |
| `npm run lint` | Runs ESLint for code quality checks. |
| `npm run preview` | Locally previews the production build. |
| `npm run test` | Runs unit tests using Vitest. |
| `npm run test:coverage` | Runs tests and generates a coverage report. |
| `npm run load-test:local` | Runs basic load tests using k6 locally. |
| `npm run load-test:prod` | Runs load tests against the production environment. |

---

## 📁 Project Structure

```
fyp-frontend/
├── public/                    # Static assets (images, gifs, documentation)
├── src/                       # Application source code
│   ├── api/                   # API service layer and normalization logic
│   ├── components/            # React components (Home, Dashboard, About, etc.)
│   │   ├── about/             # Modular sections for the About page
│   │   ├── home/              # Modular sections for the Landing page
│   │   └── ui/                # Reusable low-level UI components
│   ├── context/               # React Context providers (Notification, DateConfig)
│   ├── types/                 # TypeScript interfaces and API response types
│   ├── utils/                 # Helper functions for dates and performance
│   ├── App.tsx                # Main routing and theme configuration
│   └── main.tsx               # Application entry point
├── load-tests/                # k6 scripts for load and stress testing
├── tailwind.config.js         # Tailwind CSS styling configuration
└── vite.config.ts             # Vite build and plugin configuration
```

---

## 🙋‍♂️ Connect with Me

- **GitHub**: [github.com/PramudithaN](https://github.com/PramudithaN)
- **LinkedIn**: [linkedin.com/in/pramuditha-nadun-612b1b204](https://linkedin.com/in/pramuditha-nadun-612b1b204)
- **Email**: pramudithanadun@gmail.com

---

*Developed with ❤️ by Pramuditha Nadun.*
