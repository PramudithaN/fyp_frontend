import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 5,  suffix: "-Day", label: "Forecast Horizon",   sub: "Multi-step forward projection" },
  { value: 4,  suffix: "+",    label: "AI Architectures",   sub: "GRU, ARIMA, XGBoost, Ensemble" },
  { value: 10, suffix: "+",    label: "Years of History",   sub: "High-frequency market data" },
  { value: 99, suffix: "%",    label: "System Uptime",      sub: "Continuous pipeline monitoring" },
];

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/7"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-pc-surface flex flex-col items-center justify-center text-center py-8 px-4 group hover:bg-pc-elevated transition-colors duration-200"
            >
              <div className="font-display font-black text-4xl text-pc-gold leading-none mb-2 group-hover:scale-105 transition-transform duration-200">
                {inView ? (
                  <CountUp end={stat.value} duration={2.2} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-[12px] font-semibold text-text-primary uppercase tracking-[0.12em] mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-text-muted leading-snug max-w-[120px]">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
