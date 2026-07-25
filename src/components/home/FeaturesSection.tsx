import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AreaChart, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import BackgroundGrid from "../ui/BackgroundGrid";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const childFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FeaturesSection = () => {
  const [featRef, featInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <TrendingUp size={26} />,
      title: "Precision Multi-Horizon Forecasting",
      desc: "Deep learning models (LSTM, Transformer) trained on high-frequency market data to deliver 5-day price trajectories with confidence bands.",
      color: "bg-oil-gold/10",
      badge: "Deep Learning",
    },
    {
      icon: <AreaChart size={26} />,
      title: "Real-time Analytics & Spreads",
      desc: "Integrated market data feed tracking Brent, WTI, OPEC Reference, and Dubai crude benchmarks converted dynamically across 7 global currencies.",
      color: "bg-oil-gold/10",
      badge: "Multi-Currency",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Institutional Sentiment & SHAP Explainability",
      desc: "FinBERT NLP pipeline analyzes energy headlines alongside SHAP feature attribution to explain driving market forces behind every forecast.",
      color: "bg-oil-gold/10",
      badge: "NLP + SHAP",
    },
  ];

  return (
    <section
      ref={featRef}
      className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 relative"
    >
      <BackgroundGrid opacity={15} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={featInView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div
            variants={childFade}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-oil-gold/10 border border-oil-gold/30 text-oil-gold text-xs font-bold uppercase tracking-widest mb-3 font-display"
          >
            <Cpu size={14} />
            Institutional Capabilities
          </motion.div>
          <motion.h2
            variants={childFade}
            className="text-3xl md:text-5xl font-black font-display text-white mb-4 tracking-tight"
          >
            Built for Quantitative Decision-Making
          </motion.h2>
          <motion.p
            variants={childFade}
            className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Combining state-of-the-art neural networks, NLP sentiment analysis, and open quantitative API feeds.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={featInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={childFade}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-3xl glass-card hover:border-oil-gold/40 transition-all duration-500 cursor-default flex flex-col justify-between"
            >
              <div
                className={`absolute inset-0 rounded-3xl ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-oil-gold group-hover:bg-oil-gold/15 group-hover:border-oil-gold/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white font-display leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
