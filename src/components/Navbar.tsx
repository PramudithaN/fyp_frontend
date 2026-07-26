import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, ChevronDown, Globe, Home, Info, Menu, Newspaper, X, Settings2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AnimatedButton from "./ui/AnimatedButton";
import { ApiExportModal } from "./ui/ApiExportModal";
import { fetchBenchmarkQuotes } from "../api";
import type { BenchmarkQuote, BenchmarkTarget } from "../types/api";
import {
  useCurrency,
  CURRENCIES,
  BENCHMARKS,
  UNITS,
  type CrudeBenchmark,
  type CurrencyCode,
  type VolumeUnit,
} from "../context/CurrencyContext";

const BENCHMARK_TO_TARGET: Record<CrudeBenchmark, BenchmarkTarget> = {
  Brent: "brent",
  WTI: "wti",
  OPEC: "opec",
  Dubai: "dubai",
};

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [benchmarkQuotes, setBenchmarkQuotes] = useState<Partial<Record<CrudeBenchmark, BenchmarkQuote>>>({});
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

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setControlsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => { setControlsOpen(false); }, [location.pathname]);

  const navItems = [
    { title: "Home",      path: "/",          icon: <Home size={15} /> },
    { title: "Dashboard", path: "/dashboard", icon: <AreaChart size={15} /> },
    { title: "News",      path: "/news",      icon: <Newspaper size={15} /> },
    { title: "About",     path: "/about",     icon: <Info size={15} /> },
  ];

  const fallbackBenchmarkPrices: Record<CrudeBenchmark, number> = {
    Brent: 78.45,
    WTI: 74.30,
    OPEC: 77.05,
    Dubai: 76.35,
  };

  useEffect(() => {
    let mounted = true;
    const loadBenchmarkQuotes = async () => {
      try {
        const response = await fetchBenchmarkQuotes({ lookbackDays: 60 });
        if (!mounted) return;
        const quoteMap: Partial<Record<CrudeBenchmark, BenchmarkQuote>> = {};
        (Object.keys(BENCHMARKS) as CrudeBenchmark[]).forEach((key) => {
          const target = BENCHMARK_TO_TARGET[key];
          const found = response.quotes.find((quote) => quote.benchmark === target);
          if (found) quoteMap[key] = found;
        });
        setBenchmarkQuotes(quoteMap);
      } catch { /* Keep fallback prices if endpoint temporarily unavailable. */ }
    };
    void loadBenchmarkQuotes();
    return () => { mounted = false; };
  }, []);

  const currencyRegionCode: Record<CurrencyCode, string> = {
    USD: "USD", EUR: "EUR", GBP: "GBP",
    AED: "AED", JPY: "JPY", CNY: "CNY", SAR: "SAR",
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-pc-surface/95 backdrop-blur-xl border-b border-white/7 shadow-sm shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between gap-6">

          {/* ── Brand ── */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-[8px] bg-pc-gold flex items-center justify-center shadow-sm shadow-pc-gold/30">
                <span className="font-display font-black text-[11px] text-black tracking-tight">P</span>
              </div>
              <div className="leading-none">
                <span className="block font-display font-bold text-[15px] leading-none text-gradient-gold tracking-[0.01em]">PetroCast</span>
                <span className="block mt-[3px] text-[9px] leading-none tracking-[0.22em] font-medium text-text-muted uppercase">Global Intelligence</span>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-0.5 rounded-[14px] border border-white/8 bg-white/4 px-1 py-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive ? "text-pc-gold" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-pc-gold/10 rounded-[10px] border border-pc-gold/18"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
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

          {/* ── Desktop Controls ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">

            {/* Market Controls Dropdown */}
            <div className="relative" ref={controlsRef}>
              <button
                type="button"
                onClick={() => setControlsOpen((prev) => !prev)}
                className="h-9 px-3 rounded-[10px] border border-white/9 bg-white/4 flex items-center gap-2 text-[12px] font-medium text-text-secondary hover:bg-white/7 hover:text-text-primary transition-all duration-150"
                aria-expanded={controlsOpen}
                aria-label="Toggle market controls"
              >
                <Globe size={13} className="text-pc-gold" />
                <span className="font-mono text-[11px]">{benchmark}</span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="font-mono text-[11px]">{currencyRegionCode[currency]}</span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="font-mono text-[11px]">{unit.toLowerCase()}</span>
                <ChevronDown
                  size={12}
                  className={`text-text-muted ml-0.5 transition-transform duration-200 ${
                    controlsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {controlsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-[380px] rounded-2xl border border-white/9 bg-pc-elevated/98 backdrop-blur-2xl p-5 shadow-2xl shadow-black/60"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/7">
                      <div className="flex items-center gap-2">
                        <Settings2 size={13} className="text-pc-gold" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">Market Controls</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setControlsOpen(false)}
                        className="text-text-muted hover:text-text-secondary transition-colors p-0.5 rounded-md hover:bg-white/6"
                        aria-label="Close market controls"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <div className="pt-4 space-y-5">

                      {/* Crude Benchmark */}
                      <div>
                        <p className="label-xs mb-3">Crude Benchmark</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(BENCHMARKS) as CrudeBenchmark[]).map((key) => {
                            const option = BENCHMARKS[key];
                            const selected = benchmark === key;
                            const quote = benchmarkQuotes[key];
                            const displayPrice = quote?.price ?? fallbackBenchmarkPrices[key];
                            const isEstimated = quote?.quote_type === "derived";
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setBenchmark(key)}
                                className={`rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150 ${
                                  selected
                                    ? "border-pc-gold/40 bg-pc-gold/15 shadow-sm shadow-pc-gold/10"
                                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <p className={`text-[13px] font-semibold ${ selected ? "text-pc-gold" : "text-text-primary" }`}>
                                    {option.name}
                                  </p>
                                  {isEstimated && (
                                    <span className="chip-neutral text-[9px] py-0.5 px-1.5">Est</span>
                                  )}
                                </div>
                                <p className={`font-mono text-[11px] ${ selected ? "text-pc-gold/80" : "text-text-secondary" }`}>${displayPrice.toFixed(2)}/bbl</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Display Currency */}
                      <div>
                        <p className="label-xs mb-3">Display Currency</p>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((key) => {
                            const option = CURRENCIES[key];
                            const selected = currency === key;
                            return (
                              <button
                                key={option.code}
                                type="button"
                                onClick={() => setCurrency(key)}
                                className={`rounded-lg border px-2 py-2 text-center transition-all duration-150 ${
                                  selected
                                    ? "border-pc-gold/40 bg-pc-gold/15 text-pc-gold"
                                    : "border-white/10 bg-white/5 text-text-primary hover:bg-white/10 hover:border-white/20"
                                }`}
                              >
                                <p className="text-[11px] font-semibold font-mono">{option.code}</p>
                                <p className={`text-[11px] mt-0.5 ${ selected ? "text-pc-gold/80" : "text-text-secondary" }`}>{option.symbol.trim() || option.code}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Volume Unit */}
                      <div>
                        <p className="label-xs mb-3">Volume Unit</p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(Object.keys(UNITS) as VolumeUnit[]).map((key) => {
                            const option = UNITS[key];
                            const selected = unit === key;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => setUnit(key)}
                                className={`rounded-lg border px-2 py-2 text-center transition-all duration-150 ${
                                  selected
                                    ? "border-white/30 bg-white/15 text-text-primary"
                                    : "border-white/10 bg-white/5 text-text-primary hover:bg-white/10 hover:border-white/20"
                                }`}
                              >
                                <p className="text-[12px] font-semibold font-mono">/{option.id}</p>
                                <p className={`text-[10px] mt-0.5 ${ selected ? "text-white/80" : "text-text-secondary" }`}>{option.name}</p>
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

            {/* Data API Button */}
            <button
              type="button"
              onClick={() => setApiModalOpen(true)}
              className="h-9 px-3.5 rounded-[10px] border border-white/9 bg-white/4 flex items-center gap-1.5 text-[12px] font-medium text-text-secondary hover:bg-white/7 hover:text-text-primary transition-all duration-150 whitespace-nowrap"
            >
              <Globe size={13} className="text-pc-gold" />
              <span>Data API</span>
            </button>

            {/* Live Forecast CTA */}
            <Link to="/dashboard">
              <AnimatedButton
                variant="primary"
                hoverScale={1.02}
                className="h-9 px-4 py-0 text-[13px] rounded-[10px] font-semibold"
              >
                <AreaChart size={14} />
                Live Forecast
              </AnimatedButton>
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary p-2 rounded-[10px] border border-white/9 bg-white/4 hover:bg-white/7 transition-all duration-150"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-pc-elevated/98 backdrop-blur-2xl border-l border-white/8 shadow-2xl shadow-black/60 z-50 md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="p-5 border-b border-white/7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-pc-gold flex items-center justify-center">
                      <span className="font-display font-black text-[10px] text-black">P</span>
                    </div>
                    <span className="font-display font-bold text-[15px] text-gradient-gold">PetroCast</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg border border-white/9 bg-white/4 hover:bg-white/8 text-text-secondary hover:text-text-primary transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Drawer nav */}
              <div className="flex flex-col gap-1 p-4 flex-1">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-[14px] font-medium transition-all ${
                          isActive
                            ? "bg-pc-gold/12 border border-pc-gold/22 text-pc-gold"
                            : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 hover:border-white/9"
                        }`}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer CTA */}
              <div className="p-4 border-t border-white/7">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-4 py-2.5 bg-pc-gold text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-pc-gold-light transition-colors">
                    <AreaChart size={15} />
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
