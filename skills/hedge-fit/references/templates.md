# Templates

## Asset Capsule

```markdown
## Asset Capsule

| Field | Value |
|---|---|
| Asset / theme |  |
| User thesis |  |
| Interpreted economic exposure |  |
| Time horizon |  |
| Payoff drivers |  |
| Invalidation conditions |  |
| Unknowns / missing facts |  |

| Exposure type | Exposure | Why it matters | Desired treatment |
|---|---|---|---|
| Wanted |  |  | Keep / increase |
| Unwanted |  |  | Hedge / reduce |
```

## Hedge-Fit Scorecard

```markdown
## Hedge Fit

| Field | Value |
|---|---|
| Exposure |  |
| Candidate market |  |
| Position direction | YES / NO / unknown |
| Bad state |  |
| Expected hedge payoff |  |
| Settlement-rule match | excellent / good / weak / reject / unknown |
| Timing match | excellent / good / weak / reject / unknown |
| Liquidity / spread |  |
| Source links |  |
| Basis risk |  |
| Rating | excellent / good / weak / reject / unknown |
```

## Research Report

```markdown
# Semantic Hedge Report

## Process Trace

| Step | Result |
|---|---|
| User view |  |
| Interpreted thesis |  |
| Exposure decomposition |  |
| Candidate universe |  |
| Scoring / sizing method |  |
| Final decision |  |

## Exposure Map

| Exposure | Wanted? | Why it affects PnL | Hedge or expression | Confidence |
|---|---:|---|---|---|
|  | yes/no |  |  | high/medium/low |

## Portfolio / Instrument Selection

| Instrument | Role | Selection reason | Thesis fit | Value capture | Liquidity | Risk penalty | Raw score | Target weight | Sizing rationale |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
|  | core / satellite / hedge / cash |  |  |  |  |  |  |  |  |

## Weight Calculation

| Formula item | Meaning | Value / note |
|---|---|---|
| Raw score | thesis_fit + value_capture + liquidity + hedge_usefulness - risk_penalty |  |
| Normalization | raw_score / sum(raw_scores) among included instruments |  |
| Constraints | max single-name weight, cash floor, illiquidity cap, hedge overlay limit |  |

## Candidate Prediction-Market Hedges

| Market | Platform | Bad state covered | Direction | Price / spread | Liquidity | Settlement fit | Timing fit | Basis risk | Rating | Source |
|---|---|---|---|---|---|---|---|---|---|---|
|  | Polymarket / Kalshi |  | YES / NO |  |  |  |  |  |  |  |

## Rejected / Weak Hedges

| Market or instrument | Rejection reason | What would change the rating | Source |
|---|---|---|---|
|  |  |  |  |

## Missing Facts And Next Checks

| Missing fact | Why it matters | How to verify | Priority |
|---|---|---|---|
|  |  |  | high/medium/low |

## Final Concrete Holdings

| Holding | Type | Platform / venue | Direction token or side | Target weight | Current status | Why this instrument | Thesis linkage | Source |
|---|---|---|---|---:|---|---|---|---|
|  | token / equity / cash / prediction market |  | long / short / YES / NO / cash |  | active / unverified / unknown |  |  |  |
```

## Watchlist Entry

```json
{
  "market_type": "polymarket | kalshi",
  "market_id": "",
  "question": "",
  "exposure": "",
  "candidate_direction": "YES | NO | unknown",
  "observed_price": 0,
  "spread": 0,
  "liquidity": 0,
  "settlement_rule": "",
  "source_links": [],
  "basis_risk": [],
  "reason_to_monitor": ""
}
```
