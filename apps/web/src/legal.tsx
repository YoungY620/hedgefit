import React from 'react';
import {createRoot} from 'react-dom/client';
import '@semantic-hedge-fund/brand/styles.css';
import './styles.css';
import './legal.css';

const kind = document.body.dataset.page ?? 'support';
const pages: Record<string, {title: string; updated: string; body: React.ReactNode}> = {
  support: {
    title: 'Support', updated: 'August 12, 2026', body: <><p>Semantic Hedge Fund is an open-source, research-only agent skill maintained through GitHub.</p><h2>Get help</h2><p>Report bugs, request features, or ask installation questions in the project’s GitHub Issues.</p><a className="legal-button" href="https://github.com/YoungY620/semantic-hedge-fund/issues">Open GitHub Issues ↗</a><h2>Installation</h2><p>Choose Codex, curl, or an installation prompt on the project homepage.</p><a className="legal-button" href="../#install">View installation options ↗</a><p>Restart your agent session if your agent does not detect newly installed skills automatically.</p></>,
  },
  privacy: {
    title: 'Privacy policy', updated: 'August 12, 2026', body: <><p>Semantic Hedge Fund is a skills-only plugin. The published skill does not run a server, create an account, authenticate users, or collect personal information on behalf of its developer.</p><h2>Data used during a task</h2><p>Your agent may process the portfolio, thesis, files, links, or other information you provide. It may access public prediction-market pages and public APIs to perform the requested research. That processing occurs under the policies and settings of the agent platform you use.</p><h2>Data we receive</h2><p>The developer does not receive task prompts, portfolio data, generated reports, credentials, or account information through this plugin. The GitHub Pages website uses no analytics, cookies, forms, or advertising trackers.</p><h2>Third parties</h2><p>Links to GitHub, Polymarket, Kalshi, and other sources are governed by those services’ own privacy terms.</p><h2>Contact</h2><p>Privacy questions can be filed publicly or privately through the repository owner’s GitHub contact surfaces.</p></>,
  },
  terms: {
    title: 'Terms of use', updated: 'August 12, 2026', body: <><p>By using Semantic Hedge Fund, you agree to use it as a research and decision-support workflow only.</p><h2>No financial advice</h2><p>Outputs are informational and may be incomplete, stale, or incorrect. They are not investment, legal, tax, or financial advice and do not create a fiduciary relationship.</p><h2>No trade execution</h2><p>The plugin does not place, prepare, sign, or submit orders. You are solely responsible for verifying market status, settlement rules, liquidity, pricing, suitability, and every investment decision.</p><h2>Risk</h2><p>Prediction markets and financial instruments can lose value. Semantic similarity does not guarantee hedge effectiveness. Basis risk, timing mismatch, liquidity constraints, platform risk, and regulatory changes can cause a proposed hedge to fail.</p><h2>Open-source software</h2><p>The project is provided under the license included in the repository, without warranties to the maximum extent permitted by law.</p></>,
  },
};
const page = pages[kind] ?? pages.support;
createRoot(document.getElementById('root')!).render(<main className="legal"><nav><a href="../">← Semantic Hedge Fund</a><a href="https://github.com/YoungY620/semantic-hedge-fund">GitHub ↗</a></nav><article><span>Public policy</span><h1>{page.title}</h1><small>Last updated {page.updated}</small>{page.body}</article><footer>Research workflow · Not financial advice · No trade execution</footer></main>);
