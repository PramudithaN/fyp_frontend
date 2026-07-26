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
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-clip bg-pc-black">
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

        <section className="pc-section p-8 sm:p-10 lg:p-12 mb-12 lg:mb-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            <span className="chip-gold text-[10px] tracking-[0.16em]">
              Product Documentation
            </span>
            <span className="chip-neutral font-mono text-[10px]">v10.0</span>
            <span className="chip-neutral font-mono text-[10px]">Updated July 2026</span>
          </div>

          <div className="max-w-4xl mb-10">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[1.05] tracking-tight mb-6">
              PetroCast Forecasting
              <br />
              <span className="text-gradient-gold">Documentation Hub</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-8 max-w-3xl">
              A structured guide to how PetroCast converts market data and sentiment signals into
              multi-horizon crude price forecasts. Designed for engineering, analytics,
              and product stakeholders who require implementation clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/8 bg-pc-black/40 p-5">
              <p className="label-xs mb-2.5">Purpose</p>
              <p className="font-display font-semibold text-base text-text-primary mb-1.5">Decision Support</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Probabilistic forecast guidance for market interpretation.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-pc-black/40 p-5">
              <p className="label-xs mb-2.5">Coverage</p>
              <p className="font-display font-semibold text-base text-text-primary mb-1.5">H5, H7, H14 Horizons</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Multi-step forecasts with confidence fan and contribution analysis.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-pc-black/40 p-5">
              <p className="label-xs mb-2.5">Audience</p>
              <p className="font-display font-semibold text-base text-text-primary mb-1.5">Engineers &amp; Analysts</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Implementation context and output trust signals for technical teams.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 pc-card-elevated rounded-2xl p-5">
              <h3 className="label-xs mb-4">On This Page</h3>
              <nav className="space-y-0.5">
                {docSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group block rounded-lg px-3 py-2.5 border border-transparent hover:border-white/9 hover:bg-white/5 transition-all duration-150"
                  >
                    <div className="flex items-center gap-2 text-xs text-text-primary font-medium">
                      <span className="text-pc-gold">{section.icon}</span>
                      {section.title}
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{section.description}</p>
                  </a>
                ))}
              </nav>

              <div className="mt-5 pt-4 border-t border-white/6">
                <Link
                  to="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-pc-gold/12 border border-pc-gold/28 text-[12px] font-semibold text-pc-gold hover:bg-pc-gold/20 transition-colors"
                >
                  <ExternalLink size={12} />
                  View Live Dashboard
                </Link>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-8">
            <section id="overview" className="scroll-mt-28 pc-card rounded-2xl p-7 sm:p-9 lg:p-10">
              <div className="max-w-4xl space-y-7">
                <div>
                  <p className="label-xs text-pc-gold mb-0">Overview</p>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mt-3">
                    Understanding PetroCast at a Glance
                  </h2>
                </div>
                <p className="text-base text-text-secondary leading-8">
                  PetroCast is a hybrid forecasting platform that combines classical statistics,
                  deep learning, and sentiment-derived signals to estimate near-term crude price movement.
                </p>
                <p className="text-base text-text-secondary leading-8">
                  The documentation below follows a practical order: what the system is, how data
                  moves through it, how the models combine, and how to interpret outputs with risk
                  awareness.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs mb-2">Model Family</p>
                  <p className="font-display font-semibold text-base text-text-primary mb-1.5">Hybrid Ensemble</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    ARIMA + Mid-GRU + Sentiment-GRU + XGBoost with ridge stacking.
                  </p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs mb-2">Delivery</p>
                  <p className="font-display font-semibold text-base text-text-primary mb-1.5">Forecast + Explainability</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Multi-horizon outputs, fan quantiles, confidence intervals, and feature drivers.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-7 border-t border-white/6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-pc-gold/28 bg-pc-gold/10 text-sm font-semibold text-pc-gold hover:bg-pc-gold/18 transition-colors"
                >
                  Open Dashboard
                  <ExternalLink size={13} />
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-text-primary hover:bg-white/9 transition-colors"
                >
                  Read Market News
                  <ExternalLink size={13} />
                </Link>
              </div>
            </section>

            <section id="quick-facts" className="scroll-mt-28">
              <div className="pc-card rounded-2xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-1.5 rounded-lg bg-pc-gold/10 border border-pc-gold/20">
                    <FileText size={15} className="text-pc-gold" />
                  </div>
                  <div>
                    <p className="label-xs text-pc-gold mb-1">Quick Facts</p>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">Reference Snapshot</h2>
                  </div>
                </div>
                <MetricsSection />
              </div>
            </section>

            <section id="pipeline" className="scroll-mt-28">
              <div className="pc-card rounded-2xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-1.5 rounded-lg bg-pc-gold/10 border border-pc-gold/20">
                    <Workflow size={15} className="text-pc-gold" />
                  </div>
                  <div>
                    <p className="label-xs text-pc-gold mb-1">Pipeline</p>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">Data to Forecast Flow</h2>
                  </div>
                </div>
                <PipelineSection />
              </div>
            </section>

            <section id="model-details" className="scroll-mt-28">
              <div className="pc-card rounded-2xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-1.5 rounded-lg bg-pc-gold/10 border border-pc-gold/20">
                    <FlaskConical size={15} className="text-pc-gold" />
                  </div>
                  <div>
                    <p className="label-xs text-pc-gold mb-1">Model Details</p>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">Architecture and Evaluation</h2>
                  </div>
                </div>
                <ModelDetailsSection />
              </div>
            </section>

            <section id="capabilities" className="scroll-mt-28">
              <div className="pc-card rounded-2xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-1.5 rounded-lg bg-pc-gold/10 border border-pc-gold/20">
                    <Layers size={15} className="text-pc-gold" />
                  </div>
                  <div>
                    <p className="label-xs text-pc-gold mb-1">Capabilities</p>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">What PetroCast Delivers</h2>
                  </div>
                </div>
                <CapabilitiesSection />
              </div>
            </section>

            <section id="stack" className="scroll-mt-28">
              <div className="pc-card rounded-2xl p-7 sm:p-9">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-1.5 rounded-lg bg-pc-gold/10 border border-pc-gold/20">
                    <CalendarDays size={15} className="text-pc-gold" />
                  </div>
                  <div>
                    <p className="label-xs text-pc-gold mb-1">Tech Stack</p>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">Implementation Matrix</h2>
                  </div>
                </div>
                <TechStackSection />
              </div>
            </section>

            <section className="pc-card rounded-2xl p-7 sm:p-9">
              <p className="label-xs text-pc-gold mb-1">Reading Guidance</p>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight mb-6">How to Use Forecasts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs text-pc-gold mb-2">Interpretation</p>
                  <p className="text-sm text-text-secondary leading-7">
                    Use forecasts as decision-support signals, not fixed market outcomes.
                  </p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs text-pc-gold mb-2">Directional Use</p>
                  <p className="text-sm text-text-secondary leading-7">
                    Directional consistency may be more useful than absolute point error for many workflows.
                  </p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs text-pc-gold mb-2">Update Cadence</p>
                  <p className="text-sm text-text-secondary leading-7">
                    Validate model freshness using dashboard metadata and endpoint headers.
                  </p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5">
                  <p className="label-xs text-pc-gold mb-2">Uncertainty</p>
                  <p className="text-sm text-text-secondary leading-7">
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
