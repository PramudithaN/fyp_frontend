import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe as GlobeIcon,
  TrendingUp,
  Activity,
  MapPin,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";
import { useCurrency } from "../../context/CurrencyContext";

interface MapBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface RegionHotspot {
  id: string;
  name: string;
  region: string;
  markerLat: number;
  markerLng: number;
  markerOffsetX?: number;
  markerOffsetY?: number;
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
  color: string;
  impact: string;
  spread: string;
  newsTitle: string;
  newsSummary: string;
  source: string;
  date: string;
}

const REGION_HOTSPOTS: RegionHotspot[] = [
  {
    id: "me",
    name: "Middle East / OPEC+",
    region: "Riyadh & Strait of Hormuz",
    markerLat: 25.2,
    markerLng: 50.4,
    latMin: 14,
    latMax: 34,
    lngMin: 36,
    lngMax: 62,
    color: "#F59E0B",
    impact: "+2.4% Volatility",
    spread: "OPEC Basket: $81.20",
    newsTitle: "OPEC+ Reaffirms Voluntary Output Discipline Amid Gulf Maritime Monitoring",
    newsSummary: "Saudi Arabia and key OPEC members confirm adherence to voluntary supply cuts while crude export traffic through strategic chokepoints remains closely monitored.",
    source: "S&P Global Commodity Insights",
    date: "Just now",
  },
  {
    id: "brent",
    name: "North Sea Brent Hub",
    region: "Aberdeen & London",
    markerLat: 57.0,
    markerLng: -2.1,
    latMin: 50,
    latMax: 62,
    lngMin: -10,
    lngMax: 12,
    color: "#F59E0B",
    impact: "Benchmark Baseline",
    spread: "Brent Spot: $78.45",
    newsTitle: "North Sea Crude Maintenance Adjusts Physical Spot Differentials",
    newsSummary: "Offshore platform maintenance across North Sea crude streams has tightened prompt physical loading schedules, lending support to Dated Brent.",
    source: "Bloomberg Energy",
    date: "12m ago",
  },
  {
    id: "permian",
    name: "US Permian / Gulf Coast",
    region: "Houston, Texas",
    markerLat: 29.8,
    markerLng: -95.4,
    latMin: 24,
    latMax: 38,
    lngMin: -106,
    lngMax: -86,
    color: "#F59E0B",
    impact: "-$4.15 WTI Spread",
    spread: "WTI Crude: $74.30",
    newsTitle: "US Commercial Inventories Draw Down 3.2M Barrels as Exports Spike",
    newsSummary: "EIA reports substantial crude inventory draw as Gulf Coast export terminals record strong international tanker loadings to European refiners.",
    source: "Reuters Commodities",
    date: "45m ago",
  },
  {
    id: "asia",
    name: "Asia-Pacific Hub",
    region: "Singapore & Tokyo",
    // Visual centroid between Singapore and Tokyo for this map projection.
    markerLat: 18.5,
    markerLng: 121.8,
    latMin: -6,
    latMax: 38,
    lngMin: 95,
    lngMax: 142,
    color: "#F59E0B",
    impact: "+4.8% Demand Growth",
    spread: "Dubai Fateh: $77.90",
    newsTitle: "Asia-Pacific Refiners Boost Run Rates on Strong Regional Demand",
    newsSummary: "Major Asian refining hubs in Singapore and Japan report expanding crude processing rates driven by seasonal transport demand and feedstock import activity.",
    source: "Argus Media",
    date: "2h ago",
  },
  {
    id: "rotterdam",
    name: "Europe ARA Storage Hub",
    region: "Rotterdam, Netherlands",
    markerLat: 51.92,
    markerLng: 4.48,
    latMin: 46,
    latMax: 56,
    lngMin: 2,
    lngMax: 14,
    color: "#F59E0B",
    impact: "+$18.50 Crack Margin",
    spread: "Distillate Margin: $18.50",
    newsTitle: "European Gasoil Storage Tightens Across Amsterdam-Rotterdam",
    newsSummary: "Refining crack margins for diesel and heating oil expand across Northern Europe as middle distillate stocks fall below 5-year seasonal averages.",
    source: "Energy Intelligence",
    date: "3h ago",
  }
];

const InteractiveGlobeHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<RegionHotspot>(REGION_HOTSPOTS[0]);
  const mapImageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mapBounds, setMapBounds] = useState<MapBounds>({
    xMin: 0,
    xMax: 1,
    yMin: 0,
    yMax: 1,
  });

  const { formatPrice } = useCurrency();

  const getHotspotPoint = (hotspot: RegionHotspot) => ({
    lat: hotspot.markerLat,
    lng: hotspot.markerLng,
  });

  const getHotspotOffset = (hotspot: RegionHotspot) => ({
    x: hotspot.markerOffsetX ?? 0,
    y: hotspot.markerOffsetY ?? 0,
  });

  const detectMapBounds = (img: HTMLImageElement): MapBounds => {
    const offscreen = document.createElement("canvas");
    offscreen.width = img.naturalWidth;
    offscreen.height = img.naturalHeight;
    const offCtx = offscreen.getContext("2d");

    if (!offCtx || img.naturalWidth === 0 || img.naturalHeight === 0) {
      return { xMin: 0, xMax: 1, yMin: 0, yMax: 1 };
    }

    offCtx.drawImage(img, 0, 0);
    const { data, width, height } = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        // Identify map pixels by non-black luminance with visible alpha.
        if (a > 20 && r + g + b > 40) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      return { xMin: 0, xMax: 1, yMin: 0, yMax: 1 };
    }

    const pad = 2;
    const safeMinX = Math.max(0, minX - pad);
    const safeMinY = Math.max(0, minY - pad);
    const safeMaxX = Math.min(width - 1, maxX + pad);
    const safeMaxY = Math.min(height - 1, maxY + pad);

    return {
      xMin: safeMinX / width,
      xMax: safeMaxX / width,
      yMin: safeMinY / height,
      yMax: safeMaxY / height,
    };
  };

  // Load public map image (/Images/Worl-Map.png)
  useEffect(() => {
    const img = new Image();
    img.src = "/Images/Worl-Map.png";
    img.onload = () => {
      mapImageRef.current = img;
      setMapBounds(detectMapBounds(img));
      setImageLoaded(true);
    };
  }, []);

  // Canvas renderer with regional point markers over the map.
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const toXY = (lat: number, lng: number) => {
        const mapWidth = (mapBounds.xMax - mapBounds.xMin) * width;
        const mapHeight = (mapBounds.yMax - mapBounds.yMin) * height;
        return {
          x: mapBounds.xMin * width + ((lng + 180) / 360) * mapWidth,
          y: mapBounds.yMin * height + ((90 - lat) / 180) * mapHeight,
        };
      };

      // 1. Dark Clean Background
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, width, height);

      // Lat/Lng Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 0.8;

      for (let lng = -180; lng <= 180; lng += 45) {
        const { x } = toXY(0, lng);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        const { y } = toXY(lat, 0);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw World Map Image from Public Folder
      if (mapImageRef.current && imageLoaded) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.filter = "invert(0.85) contrast(1.2)";
        ctx.drawImage(mapImageRef.current, 0, 0, width, height);
        ctx.restore();
      }

      // 3. Render region points on top of the map.
      const time = Date.now() * 0.003;
      const pulseOpacity = (Math.sin(time) + 1) / 2;

      REGION_HOTSPOTS.forEach((h) => {
        const point = getHotspotPoint(h);
        const projected = toXY(point.lat, point.lng);
        const offset = getHotspotOffset(h);
        const x = projected.x + offset.x;
        const y = projected.y + offset.y;
        const isSelected = selectedHotspot.id === h.id;

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, 11 + pulseOpacity * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.35 + pulseOpacity * 0.35})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#F59E0B" : "rgba(255, 255, 255, 0.85)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#0d1117";
        ctx.fill();
      });

      // 4. Region label for selected point.
      REGION_HOTSPOTS.forEach((h) => {
        const isSelected = selectedHotspot.id === h.id;
        if (isSelected) {
          const point = getHotspotPoint(h);
          const projected = toXY(point.lat, point.lng);
          const offset = getHotspotOffset(h);
          const x = projected.x + offset.x;
          const y = projected.y + offset.y;

          ctx.fillStyle = "#F59E0B";
          ctx.font = "bold 11px Inter, sans-serif";
          ctx.fillText(`▲ ${h.name.split("/")[0]} [AFFECTED AREA]`, x + 10, y - 10);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedHotspot, imageLoaded, mapBounds]);

  // Click handler for region points.
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const toXY = (lat: number, lng: number) => {
      const mapWidth = (mapBounds.xMax - mapBounds.xMin) * canvas.width;
      const mapHeight = (mapBounds.yMax - mapBounds.yMin) * canvas.height;
      return {
        x: mapBounds.xMin * canvas.width + ((lng + 180) / 360) * mapWidth,
        y: mapBounds.yMin * canvas.height + ((90 - lat) / 180) * mapHeight,
      };
    };

    // Select the nearest hotspot point if user clicks close enough.
    const nearest = REGION_HOTSPOTS.map((h) => {
      const point = getHotspotPoint(h);
      const projected = toXY(point.lat, point.lng);
      const offset = getHotspotOffset(h);
      const x = projected.x + offset.x;
      const y = projected.y + offset.y;
      const dx = clickX - x;
      const dy = clickY - y;
      return { hotspot: h, distance: Math.hypot(dx, dy) };
    }).sort((a, b) => a.distance - b.distance)[0];

    const clickedRegion = nearest && nearest.distance <= 16 ? nearest.hotspot : undefined;

    if (clickedRegion) {
      setSelectedHotspot(clickedRegion);
    }
  };

  return (
    <section className="relative min-h-screen bg-oil-black pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden flex flex-col justify-between">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Terminal Header Section */}
      <div className="max-w-7xl mx-auto w-full pt-4 pb-8 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#30363D] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363D] text-[11px] font-mono text-oil-gold uppercase tracking-wider mb-3">
              <Activity size={13} className="text-oil-gold" />
              <span>PetroCast Terminal // Regional Hotspot Map</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Institutional Crude Price Forecasting
            </h1>
            <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Spatial square box matrix map highlighting news-affected regional clusters, local differentials, and FinBERT sentiment intensity.
            </p>
          </div>

          {/* Institutional Price Ticker */}
          <div className="flex items-center gap-4 bg-[#161b22] border border-[#30363D] px-5 py-3 rounded-2xl text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">BRENT:</span>
              <span className="text-white font-bold">{formatPrice(78.45)}</span>
              <span className="text-oil-gold font-semibold text-[11px]">+1.2%</span>
            </div>
            <div className="w-px h-4 bg-[#30363D]" />
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">WTI:</span>
              <span className="text-white font-bold">{formatPrice(74.30)}</span>
              <span className="text-oil-gold font-semibold text-[11px]">+0.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & News HUD Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto relative z-20">
        
        {/* Left Panel: News Regions */}
        <div className="lg:col-span-3 space-y-3 order-2 lg:order-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2 mb-1">
            <GlobeIcon size={13} className="text-oil-gold" />
            Market Hotspots
          </div>

          <div className="space-y-1.5">
            {REGION_HOTSPOTS.map((h) => {
              const isSelected = selectedHotspot.id === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#1f242c] border-oil-gold text-white shadow-sm"
                      : "bg-[#161b22] border-[#30363D] text-slate-400 hover:text-white hover:bg-[#1c2128]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-sm ${isSelected ? "bg-oil-gold" : "bg-slate-500"}`} />
                    <div>
                      <div className="text-xs font-bold font-display leading-tight">{h.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{h.region}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px] font-semibold text-oil-gold">
                    {h.impact}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Model Status Card */}
          <div className="glass-card p-4 rounded-xl border border-[#30363D] space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider font-mono text-[10px]">
                FinBERT NLP Sentiment
              </span>
              <span className="text-oil-gold font-bold font-mono">0.78 Bullish</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#21262d] overflow-hidden">
              <div className="h-full bg-oil-gold w-[78%]" />
            </div>
          </div>
        </div>

        {/* Center Panel: Map Canvas Highlighted Square Box Clusters (No round dots or lines!) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#30363D] bg-[#161b22]">
            <canvas
              ref={canvasRef}
              width={760}
              height={420}
              onClick={handleCanvasClick}
              className="w-full h-auto cursor-pointer block"
            />
            <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-md bg-[#0d1117]/90 border border-[#30363D] text-[10px] font-mono text-slate-400">
              Click a Region Point to Select
            </div>
          </div>
        </div>

        {/* Right Panel: Selected News Card & Action CTAs */}
        <div className="lg:col-span-3 space-y-3 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHotspot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-5 rounded-2xl border border-[#30363D] space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#30363D]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-oil-gold flex items-center gap-1">
                  <MapPin size={11} />
                  {selectedHotspot.region}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedHotspot.date}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug font-display">
                {selectedHotspot.newsTitle}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {selectedHotspot.newsSummary}
              </p>

              <div className="p-2.5 rounded-xl bg-[#21262d] border border-[#30363D] space-y-0.5 font-mono text-xs">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Local Differential
                </div>
                <div className="font-bold text-oil-gold">
                  {selectedHotspot.spread}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Source: {selectedHotspot.source}</span>
                <Link to="/news" className="text-oil-gold hover:text-white flex items-center gap-1 font-semibold">
                  Feed <ChevronRight size={12} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <Link to="/dashboard" className="block">
              <AnimatedButton variant="primary" className="w-full py-2.5 text-xs font-bold font-display shadow-md shadow-oil-gold/15">
                Launch Live Forecast Terminal
                <TrendingUp size={15} />
              </AnimatedButton>
            </Link>

            <Link to="/about" className="block">
              <button className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white bg-[#161b22] hover:bg-[#21262d] border border-[#30363D] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2">
                Explore AI Architecture
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveGlobeHero;
