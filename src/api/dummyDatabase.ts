import {
  ExplainResponse,
  FanResponse,
  HistoricalPricesResponse,
  NewsArticle,
  NewsResponse,
  PredictionComparisonResponse,
  PredictionResponse,
  SentimentOverviewResponse,
} from "../types/api";

export const DUMMY_PREDICTION_RESPONSE: PredictionResponse = {
  success: true,
  data_source: "dummy",
  last_price_date: "2026-03-31",
  last_price: 78.45,
  forecasts: [
    {
      date: "2026-04-01",
      forecasted_price: 79.2,
      forecasted_return: 0.96,
      horizon: 1,
      lower_bound: 77.8,
      upper_bound: 80.5,
    },
    {
      date: "2026-04-02",
      forecasted_price: 79.85,
      forecasted_return: 1.78,
      horizon: 2,
      lower_bound: 78.1,
      upper_bound: 81.6,
    },
    {
      date: "2026-04-03",
      forecasted_price: 79.4,
      forecasted_return: 1.21,
      horizon: 3,
      lower_bound: 77.5,
      upper_bound: 81.3,
    },
    {
      date: "2026-04-06",
      forecasted_price: 80.6,
      forecasted_return: 2.74,
      horizon: 4,
      lower_bound: 78.2,
      upper_bound: 83.0,
    },
    {
      date: "2026-04-07",
      forecasted_price: 81.25,
      forecasted_return: 3.57,
      horizon: 5,
      lower_bound: 78.5,
      upper_bound: 84.0,
    },
  ],
  market_state: "OPEN",
  is_market_open: true,
  market_open_time: "09:00",
  market_close_time: "17:00",
  timezone_info: "UTC",
};

export const generateDummyComparison = (
  startDate: string,
  endDate: string,
): PredictionComparisonResponse => {
  const points: PredictionComparisonResponse["comparison"] = [];
  const basePrice = 75;
  const start = new Date(startDate || "2025-01-01").getTime();
  const end = new Date(endDate || "2026-03-31").getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  let step = 0;
  for (let t = start; t <= end; t += dayMs) {
    const d = new Date(t);
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const date = d.toISOString().split("T")[0];
    const trend = Math.sin(step * 0.1) * 6 + Math.cos(step * 0.05) * 4;
    const actual = basePrice + trend + (Math.random() - 0.5) * 1.5;
    const predicted = actual + (Math.random() - 0.48) * 1.2;
    const lower = predicted - 1.2;
    const upper = predicted + 1.2;
    const absError = Math.abs(actual - predicted);
    const absPctError = (absError / Math.max(actual, 1)) * 100;

    points.push({
      date,
      actual_price: Number(actual.toFixed(2)),
      predicted_price: Number(predicted.toFixed(2)),
      predicted_price_median: Number(predicted.toFixed(2)),
      predicted_price_latest: Number(predicted.toFixed(2)),
      predicted_price_lower_bound: Number(lower.toFixed(2)),
      predicted_price_upper_bound: Number(upper.toFixed(2)),
      prediction_count: 1,
      error: Number((actual - predicted).toFixed(2)),
      abs_error: Number(absError.toFixed(2)),
      abs_pct_error: Number(absPctError.toFixed(2)),
    });

    step++;
  }

  const absErrors = points
    .map((p) => p.abs_error)
    .filter((v): v is number => typeof v === "number");
  const absPctErrors = points
    .map((p) => p.abs_pct_error)
    .filter((v): v is number => typeof v === "number");

  const mae = absErrors.length
    ? absErrors.reduce((a, b) => a + b, 0) / absErrors.length
    : null;
  const rmse = absErrors.length
    ? Math.sqrt(absErrors.reduce((a, b) => a + b * b, 0) / absErrors.length)
    : null;
  const mape = absPctErrors.length
    ? absPctErrors.reduce((a, b) => a + b, 0) / absPctErrors.length
    : null;

  return {
    success: true,
    start_date: startDate,
    end_date: endDate,
    total_days_returned: points.length,
    aggregation_strategy: "daily_first_horizon",
    metrics: {
      compared_days: points.length,
      mae: mae === null ? null : Number(mae.toFixed(2)),
      rmse: rmse === null ? null : Number(rmse.toFixed(2)),
      mape: mape === null ? null : Number(mape.toFixed(2)),
    },
    comparison: points,
  };
};

export const DUMMY_FAN_RESPONSE: FanResponse = {
  success: true,
  last_price_date: "2026-03-31",
  last_price: 78.45,
  fan: [
    {
      date: "2026-04-01",
      point_forecast: 79.2,
      p10: 77.2,
      p25: 78.4,
      p50: 79.2,
      p75: 80.0,
      p90: 81.2,
      sample_count: 120,
    },
    {
      date: "2026-04-02",
      point_forecast: 79.8,
      p10: 77.0,
      p25: 78.6,
      p50: 79.8,
      p75: 80.9,
      p90: 82.5,
      sample_count: 120,
    },
    {
      date: "2026-04-03",
      point_forecast: 79.4,
      p10: 76.5,
      p25: 78.1,
      p50: 79.4,
      p75: 80.7,
      p90: 82.3,
      sample_count: 120,
    },
    {
      date: "2026-04-06",
      point_forecast: 80.6,
      p10: 77.5,
      p25: 79.2,
      p50: 80.6,
      p75: 82.1,
      p90: 84.0,
      sample_count: 120,
    },
    {
      date: "2026-04-07",
      point_forecast: 81.2,
      p10: 77.8,
      p25: 79.8,
      p50: 81.2,
      p75: 82.9,
      p90: 85.1,
      sample_count: 120,
    },
  ],
};

export const generateDummyHistorical = (limit = 100): HistoricalPricesResponse => {
  const data: HistoricalPricesResponse["data"] = [];
  const base = 75;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = limit; i >= 0; i--) {
    const d = new Date(now - i * dayMs);
    const dateStr = d.toISOString().split("T")[0];
    const noise = Math.sin(i * 0.1) * 5 + (Math.random() - 0.5) * 2;
    const price = Number((base + noise).toFixed(2));
    const open = Number((price - 0.3).toFixed(2));
    const high = Number((price + 0.8).toFixed(2));
    const low = Number((price - 0.9).toFixed(2));

    data.push({
      date: dateStr,
      price,
      open,
      high,
      low,
      volume: Math.floor(200000 + Math.random() * 100000),
      change_pct: Number((((price - open) / Math.max(open, 1)) * 100).toFixed(2)),
      source: "dummy",
    });
  }

  const start = data[0]?.date ?? "";
  const end = data[data.length - 1]?.date ?? "";

  return {
    success: true,
    granularity: "daily",
    total_available: data.length,
    total_records: data.length,
    limit: data.length,
    offset: 0,
    date_range: { start, end },
    data,
  };
};

export const DUMMY_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "OPEC+ Reaffirms Voluntary Output Discipline Amid Gulf Maritime Monitoring",
    summary:
      "Saudi Arabia and key OPEC members confirm adherence to voluntary supply cuts while crude export traffic through strategic chokepoints remains closely monitored.",
    source: "S&P Global Commodity Insights",
    url: "https://www.spglobal.com/commodityinsights",
    image_url:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop&q=80",
    article_date: "2026-03-31",
    published_at: "2026-03-31T08:00:00Z",
  },
  {
    id: "news-2",
    title: "US Commercial Inventories Record 3.2M Barrel Drawdown as Exports Surge",
    summary:
      "EIA reports substantial crude inventory draw as Gulf Coast export terminals record strong international tanker loadings to European refiners.",
    source: "Reuters Commodities",
    url: "https://www.reuters.com/business/energy",
    image_url:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    article_date: "2026-03-30",
    published_at: "2026-03-30T14:30:00Z",
  },
  {
    id: "news-3",
    title: "North Sea Crude Offshore Maintenance Tightens Prompt Physical Loading",
    summary:
      "Platform maintenance across North Sea streams has constrained prompt loading schedules, lending support to the Dated Brent benchmark.",
    source: "Bloomberg Energy",
    url: "https://www.bloomberg.com/energy",
    image_url:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
    article_date: "2026-03-29",
    published_at: "2026-03-29T11:15:00Z",
  },
  {
    id: "news-4",
    title: "Asia-Pacific Refining Run Rates Expand on Strong Seasonal Transport Demand",
    summary:
      "Refining hubs in Singapore and Japan report expanding crude processing rates driven by seasonal transport demand and feedstock import activity.",
    source: "Argus Media",
    url: "https://www.argusmedia.com",
    image_url:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    article_date: "2026-03-28",
    published_at: "2026-03-28T09:45:00Z",
  },
];

export const DUMMY_NEWS_RESPONSE: NewsResponse = {
  success: true,
  articles: DUMMY_NEWS_ARTICLES,
  dates: [...new Set(DUMMY_NEWS_ARTICLES.map((a) => a.article_date))],
};

export const DUMMY_EXPLAIN_RESPONSE: ExplainResponse = {
  success: true,
  explanation_date: "2026-03-31",
  prediction: 79.2,
  current_price: 78.45,
  direction: "UP",
  horizon: 1,
  model_version: "PetroCast-Ensemble-v3.2",
  confidence_interval_lower: 77.8,
  confidence_interval_upper: 80.5,
  confidence_level: "high",
  agreement_score: 94.5,
  dominant_model: "Bi-LSTM + FinBERT Attention",
  total_sentiment_impact_usd: 0.65,
  sentiment_dominant: true,
  model_contributions: {
    bilstm: 42.5,
    transformer: 38.0,
    xgboost: 19.5,
  },
  top_features: [
    {
      feature_name: "FinBERT Energy Sentiment Index",
      shap_value: 0.45,
      shap_value_usd: 0.45,
      feature_value: 0.78,
      direction: "UP",
      category: "Sentiment NLP",
    },
    {
      feature_name: "US Crude Inventories (Drawdown)",
      shap_value: 0.32,
      shap_value_usd: 0.32,
      feature_value: -3.2,
      direction: "UP",
      category: "Supply Fundamental",
    },
  ],
  sentiment_headlines: [
    "OPEC+ Reaffirms Output Cuts Amid Gulf Transport Monitoring",
    "US Commercial Inventories Draw Down 3.2M Barrels as Exports Spike",
    "Asian Refining Throughput Expands on Strong Regional Fuel Demand",
  ],
  headline:
    "Positive FinBERT sentiment and inventory draws signal bullish upward pressure.",
  explanation_text:
    "Ensemble model forecasts +$0.75 price increase driven by strong FinBERT sentiment score (0.78) and US inventory drawdown (-3.2M bbl).",
  sentiment_story:
    "Energy headlines demonstrate strong bullish bias with low geopolitical risk dampening.",
  risk_note: "Watch DXY movement and US weekly EIA throughput numbers.",
  attention_insight: {
    top_sentiment_feature: "OPEC+ Supply Cut Affirmation",
    top_timestep_lag: 1,
    attention_weight: 0.84,
    high_news_regime_flagged: true,
  },
  generated_at: "2026-03-31T07:30:00Z",
  computation_time_seconds: 0.42,
};

export const DUMMY_SENTIMENT_OVERVIEW_RESPONSE: SentimentOverviewResponse = {
  success: true,
  meta: {
    requested_days: 7,
    actual_records: 3,
    start_date: "2026-03-29",
    end_date: "2026-03-31",
    decay_lambda: 0.35,
    decay_factor: 0.7047,
    decay_formula: "exp(-lambda * days)",
    ema_windows: [3, 7, 14],
  },
  summary: {
    latest_raw_sentiment: 0.81,
    latest_decayed_sentiment: 0.78,
    average_raw_sentiment: 0.62,
    average_decayed_sentiment: 0.59,
    average_news_volume: 18,
    high_news_regime_days: 2,
    positive_days: 2,
    negative_days: 0,
    neutral_days: 1,
    latest_trend: "bullish",
  },
  timeline: [
    {
      date: "2026-03-29",
      raw_daily_sentiment: 0.44,
      cross_day_decayed_sentiment: 0.41,
      sentiment_change_vs_prev_day: 0.03,
      decayed_sentiment_change_vs_prev_day: 0.02,
      news_volume: 14,
      log_news_volume: 2.64,
      decayed_news_volume: 12.2,
      high_news_regime: false,
      ema: {
        daily_sentiment_decay_ema_3: 0.41,
        daily_sentiment_decay_ema_7: 0.39,
        daily_sentiment_decay_ema_14: 0.37,
      },
      headlines: [],
    },
    {
      date: "2026-03-30",
      raw_daily_sentiment: 0.62,
      cross_day_decayed_sentiment: 0.57,
      sentiment_change_vs_prev_day: 0.18,
      decayed_sentiment_change_vs_prev_day: 0.16,
      news_volume: 19,
      log_news_volume: 2.94,
      decayed_news_volume: 16.1,
      high_news_regime: true,
      ema: {
        daily_sentiment_decay_ema_3: 0.57,
        daily_sentiment_decay_ema_7: 0.49,
        daily_sentiment_decay_ema_14: 0.43,
      },
      headlines: [],
    },
    {
      date: "2026-03-31",
      raw_daily_sentiment: 0.81,
      cross_day_decayed_sentiment: 0.78,
      sentiment_change_vs_prev_day: 0.19,
      decayed_sentiment_change_vs_prev_day: 0.21,
      news_volume: 21,
      log_news_volume: 3.04,
      decayed_news_volume: 18.5,
      high_news_regime: true,
      ema: {
        daily_sentiment_decay_ema_3: 0.78,
        daily_sentiment_decay_ema_7: 0.62,
        daily_sentiment_decay_ema_14: 0.51,
      },
      headlines: [],
    },
  ],
};
