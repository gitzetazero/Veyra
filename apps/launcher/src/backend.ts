// SPDX-License-Identifier: GPL-3.0-only
// Calls into the Rust side. In a plain browser (UI preview), returns preview data instead.
import { invoke, isTauri } from '@tauri-apps/api/core';

export interface AppInfo {
  version: string;
  os: string;
  arch: string;
}

export async function getAppInfo(): Promise<AppInfo> {
  if (!isTauri()) return { version: '0.1.0', os: 'preview', arch: 'browser' };
  return invoke<AppInfo>('app_info');
}
