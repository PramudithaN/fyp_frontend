import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  FlaskConical,
  Layers,
  Workflow,
  ExternalLink,
  Home,
} from "lucide-react";
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
  {
    id: "overview",
    title: "Overview",
    icon: <BookOpen size={14} />,
    description: "System architecture and guiding principles",
  },
  {
    id: "quick-facts",
    title: "Quick Facts",
    icon: <FileText size={14} />,
    description: "Version, scope, and benchmark details",
  },
  {
    id: "pipeline",
    title: "Pipeline",
    icon: <Workflow size={14} />,
    description: "End-to-end data and modeling workflow",
  },
  {
    id: "model-details",
    title: "Model Details",
    icon: <FlaskConical size={14} />,
    description: "Ensemble composition and evaluation",
  },
  {
    id: "capabilities",
    title: "Capabilities",
    icon: <Layers size={14} />,
    description: "User-facing analysis capabilities",
  },
  {
    id: "stack",
    title: "Tech Stack",
    icon: <CalendarDays size={14} />,
    description: "Infrastructure and tooling matrix",
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden bg-oil-black">
      <GlowEffect
        color="blue"
        size="lg"
        position={{ top: "4rem", right: "2.5rem" }}
        blur={140}
        opacity={6}
      />
      <BackgroundGrid opacity={14} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={14} className="text-gray-600" />
          <span className="text-xs text-oil-gold font-semibold">About PetroCast</span>
        </div>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-transparent p-8 sm:p-10 lg:p-12 mb-12 lg:mb-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            <span className="px-3 py-1.5 rounded-full border border-oil-gold/30 bg-oil-gold/10 text-[11px] font-semibold tracking-[0.18em] uppercase text-oil-gold">
              Product Documentation
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-gray-400">
              v10.0
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-mono text-gray-400">
              Updated July 2026
            </span>
          </div>

          <div className="max-w-4xl mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.05] mb-6">
              PetroCast Forecasting
              <br />
              Documentation Hub
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-8 max-w-3xl">
              A structured guide to how PetroCast converts market data and sentiment signals into
              multi-horizon Brent crude forecasts. This page is designed for engineering, analytics,
              and product stakeholders who need clarity without reading dense technical reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/12 bg-oil-black/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-semibold">Purpose</p>
              <p className="text-lg text-white font-semibold mt-2.5">Decision Support</p>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                Support market interpretation with probabilistic forecast guidance.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-oil-black/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-semibold">Coverage</p>
              <p className="text-lg text-white font-semibold mt-2.5">H5, H7, H14 Horizons</p>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                Multi-step forecasts with confidence fan and contribution analysis.
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-oil-black/40 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-semibold">Audience</p>
              <p className="text-lg text-white font-semibold mt-2.5">Engineers and Analysts</p>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                Built for teams who need implementation context and output trust signals.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#12100d]/90 backdrop-blur-xl p-5">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-bold mb-4">On This Page</h3>
              <nav className="space-y-1.5">
                {docSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group block rounded-lg px-3 py-2.5 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-200 font-semibold">
                      <span className="text-oil-gold">{section.icon}</span>
                      {section.title}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{section.description}</p>
                  </a>
                ))}
              </nav>

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

          <main className="lg:col-span-9 space-y-10">
            <section id="overview" className="scroll-mt-28 rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9 lg:p-10">
              <div className="max-w-4xl space-y-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Overview</p>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-3">
                    Understanding PetroCast at a Glance
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-300 leading-8">
                  PetroCast is a hybrid forecasting platform that combines classical statistics,
                  deep learning, and sentiment-derived signals to estimate near-term Brent crude
                  price movement.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-8">
                  The documentation below follows a practical order: what the system is, how data
                  moves through it, how the models combine, and how to interpret outputs with risk
                  awareness.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Model Family</p>
                  <p className="text-lg text-white font-semibold mt-2">Hybrid Ensemble</p>
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                    ARIMA + Mid-GRU + Sentiment-GRU + XGBoost with ridge stacking.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Delivery</p>
                  <p className="text-lg text-white font-semibold mt-2">Forecast + Explainability</p>
                  <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                    Multi-horizon outputs, fan quantiles, confidence intervals, and feature drivers.
                  </p>
                </div>
              </div>

              <div className="mt-9 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-oil-gold/30 bg-oil-gold/10 text-sm font-semibold text-oil-gold hover:bg-oil-gold/20 transition-colors"
                >
                  Open Dashboard
                  <ExternalLink size={14} />
                </Link>
                <Link
                  to="/news"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Read Market News
                  <ExternalLink size={14} />
                </Link>
              </div>
            </section>

            <section id="quick-facts" className="scroll-mt-28">
              <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <FileText size={18} className="text-oil-gold mt-1" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Quick Facts</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">Reference Snapshot</h2>
                  </div>
                </div>
                <MetricsSection />
              </div>
            </section>

            <section id="pipeline" className="scroll-mt-28">
              <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <Workflow size={18} className="text-oil-gold mt-1" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Pipeline</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">Data to Forecast Flow</h2>
                  </div>
                </div>
                <PipelineSection />
              </div>
            </section>

            <section id="model-details" className="scroll-mt-28">
              <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <FlaskConical size={18} className="text-oil-gold mt-1" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Model Details</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">Architecture and Evaluation</h2>
                  </div>
                </div>
                <ModelDetailsSection />
              </div>
            </section>

            <section id="capabilities" className="scroll-mt-28">
              <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <Layers size={18} className="text-oil-gold mt-1" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Capabilities</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">What PetroCast Delivers</h2>
                  </div>
                </div>
                <CapabilitiesSection />
              </div>
            </section>

            <section id="stack" className="scroll-mt-28">
              <div className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <CalendarDays size={18} className="text-oil-gold mt-1" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Tech Stack</p>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">Implementation Matrix</h2>
                  </div>
                </div>
                <TechStackSection />
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#14120f]/90 backdrop-blur-xl p-7 sm:p-9">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">Reading Guidance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-oil-gold font-semibold mb-2">Interpretation</p>
                  <p className="text-base text-gray-300 leading-7">
                    Use forecasts as decision-support signals, not fixed market outcomes.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-oil-gold font-semibold mb-2">Directional Use</p>
                  <p className="text-base text-gray-300 leading-7">
                    For many workflows, directional consistency may be more useful than absolute point error.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-oil-gold font-semibold mb-2">Update Cadence</p>
                  <p className="text-base text-gray-300 leading-7">
                    Validate model freshness using dashboard metadata and endpoint headers.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-oil-gold font-semibold mb-2">Uncertainty</p>
                  <p className="text-base text-gray-300 leading-7">
                    Always evaluate confidence intervals and fan spread before operational decisions.
                  </p>
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
