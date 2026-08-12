import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import '@semantic-hedge-fund/brand/styles.css';
import './styles.css';

const repo = 'https://github.com/YoungY620/semantic-hedge-fund';
const installOptions = {
  codex: {
    label: 'Codex',
    note: 'Add the GitHub marketplace and install the plugin in one go.',
    command: 'codex plugin marketplace add YoungY620/semantic-hedge-fund && codex plugin add semantic-hedge-fund@semantic-hedge-fund',
  },
  curl: {
    label: 'curl',
    note: 'Download the skill directly into your Codex user skills folder.',
    command: 'mkdir -p ~/.codex/skills/semantic-hedge-fund && curl -fsSL https://github.com/YoungY620/semantic-hedge-fund/archive/refs/heads/main.tar.gz | tar -xz --strip-components=3 -C ~/.codex/skills/semantic-hedge-fund semantic-hedge-fund-main/skills/semantic-hedge-fund',
  },
  prompt: {
    label: 'Any agent',
    note: 'Paste this into any agent that supports installable skills.',
    command: 'Install the semantic-hedge-fund skill from https://github.com/YoungY620/semantic-hedge-fund. Detect your user skills directory, install skills/semantic-hedge-fund there, validate SKILL.md, and tell me whether a restart is required.',
  },
} as const;

const Mark = ({light = false}: {light?: boolean}) => (
  <span className={`mark${light ? ' mark--light' : ''}`} aria-hidden="true"><i /></span>
);

const Brand = ({light = false}: {light?: boolean}) => (
  <span className={`brand${light ? ' brand--light' : ''}`}><Mark light={light} /><b>semantic hedge fund</b></span>
);

const Arrow = () => <span aria-hidden="true">↗</span>;

const InstallOptions = () => {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState<keyof typeof installOptions>('codex');
  const option = installOptions[active];
  const copy = async () => {
    await navigator.clipboard.writeText(option.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="installer">
      <div className="install-tabs" role="tablist" aria-label="Install methods">
        {(Object.keys(installOptions) as Array<keyof typeof installOptions>).map((key) => (
          <button key={key} role="tab" aria-selected={active === key} onClick={() => {setActive(key); setCopied(false);}}>{installOptions[key].label}</button>
        ))}
      </div>
      <p>{option.note}</p>
      <div className="command" role="group" aria-label={`${option.label} install command`}>
        <code><span>{active === 'prompt' ? '›' : '$'}</span> {option.command}</code>
        <button onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
      </div>
    </div>
  );
};

const RiskMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--px', `${(event.clientX - rect.left) / rect.width - 0.5}`);
      node.style.setProperty('--py', `${(event.clientY - rect.top) / rect.height - 0.5}`);
    };
    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, []);
  return (
    <div className="risk-map" ref={mapRef}>
      <div className="map-head"><span>Live concept</span><strong><i /> Exposure map</strong></div>
      <svg className="map-lines" viewBox="0 0 700 500" aria-hidden="true">
        <path className="line wanted" d="M350 253 C280 253 250 142 150 142" />
        <path className="line wanted" d="M350 253 C280 253 250 367 150 367" />
        <path className="line unwanted" d="M350 253 C435 253 448 115 550 115" />
        <path className="line unwanted" d="M350 253 C435 253 448 253 550 253" />
        <path className="line unwanted" d="M350 253 C435 253 448 390 550 390" />
      </svg>
      <div className="map-card map-card--asset">
        <small>Asset capsule</small><b>AI infrastructure</b><span>3 risks found</span>
      </div>
      <div className="map-card map-card--wanted map-card--w1"><small>Wanted</small><b>AI demand</b><span>Keep</span></div>
      <div className="map-card map-card--wanted map-card--w2"><small>Wanted</small><b>Compute growth</b><span>Keep</span></div>
      <div className="map-card map-card--risk map-card--r1"><small>Unwanted</small><b>Export controls</b><span>Hedge</span></div>
      <div className="map-card map-card--risk map-card--r2"><small>Unwanted</small><b>Taiwan disruption</b><span>Hedge</span></div>
      <div className="map-card map-card--risk map-card--r3"><small>Unwanted</small><b>Rate shock</b><span>Hedge</span></div>
      <div className="map-caption">One thesis. Two sides.</div>
    </div>
  );
};

const Score = ({name, value, warm = false}: {name: string; value: number; warm?: boolean}) => (
  <div className="score"><span>{name}</span><i><b className={warm ? 'warm' : ''} style={{width: `${value}%`}} /></i><em>{value}</em></div>
);

const App = () => {
  return (
    <main>
      <nav className="nav shell">
        <a href="#top" aria-label="Semantic Hedge Fund home"><Brand /></a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#film">Film</a>
          <a className="nav-github" href={repo} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <span className="eyebrow">An agent skill for semantic hedging</span>
          <h1>What pays when<br />your thesis <em>breaks?</em></h1>
          <p>Turn an investment thesis into a compact, evidence-backed hedge report—inside the agent you already use.</p>
          <div className="hero-actions">
            <a className="button button--dark" href="#install">Install the skill <Arrow /></a>
            <a className="button button--quiet" href="#film"><span className="play">▶</span> Watch the film</a>
          </div>
          <div className="boundary"><i /> Research only <span>·</span> No orders placed</div>
        </div>
        <RiskMap />
      </section>

      <section className="dark-section" id="how">
        <div className="shell">
          <div className="section-head section-head--dark">
            <span>From question to decision</span>
            <h2>Ask normally.<br /><em>Get structure.</em></h2>
            <p>No new app to learn. Install the skill, then ask your agent about the risks hiding inside your thesis.</p>
          </div>
          <div className="agent-window">
            <div className="window-bar"><i /><i /><i /><span>Agent / New task</span><b><i /> Skill active</b></div>
            <aside><small>Installed skills</small><div className="skill-item"><Mark light /><b>semantic<br />hedge fund</b></div><p>Just install the skill.<br />Then ask your agent.</p></aside>
            <div className="conversation">
              <div className="question">I’m long AI infrastructure. What could hedge tighter chip export controls?</div>
              <div className="run"><Mark light /><div><strong>semantic-hedge-fund <span>running</span></strong><ul><li>Reading the thesis and time horizon</li><li>Separating wanted from unwanted exposure</li><li>Checking exact settlement rules</li></ul></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="method shell">
        <div className="section-head">
          <span>Three deliberate steps</span>
          <h2>Find a hedge that pays<br />in the <em>right bad state.</em></h2>
        </div>
        <article className="method-row">
          <div className="method-copy"><span>01 · Understand</span><h3>Separate what you want from what you don’t.</h3><p>The skill builds an Asset Capsule: thesis, horizon, payoff drivers, wanted exposure, unwanted exposure, and missing facts.</p></div>
          <div className="mini-map"><div className="mini wanted">Wanted<br /><b>AI demand</b></div><i /><div className="mini asset">Asset capsule<br /><b>Your thesis</b></div><i /><div className="mini risk">Unwanted<br /><b>Policy shock</b></div></div>
        </article>
        <article className="method-row method-row--reverse">
          <div className="method-copy"><span>02 · Match</span><h3>Text similarity isn’t hedge fit.</h3><p>Every candidate is checked for causal linkage, payoff direction, settlement rules, timing, liquidity, cost, and basis risk.</p></div>
          <div className="score-card">
            <div className="score-top"><span>Illustrative market</span><b>Hedge fit · GOOD <i /></b></div>
            <h4>Will advanced-chip export controls be announced by Dec 31?</h4>
            <Score name="Exposure match" value={92} /><Score name="Settlement fit" value={86} /><Score name="Timing match" value={90} /><Score name="Basis risk" value={24} warm />
          </div>
        </article>
        <article className="method-row">
          <div className="method-copy"><span>03 · Decide</span><h3>End with concrete holdings.</h3><p>A table-first report connects every position back to the thesis and explains sizing, weak alternatives, missing facts, and next checks.</p></div>
          <div className="holdings">
            <div className="holding-head"><b>Final concrete holdings</b><span>Weight</span></div>
            <div><b>AI infrastructure basket<small>Wanted exposure</small></b><em>70%</em></div>
            <div><b>Cash / T-bills<small>Portfolio resilience</small></b><em>20%</em></div>
            <div><b>Export-control market<small>Illustrative hedge</small></b><em>10%</em></div>
          </div>
        </article>
      </section>

      <section className="film shell" id="film">
        <div className="film-head"><span>Product film · 00:28</span><h2>See the whole workflow.</h2><p>Readable, with every screen still moving forward.</p></div>
        <div className="video-frame"><video controls playsInline preload="metadata" poster={`${import.meta.env.BASE_URL}media/poster.png`}><source src={`${import.meta.env.BASE_URL}media/semantic-hedge-fund-promo.mp4`} type="video/mp4" />Your browser does not support video.</video></div>
      </section>

      <section className="install" id="install">
        <div className="install-glow" />
        <div className="shell install-inner">
          <Mark light />
          <span>Open source · one skill</span>
          <h2>Ask your agent.<br />Hedge the <em>bad state.</em></h2>
          <p>Install with Codex, download with curl, or give the setup task to any skill-capable agent.</p>
          <InstallOptions />
          <a className="button button--lime" href={repo} target="_blank" rel="noreferrer">View on GitHub <Arrow /></a>
        </div>
      </section>

      <footer className="footer"><div className="shell"><Brand light /><p>Research and decision support. Not financial advice. No trade execution.</p><a href={repo}>GitHub <Arrow /></a></div></footer>
    </main>
  );
};

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
