import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "../ui/AnimatedButton";

const CtaSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 md:px-8 lg:px-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="glass-card p-12 md:p-16 rounded-3xl relative overflow-hidden border border-white/15 shadow-2xl">
          <div className="absolute inset-0 bg-oil-gold/10 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-oil-gold/15 border border-oil-gold/30 text-oil-gold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-oil-gold/20">
              <Zap size={28} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white mb-4 tracking-tight">
              Ready to Explore Live Forecasts?
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto text-base">
              Access real-time crude oil projections powered by deep learning models, sentiment pipelines, and multi-currency controls.
            </p>
            <Link to="/dashboard">
              <AnimatedButton variant="primary" className="mx-auto px-8 py-3.5 text-sm font-bold font-display shadow-xl shadow-oil-gold/25 hover:shadow-oil-gold/45">
                Open Live Dashboard
                <ArrowRight size={18} />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
