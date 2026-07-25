import { BarChart3, BrainCircuit, GitMerge, Sparkles, Target } from "lucide-react";

const modelBlocks = [
  {
    name: "ARIMA (Trend Specialist)",
    role: "Captures low-frequency directional structure from decomposed trend modes.",
    config: "Grid search on p, d, q over constrained order sets.",
  },
  {
    name: "Mid-GRU (Cycle Specialist)",
    role: "Learns medium-frequency temporal dependencies in price and technical indicators.",
    config: "Single-layer GRU with regularized hidden-state learning.",
  },
  {
    name: "Sentiment-GRU (Context Specialist)",
    role: "Fuses market and language-derived features with attention-based weighting.",
    config: "Dual-stream sequence modeling with lagged sentiment policy.",
  },
  {
    name: "XGBoost-HF (Noise Specialist)",
    role: "Models high-frequency residual behavior and short-horizon nonlinear jumps.",
    config: "Per-horizon gradient boosting with conservative depth and subsampling.",
  },
];

const architectureRows = [
  { key: "Ensemble Strategy", value: "Per-horizon ridge stacking over four specialist outputs" },
  { key: "Leakage Controls", value: "Sentiment features are lagged by one trading day" },
  { key: "Validation Pattern", value: "Walk-forward cross validation for robust temporal generalization" },
  { key: "Training Split", value: "70% train, 15% validation, 15% test" },
  { key: "Feature Scope", value: "30 total features across price, technical, sentiment, and EMA groups" },
];

const horizonTable = [
  { horizon: "H5", rmse: "0.01467", mae: "0.01153", directional: "57.5%", usd: "$0.65" },
  { horizon: "H7", rmse: "0.01477", mae: "0.01162", directional: "58.1%", usd: "$0.68" },
  { horizon: "H14", rmse: "0.01515", mae: "0.01194", directional: "52.3%", usd: "$0.72" },
];

const ablationRows = [
  {
    horizon: "H5",
    gruOnly: "+1.04%",
    fullEnsemble: "-0.32%",
    interpretation: "Sentiment hurts stand-alone GRU but improves the final stacked forecast.",
  },
  {
    horizon: "H7",
    gruOnly: "+0.24%",
    fullEnsemble: "-0.40%",
    interpretation: "Small isolated noise, net positive once aggregated by the ridge layer.",
  },
  {
    horizon: "H14",
    gruOnly: "+1.81%",
    fullEnsemble: "-0.29%",
    interpretation: "Long-horizon sentiment drift is stabilized by ensemble blending.",
  },
];

const ModelDetailsSection = () => {
  return (
    <div className="space-y-7">
      <p className="text-base text-gray-300 leading-8 max-w-4xl">
        PetroCast uses a specialist-ensemble architecture where each sub-model is responsible for a
        different regime of market behavior. The final forecast is produced by ridge stacking and then
        surfaced with uncertainty and explainability metadata.
      </p>

      <section className="rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03] flex items-center gap-2">
          <GitMerge size={16} className="text-oil-gold" />
          <h3 className="text-sm uppercase tracking-[0.16em] text-gray-300 font-semibold">Architecture Controls</h3>
        </div>
        {architectureRows.map((row, index) => (
          <div
            key={row.key}
            className={`grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 px-5 py-4 ${
              index !== architectureRows.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">{row.key}</p>
            <p className="text-base text-gray-300 leading-7">{row.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modelBlocks.map((model) => (
          <article key={model.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit size={16} className="text-oil-gold" />
              <h4 className="text-lg font-display font-bold text-white">{model.name}</h4>
            </div>
            <p className="text-base text-gray-300 leading-7">{model.role}</p>
            <p className="text-sm text-gray-400 leading-relaxed mt-3">{model.config}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03] flex items-center gap-2">
          <BarChart3 size={16} className="text-oil-gold" />
          <h3 className="text-sm uppercase tracking-[0.16em] text-gray-300 font-semibold">Cross-Horizon Summary</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">Horizon</th>
                <th className="px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">RMSE</th>
                <th className="px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">MAE</th>
                <th className="px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">Directional Acc.</th>
                <th className="px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">USD Error</th>
              </tr>
            </thead>
            <tbody>
              {horizonTable.map((row) => (
                <tr key={row.horizon} className="border-b border-white/10 last:border-b-0">
                  <td className="px-5 py-4 text-base font-semibold text-white">{row.horizon}</td>
                  <td className="px-5 py-4 text-base text-gray-300">{row.rmse}</td>
                  <td className="px-5 py-4 text-base text-gray-300">{row.mae}</td>
                  <td className="px-5 py-4 text-base text-gray-300">{row.directional}</td>
                  <td className="px-5 py-4 text-base text-gray-300">{row.usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03] flex items-center gap-2">
          <Target size={16} className="text-oil-gold" />
          <h3 className="text-sm uppercase tracking-[0.16em] text-gray-300 font-semibold">Sentiment Ablation Notes</h3>
        </div>

        <div className="space-y-0">
          {ablationRows.map((row, index) => (
            <article
              key={row.horizon}
              className={`px-5 py-4 ${index !== ablationRows.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[90px_120px_140px_1fr] gap-3">
                <p className="text-base font-semibold text-white">{row.horizon}</p>
                <p className="text-sm text-gray-400">GRU only: <span className="text-oil-gold">{row.gruOnly}</span></p>
                <p className="text-sm text-gray-400">Ensemble: <span className="text-oil-gold">{row.fullEnsemble}</span></p>
                <p className="text-sm text-gray-300 leading-relaxed">{row.interpretation}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-oil-gold/30 bg-oil-gold/10 p-5 flex items-start gap-3">
        <Sparkles size={16} className="text-oil-gold mt-1" />
        <p className="text-sm text-gray-200 leading-7">
          Practical takeaway: sentiment features are most reliable when combined with structural and
          statistical sub-models. Treat sentiment as a contextual signal rather than a stand-alone predictor.
        </p>
      </section>
    </div>
  );
};

export default ModelDetailsSection;
