const FooterNoteSection = () => {
  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">📖 Documentation</p>
          <p className="text-sm text-gray-300">
            This documentation is maintained as part of the PetroCast project. For the latest technical specifications, 
            refer to the dashboard metadata and API response headers.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">⚖️ Disclaimer</p>
          <p className="text-sm text-gray-300">
            Forecasts are provided for research and educational purposes. Always perform your own due diligence 
            before making trading or investment decisions.
          </p>
        </div>
      </div>

      <div className="text-center pt-6 border-t border-white/10">
        <p className="text-xs text-gray-600">
          <span className="text-oil-gold font-semibold">PetroCast Global Intelligence</span> · 
          Developed 2026 · Technical Documentation v10.0
        </p>
      </div>
    </div>
  );
};

export default FooterNoteSection;
