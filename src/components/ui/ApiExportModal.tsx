import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Code2, Copy, Check, FileSpreadsheet, FileJson, Globe } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

interface ApiExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate?: string;
  endDate?: string;
  comparisonData?: any[];
}

export const ApiExportModal: React.FC<ApiExportModalProps> = ({
  isOpen,
  onClose,
  startDate = "2026-01-01",
  endDate = "2026-07-19",
  comparisonData = [],
}) => {
  const { currency, benchmark, unit, currencyDetails, benchmarkDetails } = useCurrency();
  const [activeTab, setActiveTab] = useState<"download" | "api">("download");
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    if (!comparisonData.length) return;
    const header = `Date,Actual_Price_${currency},Predicted_Price_${currency},Lower_Bound_${currency},Upper_Bound_${currency},Abs_Error_${currency},Pct_Error_%`;
    const rows = comparisonData.map((row) =>
      [
        row.date,
        row.actual_price ?? "",
        row.predicted_price ?? "",
        row.predicted_price_lower_bound ?? "",
        row.predicted_price_upper_bound ?? "",
        row.abs_error ?? "",
        row.abs_pct_error ?? "",
      ].join(",")
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PetroCast_${benchmark}_Predictions_${startDate}_to_${endDate}_${currency}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    if (!comparisonData.length) return;
    const exportObject = {
      system: "PetroCast International Forecasting API",
      benchmark: benchmarkDetails.name,
      ticker: benchmarkDetails.symbol,
      currency,
      volume_unit: unit,
      date_range: { start_date: startDate, end_date: endDate },
      total_records: comparisonData.length,
      exported_at: new Date().toISOString(),
      data: comparisonData,
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PetroCast_${benchmark}_Predictions_${startDate}_to_${endDate}_${currency}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const baseUrl = "https://pramudithan-oil-price-prediction.hf.space";
  const apiEndpoint = `${baseUrl}/predictions/compare?start_date=${startDate}&end_date=${endDate}&benchmark=${benchmarkDetails.symbol.toLowerCase()}`;

  const snippets = {
    curl: `curl -X GET "${apiEndpoint}" \\
  -H "Accept: application/json" \\
  -H "X-Client-Currency: ${currency}"`,
    python: `import requests

url = "${apiEndpoint}"
headers = {
    "Accept": "application/json",
    "X-Client-Currency": "${currency}"
}

response = requests.get(url, headers=headers)
data = response.json()

print(f"Benchmark: {benchmarkDetails.name}")
print(f"Total days returned: {len(data.get('comparison', []))}")`,
    javascript: `async function fetchPetroCastPredictions() {
  const url = "${apiEndpoint}";
  const response = await fetch(url, {
    headers: { "Accept": "application/json", "X-Client-Currency": "${currency}" }
  });
  const data = await response.json();
  console.log("PetroCast Predictions:", data);
  return data;
}`,
  };

  const copySnippet = (lang: "curl" | "python" | "javascript") => {
    navigator.clipboard.writeText(snippets[lang]);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="glass-strong border border-white/10 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-oil-gold/15 border border-oil-gold/30 flex items-center justify-center text-oil-gold">
                <Globe size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  Global Data & Developer API Hub
                </h3>
                <p className="text-xs text-gray-400">
                  Export predictions or integrate PetroCast REST API into international workflows
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Active Preset Context Bar */}
          <div className="my-4 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-300">
            <span>
              Benchmark: <strong className="text-oil-gold">{benchmarkDetails.name} ({benchmarkDetails.symbol})</strong>
            </span>
            <span>
              Currency: <strong className="text-oil-gold">{currencyDetails.flag} {currency} ({currencyDetails.symbol})</strong>
            </span>
            <span>
              Records: <strong className="text-oil-gold">{comparisonData.length} days</strong>
            </span>
          </div>

          {/* Modal Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
            <button
              onClick={() => setActiveTab("download")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "download"
                  ? "bg-oil-gold/20 text-oil-gold border border-oil-gold/40 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Download size={14} />
              Dataset Downloads
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "api"
                  ? "bg-oil-gold/20 text-oil-gold border border-oil-gold/40 shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 size={14} />
              Developer REST API
            </button>
          </div>

          {/* Tab 1: Dataset Downloads */}
          {activeTab === "download" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadCSV}
                  disabled={!comparisonData.length}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-oil-gold/50 hover:bg-oil-gold/5 transition-all text-left group cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-oil-gold/10 text-oil-gold flex items-center justify-center">
                      <FileSpreadsheet size={20} />
                    </div>
                    <Download size={16} className="text-gray-500 group-hover:text-oil-gold transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Export CSV Spreadsheet</h4>
                  <p className="text-xs text-gray-400">
                    Formatted tabular data compatible with Excel, Python pandas, and R.
                  </p>
                </button>

                <button
                  onClick={handleDownloadJSON}
                  disabled={!comparisonData.length}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-oil-gold/50 hover:bg-oil-gold/5 transition-all text-left group cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-oil-gold/10 text-oil-gold flex items-center justify-center">
                      <FileJson size={20} />
                    </div>
                    <Download size={16} className="text-gray-500 group-hover:text-oil-gold transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Export Structured JSON</h4>
                  <p className="text-xs text-gray-400">
                    Complete payload including system metadata, benchmark info, and daily price series.
                  </p>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 space-y-1">
                <p className="font-semibold text-gray-300">Data License & Usage:</p>
                <p>
                  PetroCast open data feeds are free for institutional research, academic analysis, and financial modeling.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Developer REST API */}
          {activeTab === "api" && (
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-300 font-mono">cURL Command</span>
                  <button
                    onClick={() => copySnippet("curl")}
                    className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                  >
                    {copiedLang === "curl" ? <Check size={12} /> : <Copy size={12} />}
                    {copiedLang === "curl" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400 overflow-x-auto">
                  {snippets.curl}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-300 font-mono">Python (requests)</span>
                  <button
                    onClick={() => copySnippet("python")}
                    className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                  >
                    {copiedLang === "python" ? <Check size={12} /> : <Copy size={12} />}
                    {copiedLang === "python" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400 overflow-x-auto">
                  {snippets.python}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-300 font-mono">JavaScript (fetch)</span>
                  <button
                    onClick={() => copySnippet("javascript")}
                    className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                  >
                    {copiedLang === "javascript" ? <Check size={12} /> : <Copy size={12} />}
                    {copiedLang === "javascript" ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400 overflow-x-auto">
                  {snippets.javascript}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
