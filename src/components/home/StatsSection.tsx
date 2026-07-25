import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const StatCard = ({
  value,
  suffix,
  label,
  sublabel,
  delay,
  className,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
  className?: string;
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp(delay * 0.15)}
      className={`glass-card p-5 md:p-6 rounded-2xl text-center border border-white/10 hover:border-oil-gold/30 transition-all duration-300 group ${className ?? ""}`}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-black font-price-display text-oil-gold mb-1.5 group-hover:scale-105 transition-transform duration-300 leading-none">
        {inView ? (
          <CountUp end={value} duration={2.5} suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </div>
      <div className="text-[11px] font-bold text-white uppercase tracking-[0.16em] font-display">
        {label}
      </div>
      <div className="text-[10px] text-gray-400 mt-1 font-medium">
        {sublabel}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-12 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-10 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex md:grid md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4">
          <StatCard
            value={5}
            suffix="-Day"
            label="Forecast Horizon"
            sublabel="Multi-step forward projection"
            delay={0}
            className="min-w-[220px] sm:min-w-[240px] md:min-w-0 snap-start flex-shrink-0"
          />
          <StatCard
            value={3}
            suffix="+"
            label="AI Architectures"
            sublabel="LSTM, Transformer & Ensemble"
            delay={1}
            className="min-w-[220px] sm:min-w-[240px] md:min-w-0 snap-start flex-shrink-0"
          />
          <StatCard
            value={10}
            suffix="+"
            label="Years of History"
            sublabel="Trained on high-frequency data"
            delay={2}
            className="min-w-[220px] sm:min-w-[240px] md:min-w-0 snap-start flex-shrink-0"
          />
          <StatCard
            value={99}
            suffix="%"
            label="System Uptime"
            sublabel="Continuous pipeline monitoring"
            delay={3}
            className="min-w-[220px] sm:min-w-[240px] md:min-w-0 snap-start flex-shrink-0"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
