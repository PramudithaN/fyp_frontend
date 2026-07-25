import { BookOpen, CalendarDays, ChevronRight, FileText, FlaskConical, Layers, Workflow } from "lucide-react";
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
  { id: "overview", title: "Overview", icon: <BookOpen size={14} /> },
  { id: "quick-facts", title: "Quick Facts", icon: <FileText size={14} /> },
  { id: "pipeline", title: "Pipeline", icon: <Workflow size={14} /> },
  { id: "model-details", title: "Model Details", icon: <FlaskConical size={14} /> },
  { id: "capabilities", title: "Capabilities", icon: <Layers size={14} /> },
  { id: "stack", title: "Tech Stack", icon: <CalendarDays size={14} /> },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden bg-oil-black">
      <GlowEffect
        color="blue"
        size="lg"
        position={{ bottom: "10rem", right: "2.5rem" }}
        blur={120}
        opacity={5}
      />
      <BackgroundGrid opacity={20} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 glass rounded-2xl border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-oil-light-gold/85 mb-3">
                Documentation
              </p>
              <nav className="space-y-1.5">
                {docSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-oil-gold">{section.icon}</span>
                      {section.title}
                    </span>
                    <ChevronRight size={13} className="text-gray-500" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-8">
            <section id="overview" className="glass rounded-3xl border border-white/10 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full border border-oil-gold/25 bg-oil-gold/10 text-[10px] font-semibold tracking-[0.18em] uppercase text-oil-light-gold">
                  Project Docs
                </span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-gray-400">
                  Version 10.0
                </span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-gray-400">
                  Updated: 2026-03
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                PetroCast Forecasting Documentation
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-4 max-w-4xl">
                This page documents the end-to-end architecture behind PetroCast, including the data flow,
                VMD-based decomposition pipeline, specialist sub-models, stacking strategy, and deployment-facing
                outputs used by the dashboard and analytics routes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500">Forecast Scope</p>
                  <p className="text-sm text-white font-semibold mt-1">Multi-horizon Brent Forecasting</p>
                  <p className="text-xs text-gray-400 mt-1">H5, H7, H14 prediction streams</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500">ML Strategy</p>
                  <p className="text-sm text-white font-semibold mt-1">Hybrid Ensemble</p>
                  <p className="text-xs text-gray-400 mt-1">ARIMA + GRU + Sentiment GRU + XGBoost</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500">Output Channels</p>
                  <p className="text-sm text-white font-semibold mt-1">Forecast, Fan, Explainability</p>
                  <p className="text-xs text-gray-400 mt-1">Delivered through typed API contracts</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-oil-gold text-oil-black text-sm font-semibold hover:brightness-105 transition"
                >
                  Open Dashboard
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-sm text-gray-200 hover:bg-white/5 transition"
                >
                  Open News Intelligence
                </Link>
              </div>
            </section>

            <section id="quick-facts" className="space-y-4 scroll-mt-28">
              <div className="glass rounded-2xl border border-white/10 p-5">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Quick Facts</h2>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Key implementation and evaluation choices that define model behavior and expected output characteristics.
                </p>
              </div>
              <MetricsSection />
            </section>

            <section id="pipeline" className="scroll-mt-28">
              <PipelineSection />
            </section>

            <section id="model-details" className="scroll-mt-28">
              <ModelDetailsSection />
            </section>

            <section id="capabilities" className="scroll-mt-28">
              <CapabilitiesSection />
            </section>

            <section id="stack" className="scroll-mt-28">
              <TechStackSection />
            </section>

            <section className="glass rounded-2xl border border-white/10 p-5 sm:p-6">
              <h3 className="text-lg font-display font-semibold text-white">Interpretation Notes</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 leading-relaxed">
                  Forecast outputs should be interpreted as decision-support signals rather than deterministic price targets.
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 leading-relaxed">
                  Directional metrics (accuracy, F1, AUC) can be more actionable than absolute error for short-horizon trading workflows.
                </div>
              </div>
            </section>

            <AboutCtaSection />
            <FooterNoteSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default About;
