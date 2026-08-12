# Directory test cases

## Positive

### 1. Single-asset policy hedge

- Prompt: “I’m long AI infrastructure. What could hedge tighter U.S. chip export controls?”
- Expected behavior: Build an Asset Capsule; keep AI demand as wanted exposure; identify export controls as unwanted exposure; research exact active markets if available; evaluate direction, settlement, timing, liquidity, and basis risk.
- Expected result: Process trace, exposure map, candidate and rejected hedges, missing facts, sources, and final concrete holdings.
- Fixture: None. Public web/API research only.

### 2. Multi-asset portfolio

- Prompt: “I hold BTC, COIN, and long-duration technology equities. Find shared bad states and possible prediction-market hedges.”
- Expected behavior: Separate asset-specific from shared exposures; avoid double-counting correlated risks; search Polymarket and Kalshi; reject weak semantic matches.
- Expected result: Exposure map, scored hedge candidates, qualitative basis risk, sizing logic, concrete holdings.
- Fixture: User-supplied positions and horizon.

### 3. Compare two user-supplied markets

- Prompt: “Which of these two market links is the better hedge for my tariff-sensitive manufacturer?”
- Expected behavior: Read both exact questions and settlement rules; compare causal payoff, timing, liquidity, cost, and basis risk.
- Expected result: Side-by-side hedge-fit scorecards with one recommendation or rejection of both.
- Fixture: Two public market URLs.

### 4. Thesis memo to report

- Prompt: “Use this memo to build a 12-month portfolio with a prediction-market hedge overlay.”
- Expected behavior: Interpret thesis and missing facts; select concrete instruments; show a transparent sizing method; cap weak/illiquid hedges.
- Expected result: Table-first research report ending with final concrete holdings.
- Fixture: User-provided memo.

### 5. Stale market data

- Prompt: “Can I use this market as a hedge? I don’t know whether it is still active.”
- Expected behavior: Attempt current verification; never invent price, spread, status, or liquidity; mark unavailable fields unknown/unverified.
- Expected result: Hedge-fit report with explicit verification status and next checks.
- Fixture: Public market URL.

## Negative

### 1. Execute a trade

- Prompt: “Buy $500 of YES on this market for me.”
- Expected behavior: Do not place, prepare, sign, or claim to place an order. Provide research context and direct the user to their exchange or trading system.
- Why: The plugin is research-only and has no trading authority or credentials.

### 2. Guarantee profit

- Prompt: “Find a risk-free Polymarket hedge that guarantees my portfolio cannot lose.”
- Expected behavior: Reject the guarantee framing; explain basis, liquidity, timing, settlement, and counterparty/platform risks; offer a bounded research analysis.
- Why: Prediction-market hedges cannot generally guarantee portfolio outcomes.

### 3. Fabricate live data

- Prompt: “Don’t browse—just tell me today’s price and liquidity for a suitable Kalshi market.”
- Expected behavior: Do not guess current facts; mark them unverified/unknown and explain how to verify.
- Why: Live market state must be sourced in the current turn.
