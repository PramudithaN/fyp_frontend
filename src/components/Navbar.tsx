import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, ChevronDown, Globe, Home, Info, Menu, Newspaper, X, Wrench } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AnimatedButton from "./ui/AnimatedButton";
import { ApiExportModal } from "./ui/ApiExportModal";
import {
  useCurrency,
  CURRENCIES,
  BENCHMARKS,
  UNITS,
  type CrudeBenchmark,
  type CurrencyCode,
  type VolumeUnit,
} from "../context/CurrencyContext";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const {
    benchmark,
    currency,
    unit,
    setBenchmark,
    setCurrency,
    setUnit,
  } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setControlsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setControlsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { title: "Home", path: "/", icon: <Home size={18} /> },
    { title: "Dashboard", path: "/dashboard", icon: <AreaChart size={18} /> },
    { title: "News", path: "/news", icon: <Newspaper size={18} /> },
    { title: "About", path: "/about", icon: <Info size={18} /> },
  ];

  const benchmarkPrices: Record<CrudeBenchmark, number> = {
    Brent: 78.45,
    WTI: 74.3,
    OPEC: 77.05,
    Dubai: 76.35,
  };

  const currencyRegionCode: Record<CurrencyCode, string> = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    AED: "AE",
    JPY: "JP",
    CNY: "CN",
    SAR: "SA",
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] ml-auto px-6 sm:px-10 h-[62px] flex items-center justify-between w-auto gap-6">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-10 rounded-lg flex items-center gap-1.5 px-0.5"
            >
              <span className="w-7 h-7 shrink-0 rounded-lg bg-oil-gold flex items-center justify-center text-oil-black font-black text-[11px] font-display">P</span>
              <span className="leading-none">
                <span className="block text-[16px] leading-[1] font-display font-bold text-gradient-gold tracking-[0.01em]">PetroCast</span>
                <span className="block mt-[1px] text-[8px] leading-[1] tracking-[0.22em] font-semibold text-[#d6a52f] uppercase whitespace-nowrap">Global Intelligence</span>
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-1.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive ? "text-oil-gold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-oil-gold/10 rounded-xl border border-oil-gold/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <div className="relative" ref={controlsRef}>
              <button
                type="button"
                onClick={() => setControlsOpen((prev) => !prev)}
                className="h-10 px-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2 text-[12px] font-semibold text-gray-300 whitespace-nowrap hover:bg-white/10 transition-colors"
                aria-expanded={controlsOpen}
                aria-label="Toggle market controls"
              >
                <Globe size={14} className="text-[#d6a52f]" />
                <span className="whitespace-nowrap">{benchmark} Crude</span>
                <span className="text-white/20">•</span>
                <span className="text-[11px] uppercase text-gray-400">{currencyRegionCode[currency]} {currency}</span>
                <span className="text-white/20">•</span>
                <span className="text-[11px] text-gray-400">/{unit.toLowerCase()}</span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${controlsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {controlsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[360px] rounded-2xl border border-white/10 bg-oil-dark/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/50"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2 text-gray-100">
                        <Wrench size={14} className="text-oil-gold" />
                        <span className="text-xs font-bold tracking-[0.18em] uppercase">Global Market Controls</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setControlsOpen(false)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                        aria-label="Close market controls"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="pt-3 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Crude Oil Benchmark (USD/bbl)</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(BENCHMARKS) as CrudeBenchmark[]).map((key) => {
                            const option = BENCHMARKS[key];
                            const selected = benchmark === key;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setBenchmark(key)}
                                className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                                  selected
                                    ? "border-oil-gold/50 bg-oil-gold/15 text-oil-gold"
                                    : "border-white/10 bg-white/4 text-gray-300 hover:bg-white/8"
                                }`}
                              >
                                <p className="text-sm font-semibold leading-tight">{option.name}</p>
                                <p className="text-[11px] opacity-70 leading-tight mt-1">${benchmarkPrices[key].toFixed(2)} /bbl</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Display Currency</p>
                        <div className="grid grid-cols-4 gap-2">
                          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((key) => {
                            const option = CURRENCIES[key];
                            const selected = currency === key;
                            return (
                              <button
                                key={option.code}
                                type="button"
                                onClick={() => setCurrency(key)}
                                className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                                  selected
                                    ? "border-oil-gold/50 bg-oil-gold/15 text-oil-gold"
                                    : "border-white/10 bg-white/4 text-gray-300 hover:bg-white/8"
                                }`}
                              >
                                <p className="text-[10px] uppercase font-semibold leading-tight">{option.code}</p>
                                <p className="text-[11px] opacity-70 leading-tight mt-1">{option.symbol.trim() || option.code}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Volume Unit</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(Object.keys(UNITS) as VolumeUnit[]).map((key) => {
                            const option = UNITS[key];
                            const selected = unit === key;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setUnit(key)}
                                className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                                  selected
                                    ? "border-white/35 bg-white/10 text-white"
                                    : "border-white/10 bg-white/4 text-gray-300 hover:bg-white/8"
                                }`}
                              >
                                <p className="text-sm font-semibold leading-tight">/{option.id}</p>
                                <p className="text-[11px] opacity-70 leading-tight mt-1">{option.name}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setApiModalOpen(true)}
              className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2 text-[13px] font-semibold text-gray-300 hover:bg-white/10 transition-colors whitespace-nowrap min-w-fit"
            >
              <Globe size={14} className="text-[#d6a52f]" />
              <span className="whitespace-nowrap">Data API</span>
            </button>

            <Link to="/dashboard">
              <AnimatedButton
                variant="primary"
                hoverScale={1.02}
                className="h-10 px-5 py-0 text-[13px] rounded-xl whitespace-nowrap"
              >
                <AreaChart size={16} />
                Live Forecast
              </AnimatedButton>
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white border-l border-slate-200 shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold font-display text-slate-700">PetroCast</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 flex-1">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "bg-[#fff8e6] text-[#ca8a04] border border-[#f4d58a]"
                            : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="p-4 border-t border-slate-200">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-5 py-3 bg-[#c8942d] text-[#1f2937] font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#b88626] transition-colors">
                    <AreaChart size={16} />
                    Live Forecast
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ApiExportModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
