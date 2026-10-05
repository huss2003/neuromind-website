import type { JSX } from 'react';

/* Inline-SVG signature visuals for the four program pages + the 7 project
   thumbnails. Decorative only (aria-hidden). Accents read the --th-* theme
   vars set on .program-detail-page[data-th] in styles.css; greys come from
   the global tokens (--ink-3/4, --line, --bg-*) with plain fallbacks.
   Visual language: 1.5px round strokes, rx 10-20, no animation. */

export type ProjectThumbKind =
  | 'notebook'
  | 'chart'
  | 'dashboard'
  | 'terminal'
  | 'siem'
  | 'wireframe'
  | 'prototype';

export type SignatureVariant = 'ai' | 'ds' | 'cyber' | 'ux';

const cls = (base: string, extra?: string) => (extra ? `${base} ${extra}` : base);

export function SignatureVisual({ variant, className }: { variant: SignatureVariant; className?: string }): JSX.Element {
  return (
    <svg
      className={cls('sig-visual', className)}
      viewBox="0 0 320 200"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {variant === 'ai' && <AiVisual />}
      {variant === 'ds' && <DsVisual />}
      {variant === 'cyber' && <CyberVisual />}
      {variant === 'ux' && <UxVisual />}
    </svg>
  );
}

/* ai — chat bubble holding an agent flow: 3 tiles, soft curved links, sparkle. */
function AiVisual() {
  return (
    <>
      <rect x="40" y="22" width="240" height="156" rx="20" fill="var(--th-soft, #f5f3ff)" stroke="var(--th-accent, #7c3aed)" strokeOpacity="0.35" />
      <path d="M76 176v16l18-16z" fill="var(--th-soft, #f5f3ff)" />
      <path d="M106 71h108" stroke="var(--th-node-2, #3b82f6)" strokeOpacity="0.4" />
      <path d="M87 90c0 24 22 51 54 51" stroke="var(--th-node-2, #3b82f6)" strokeOpacity="0.4" />
      <path d="M233 90c0 24-22 51-54 51" stroke="var(--th-node-2, #3b82f6)" strokeOpacity="0.4" />
      <rect x="68" y="52" width="38" height="38" rx="12" fill="#fff" stroke="var(--th-node-1, #93c5fd)" />
      <rect x="76" y="64" width="22" height="4" rx="2" fill="var(--ink-4, #94a3b8)" />
      <rect x="76" y="72" width="14" height="4" rx="2" fill="var(--ink-4, #94a3b8)" opacity="0.6" />
      <rect x="214" y="52" width="38" height="38" rx="12" fill="var(--th-node-2, #3b82f6)" />
      <rect x="222" y="64" width="22" height="4" rx="2" fill="#fff" opacity="0.85" />
      <rect x="222" y="72" width="14" height="4" rx="2" fill="#fff" opacity="0.6" />
      <rect x="141" y="122" width="38" height="38" rx="12" fill="var(--th-node-3, #1d4ed8)" />
      <rect x="149" y="134" width="22" height="4" rx="2" fill="#fff" opacity="0.85" />
      <rect x="149" y="142" width="14" height="4" rx="2" fill="#fff" opacity="0.6" />
      <path d="M256 36c.7 3.6 2.7 5.6 6.3 6.3-3.6.7-5.6 2.7-6.3 6.3-.7-3.6-2.7-5.6-6.3-6.3 3.6-.7 5.6-2.7 6.3-6.3z" fill="var(--th-node-2, #3b82f6)" />
    </>
  );
}

/* ds — notebook cell: code lines left, small bar/line chart + metric badge right. */
function DsVisual() {
  const lines = [
    { y: 70, w: 92 },
    { y: 86, w: 64, accent: true },
    { y: 102, w: 104 },
    { y: 118, w: 48 },
    { y: 134, w: 78 },
  ];
  return (
    <>
      <rect x="34" y="26" width="252" height="148" rx="16" fill="var(--card, #fff)" stroke="var(--th-hero-line, #dbeafe)" />
      <rect x="56" y="46" width="58" height="8" rx="4" fill="var(--ink-4, #94a3b8)" opacity="0.55" />
      {lines.map((l) => (
        <rect
          key={l.y}
          x="56"
          y={l.y}
          width={l.w}
          height="6"
          rx="3"
          fill={l.accent ? 'var(--th-node-2, #3b82f6)' : 'var(--ink-4, #94a3b8)'}
          opacity={l.accent ? 0.85 : 0.45}
        />
      ))}
      <path d="M198 66v82M198 148h80" stroke="var(--ink-4, #94a3b8)" strokeOpacity="0.6" />
      <rect x="210" y="124" width="13" height="24" rx="3" fill="var(--th-node-1, #93c5fd)" opacity="0.5" />
      <rect x="232" y="108" width="13" height="40" rx="3" fill="var(--th-node-1, #93c5fd)" opacity="0.65" />
      <rect x="254" y="88" width="13" height="60" rx="3" fill="var(--th-node-2, #3b82f6)" opacity="0.8" />
      <path d="M216 120L238 102 260 80" stroke="var(--th-accent, #2563eb)" />
      <circle cx="216" cy="120" r="3.2" fill="var(--th-accent, #2563eb)" />
      <circle cx="238" cy="102" r="3.2" fill="var(--th-accent, #2563eb)" />
      <circle cx="260" cy="80" r="3.2" fill="var(--th-accent, #2563eb)" />
      <rect x="196" y="34" width="76" height="26" rx="13" fill="var(--th-soft-2, #dbeafe)" />
      <text x="234" y="52" textAnchor="middle" fontSize="11" fill="var(--th-accent-ink, #1e40af)">
        r² 0.94
      </text>
    </>
  );
}

/* cyber — dark terminal + SIEM alert panel, one row highlighted in the theme accent. */
function CyberVisual() {
  const rows = [80, 102, 124, 146];
  return (
    <>
      <rect x="30" y="26" width="160" height="148" rx="16" fill="var(--th-dark-bg, #0f172a)" stroke="var(--th-hero-line, #1f2d42)" />
      <circle cx="48" cy="46" r="4" fill="#475569" />
      <circle cx="60" cy="46" r="4" fill="#475569" />
      <circle cx="72" cy="46" r="4" fill="var(--th-accent, #0d9488)" />
      <path d="M30 60h160" stroke="var(--th-hero-line, #1f2d42)" />
      <text x="46" y="84" fontSize="11" fill="var(--th-node-1, #5eead4)">user@lab:~$</text>
      <rect x="128" y="75" width="44" height="5" rx="2.5" fill="var(--th-node-1, #5eead4)" opacity="0.75" />
      <rect x="46" y="96" width="84" height="5" rx="2.5" fill="#334155" />
      <rect x="46" y="110" width="58" height="5" rx="2.5" fill="#334155" />
      <rect x="46" y="124" width="70" height="5" rx="2.5" fill="#334155" />
      <rect x="122" y="121" width="5" height="10" rx="1" fill="var(--th-accent, #0d9488)" />
      <rect x="176" y="46" width="116" height="128" rx="14" fill="var(--card, #fff)" stroke="var(--line-strong, rgba(15,23,42,0.14))" />
      <circle cx="192" cy="66" r="4" fill="var(--th-accent, #0d9488)" />
      <text x="202" y="70" fontSize="10" fill="var(--ink-3, #64748b)">alerts</text>
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="188" y={y} width="92" height="18" rx="6" fill={i === 2 ? 'var(--th-soft-2, #ccfbf1)' : 'var(--bg-tint, #f1f5f9)'} />
          {i === 2 && <rect x="188" y={y} width="3" height="18" rx="1.5" fill="var(--th-accent, #0d9488)" />}
          <circle cx="200" cy={y + 9} r="3.5" fill={i === 2 ? 'var(--th-accent, #0d9488)' : '#cbd5e1'} />
          <rect x="210" y={y + 6.5} width="52" height="5" rx="2.5" fill={i === 2 ? 'var(--th-accent, #0d9488)' : '#cbd5e1'} opacity={i === 2 ? 0.55 : 1} />
        </g>
      ))}
    </>
  );
}

/* ux — grey wireframe → polished layout, arrow between, one amber accent dot. */
function UxVisual() {
  return (
    <>
      <rect x="30" y="36" width="112" height="128" rx="14" fill="var(--bg-soft, #f8fafc)" stroke="#cbd5e1" strokeDasharray="5 4" />
      <rect x="42" y="50" width="88" height="14" rx="4" fill="#e2e8f0" />
      <rect x="42" y="72" width="52" height="46" rx="4" fill="#e2e8f0" opacity="0.7" />
      <rect x="100" y="72" width="30" height="46" rx="4" fill="#e2e8f0" opacity="0.7" />
      <rect x="42" y="128" width="76" height="6" rx="3" fill="#e2e8f0" />
      <rect x="42" y="140" width="54" height="6" rx="3" fill="#e2e8f0" />
      <rect x="42" y="152" width="66" height="6" rx="3" fill="#e2e8f0" />
      <path d="M148 100h18M166 94l6 6-6 6" stroke="var(--ink-4, #94a3b8)" />
      <rect x="180" y="36" width="112" height="128" rx="14" fill="var(--card, #fff)" stroke="var(--th-hero-line, #fde9c8)" />
      <rect x="192" y="50" width="88" height="14" rx="7" fill="var(--th-soft-2, #fef3c7)" />
      <circle cx="201" cy="57" r="4" fill="var(--th-accent, #d97706)" />
      <rect x="192" y="72" width="52" height="46" rx="10" fill="var(--th-soft, #fffbeb)" stroke="var(--th-soft-2, #fef3c7)" />
      <rect x="250" y="72" width="30" height="46" rx="10" fill="var(--th-soft, #fffbeb)" stroke="var(--th-soft-2, #fef3c7)" />
      <rect x="192" y="128" width="76" height="6" rx="3" fill="var(--th-soft-2, #fef3c7)" />
      <rect x="192" y="140" width="54" height="6" rx="3" fill="var(--th-soft-2, #fef3c7)" opacity="0.75" />
      <rect x="192" y="152" width="66" height="6" rx="3" fill="var(--th-soft-2, #fef3c7)" opacity="0.75" />
    </>
  );
}

export function ProjectThumb({ kind, className }: { kind: ProjectThumbKind; className?: string }): JSX.Element {
  return (
    <svg
      className={cls('thumb', className)}
      viewBox="0 0 120 84"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'notebook' && <ThumbNotebook />}
      {kind === 'chart' && <ThumbChart />}
      {kind === 'dashboard' && <ThumbDashboard />}
      {kind === 'terminal' && <ThumbTerminal />}
      {kind === 'siem' && <ThumbSiem />}
      {kind === 'wireframe' && <ThumbWireframe />}
      {kind === 'prototype' && <ThumbPrototype />}
    </svg>
  );
}

const CARD = 'var(--card, #fff)';
const HAIR = 'var(--line, rgba(15,23,42,0.08))';
const HAIR_STRONG = 'var(--line-strong, rgba(15,23,42,0.14))';

function ThumbNotebook() {
  const cells = [
    { y: 18, w: 44 },
    { y: 37, w: 52, accent: true },
    { y: 56, w: 36 },
  ];
  return (
    <>
      <rect x="10" y="10" width="100" height="64" rx="10" fill={CARD} stroke={HAIR_STRONG} />
      {cells.map((c) => (
        <g key={c.y}>
          <rect x="18" y={c.y} width="84" height="14" rx="5" fill={c.accent ? 'var(--th-soft, #eff6ff)' : 'var(--bg-soft, #f8fafc)'} stroke={HAIR} />
          <rect x="24" y={c.y + 5} width={c.w} height="4" rx="2" fill={c.accent ? 'var(--th-node-2, #3b82f6)' : 'var(--ink-4, #94a3b8)'} opacity={c.accent ? 0.8 : 0.75} />
        </g>
      ))}
    </>
  );
}

function ThumbChart() {
  const pts = [
    [34, 44],
    [52, 34],
    [70, 40],
    [88, 26],
  ];
  return (
    <>
      <path d="M18 40h86M18 54h86" stroke="var(--bg-tint, #f1f5f9)" />
      <path d="M18 16v52h86" stroke="var(--ink-4, #94a3b8)" strokeOpacity="0.7" />
      <rect x="28" y="50" width="12" height="18" rx="3" fill="#e2e8f0" />
      <rect x="46" y="40" width="12" height="28" rx="3" fill="#e2e8f0" />
      <rect x="64" y="46" width="12" height="22" rx="3" fill="#e2e8f0" />
      <rect x="82" y="32" width="12" height="36" rx="3" fill="#cbd5e1" />
      <path d="M34 44L52 34 70 40 88 26" stroke="var(--th-accent, #2563eb)" />
      {pts.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.5" fill="var(--th-accent, #2563eb)" />
      ))}
    </>
  );
}

function ThumbDashboard() {
  return (
    <>
      <rect x="10" y="10" width="100" height="64" rx="10" fill={CARD} stroke={HAIR_STRONG} />
      <rect x="18" y="18" width="56" height="28" rx="6" fill="var(--bg-soft, #f8fafc)" stroke={HAIR} />
      <path d="M24 40L32 34 40 38 48 28 56 32 64 26" stroke="var(--ink-4, #94a3b8)" strokeOpacity="0.7" />
      <rect x="80" y="18" width="22" height="28" rx="6" fill="var(--th-soft, #eff6ff)" stroke={HAIR} />
      <rect x="85" y="32" width="3" height="8" rx="1.5" fill="var(--th-accent, #2563eb)" />
      <rect x="90" y="28" width="3" height="12" rx="1.5" fill="var(--th-accent, #2563eb)" opacity="0.75" />
      <rect x="95" y="24" width="3" height="16" rx="1.5" fill="var(--th-accent, #2563eb)" opacity="0.55" />
      <rect x="18" y="52" width="22" height="14" rx="5" fill="var(--bg-soft, #f8fafc)" stroke={HAIR} />
      <rect x="46" y="52" width="56" height="14" rx="5" fill="var(--bg-soft, #f8fafc)" stroke={HAIR} />
      <rect x="23" y="57" width="12" height="4" rx="2" fill="#cbd5e1" />
      <rect x="51" y="57" width="30" height="4" rx="2" fill="#cbd5e1" />
    </>
  );
}

function ThumbTerminal() {
  return (
    <>
      <rect x="10" y="12" width="100" height="60" rx="10" fill="var(--th-dark-bg, #0f172a)" />
      <circle cx="22" cy="22" r="2.5" fill="var(--th-node-1, #5eead4)" />
      <circle cx="30" cy="22" r="2.5" fill="#475569" />
      <circle cx="38" cy="22" r="2.5" fill="#475569" />
      <path d="M10 30h100" stroke="#1f2d42" />
      <path d="M20 42l5 4.5-5 4.5" stroke="var(--th-node-1, #5eead4)" />
      <rect x="31" y="44.5" width="38" height="4" rx="2" fill="#334155" />
      <rect x="73" y="41.5" width="4" height="10" rx="1" fill="var(--th-node-2, #2dd4bf)" />
      <rect x="20" y="58" width="26" height="4" rx="2" fill="#334155" />
    </>
  );
}

function ThumbSiem() {
  const rows = [18, 32, 46, 60];
  return (
    <>
      <rect x="10" y="10" width="100" height="64" rx="10" fill={CARD} stroke={HAIR_STRONG} />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="18" y={y} width="84" height="12" rx="4" fill={i === 1 ? 'var(--th-soft-2, #ccfbf1)' : 'var(--bg-soft, #f8fafc)'} />
          {i === 1 && <rect x="18" y={y} width="3" height="12" rx="1.5" fill="var(--th-accent, #0d9488)" />}
          <circle cx="27" cy={y + 6} r="2.5" fill={i === 1 ? 'var(--th-accent, #0d9488)' : '#cbd5e1'} />
          <rect x="35" y={y + 4} width="46" height="4" rx="2" fill={i === 1 ? 'var(--th-accent, #0d9488)' : '#cbd5e1'} opacity={i === 1 ? 0.5 : 1} />
          <rect x="86" y={y + 4} width="10" height="4" rx="2" fill={i === 1 ? 'var(--th-accent, #0d9488)' : '#e2e8f0'} opacity={i === 1 ? 0.3 : 1} />
        </g>
      ))}
    </>
  );
}

function ThumbWireframe() {
  return (
    <>
      <rect x="12" y="12" width="96" height="60" rx="8" stroke="#cbd5e1" strokeDasharray="4 4" />
      <rect x="20" y="20" width="80" height="10" rx="3" fill="#e2e8f0" />
      <rect x="20" y="36" width="34" height="28" rx="4" fill="#f1f5f9" stroke="#e2e8f0" />
      <path d="M25 60l8-10 6 5 6-4 6 8" stroke="#cbd5e1" />
      <rect x="62" y="36" width="38" height="28" rx="4" stroke="#cbd5e1" strokeDasharray="4 3" />
      <path d="M64 38l34 24M98 38L64 62" stroke="#cbd5e1" strokeOpacity="0.8" />
    </>
  );
}

function ThumbPrototype() {
  return (
    <>
      <rect x="42" y="8" width="36" height="68" rx="9" fill={CARD} stroke="var(--ink-4, #94a3b8)" />
      <rect x="53" y="12" width="14" height="3" rx="1.5" fill="#e2e8f0" />
      <rect x="48" y="20" width="24" height="6" rx="3" fill="#e2e8f0" />
      <rect x="48" y="30" width="24" height="14" rx="4" fill="var(--th-soft, #eff6ff)" />
      <rect x="48" y="48" width="11" height="10" rx="3" fill="#f1f5f9" />
      <rect x="61" y="48" width="11" height="10" rx="3" fill="#f1f5f9" />
      <circle cx="72" cy="64" r="5" fill="var(--th-accent, #2563eb)" />
      <path d="M72 61.5v5M69.5 64h5" stroke="#fff" strokeWidth="1.2" />
      <rect x="54" y="70" width="12" height="2" rx="1" fill="#e2e8f0" />
    </>
  );
}
