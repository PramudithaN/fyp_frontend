import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import BackgroundGrid from "../ui/BackgroundGrid";
import GlowEffect from "../ui/GlowEffect";
import AnimatedButton from "../ui/AnimatedButton";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale  = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden"
    >
      <BackgroundGrid opacity={20} />
      <GlowEffect color="gold" size="xl" position={{ top: "35%", left: "50%" }} blur={180} opacity={8} />
      <GlowEffect color="blue" size="md" position={{ bottom: "15%", left: "15%" }} blur={130} opacity={5} />

      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center max-w-4xl mx-auto w-full pt-32 pb-24"
      >
        {/* Version badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-7"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pc-gold/25 bg-pc-gold/8 text-[11px] font-semibold text-pc-gold tracking-[0.1em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-pc-gold animate-pulse" />
            v10.0 · Hybrid Ensemble · Multi-Horizon Forecasting
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight text-text-primary mb-6"
        >
          Institutional
          <span className="block text-gradient-gold">Crude Oil</span>
          Intelligence
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Multi-horizon Brent, WTI, OPEC, and Dubai crude price forecasts powered by hybrid
          ensemble deep learning, FinBERT sentiment analysis, and SHAP explainability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <AnimatedButton variant="primary" className="px-7 py-3 text-sm font-bold shadow-lg shadow-pc-gold/15">
              <TrendingUp size={16} />
              Launch Live Dashboard
            </AnimatedButton>
          </Link>
          <Link to="/about">
            <AnimatedButton variant="secondary" className="px-7 py-3 text-sm">
              View Methodology
              <ChevronRight size={15} className="text-text-muted" />
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-12 text-[11px] text-text-muted uppercase tracking-[0.14em] font-medium"
        >
          <span>Brent · WTI · OPEC · Dubai</span>
          <span className="text-white/15">|</span>
          <span>7 Global Currencies</span>
          <span className="text-white/15">|</span>
          <span>SHAP Explainability</span>
          <span className="text-white/15">|</span>
          <span>5-Day Horizon</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
