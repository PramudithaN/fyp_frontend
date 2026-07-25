# Frontend Benchmark API Contract

This guide documents exactly which backend APIs to call for the Global Market Controls UI (Brent, WTI, OPEC, Dubai) and how to render predictions safely.

## Goal

- Keep Brent as the only model-backed forecast.
- Show other benchmarks without breaking forecast trust.
- Make frontend behavior deterministic and strict.

## API 1: Benchmark Quote Cards

Endpoint:
- `GET /benchmarks/quotes`

Query params:
- `lookback_days` (optional, integer, default 60, min 30, max 365)

Use this for:
- Brent, WTI, OPEC, Dubai top cards in your screenshot.

Response shape:

```json
{
  "success": true,
  "currency": "USD",
  "unit": "bbl",
  "base_benchmark": "brent",
  "generated_at": "2026-07-25T10:40:00.123456",
  "quotes": [
    {
      "benchmark": "brent",
      "display_name": "Brent Crude",
      "ticker": "BZ=F",
      "price": 78.45,
      "as_of": "2026-07-25",
      "quote_type": "direct",
      "source": "yahoo_finance",
      "quality": "model_target",
      "status": "ok",
      "note": null
    },
    {
      "benchmark": "wti",
      "display_name": "WTI Crude",
      "ticker": "CL=F",
      "price": 74.30,
      "as_of": "2026-07-25",
      "quote_type": "direct",
      "source": "yahoo_finance",
      "quality": "observed",
      "status": "ok",
      "note": null
    },
    {
      "benchmark": "opec",
      "display_name": "OPEC Basket",
      "ticker": null,
      "price": 77.05,
      "as_of": "2026-07-25",
      "quote_type": "derived",
      "source": "brent_transform:configured_fallback",
      "quality": "indicative",
      "status": "estimated",
      "note": "Estimated from Brent quote (not a separately trained model target)"
    }
  ]
}
```

UI rules:
- If `quote_type = direct`, show normal card.
- If `quote_type = derived`, show badge: `Estimated`.
- If `quality = model_target`, this is Brent (forecast anchor).

## API 2: Forecast For Selected Benchmark

Endpoint:
- `GET /benchmarks/derived-forecast`

Query params:
- `target`: `brent | wti | opec | dubai`
- `method`: `spread | ratio` (default `spread`)
- `lookback_days`: integer (default 60, min 30, max 365)

Use this for:
- Forecast chart and forecast values when user changes benchmark selector.

Response shape:

```json
{
  "success": true,
  "target": "wti",
  "target_label": "WTI Crude",
  "method": "spread",
  "currency": "USD",
  "unit": "bbl",
  "quality": "indicative",
  "disclaimer": "Brent is model-backed. Non-Brent forecasts are transformed estimates, not separately trained model outputs.",
  "transform": {
    "spread": -4.12,
    "ratio": 0.948,
    "lookback_days": 60,
    "sample_days": 58,
    "source": "yahoo_pair_history",
    "fallback_used": false
  },
  "prediction_date": "2026-07-25",
  "based_on_price_date": "2026-07-24",
  "generated_at": "2026-07-25T07:00:00",
  "forecasts": [
    {
      "date": "2026-07-27",
      "horizon": 1,
      "benchmark": "wti",
      "benchmark_label": "WTI Crude",
      "forecast_type": "derived_from_brent",
      "brent_forecasted_price": 79.10,
      "forecasted_price": 74.98,
      "lower_bound": 72.80,
      "upper_bound": 77.10,
      "forecasted_return": 0.0045
    }
  ]
}
```

UI rules:
- If `target = brent`, this is real model forecast.
- If `target != brent`, always display `forecast_type = derived_from_brent` as an "Estimated" forecast.
- Show `disclaimer` text below chart for non-Brent targets.

## Existing Brent Endpoint (still valid)

Endpoint:
- `GET /predict`

Use this when:
- You want only official Brent forecast response.

## Strict Frontend Integration Flow

1. On page load:
- Call `GET /benchmarks/quotes` for top cards.
- Default selected benchmark to `brent`.

2. Forecast area:
- If selected benchmark is `brent`, you can call either:
  - `GET /predict` (official existing path), or
  - `GET /benchmarks/derived-forecast?target=brent`
- If selected benchmark is not `brent`, call:
  - `GET /benchmarks/derived-forecast?target=<selected>&method=spread`

3. Labeling:
- Brent: `Model Forecast`
- WTI/OPEC/Dubai: `Estimated from Brent`

4. Error handling:
- If `/benchmarks/derived-forecast` returns 503, show:
  - "Forecast not ready yet. Please retry shortly."

## Recommended Frontend Prompt/Rule Text

Use this as strict implementation guidance in your frontend AI prompt:

```text
Always treat Brent as the only model-backed forecast benchmark.
Use /benchmarks/quotes to populate Brent, WTI, OPEC, and Dubai cards.
Use /benchmarks/derived-forecast for benchmark-switched forecasts.
If target != brent, render forecast as estimated (derived_from_brent), not model forecast.
Show disclaimer text from API for non-Brent targets.
Never label non-Brent forecast as model output.
```

## Notes About OPEC and Dubai

- OPEC and Dubai may be direct quotes only if tickers are configured in environment:
  - `OPEC_BASKET_TICKER`
  - `DUBAI_FATEH_TICKER`
- Otherwise they are derived from Brent with explicit `indicative` quality.
