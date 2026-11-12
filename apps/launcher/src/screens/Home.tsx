// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { NEWS_KEYS, VEYRA_VERSIONS, type Instance } from '../data';
import { useI18n } from '../i18n';
import { ChevronIcon, VeyraMark } from '../icons';
import { describeInstance } from './describe';

interface Props {
  instance: Instance;
  onChange: (instance: Instance) => void;
  onShowNews: () => void;
}

export function Home({ instance, onChange, onShowNews }: Props) {
  const { t } = useI18n();
  const [notice, setNotice] = useState<string | null>(null);
  const official = instance.kind === 'official';
  const versions = official ? VEYRA_VERSIONS : [instance.mcVersion];

  return (
    <section className="play-screen" aria-labelledby="hero-title">
      <h1 id="hero-title" className="wordmark">
        {instance.name}
      </h1>
      <p className="wordmark-sub">{official ? t('home.client') : describeInstance(instance, t)}</p>

      <div className="play-row">
        <label className="version-picker">
          <span className="version-icon" aria-hidden>
            <VeyraMark width={22} height={22} />
          </span>
          <span className="version-text">
            <span className="version-label">{t('instance.version')}</span>
            <select
              value={instance.mcVersion}
              disabled={!official}
              onChange={(e) => onChange({ ...instance, mcVersion: e.target.value })}
            >
              {versions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </span>
          {official && <ChevronIcon className="version-chevron" />}
        </label>

        <button className="play" onClick={() => setNotice(t('home.playNotBuilt'))}>
          {t('home.play')}
        </button>
      </div>

      <p className="play-status" role="status">
        {notice ?? t('home.notInstalled')}
      </p>

      <button className="news-link" onClick={onShowNews}>
        {t('home.news')}
        <ChevronIcon />
      </button>
    </section>
  );
}

export function News() {
  const { t, language } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(language.replace('_', '-'), { dateStyle: 'medium' });

  return (
    <div className="page page-wide">
      <h1 className="page-title">{t('home.news')}</h1>
      <ul className="news-list">
        {NEWS_KEYS.map((n) => (
          <li key={n.title} className="news-item glass">
            <time className="news-date" dateTime={n.date}>
              {dateFormat.format(new Date(n.date))}
            </time>
            <h2 className="news-title">{t(n.title)}</h2>
            <p className="news-body">{t(n.body)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
