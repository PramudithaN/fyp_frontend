const FooterNoteSection = () => {
  return (
    <footer className="mt-14 border-t border-white/10 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-semibold mb-2">Documentation Policy</p>
          <p className="text-sm text-gray-300 leading-7">
            This page summarizes architecture and operational behavior for PetroCast v10.
            Verify production freshness using dashboard metadata and API headers.
          </p>
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-semibold mb-2">Usage Disclaimer</p>
          <p className="text-sm text-gray-300 leading-7">
            Forecasts are educational and analytical signals. Apply independent due diligence,
            portfolio controls, and domain review before financial decisions.
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="rounded-lg border border-white/10 bg-oil-black/30 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Version</p>
          <p className="text-sm text-white mt-1">Documentation v10.0</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-oil-black/30 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Model Lineage</p>
          <p className="text-sm text-white mt-1">VMD + Ensemble Stack</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-oil-black/30 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold">Maintained</p>
          <p className="text-sm text-white mt-1">2026</p>
        </div>
      </div>

      <div className="text-center pt-6 border-t border-white/10">
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="text-oil-gold font-semibold">PetroCast Global Intelligence</span> · Documentation Portal
        </p>
      </div>
    </footer>
  );
};

export default FooterNoteSection;
