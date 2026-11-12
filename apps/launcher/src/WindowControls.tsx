// SPDX-License-Identifier: GPL-3.0-only
// The window has no system frame (tauri.conf.json `decorations: false`), so the launcher draws these itself.
import { isTauri } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useI18n } from './i18n';
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from './icons';

export function WindowControls() {
  const { t } = useI18n();
  const [maximized, setMaximized] = useState(false);
  const native = isTauri();

  useEffect(() => {
    if (!native) return;
    const window = getCurrentWindow();
    const refresh = () => void window.isMaximized().then(setMaximized, () => undefined);
    refresh();
    const unlisten = window.onResized(refresh);
    return () => void unlisten.then((stop) => stop());
  }, [native]);

  // In a plain browser (UI preview) the buttons render but have no window to act on.
  const act = (action: 'minimize' | 'toggleMaximize' | 'close') => () => {
    if (native) void getCurrentWindow()[action]();
  };

  return (
    <div className="window-controls">
      <button className="window-button" onClick={act('minimize')} aria-label={t('window.minimize')}>
        <MinimizeIcon />
      </button>
      <button
        className="window-button"
        onClick={act('toggleMaximize')}
        aria-label={maximized ? t('window.restore') : t('window.maximize')}
      >
        {maximized ? <RestoreIcon /> : <MaximizeIcon />}
      </button>
      <button className="window-button window-close" onClick={act('close')} aria-label={t('window.close')}>
        <CloseIcon />
      </button>
    </div>
  );
}
