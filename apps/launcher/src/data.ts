// SPDX-License-Identifier: GPL-3.0-only
// Preview data until instances and news come from the Rust core.

export interface Instance {
  id: string;
  name: string;
  version: string;
  mode: 'official' | 'custom';
  lastPlayed: string | null;
}

export const INSTANCES: Instance[] = [
  { id: 'veyra-26-3', name: 'VEYRA 26.3', version: 'Minecraft 26.3 with Fabric', mode: 'official', lastPlayed: null },
  { id: 'my-modpack', name: 'My modpack', version: 'Minecraft 26.3 with Fabric', mode: 'custom', lastPlayed: null },
];

export interface NewsItem {
  date: string;
  title: string;
  body: string;
}

export const NEWS: NewsItem[] = [
  {
    date: '11 Nov 2026',
    title: 'First look at the launcher',
    body: 'The VEYRA launcher has its first screens. Installing and playing come next.',
  },
  {
    date: '11 Nov 2026',
    title: 'Built for Minecraft 26.3',
    body: 'VEYRA targets the current release with Fabric and Java 25.',
  },
  {
    date: '11 Nov 2026',
    title: 'Open source from the first line',
    body: 'Every part of the launcher and the client is public on GitHub.',
  },
];
