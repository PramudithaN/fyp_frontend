import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AreaChart, TrendingUp, ShieldCheck, Cpu } from "lucide-react";

const features = [
  {
    num: "01",
    icon: <TrendingUp size={22} />,
    title: "Multi-Horizon Forecasting",
    desc: "Hybrid ensemble combining ARIMA, Mid-GRU, Sentiment-GRU, and XGBoost with ridge stacking delivers 5-day price trajectories with calibrated confidence bands.",
    badge: "H5 · H7 · H14",
  },
  {
    num: "02",
    icon: <AreaChart size={22} />,
    title: "Multi-Benchmark & Currency",
    desc: "Live Brent, WTI, OPEC Reference, and Dubai crude benchmarks converted dynamically across 7 global currencies (USD, EUR, GBP, AED, JPY, CNY, SAR).",
    badge: "4 Benchmarks · 7 Currencies",
  },
  {
    num: "03",
    icon: <ShieldCheck size={22} />,
    title: "Sentiment & SHAP Explainability",
    desc: "FinBERT NLP pipeline processes energy headlines daily. SHAP feature attribution shows exactly which market signals drive each forecast horizon.",
    badge: "FinBERT · SHAP",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-14"
        >
          <motion.div variants={childFade} className="flex items-center gap-2 mb-4">
            <Cpu size={13} className="text-pc-gold" />
            <span className="label-xs">Institutional Capabilities</span>
          </motion.div>
          <motion.h2 variants={childFade} className="font-display font-bold text-3xl md:text-5xl text-text-primary tracking-tight mb-4 max-w-2xl">
            Built for Quantitative Decision-Making
          </motion.h2>
          <motion.p variants={childFade} className="text-text-secondary text-base leading-relaxed max-w-xl">
            State-of-the-art neural networks, NLP sentiment analysis, and open quantitative API access.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={childFade}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group pc-card p-7 flex flex-col gap-5 hover:border-white/12 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-pc-gold group-hover:bg-pc-gold/12 group-hover:border-pc-gold/22 transition-all duration-250">
                  {f.icon}
                </div>
                <span className="label-xs text-right">{f.badge}</span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-text-muted tracking-[0.2em] mb-2">{f.num}</div>
                <h3 className="font-display font-semibold text-lg text-text-primary leading-snug mb-3">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
