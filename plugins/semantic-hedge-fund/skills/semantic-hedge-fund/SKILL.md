---
name: semantic-hedge-fund
description: "Use when the user wants AI-assisted semantic hedging with prediction markets: understand an asset or portfolio, decompose wanted and unwanted exposures, find Polymarket or Kalshi markets that may pay in bad states, evaluate hedge fit and basis risk, and produce a research report with source links."
---

# Semantic Hedge Fund

Use this skill to answer one question:

```text
Will this Polymarket contract make money in the states where my portfolio loses money?
```

The shape is deliberately simple:

```text
Asset or portfolio -> unwanted exposures -> prediction-market hedge candidates -> hedge-fit report
```

Do not design a standalone app, broker integration, autonomous fund, or trade execution flow unless the user explicitly changes scope.

## Core Workflow

1. Build an Asset Capsule:
   - asset or portfolio
   - thesis and time horizon
   - payoff drivers
   - wanted exposures
   - unwanted exposures
   - unknown exposures and missing facts

2. For each unwanted exposure, search Polymarket, Kalshi, or their public query APIs for candidate markets:
   - market search
   - market details
   - settlement rule
   - bid/ask/spread/liquidity
   - order book depth when available
   - source links or API endpoints used

3. Score hedge fit:
   - exposure match
   - causal link
   - payoff direction
   - settlement-rule match
   - timing match
   - liquidity
   - cost
   - basis risk
   - scenario coverage

4. Produce a concise report:
   - short process trace from user view -> exposure decomposition -> scoring -> allocation
   - compact tables for portfolio thesis, exposures, candidate hedges, rejected hedges, basis risk, missing facts, source links, and next actions
   - allocation tables that show each instrument's role, selection reason, sizing rationale, and calculation inputs
   - a final concrete holdings table with instrument or active prediction-market question, direction token, target weight, rationale, and thesis linkage
   - optional watchlist table

5. Only mark a market as actionable research after hedge fit is at least `good` and the settlement rule is known. Do not prepare or place orders.

## Output Style

Default to dense, decision-useful tables instead of long prose. Use prose only for the minimum context needed to explain the user's thesis, the decomposition path, and key judgment calls.

Every report must briefly explain the reasoning path:

```text
user thesis -> interpreted economic exposure -> wanted/unwanted exposures -> candidate instruments -> score or weighting method -> final weights and hedges
```

When proposing a portfolio, include a sizing table. Show the calculation principle, even when the numbers are first-pass discretionary weights rather than optimized outputs. Prefer explicit score columns such as thesis fit, value capture, liquidity, risk penalty, hedge usefulness, and final normalized weight.

Every portfolio-style answer must end with a concrete holdings table. Do not end only with themes, sectors, or abstract exposures. Each row must identify either:

- a concrete asset, token, equity, cash instrument, or fund proxy; or
- a currently active prediction market with platform, exact question, direction token (`YES` or `NO`), source link, and target weight.

If current market status, price, or liquidity has not been verified in the turn, mark those fields as `unverified` or `unknown` instead of presenting them as current.

## Ratings

Use these first-pass ratings:

```text
excellent: direct causal and settlement match, sufficient liquidity, clear payoff
good: strong causal match, manageable basis risk
weak: related theme, but settlement or timing mismatch
reject: does not pay in the relevant bad state
unknown: missing facts prevent judgment
```

Prefer rejecting weak semantic matches over overstating hedge quality. Text similarity is not hedge fit.

## Market Data Boundary

Use prediction-market pages, public search, and public APIs as research sources. Include links to the market pages or API endpoints used when reporting candidates.

The skill does not execute trades. Do not claim to have placed, checked, or prepared an order. If the user asks to trade, provide a research summary and tell them to use the relevant exchange interface or their own trading system.

When market data is missing, stale, or unavailable, mark liquidity, spread, price, or settlement fields as unknown instead of guessing.

## References

Read these only when needed:

- `references/templates.md`: report, Asset Capsule, hedge-fit scorecard, and watchlist templates.
