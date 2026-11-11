// SPDX-License-Identifier: GPL-3.0-only
import type { SVGProps } from 'react';

const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 11.5 12 5l8 6.5" /><path d="M6.5 10v9h11v-9" /></svg>
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

export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" /></svg>
);
export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={12} height={12} strokeWidth={2.2} {...p}><path d="M12 17v4M8 3h8l-1 6 3 4H6l3-4z" /></svg>
);
