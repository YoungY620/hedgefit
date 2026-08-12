import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {brandColors} from '@hedgefit/brand';

const C = {
  ...brandColors,
};

const font = 'Inter, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
const mono = '"SFMono-Regular", Menlo, Monaco, Consolas, monospace';

const clamp = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

// The lime transition flash provides the cut. Keeping the scene fully opaque
// avoids a one-frame black gap when consecutive Remotion sequences meet.
const sceneFade = (_frame: number, _duration: number) => 1;

const rise = (frame: number, at = 0, distance = 24) => ({
  opacity: clamp(frame, [at, at + 14], [0, 1]),
  transform: `translateY(${clamp(frame, [at, at + 18], [distance, 0])}px)`,
});

const enterSpring = (frame: number, at = 0, damping = 16) =>
  spring({frame: frame - at, fps: 30, config: {damping, stiffness: 130, mass: 0.8}});

const LogoMark: React.FC<{size?: number; dark?: boolean}> = ({size = 32, dark = false}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: dark ? C.ink : C.lime,
      display: 'grid',
      placeItems: 'center',
      transform: 'rotate(-8deg)',
      boxShadow: `inset 0 0 0 ${Math.max(2, size * 0.07)}px ${dark ? C.lime : C.ink}`,
      flex: '0 0 auto',
    }}
  >
    <div style={{position: 'relative', width: size * 0.48, height: size * 0.56}}>
      <i style={{position: 'absolute', left: 0, top: 0, width: size * 0.075, height: '100%', borderRadius: 99, background: dark ? C.lime : C.ink}} />
      <i style={{position: 'absolute', right: 0, top: 0, width: size * 0.075, height: '100%', borderRadius: 99, background: dark ? C.lime : C.ink}} />
      <i style={{position: 'absolute', left: 0, right: 0, top: '44%', height: size * 0.075, borderRadius: 99, background: dark ? C.lime : C.ink}} />
    </div>
  </div>
);

const Brand: React.FC<{light?: boolean; compact?: boolean}> = ({light = false, compact = false}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: compact ? 10 : 14}}>
    <LogoMark size={compact ? 26 : 34} dark={light} />
    <div
      style={{
        fontFamily: font,
        fontWeight: 780,
        letterSpacing: '-0.025em',
        color: light ? C.white : C.ink,
        fontSize: compact ? 18 : 24,
      }}
    >
      HedgeFit
    </div>
  </div>
);

const Pill: React.FC<{
  children: React.ReactNode;
  tone?: 'lime' | 'paper' | 'dark' | 'orange';
  style?: React.CSSProperties;
}> = ({children, tone = 'paper', style}) => {
  const themes = {
    lime: {background: C.lime, color: C.ink, border: '1px solid #9DD455'},
    paper: {background: C.white, color: C.ink, border: `1px solid ${C.line}`},
    dark: {background: C.ink, color: C.white, border: '1px solid #252A27'},
    orange: {background: C.peach, color: '#6E3C18', border: '1px solid #EEC89F'},
  };
  return (
    <div
      style={{
        ...themes[tone],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 13px',
        borderRadius: 999,
        fontFamily: font,
        fontWeight: 760,
        fontSize: 13,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const TopBar: React.FC<{frame: number; dark?: boolean; status?: string}> = ({
  frame,
  dark = false,
  status,
}) => (
  <div
    style={{
      position: 'absolute',
      left: 46,
      right: 46,
      top: 30,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: clamp(frame, [0, 12], [0, 1]),
    }}
  >
    <Brand light={dark} compact />
    {status ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          color: dark ? '#D9E7D7' : C.green,
          fontFamily: font,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 99,
            background: C.lime,
            boxShadow: `0 0 ${10 + Math.sin(frame / 4) * 4}px ${C.lime}`,
          }}
        />
        {status}
      </div>
    ) : null}
  </div>
);

const Grain: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      opacity: dark ? 0.08 : 0.045,
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.7%27/%3E%3C/svg%3E")',
      mixBlendMode: dark ? 'screen' : 'multiply',
    }}
  />
);

const HookScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: font,
        opacity: sceneFade(frame, duration),
        overflow: 'hidden',
      }}
    >
      <Grain />
      <div
        style={{
          position: 'absolute',
          width: 710,
          height: 710,
          borderRadius: '50%',
          left: 285,
          top: -300,
          border: `1px solid ${C.line}`,
          transform: `scale(${1 + Math.sin(frame / 18) * 0.0025})`,
        }}
      />
      <div style={{position: 'absolute', left: 78, top: 62, ...rise(frame, 0)}}>
        <Brand compact />
      </div>
      <div style={{position: 'absolute', left: 150, right: 150, top: 180, textAlign: 'center'}}>
        <div style={{...rise(frame, 4)}}>
          <Pill tone="lime">An agent skill for semantic hedging</Pill>
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: '-0.06em',
            fontWeight: 825,
            ...rise(frame, 10, 42),
          }}
        >
          What pays when your
          <br />
          thesis <span style={{color: C.red}}>breaks?</span>
        </div>
        <div
          style={{
            margin: '31px auto 0',
            height: 3,
            width: clamp(frame, [24, 54], [0, 380]),
            borderRadius: 10,
            background: C.ink,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 46,
          textAlign: 'center',
          fontWeight: 650,
          fontSize: 17,
          color: C.grey,
          ...rise(frame, 26),
        }}
      >
        Your portfolio has a bad side. Make it legible.
      </div>
    </AbsoluteFill>
  );
};

const AgentScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const typed = 'I’m long AI infrastructure. What could hedge tighter chip export controls?';
  const chars = Math.floor(clamp(frame, [18, 68], [0, typed.length]));
  const thinking = frame > 75;
  const win = enterSpring(frame, 0);
  const skillIn = enterSpring(frame, 77);
  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        fontFamily: font,
        color: C.white,
        opacity: sceneFade(frame, duration),
        overflow: 'hidden',
      }}
    >
      <Grain dark />
      <TopBar frame={frame} dark status="skill active" />
      <div
        style={{
          position: 'absolute',
          left: 95,
          right: 95,
          top: 96,
          bottom: 52,
          background: '#191D1B',
          border: '1px solid #313733',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 36px 120px rgba(0,0,0,0.4)',
          transform: `translateY(${(1 - win) * 60}px) scale(${0.96 + win * 0.04})`,
          opacity: win,
        }}
      >
        <div
          style={{
            height: 55,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #303531',
            padding: '0 21px',
            gap: 8,
          }}
        >
          {['#EF6A5F', '#F4BF4F', '#61C554'].map((c) => (
            <span key={c} style={{width: 10, height: 10, borderRadius: 99, background: c}} />
          ))}
          <span style={{marginLeft: 18, color: '#8F9892', fontSize: 13, fontWeight: 650}}>
            Agent / New task
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 55,
            bottom: 0,
            width: 236,
            borderRight: '1px solid #303531',
            padding: '27px 22px',
          }}
        >
          <div style={{fontSize: 11, textTransform: 'uppercase', letterSpacing: '.13em', color: '#79817C'}}>
            Installed skills
          </div>
          <div
            style={{
              marginTop: 17,
              borderRadius: 13,
              background: '#282E2A',
              border: `1px solid ${thinking ? '#7CA352' : '#343A36'}`,
              padding: '13px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <LogoMark size={24} dark />
            <div style={{fontSize: 12, fontWeight: 750, lineHeight: 1.25}}>semantic<br />hedge fund</div>
          </div>
          <div style={{marginTop: 27, fontSize: 11, lineHeight: 1.8, color: '#6F7771'}}>
            Just install the skill.<br />Then ask your agent.
          </div>
        </div>
        <div style={{position: 'absolute', left: 236, right: 0, top: 55, bottom: 0, padding: '32px 37px'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div
              style={{
                width: 620,
                minHeight: 102,
                borderRadius: '20px 20px 5px 20px',
                background: C.white,
                color: C.ink,
                padding: '24px 27px',
                fontSize: 23,
                lineHeight: 1.45,
                fontWeight: 610,
                boxSizing: 'border-box',
              }}
            >
              {typed.slice(0, chars)}
              <span
                style={{
                  display: 'inline-block',
                  height: 27,
                  width: 2,
                  background: C.ink,
                  verticalAlign: 'middle',
                  marginLeft: 2,
                  opacity: frame % 16 < 8 ? 1 : 0,
                }}
              />
            </div>
          </div>
          {thinking ? (
            <div
              style={{
                marginTop: 23,
                display: 'flex',
                gap: 15,
                alignItems: 'flex-start',
                opacity: skillIn,
                transform: `translateY(${(1 - skillIn) * 18}px)`,
              }}
            >
              <LogoMark size={34} dark />
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <div style={{fontWeight: 780}}>hedge-fit</div>
                  <Pill tone="lime" style={{padding: '5px 9px', fontSize: 10}}>running</Pill>
                </div>
                <div style={{marginTop: 16, display: 'grid', gap: 9}}>
                  {[
                    'Reading the thesis and time horizon',
                    'Separating wanted from unwanted exposure',
                    'Searching exact market settlement rules',
                  ].map((line, i) => {
                    const on = frame > 84 + i * 13;
                    return (
                      <div key={line} style={{display: 'flex', alignItems: 'center', gap: 10, color: on ? '#DDE8DE' : '#68706B', fontSize: 14}}>
                        <span
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: 99,
                            border: `1px solid ${on ? C.lime : '#4C534E'}`,
                            background: on ? C.lime : 'transparent',
                            color: C.ink,
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 10,
                            fontWeight: 900,
                          }}
                        >
                          {on ? '✓' : ''}
                        </span>
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const NodeCard: React.FC<{
  label: string;
  title: string;
  sub: string;
  tone?: 'good' | 'risk' | 'neutral';
  style?: React.CSSProperties;
}> = ({label, title, sub, tone = 'neutral', style}) => {
  const bg = tone === 'good' ? C.mint : tone === 'risk' ? C.peach : C.white;
  const fg = tone === 'good' ? C.green : tone === 'risk' ? '#7E3C24' : C.ink;
  return (
    <div
      style={{
        width: 228,
        borderRadius: 20,
        border: `1px solid ${tone === 'good' ? '#B3D9A5' : tone === 'risk' ? '#E8BD98' : C.line}`,
        background: bg,
        color: fg,
        padding: '19px 20px',
        boxSizing: 'border-box',
        boxShadow: '0 16px 40px rgba(30,35,29,.06)',
        ...style,
      }}
    >
      <div style={{fontSize: 10, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.72}}>{label}</div>
      <div style={{fontSize: 22, fontWeight: 810, letterSpacing: '-.035em', marginTop: 9}}>{title}</div>
      <div style={{fontSize: 13, marginTop: 6, opacity: 0.72, lineHeight: 1.35}}>{sub}</div>
    </div>
  );
};

const ExposureScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const center = enterSpring(frame, 8);
  const lineDraw = clamp(frame, [22, 75], [0, 1]);
  const nodes = [
    {x: 72, y: 266, label: 'wanted', title: 'AI demand', sub: 'Keep this exposure', tone: 'good' as const, at: 31},
    {x: 72, y: 453, label: 'wanted', title: 'Compute growth', sub: 'Core thesis driver', tone: 'good' as const, at: 61},
    {x: 980, y: 246, label: 'unwanted', title: 'Export controls', sub: 'Policy shock', tone: 'risk' as const, at: 46},
    {x: 980, y: 390, label: 'unwanted', title: 'Taiwan disruption', sub: 'Supply shock', tone: 'risk' as const, at: 76},
    {x: 980, y: 534, label: 'unwanted', title: 'Rate shock', sub: 'Multiple compression', tone: 'risk' as const, at: 91},
  ];
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        fontFamily: font,
        color: C.ink,
        opacity: sceneFade(frame, duration),
        overflow: 'hidden',
      }}
    >
      <Grain />
      <TopBar frame={frame} status="exposure map" />
      <div style={{position: 'absolute', left: 72, top: 95, ...rise(frame, 0)}}>
        <Pill tone="lime">Step 01 · Understand</Pill>
          <div style={{fontSize: 46, fontWeight: 825, letterSpacing: '-.05em', marginTop: 15}}>One thesis. Two sides.</div>
      </div>
      <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} viewBox="0 0 1280 720">
        {nodes.map((n, i) => {
          const fromX = 640;
          const fromY = 449;
          const toX = n.x < 500 ? n.x + 228 : n.x;
          const toY = n.y + 58;
          return (
            <path
              key={n.title}
              d={`M ${fromX} ${fromY} C ${n.x < 500 ? 460 : 820} ${fromY}, ${n.x < 500 ? 430 : 850} ${toY}, ${toX} ${toY}`}
              fill="none"
              stroke={n.tone === 'good' ? '#8BBB77' : '#D58954'}
              strokeWidth="2.5"
              strokeDasharray="500"
              strokeDashoffset={500 * (1 - clamp(lineDraw, [i * 0.12, i * 0.12 + 0.48], [0, 1]))}
              opacity=".75"
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 470,
          top: 342,
          width: 340,
          height: 215,
          borderRadius: 28,
          background: C.ink,
          color: C.white,
          padding: '30px 31px',
          boxSizing: 'border-box',
          boxShadow: '0 28px 70px rgba(28,31,25,.22)',
          transform: `scale(${0.78 + center * 0.22})`,
          opacity: center,
          zIndex: 3,
        }}
      >
        <div style={{fontSize: 11, fontWeight: 850, letterSpacing: '.13em', color: C.lime}}>ASSET CAPSULE</div>
        <div style={{fontSize: 30, fontWeight: 820, letterSpacing: '-.04em', marginTop: 16}}>AI infrastructure</div>
        <div style={{marginTop: 23, display: 'flex', gap: 9}}>
          <Pill tone="lime" style={{fontSize: 10, padding: '6px 9px'}}>Long horizon</Pill>
          <Pill tone="dark" style={{fontSize: 10, padding: '6px 9px'}}>3 risks found</Pill>
        </div>
      </div>
      {nodes.map((n) => {
        const p = enterSpring(frame, n.at);
        return (
          <NodeCard
            key={n.title}
            label={n.label}
            title={n.title}
            sub={n.sub}
            tone={n.tone}
            style={{
              position: 'absolute',
              left: n.x,
              top: n.y,
              zIndex: 4,
              opacity: p,
              transform: `translateY(${(1 - p) * 24}px) scale(${0.94 + p * 0.06})`,
            }}
          />
        );
      })}
      <div style={{position: 'absolute', left: 478, bottom: 27, color: C.grey, fontSize: 14, fontWeight: 620, ...rise(frame, 94)}}>
        Hedge only what you don’t want to own.
      </div>
    </AbsoluteFill>
  );
};

const ScoreBar: React.FC<{label: string; value: number; frame: number; at: number; inverse?: boolean}> = ({
  label,
  value,
  frame,
  at,
  inverse = false,
}) => {
  const p = clamp(frame, [at, at + 22], [0, 1]);
  return (
    <div style={{display: 'grid', gridTemplateColumns: '136px 1fr 42px', alignItems: 'center', gap: 12}}>
      <div style={{fontSize: 13, fontWeight: 680, color: '#384039'}}>{label}</div>
      <div style={{height: 7, borderRadius: 99, background: '#E2E5DF', overflow: 'hidden'}}>
        <div
          style={{
            width: `${value * p}%`,
            height: '100%',
            borderRadius: 99,
            background: inverse ? C.orange : C.green,
          }}
        />
      </div>
      <div style={{fontFamily: mono, fontSize: 12, fontWeight: 750, textAlign: 'right'}}>{Math.round(value * p)}</div>
    </div>
  );
};

const MatchScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const card = enterSpring(frame, 24);
  const badge = enterSpring(frame, 88, 12);
  const scanX = clamp(frame, [0, 70], [-100, 1380]);
  return (
    <AbsoluteFill
      style={{
        background: '#E6EDDF',
        fontFamily: font,
        color: C.ink,
        opacity: sceneFade(frame, duration),
        overflow: 'hidden',
      }}
    >
      <Grain />
      <TopBar frame={frame} status="market matched" />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: scanX,
          width: 150,
          background: 'linear-gradient(90deg, transparent, rgba(184,243,107,.4), transparent)',
          transform: 'skewX(-12deg)',
          opacity: frame < 75 ? 1 : 0,
        }}
      />
      <div style={{position: 'absolute', left: 73, top: 100, ...rise(frame, 0)}}>
        <Pill tone="paper">Step 02 · Match</Pill>
        <div style={{fontSize: 49, fontWeight: 830, letterSpacing: '-.055em', marginTop: 15}}>Text similarity isn’t hedge fit.</div>
        <div style={{fontSize: 17, color: '#5B635B', marginTop: 10}}>Check causality, settlement, timing, liquidity, and basis risk.</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 73,
          top: 245,
          width: 690,
          height: 395,
          background: C.white,
          border: '1px solid #CBD6C5',
          borderRadius: 26,
          padding: '27px 30px',
          boxSizing: 'border-box',
          boxShadow: '0 26px 80px rgba(41,66,42,.12)',
          opacity: card,
          transform: `translateY(${(1 - card) * 34}px)`,
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: 8}}>
            <Pill tone="dark" style={{fontSize: 10, padding: '6px 9px'}}>Prediction market</Pill>
            <Pill tone="orange" style={{fontSize: 10, padding: '6px 9px'}}>Illustrative</Pill>
          </div>
          <div style={{fontFamily: mono, fontSize: 11, color: C.grey}}>DIRECTION · YES</div>
        </div>
        <div style={{fontSize: 27, fontWeight: 815, lineHeight: 1.17, letterSpacing: '-.035em', marginTop: 18}}>
          Will new U.S. advanced-chip export controls be announced by Dec 31?
        </div>
        <div style={{height: 1, background: C.line, margin: '22px 0 20px'}} />
        <div style={{display: 'grid', gap: 15}}>
          <ScoreBar label="Exposure match" value={92} frame={frame} at={42} />
          <ScoreBar label="Settlement fit" value={86} frame={frame} at={49} />
          <ScoreBar label="Timing match" value={90} frame={frame} at={56} />
          <ScoreBar label="Basis risk" value={24} frame={frame} at={63} inverse />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 73,
          top: 246,
          width: 390,
          height: 225,
          borderRadius: 26,
          background: C.ink,
          color: C.white,
          padding: '28px 29px',
          boxSizing: 'border-box',
          boxShadow: '0 28px 70px rgba(20,30,21,.2)',
          opacity: badge,
          transform: `translateX(${(1 - badge) * 35}px) rotate(${(1 - badge) * 3}deg)`,
        }}
      >
        <div style={{fontSize: 11, color: '#A6B0A9', letterSpacing: '.13em', fontWeight: 800}}>HEDGE FIT</div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 13, marginTop: 19}}>
          <span style={{fontSize: 66, lineHeight: 0.9, fontWeight: 850, letterSpacing: '-.06em'}}>GOOD</span>
          <span style={{width: 13, height: 13, borderRadius: 99, background: C.lime, marginBottom: 6, boxShadow: `0 0 18px ${C.lime}`}} />
        </div>
        <div style={{marginTop: 21, fontSize: 14, lineHeight: 1.45, color: '#B9C2BC'}}>
          Strong causal link.<br />Manageable basis risk.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 73,
          top: 491,
          width: 390,
          height: 149,
          borderRadius: 22,
          border: '1px solid #C9D4C4',
          background: 'rgba(252,251,247,.68)',
          padding: '22px 25px',
          boxSizing: 'border-box',
          ...rise(frame, 119),
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 11, fontWeight: 820, letterSpacing: '.11em', color: C.red}}>REJECTED LOOKALIKE</div>
          <div style={{fontSize: 11, fontWeight: 800, color: C.red}}>WEAK</div>
        </div>
        <div style={{fontSize: 18, fontWeight: 760, marginTop: 13}}>Generic “AI regulation” market</div>
        <div style={{fontSize: 13, color: C.grey, marginTop: 7}}>Wrong settlement rule · timing mismatch</div>
      </div>
    </AbsoluteFill>
  );
};

const ReportScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const table = enterSpring(frame, 18);
  const rows = [
    {holding: 'AI infrastructure basket', type: 'CORE', side: 'LONG', weight: '70%', status: 'KEEP', color: C.mint},
    {holding: 'Cash / T-bills', type: 'BUFFER', side: 'CASH', weight: '20%', status: 'HOLD', color: '#E7E7E0'},
    {holding: 'Export-control market', type: 'HEDGE', side: 'YES', weight: '10%', status: 'RESEARCH', color: C.peach},
  ];
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        fontFamily: font,
        color: C.ink,
        opacity: sceneFade(frame, duration),
        overflow: 'hidden',
      }}
    >
      <Grain />
      <TopBar frame={frame} status="report ready" />
      <div style={{position: 'absolute', left: 73, top: 100, ...rise(frame, 0)}}>
        <Pill tone="lime">Step 03 · Decide</Pill>
        <div style={{fontSize: 50, fontWeight: 830, letterSpacing: '-.055em', marginTop: 15}}>Dense research. Concrete holdings.</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 73,
          right: 73,
          top: 232,
          height: 382,
          borderRadius: 26,
          border: `1px solid ${C.line}`,
          background: C.white,
          overflow: 'hidden',
          boxShadow: '0 25px 75px rgba(25,30,24,.1)',
          opacity: table,
          transform: `translateY(${(1 - table) * 35}px)`,
        }}
      >
        <div
          style={{
            height: 58,
            display: 'grid',
            gridTemplateColumns: '2.3fr .8fr .8fr .7fr .9fr',
            alignItems: 'center',
            padding: '0 28px',
            background: C.ink,
            color: '#AEB6B0',
            fontSize: 10,
            fontWeight: 830,
            letterSpacing: '.12em',
          }}
        >
          <div>FINAL CONCRETE HOLDINGS</div><div>ROLE</div><div>SIDE</div><div>WEIGHT</div><div>STATUS</div>
        </div>
        {rows.map((row, i) => {
          const p = enterSpring(frame, 33 + i * 13);
          return (
            <div
              key={row.holding}
              style={{
                height: 84,
                display: 'grid',
                gridTemplateColumns: '2.3fr .8fr .8fr .7fr .9fr',
                alignItems: 'center',
                padding: '0 28px',
                borderBottom: `1px solid ${C.line}`,
                opacity: p,
                transform: `translateX(${(1 - p) * 30}px)`,
              }}
            >
              <div>
                <div style={{fontSize: 18, fontWeight: 780, letterSpacing: '-.02em'}}>{row.holding}</div>
                <div style={{fontSize: 11, color: C.grey, marginTop: 5}}>{i === 2 ? 'Illustrative market · verify live terms' : i === 0 ? 'Wanted exposure' : 'Portfolio resilience'}</div>
              </div>
              <div style={{fontSize: 12, fontWeight: 760}}>{row.type}</div>
              <div><Pill tone={i === 2 ? 'orange' : 'paper'} style={{fontSize: 10, padding: '6px 9px'}}>{row.side}</Pill></div>
              <div style={{fontFamily: mono, fontSize: 22, fontWeight: 760}}>{row.weight}</div>
              <div>
                <span style={{display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 790}}>
                  <span style={{width: 7, height: 7, borderRadius: 99, background: row.color, border: '1px solid #BFC4BC'}} />{row.status}
                </span>
              </div>
            </div>
          );
        })}
        <div style={{height: 71, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px'}}>
          <div style={{fontSize: 12, color: C.grey}}>Includes sources · settlement review · missing facts · next checks</div>
          <div style={{display: 'flex', gap: 8}}>
            <Pill tone="paper" style={{fontSize: 9, padding: '6px 9px'}}>table-first</Pill>
            <Pill tone="lime" style={{fontSize: 9, padding: '6px 9px'}}>research ready</Pill>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 36, textAlign: 'center', color: C.grey, fontSize: 13, ...rise(frame, 79)}}>
        Research and decision support · No orders placed
      </div>
    </AbsoluteFill>
  );
};

const EndScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const logo = enterSpring(frame, 0, 13);
  const url = 'github.com/YoungY620/hedgefit';
  return (
    <AbsoluteFill
      style={{
        background: C.ink,
        fontFamily: font,
        color: C.white,
        opacity: 1,
        overflow: 'hidden',
      }}
    >
      <Grain dark />
      <div
        style={{
          position: 'absolute',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,243,107,.25), rgba(184,243,107,0) 68%)',
          left: 330,
          top: 80,
          transform: `scale(${0.8 + frame / duration * 0.35})`,
        }}
      />
      <div style={{position: 'absolute', left: 0, right: 0, top: 89, display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `scale(${0.65 + logo * 0.35}) rotate(${(1 - logo) * -10}deg)`, opacity: logo}}>
          <LogoMark size={72} dark />
        </div>
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 198, textAlign: 'center'}}>
        <div style={{fontSize: 70, lineHeight: 0.98, fontWeight: 840, letterSpacing: '-.06em', ...rise(frame, 8, 38)}}>
          Ask your agent.
          <br />
          Hedge the <span style={{color: C.lime}}>bad state.</span>
        </div>
        <div style={{fontSize: 18, color: '#B3BCB6', marginTop: 25, ...rise(frame, 18)}}>
          Install one skill. Turn any investment thesis into hedge-fit research.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 304,
          right: 304,
          top: 487,
          height: 57,
          borderRadius: 15,
          border: '1px solid #3D453F',
          background: 'rgba(255,255,255,.055)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 13,
          fontFamily: mono,
          fontSize: 14,
          color: '#E4E9E5',
          ...rise(frame, 28),
        }}
      >
        <span style={{color: C.lime}}>↗</span>
        {url}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', ...rise(frame, 38)}}>
        <Pill tone="lime" style={{padding: '10px 16px'}}>Open source · install now</Pill>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 25, textAlign: 'center', fontSize: 10, color: '#78817B', letterSpacing: '.06em'}}>
        RESEARCH WORKFLOW · NOT FINANCIAL ADVICE · NO TRADE EXECUTION
      </div>
    </AbsoluteFill>
  );
};

const Flash: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: C.lime,
        opacity: clamp(frame, [0, 2, 6], [0, 0.35, 0]),
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  );
};

const Film: React.FC<{includeAudio: boolean}> = ({includeAudio}) => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: C.ink}}>
      {includeAudio ? <Audio src={staticFile('soundtrack.wav')} volume={0.78} /> : null}
      <Sequence from={0} durationInFrames={105} premountFor={30}>
        <HookScene duration={105} />
      </Sequence>
      <Sequence from={105} durationInFrames={165} premountFor={30}>
        <AgentScene duration={165} />
      </Sequence>
      <Sequence from={270} durationInFrames={165} premountFor={30}>
        <ExposureScene duration={165} />
      </Sequence>
      <Sequence from={435} durationInFrames={180} premountFor={30}>
        <MatchScene duration={180} />
      </Sequence>
      <Sequence from={615} durationInFrames={120} premountFor={30}>
        <ReportScene duration={120} />
      </Sequence>
      <Sequence from={735} durationInFrames={durationInFrames - 735} premountFor={30}>
        <EndScene duration={durationInFrames - 735} />
      </Sequence>
      {[105, 270, 435, 615, 735].map((at) => (
        <Sequence key={at} from={at} durationInFrames={5}>
          <Flash />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const HedgeFit: React.FC = () => <Film includeAudio />;
export const HedgeFitSilent: React.FC = () => <Film includeAudio={false} />;
