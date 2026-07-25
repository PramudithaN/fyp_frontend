import { BrainCircuit, Database, Gauge, Layers, LineChart } from "lucide-react";

const PipelineSection = () => {
  const pipelineSteps = [
    {
      icon: <Database size={18} className="text-oil-gold" />,
      step: "01",
      title: "Data Ingestion & Alignment",
      desc: "Daily Brent close prices and lagged sentiment or news signals are aligned by trading date over the active historical window.",
      input: "Raw market closes + normalized sentiment signals",
      output: "Calendar-aligned, leakage-safe source table",
    },
    {
      icon: <Layers size={18} className="text-oil-gold" />,
      step: "02",
      title: "VMD Signal Decomposition",
      desc: "Log-return series is decomposed into three modes to separate slow trend behavior from mid and high-frequency movement.",
      input: "Aligned log-return series",
      output: "Trend, mid-frequency, high-frequency mode streams",
    },
    {
      icon: <LineChart size={18} className="text-oil-gold" />,
      step: "03",
      title: "Feature Engineering",
      desc: "Builds price, technical, sentiment, and EMA-derived features with strict lag policies to avoid target leakage.",
      input: "Mode streams + enriched market context",
      output: "Model-ready 30-feature matrix",
    },
    {
      icon: <BrainCircuit size={18} className="text-oil-gold" />,
      step: "04",
      title: "Specialist Sub-Model Inference",
      desc: "Four specialist models forecast independently so each can capture a specific signal regime.",
      input: "Specialized feature subsets per model",
      output: "Per-horizon sub-model predictions",
    },
    {
      icon: <Gauge size={18} className="text-oil-gold" />,
      step: "05",
      title: "Stacking, Evaluation & Delivery",
      desc: "Ridge meta-models combine specialist outputs, then forecasts are evaluated and published through API and dashboard surfaces.",
      input: "Sub-model predictions by horizon",
      output: "Final forecasts, uncertainty bands, explainability payloads",
    },
  ];

  const controls = [
    { label: "Forecast Horizons", value: "H5, H7, H14" },
    { label: "Mode Count", value: "K=3 (trend/mid/high)" },
    { label: "Split Strategy", value: "70% train, 15% validation, 15% test" },
    { label: "Stacking", value: "Ridge alpha=1.0, 5-fold walk-forward CV" },
  ];

  return (
    <div className="space-y-7">
      <p className="text-base text-gray-300 leading-8 max-w-4xl">
        The pipeline follows a decomposition-first architecture. Each phase is isolated and auditable,
        making it easier to reason about model behavior and reliability before forecasts are consumed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {controls.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">{item.label}</p>
            <p className="text-base text-white font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {pipelineSteps.map((item) => (
          <article key={item.step} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg border border-oil-gold/30 bg-oil-gold/10 flex items-center justify-center text-xs font-bold text-oil-gold">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <h3 className="text-xl font-display font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-base text-gray-300 leading-7 mb-4">{item.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-oil-black/30 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Input</p>
                    <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{item.input}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-oil-black/30 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Output</p>
                    <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{item.output}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PipelineSection;
