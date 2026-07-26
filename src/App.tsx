import { Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import News from "./components/News";
import PerformanceMonitor from "./components/PerformanceMonitor";
import Footer from "./components/Footer";
import { NotificationProvider } from "./context/NotificationContext";
import { DateConfigProvider } from "./context/DateConfigContext";
import { CurrencyProvider } from "./context/CurrencyContext";

/**
 * PetroCast — Professional Crude Oil Forecasting Platform
 *
 * Design System:
 *  Background:  #09090E  (cool near-black)
 *  Surface:     #111118  (card background)
 *  Elevated:    #18181F  (modal / dropdown)
 *  Brand:       #F59E0B  (amber gold — CTAs & active states only)
 *  Up / Green:  #22C55E
 *  Down / Red:  #EF4444
 *  Actual Data: #38BDF8  (sky blue)
 *  Font-mono:   JetBrains Mono (all prices and metrics)
 */
function App() {
  const petrocastTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary:      "#F59E0B",
      colorBgBase:       "#09090E",
      colorBgContainer:  "#111118",
      colorBgElevated:   "#18181F",
      colorBorder:       "rgba(255,255,255,0.08)",
      colorBorderSecondary: "rgba(255,255,255,0.06)",
      colorText:         "#F1F5F9",
      colorTextSecondary:"#94A3B8",
      colorTextTertiary: "#475569",
      colorSuccess:      "#22C55E",
      colorError:        "#EF4444",
      colorWarning:      "#F59E0B",
      fontFamily:        "Inter, system-ui, sans-serif",
      borderRadius:      10,
      borderRadiusLG:    14,
      boxShadow:         "0 4px 24px rgba(0,0,0,0.4)",
    },
    components: {
      Card: {
        colorBgContainer:    "#111118",
        colorBorderSecondary:"rgba(255,255,255,0.07)",
        borderRadius:        16,
      },
      Table: {
        colorBgContainer:   "transparent",
        headerBg:           "rgba(255,255,255,0.03)",
        headerColor:        "#475569",
        rowHoverBg:         "rgba(255,255,255,0.03)",
        borderColor:        "rgba(255,255,255,0.06)",
        fontFamily:         "Inter, sans-serif",
      },
      Modal: {
        contentBg:  "#18181F",
        headerBg:   "#18181F",
        footerBg:   "#18181F",
      },
      Input: {
        colorBgContainer:   "rgba(255,255,255,0.04)",
        colorBorder:        "rgba(255,255,255,0.09)",
        hoverBorderColor:   "rgba(245,158,11,0.4)",
        activeBorderColor:  "#F59E0B",
        activeShadow:       "0 0 0 3px rgba(245,158,11,0.08)",
      },
      Pagination: {
        colorPrimary:       "#F59E0B",
        colorPrimaryHover:  "#FCD34D",
        colorBgContainer:   "transparent",
        colorBorder:        "rgba(255,255,255,0.09)",
      },
    },
  };

  return (
    <ConfigProvider theme={petrocastTheme}>
      <DateConfigProvider locale="en-US">
        <CurrencyProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-pc-black text-text-primary selection:bg-pc-gold/25 selection:text-white overflow-x-hidden">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"            element={<Home />} />
                  <Route path="/dashboard"   element={<Dashboard />} />
                  <Route path="/news"        element={<News />} />
                  <Route path="/about"       element={<About />} />
                  <Route path="/performance" element={<PerformanceMonitor />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </CurrencyProvider>
      </DateConfigProvider>
    </ConfigProvider>
  );
}

export default App;
