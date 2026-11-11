// SPDX-License-Identifier: GPL-3.0-only
import { useEffect, useState } from 'react';
import { getAppInfo, type AppInfo } from '../backend';

export function Settings() {
  const [memoryGb, setMemoryGb] = useState(4);
  const [hideWhilePlaying, setHideWhilePlaying] = useState(true);
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    getAppInfo().then(setInfo, () => setInfo(null));
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Settings</h1>
      <p className="page-intro">Changes are not saved yet; saving arrives with the launcher core.</p>

      <div className="settings">
        <div className="setting">
          <label htmlFor="memory" className="setting-label">
            Memory for Minecraft
          </label>
          <div className="setting-control">
            <input
              id="memory"
              type="range"
              min={2}
              max={16}
              step={1}
              value={memoryGb}
              onChange={(e) => setMemoryGb(Number(e.target.value))}
              aria-valuetext={`${memoryGb} GB`}
            />
            <output htmlFor="memory" className="setting-value">
              {memoryGb} GB
            </output>
          </div>
          <p className="setting-help">4 GB is enough for most players. More only helps with large modpacks.</p>
        </div>

        <div className="setting">
          <div className="setting-row">
            <label htmlFor="hide" className="setting-label">
              Hide VEYRA while playing
            </label>
            <input
              id="hide"
              type="checkbox"
              role="switch"
              className="switch"
              checked={hideWhilePlaying}
              onChange={(e) => setHideWhilePlaying(e.target.checked)}
            />
          </div>
          <p className="setting-help">The launcher comes back when the game closes, so it can show crash reports.</p>
        </div>

        <div className="setting">
          <span className="setting-label">About</span>
          <p className="setting-help">
            VEYRA {info?.version ?? '…'} on {info ? `${info.os} (${info.arch})` : '…'}. Open source under GPL-3.0-only.
          </p>
        </div>
      </div>
    </div>
  );
}
