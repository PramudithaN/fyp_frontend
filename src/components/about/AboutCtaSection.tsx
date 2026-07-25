import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "../ui/AnimatedButton";

const AboutCtaSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-7 sm:p-9 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-oil-gold/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 rounded-lg bg-oil-gold/10 border border-oil-gold/25">
            <ExternalLink size={18} className="text-oil-gold" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-oil-gold font-semibold">Next Actions</p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
              Continue with Live Data Surfaces
            </h3>
            <p className="text-base text-gray-300 mt-2 leading-7 max-w-2xl">
              Move from architecture documentation to live forecast consumption and market context.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
          <div className="rounded-lg border border-white/10 bg-oil-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">Dashboard</p>
            <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">View forecast curves, confidence fan, and model metadata.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-oil-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">Market News</p>
            <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">Review sentiment context and narrative risk drivers.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-oil-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500 font-semibold">Operational Check</p>
            <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">Confirm version and data freshness before downstream use.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3.5">
          <Link to="/dashboard">
            <AnimatedButton variant="primary" className="px-6 py-3 rounded-lg text-sm flex items-center gap-2">
              Open Dashboard
              <ArrowRight size={16} />
            </AnimatedButton>
          </Link>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          >
            View Market Intelligence
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCtaSection;
