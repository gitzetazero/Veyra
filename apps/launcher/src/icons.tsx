// SPDX-License-Identifier: GPL-3.0-only
import type { SVGProps } from 'react';

const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 11.5 12 5l8 6.5" /><path d="M6.5 10v9h11v-9" /></svg>
);
export const InstancesIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m12 3 8 4.5-8 4.5-8-4.5z" /><path d="m4 12 8 4.5 8-4.5" /><path d="m4 16.5 8 4.5 8-4.5" /></svg>
);
export const SettingsIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></svg>
);
export const ChevronIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={16} height={16} {...p}><path d="m6 9 6 6 6-6" /></svg>
);

/** VEYRA mark: a cut amethyst crystal forming a V. Placeholder until the owner picks a logo. */
export const VeyraMark = (p: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={30} viewBox="0 0 32 32" aria-hidden {...p}>
    <path d="M4 6h8l4 15 4-15h8L18 28h-4z" fill="#A47CFF" />
    <path d="M12 6l4 15V6z" fill="#C9B2FF" />
    <path d="M20 6l-4 15 6-15z" fill="#7C55E0" />
  </svg>
);
