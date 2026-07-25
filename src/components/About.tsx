import { BookOpen, CalendarDays, ChevronRight, FileText, FlaskConical, Layers, Workflow, ExternalLink, Home } from "lucide-react";
import { Link } from "react-router-dom";
import MetricsSection from "./about/MetricsSection";
import PipelineSection from "./about/PipelineSection";
import ModelDetailsSection from "./about/ModelDetailsSection";
import CapabilitiesSection from "./about/CapabilitiesSection";
import TechStackSection from "./about/TechStackSection";
import AboutCtaSection from "./about/AboutCtaSection";
import FooterNoteSection from "./about/FooterNoteSection";
import BackgroundGrid from "./ui/BackgroundGrid";
import GlowEffect from "./ui/GlowEffect";

const docSections = [
  { id: "overview", title: "Overview", icon: <BookOpen size={14} />, description: "System architecture and design philosophy" },
  { id: "quick-facts", title: "Quick Facts", icon: <FileText size={14} />, description: "Key metrics and specifications" },
  { id: "pipeline", title: "Pipeline", icon: <Workflow size={14} />, description: "Data processing and model workflow" },
  { id: "model-details", title: "Model Details", icon: <FlaskConical size={14} />, description: "Ensemble model composition" },
  { id: "capabilities", title: "Capabilities", icon: <Layers size={14} />, description: "Feature set and output types" },
  { id: "stack", title: "Tech Stack", icon: <CalendarDays size={14} />, description: "Technology and infrastructure" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden bg-oil-black">
      <GlowEffect
        color="blue"
        size="lg"
        position={{ bottom: "10rem", right: "2.5rem" }}
        blur={120}
        opacity={5}
      />
      <BackgroundGrid opacity={20} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-xs text-oil-gold font-semibold">Documentation</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full border border-oil-gold/30 bg-oil-gold/10 text-[11px] font-semibold tracking-[0.18em] uppercase text-oil-gold">
              📚 Technical Documentation
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-gray-400">
              v10.0
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-gray-400">
              Updated Mar 2026
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
              PetroCast Oil Price<br />Forecasting System
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl">
              Comprehensive technical documentation of the PetroCast ensemble forecasting architecture, 
              including data pipelines, model specifications, deployment strategies, and API integration guides.
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 hover:border-oil-gold/30 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">Model Type</p>
              <p className="text-sm text-white font-semibold mt-2">Hybrid Ensemble</p>
              <p className="text-xs text-gray-400 mt-1">ARIMA + GRU + Sentiment + XGBoost</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 hover:border-oil-gold/30 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">Prediction Scope</p>
              <p className="text-sm text-white font-semibold mt-2">5 to 14 Days</p>
              <p className="text-xs text-gray-400 mt-1">Multi-horizon Brent crude forecasting</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 hover:border-oil-gold/30 transition-colors">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 font-semibold">Output Formats</p>
              <p className="text-sm text-white font-semibold mt-2">REST API</p>
              <p className="text-xs text-gray-400 mt-1">Forecast, Fan, Explainability endpoints</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 glass rounded-2xl border border-white/10 p-5">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-4 flex items-center gap-2">
                <BookOpen size={13} className="text-oil-gold" />
                Table of Contents
              </h3>
              <nav className="space-y-1.5">
                {docSections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-start justify-between rounded-lg border border-transparent px-3 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-oil-gold mt-0.5 flex-shrink-0">{section.icon}</span>
                      <div>
                        <p className="text-gray-200 font-medium">{section.title}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{section.description}</p>
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-oil-gold transition-colors flex-shrink-0 mt-1">
                      <ChevronRight size={13} />
                    </span>
                  </a>
                ))}
              </nav>

              {/* Sidebar CTA */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  to="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-oil-gold/15 border border-oil-gold/30 text-xs font-semibold text-oil-gold hover:bg-oil-gold/25 transition-colors"
                >
                  <ExternalLink size={12} />
                  View Live Dashboard
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-10">
            {/* Overview Section */}
            <section id="overview" className="glass rounded-2xl border border-white/10 p-7 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <BookOpen size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">System Overview</h2>
                  <p className="text-sm text-gray-400 mt-1">Comprehensive introduction to PetroCast architecture</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  PetroCast is a sophisticated multi-model ensemble forecasting system designed to predict crude oil prices 
                  (Brent benchmark) over multiple time horizons. The system combines classical time-series models, deep learning, 
                  sentiment analysis, and gradient boosting into a unified prediction framework with explainability features.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  This documentation covers the complete system architecture, including data ingestion pipelines, model 
                  composition, training strategies, deployment architecture, and API contract specifications for integrating 
                  forecasts into downstream applications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <Link
                  to="/dashboard"
                  className="group p-4 rounded-lg border border-oil-gold/20 bg-oil-gold/5 hover:bg-oil-gold/10 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-oil-gold font-semibold mb-2">Next Step</p>
                  <p className="text-sm text-white font-semibold group-hover:text-oil-gold transition-colors flex items-center gap-2">
                    View Dashboard
                    <ExternalLink size={14} />
                  </p>
                </Link>
                <Link
                  to="/news"
                  className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Alternative</p>
                  <p className="text-sm text-white font-semibold group-hover:text-oil-gold transition-colors flex items-center gap-2">
                    Read Market News
                    <ExternalLink size={14} />
                  </p>
                </Link>
                <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Last Updated</p>
                  <p className="text-sm text-white font-semibold">March 2026</p>
                </div>
              </div>
            </section>

            {/* Quick Facts Section */}
            <section id="quick-facts" className="scroll-mt-28">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <FileText size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Key Specifications</h2>
                  <p className="text-sm text-gray-400 mt-1">System metrics and quick reference</p>
                </div>
              </div>
              <MetricsSection />
            </section>

            {/* Pipeline Section */}
            <section id="pipeline" className="scroll-mt-28">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <Workflow size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Data Pipeline</h2>
                  <p className="text-sm text-gray-400 mt-1">End-to-end data flow and processing architecture</p>
                </div>
              </div>
              <PipelineSection />
            </section>

            {/* Model Details Section */}
            <section id="model-details" className="scroll-mt-28">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <FlaskConical size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Model Architecture</h2>
                  <p className="text-sm text-gray-400 mt-1">Ensemble composition and sub-model specifications</p>
                </div>
              </div>
              <ModelDetailsSection />
            </section>

            {/* Capabilities Section */}
            <section id="capabilities" className="scroll-mt-28">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <Layers size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Capabilities & Features</h2>
                  <p className="text-sm text-gray-400 mt-1">Available outputs and functionality matrix</p>
                </div>
              </div>
              <CapabilitiesSection />
            </section>

            {/* Tech Stack Section */}
            <section id="stack" className="scroll-mt-28">
              <div className="mb-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-oil-gold/10 border border-oil-gold/20">
                  <CalendarDays size={20} className="text-oil-gold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Technology Stack</h2>
                  <p className="text-sm text-gray-400 mt-1">Infrastructure, frameworks, and deployment</p>
                </div>
              </div>
              <TechStackSection />
            </section>

            {/* Best Practices */}
            <section className="glass rounded-2xl border border-white/10 p-7 sm:p-8">
              <h3 className="text-xl font-display font-bold text-white mb-4">Best Practices & Interpretation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 leading-relaxed">
                  <p className="text-xs uppercase tracking-widest text-oil-gold font-semibold mb-2">💡 Decision Support</p>
                  <p className="text-sm text-gray-300">Treat forecasts as decision-support signals rather than deterministic price targets for risk management.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 leading-relaxed">
                  <p className="text-xs uppercase tracking-widest text-oil-gold font-semibold mb-2">📊 Directional Metrics</p>
                  <p className="text-sm text-gray-300">Directional accuracy (up/down calls) can be more actionable than absolute error metrics for trading workflows.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 leading-relaxed">
                  <p className="text-xs uppercase tracking-widest text-oil-gold font-semibold mb-2">🔄 Model Updates</p>
                  <p className="text-sm text-gray-300">The ensemble retrains regularly with fresh market data. Check dashboard metadata for last update timestamp.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 leading-relaxed">
                  <p className="text-xs uppercase tracking-widest text-oil-gold font-semibold mb-2">⚠️ Confidence Levels</p>
                  <p className="text-sm text-gray-300">Monitor confidence intervals and sentiment dominance flags for uncertainty quantification.</p>
                </div>
              </div>
            </section>

            {/* Additional Resources */}
            <AboutCtaSection />
            
            {/* Footer Note */}
            <FooterNoteSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default About;
