import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "AED" | "JPY" | "CNY" | "SAR";
export type CrudeBenchmark = "Brent" | "WTI" | "OPEC" | "Dubai";
export type VolumeUnit = "bbl" | "MT" | "L";

export interface CurrencyDetails {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // multiplier from USD
  flag: string;
}

export interface BenchmarkDetails {
  id: CrudeBenchmark;
  name: string;
  symbol: string;
  ticker: string;
  location: string;
  priceOffset: number; // offset from Brent USD
}

export interface UnitDetails {
  id: VolumeUnit;
  name: string;
  symbol: string;
  multiplier: number; // factor to convert price per bbl to price per unit
}

export const CURRENCIES: Record<CurrencyCode, CurrencyDetails> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1.0, flag: "🇺🇸" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 0.92, flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79, flag: "🇬🇧" },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", rate: 3.67, flag: "🇦🇪" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 155.2, flag: "🇯🇵" },
  CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.25, flag: "🇨🇳" },
  SAR: { code: "SAR", symbol: "SAR ", name: "Saudi Riyal", rate: 3.75, flag: "🇸🇦" },
};

export const BENCHMARKS: Record<CrudeBenchmark, BenchmarkDetails> = {
  Brent: { id: "Brent", name: "Brent Crude", symbol: "BZ=F", ticker: "ICE Brent", location: "North Sea / ICE London", priceOffset: 0 },
  WTI: { id: "WTI", name: "WTI Crude", symbol: "CL=F", ticker: "NYMEX WTI", location: "Cushing, USA", priceOffset: -3.85 },
  OPEC: { id: "OPEC", name: "OPEC Basket", symbol: "ORB", ticker: "OPEC Ref", location: "Vienna, Austria", priceOffset: -1.40 },
  Dubai: { id: "Dubai", name: "Dubai Fateh", symbol: "DUBAI=F", ticker: "DME Dubai", location: "Persian Gulf / DME", priceOffset: -2.10 },
};

export const UNITS: Record<VolumeUnit, UnitDetails> = {
  bbl: { id: "bbl", name: "Barrel", symbol: "/bbl", multiplier: 1.0 },
  MT: { id: "MT", name: "Metric Ton", symbol: "/MT", multiplier: 7.33 },
  L: { id: "L", name: "Liter", symbol: "/L", multiplier: 1 / 158.987 },
};

interface CurrencyContextValue {
  currency: CurrencyCode;
  benchmark: CrudeBenchmark;
  unit: VolumeUnit;
  setCurrency: (currency: CurrencyCode) => void;
  setBenchmark: (benchmark: CrudeBenchmark) => void;
  setUnit: (unit: VolumeUnit) => void;
  currencyDetails: CurrencyDetails;
  benchmarkDetails: BenchmarkDetails;
  unitDetails: UnitDetails;
  
  // Helpers
  convertPrice: (usdPrice: number | null | undefined) => number | null;
  formatPrice: (usdPrice: number | null | undefined, decimals?: number, fallback?: string) => string;
  formatRawValue: (usdPrice: number | null | undefined, decimals?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export const useCurrency = (): CurrencyContextValue => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [benchmark, setBenchmark] = useState<CrudeBenchmark>("Brent");
  const [unit, setUnit] = useState<VolumeUnit>("bbl");

  const currencyDetails = CURRENCIES[currency];
  const benchmarkDetails = BENCHMARKS[benchmark];
  const unitDetails = UNITS[unit];

  const value = useMemo<CurrencyContextValue>(() => {
    const convertPrice = (usdPrice: number | null | undefined): number | null => {
      if (usdPrice === null || usdPrice === undefined || !Number.isFinite(usdPrice)) {
        return null;
      }
      const benchmarkAdjusted = usdPrice + benchmarkDetails.priceOffset;
      const unitAdjusted = benchmarkAdjusted * unitDetails.multiplier;
      return unitAdjusted * currencyDetails.rate;
    };

    const formatPrice = (
      usdPrice: number | null | undefined,
      decimals = 2,
      fallback = "-"
    ): string => {
      const converted = convertPrice(usdPrice);
      if (converted === null) return fallback;

      const formattedNumber = converted.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

      return `${currencyDetails.symbol}${formattedNumber}`;
    };

    const formatRawValue = (
      usdPrice: number | null | undefined,
      decimals = 2
    ): string => {
      const converted = convertPrice(usdPrice);
      if (converted === null) return "-";
      return converted.toFixed(decimals);
    };

    return {
      currency,
      benchmark,
      unit,
      setCurrency,
      setBenchmark,
      setUnit,
      currencyDetails,
      benchmarkDetails,
      unitDetails,
      convertPrice,
      formatPrice,
      formatRawValue,
    };
  }, [currency, benchmark, unit, currencyDetails, benchmarkDetails, unitDetails]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
