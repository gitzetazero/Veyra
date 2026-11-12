// SPDX-License-Identifier: GPL-3.0-only
// Original VEYRA artwork: a blocky landscape at sunset, generated once as SVG. No game assets.
// Composition: tall cliffs on both sides frame a low centre (a "V"), leaving room for the title and Play.

const W = 1600;
const H = 900;

/** Deterministic pseudo-random number in [0, 1) for an integer seed. */
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface Block {
  x: number;
  y: number;
  s: number;
  fill: string;
  opacity?: number;
}

/** A row of terrain columns whose top follows `top(x)`, coloured grass on top and dirt below. */
function terrain(size: number, top: (x: number) => number, grass: string, dirt: [string, string], seed: number): Block[] {
  const blocks: Block[] = [];
  for (let i = 0; i * size < W; i++) {
    const x = i * size;
    const y0 = Math.round(top(x + size / 2) / size) * size;
    for (let y = y0, row = 0; y < H; y += size, row++) {
      const fill = row === 0 ? grass : rand(seed + i * 31 + row) > 0.5 ? dirt[0] : dirt[1];
      blocks.push({ x, y, s: size, fill });
    }
  }
  return blocks;
}

/** A blocky tree whose trunk starts at (x, ground). */
function tree(x: number, ground: number, s: number, leaves: [string, string], seed: number): Block[] {
  const blocks: Block[] = [];
  const height = 3 + Math.floor(rand(seed) * 2);
  for (let k = 1; k <= height; k++) blocks.push({ x, y: ground - k * s, s, fill: '#5b3826' });
  const top = ground - height * s;
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -3; dy <= 0; dy++) {
      const corner = Math.abs(dx) === 2 && (dy === -3 || dy === 0);
      if (corner || rand(seed + dx * 7 + dy * 13) > 0.92) continue;
      blocks.push({ x: x + dx * s, y: top + dy * s, s, fill: rand(seed + dx + dy * 5) > 0.35 ? leaves[0] : leaves[1] });
    }
  }
  return blocks;
}

// Distance from the centre, 0 in the middle and 1 at the edges: drives the "V" framing.
const edge = (x: number) => Math.abs(x - W / 2) / (W / 2);

const far = terrain(40, (x) => 470 - 70 * edge(x) + 25 * Math.sin(x / 90), '#b4566a', ['#8e3f58', '#843a52'], 1);

const midTop = (x: number) => 610 - 230 * edge(x) ** 1.6 + 18 * Math.sin(x / 55);
const mid = terrain(32, midTop, '#8fbf55', ['#9a643f', '#8a5636'], 2);
const trees = [180, 330, 1250, 1420, 470, 1110].flatMap((x, n) => {
  const ground = Math.round(midTop(x + 16) / 32) * 32;
  return tree(x, ground, 32, n % 2 ? ['#ff9fbf', '#ff7fa6'] : ['#ffb35a', '#ff9a3d'], 100 + n * 17);
});

const nearTop = (x: number) => 860 - 520 * edge(x) ** 2.4;
const near = terrain(56, nearTop, '#4d6e33', ['#3b2418', '#33201a'], 3).filter((b) => edge(b.x + 28) > 0.42);

const clouds: Block[] = [
  { cx: 260, cy: 150, n: 5 },
  { cx: 1180, cy: 110, n: 6 },
  { cx: 880, cy: 210, n: 4 },
].flatMap(({ cx, cy, n }, c) =>
  // Stepped silhouette: a narrower top row sitting on a wider base row.
  [
    ...Array.from({ length: n - 2 }, (_, k) => ({ x: cx + (k + 1) * 24, y: cy, s: 24 })),
    ...Array.from({ length: n }, (_, k) => ({ x: cx + k * 24, y: cy + 24, s: 24 })),
  ].map((b) => ({ ...b, fill: '#ffd8bd', opacity: 0.8 - c * 0.12 })),
);

function rects(blocks: Block[]) {
  return blocks.map((b, i) => (
    <rect key={i} x={b.x} y={b.y} width={b.s + 0.5} height={b.s + 0.5} fill={b.fill} opacity={b.opacity} />
  ));
}

export function Backdrop() {
  return (
    <svg className="backdrop" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1a3d" />
          <stop offset="0.38" stopColor="#7a2f55" />
          <stop offset="0.6" stopColor="#e2603f" />
          <stop offset="0.72" stopColor="#ffb04a" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe2a0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffb04a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f09a52" />
          <stop offset="1" stopColor="#5b3a6a" />
        </linearGradient>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14110f" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#14110f" stopOpacity="0" />
          <stop offset="0.6" stopColor="#14110f" stopOpacity="0" />
          <stop offset="1" stopColor="#14110f" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />
      <circle cx={800} cy={430} r={260} fill="url(#glow)" />
      <rect x={740} y={370} width={120} height={120} fill="#ffe9b0" />
      {rects(clouds)}
      <g opacity={0.75}>{rects(far)}</g>
      <rect x={0} y={590} width={W} height={120} fill="url(#water)" />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={760 - k * 18} y={600 + k * 22} width={80 + k * 36} height={6} fill="#ffe2a0" opacity={0.55 - k * 0.1} />
      ))}
      {rects(mid)}
      {rects(trees)}
      {rects(near)}
      <rect width={W} height={H} fill="url(#shade)" />
    </svg>
  );
}
