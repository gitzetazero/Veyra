// SPDX-License-Identifier: GPL-3.0-only
// Preview data until instances and versions come from the Rust core.

export type Loader = 'veyra' | 'fabric' | 'vanilla';

export interface Instance {
  id: string;
  name: string;
  kind: 'official' | 'custom';
  loader: Loader;
  mcVersion: string;
}

/** The official instance: always first, cannot be deleted, can be reset. */
export const OFFICIAL_ID = 'veyra';

/**
 * Minecraft versions the official VEYRA instance offers (1.20 and newer; Fabric runs underneath but is never shown).
 * Preview list: the real one comes from the signed release manifest, one entry per published client build.
 */
export const VEYRA_VERSIONS = ['26.3', '26.2', '26.1.2', '1.21.11', '1.21.8', '1.21.4', '1.21.1', '1.20.6', '1.20.4', '1.20.1'];

/** Versions offered for vanilla/Fabric instances. Will come from Mojang's version manifest. */
export const MINECRAFT_VERSIONS = ['26.3', '26.2', '26.1.2', '1.21.11', '1.21.8', '1.20.1', '1.8.9'];

export const INITIAL_INSTANCES: Instance[] = [
  { id: OFFICIAL_ID, name: 'VEYRA', kind: 'official', loader: 'veyra', mcVersion: '26.3' },
  { id: 'my-modpack', name: 'My modpack', kind: 'custom', loader: 'fabric', mcVersion: '26.3' },
];

export type ModpackFormat = 'Modrinth' | 'CurseForge' | 'Prism Launcher / MultiMC' | 'ATLauncher';

/**
 * Best guess from the file name alone. `.mrpack` is unambiguous; the `.zip` formats are told apart by their
 * contents (manifest.json, instance.cfg, instance.json), which the Rust importer will read.
 */
export function guessModpackFormat(fileName: string): ModpackFormat | 'zip' | null {
  const name = fileName.toLowerCase();
  if (name.endsWith('.mrpack')) return 'Modrinth';
  if (name.endsWith('.zip')) return 'zip';
  return null;
}

export const NEWS_KEYS = [
  { date: '2026-11-11', title: 'news.1.title', body: 'news.1.body' },
  { date: '2026-11-11', title: 'news.2.title', body: 'news.2.body' },
  { date: '2026-11-11', title: 'news.3.title', body: 'news.3.body' },
] as const;
