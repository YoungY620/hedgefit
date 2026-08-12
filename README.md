# HedgeFit

Thesis-to-hedge research for agents.

Website: [youngy620.github.io/hedgefit](https://youngy620.github.io/hedgefit/)

The core question is:

```text
Will this market or instrument make money in the states where my portfolio loses money?
```

## What It Does

This skill helps an agent turn an investment thesis into a compact hedge research report:

- interpret the user's thesis as economic exposures
- separate wanted exposure from unwanted exposure
- search for concrete assets, Polymarket markets, or Kalshi markets that may express or hedge those exposures
- score hedge fit, basis risk, settlement-rule match, timing, liquidity, and cost
- explain the sizing logic for portfolio weights
- end with a concrete holdings table

It is designed for research and decision support. It does not place trades, prepare executable orders, or integrate with a broker.

## Output Style

Reports are table-first and information dense. A portfolio-style answer should include:

| Section | Purpose |
|---|---|
| Process trace | Shows how the user thesis became exposures, scores, and weights |
| Exposure map | Separates wanted and unwanted exposures |
| Instrument selection | Explains why each asset or market was included |
| Weight calculation | Shows the sizing method and constraints |
| Candidate hedges | Lists Polymarket or Kalshi markets with direction and basis risk |
| Final concrete holdings | Gives the actual proposed holdings, target weights, and links |

## Required Final Table

Every portfolio-style report must end with a concrete holdings table:

| Holding | Type | Platform / venue | Direction token or side | Target weight | Current status | Why this instrument | Thesis linkage | Source |
|---|---|---|---|---:|---|---|---|---|
| Example asset or market | token / equity / cash / prediction market | Polymarket / Kalshi / exchange | long / short / YES / NO / cash | 0% | active / unverified / unknown | Brief reason | Link to thesis exposure | Source link |

Prediction-market rows should name the exact market question and direction token (`YES` or `NO`). If current market status, price, or liquidity has not been verified in the turn, mark it as `unverified` or `unknown`.

## Installation

Choose the method that matches your agent.

### Codex

Add this repository as a plugin marketplace and install the plugin:

```bash
codex plugin marketplace add YoungY620/hedgefit && \
  codex plugin add hedge-fit@hedgefit
```

### curl

Download the skill directly into the Codex user skills directory:

```bash
mkdir -p ~/.codex/skills/hedge-fit && \
  curl -fsSL https://github.com/YoungY620/hedgefit/archive/refs/heads/main.tar.gz | \
  tar -xz --strip-components=3 \
    -C ~/.codex/skills/hedge-fit \
    hedgefit-main/skills/hedge-fit
```

### Any agent

Paste this prompt into any agent that supports installable skills:

```text
Install the HedgeFit skill from https://github.com/YoungY620/hedgefit. Detect your user skills directory, install skills/hedge-fit there, validate SKILL.md, and tell me whether a restart is required.
```

Restart the agent session if your agent does not detect newly installed skills automatically.

## Monorepo Layout

```text
apps/
├── promo/                 Remotion product film and original soundtrack
└── web/                   Vite/React GitHub Pages site
packages/
└── brand/                 Shared colors, type, and CSS tokens
skills/
└── hedge-fit/              Installable agent skill
.github/workflows/
└── deploy-pages.yml       GitHub Pages build and deployment
```

## Develop

```bash
npm install
npm run dev:web
npm run studio:promo
```

Build the website with `npm run build:web`. Render the 28-second product film with `npm run render:promo` (requires FFmpeg).

## Boundary

This skill is not financial advice and does not execute trades. It is a structured research workflow for matching portfolio bad states to assets or prediction-market payoffs.
