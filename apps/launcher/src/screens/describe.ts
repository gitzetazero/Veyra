// SPDX-License-Identifier: GPL-3.0-only
import type { Instance } from '../data';
import type { useI18n } from '../i18n';

type T = ReturnType<typeof useI18n>['t'];

/** One-line description. The official instance never mentions its loader: VEYRA is just "Minecraft <version>". */
export function describeInstance(instance: Instance, t: T): string {
  const version = instance.mcVersion;
  if (instance.loader === 'fabric') return t('instance.withLoader.fabric', { version });
  return t('instance.withLoader.vanilla', { version });
}
