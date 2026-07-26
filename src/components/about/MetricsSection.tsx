import { BrainCircuit, Database, LineChart, TrendingUp } from "lucide-react";

const MetricsSection = () => {
  const headlineStats = [
    {
      label: "Forecast Horizons",
      value: "H5 / H7 / H14",
      note: "Direct multi-step daily Brent forecasts",
      icon: <TrendingUp size={17} className="text-oil-gold" />,
    },
    {
      label: "Feature Space",
      value: "30 Features",
      note: "Price, technical, sentiment, and EMA-derived inputs",
      icon: <Database size={17} className="text-oil-gold" />,
    },
    {
      label: "History Window",
      value: "2014 - 2026",
      note: "Approximately 3,000 aligned trading days",
      icon: <LineChart size={17} className="text-oil-gold" />,
    },
    {
      label: "Ensemble Width",
      value: "4 Specialists",
      note: "ARIMA, Mid-GRU, Sentiment-GRU, XGBoost-HF",
      icon: <BrainCircuit size={17} className="text-oil-gold" />,
    },
  ];

  const snapshotRows = [
    { key: "Primary Benchmark", value: "Brent crude oil (daily close)" },
    { key: "Mode Decomposition", value: "VMD, K=3 (trend, mid, high frequency)" },
    { key: "Train/Validation/Test", value: "70% / 15% / 15%" },
    { key: "Meta Learner", value: "Ridge stacking, alpha=1.0, 5-fold walk-forward CV" },
    { key: "Output Endpoints", value: "Forecast, fan chart, explainability" },
    { key: "Documentation Version", value: "v10.0" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {headlineStats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-white/8 bg-white/3 p-5">
            <div className="flex items-center gap-2 mb-3">
              {stat.icon}
              <p className="label-xs">{stat.label}</p>
            </div>
            <p className="font-display font-bold text-xl text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-secondary leading-relaxed mt-2">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 overflow-hidden">
        {snapshotRows.map((row, index) => (
          <div
            key={row.key}
            className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 p-4 sm:p-5 ${
              index !== snapshotRows.length - 1 ? "border-b border-white/7" : ""
            }`}
          >
            <p className="label-xs">{row.key}</p>
            <p className="text-sm text-text-secondary leading-7">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsSection;
