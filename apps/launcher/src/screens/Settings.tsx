// SPDX-License-Identifier: GPL-3.0-only
import { useEffect, useMemo, useState } from 'react';
import { getAppInfo, type AppInfo } from '../backend';
import { useI18n } from '../i18n';
import { MINECRAFT_LANGUAGES } from '../i18n/languages';

export function Settings() {
  const { t, language, setLanguage } = useI18n();
  const [memoryGb, setMemoryGb] = useState(4);
  const [hideWhilePlaying, setHideWhilePlaying] = useState(true);
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    getAppInfo().then(setInfo, () => setInfo(null));
  }, []);

  // Sorted by native name; the region tells apart variants such as Español (España) and Español (México).
  const languages = useMemo(
    () => [...MINECRAFT_LANGUAGES].sort((a, b) => a.name.localeCompare(b.name) || a.region.localeCompare(b.region)),
    [],
  );

  return (
    <div className="page">
      <h1 className="page-title">{t('settings.title')}</h1>
      <p className="page-intro">{t('settings.intro')}</p>

      <div className="settings">
        <div className="setting">
          <label htmlFor="language" className="setting-label">
            {t('settings.language')}
          </label>
          <div className="setting-control">
            <select id="language" className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((l) => (
                <option key={l.code} value={l.code} dir={l.rtl ? 'rtl' : 'ltr'}>
                  {l.name} ({l.region})
                </option>
              ))}
            </select>
          </div>
          <p className="setting-help">{t('settings.languageHelp')}</p>
        </div>

        <div className="setting">
          <label htmlFor="memory" className="setting-label">
            {t('settings.memory')}
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
          <p className="setting-help">{t('settings.memoryHelp')}</p>
        </div>

        <div className="setting">
          <div className="setting-row">
            <label htmlFor="hide" className="setting-label">
              {t('settings.hide')}
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
          <p className="setting-help">{t('settings.hideHelp')}</p>
        </div>

        <div className="setting">
          <span className="setting-label">{t('settings.about')}</span>
          <p className="setting-help">
            {t('settings.aboutText', {
              version: info?.version ?? '…',
              platform: info ? `${info.os} (${info.arch})` : '…',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
