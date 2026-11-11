// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { NEWS_KEYS, type Instance } from '../data';
import { useI18n } from '../i18n';
import { ChevronIcon } from '../icons';
import { describeInstance } from './describe';

interface Props {
  instance: Instance;
  instances: Instance[];
  onSelect: (id: string) => void;
}

export function Home({ instance, instances, onSelect }: Props) {
  const { t, language } = useI18n();
  const [notice, setNotice] = useState<string | null>(null);
  const dateFormat = new Intl.DateTimeFormat(language.replace('_', '-'), { dateStyle: 'medium' });

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-facets" aria-hidden />
        <h1 id="hero-title" className="wordmark">
          {instance.name}
        </h1>
        <p className="hero-version">{describeInstance(instance, t)}</p>

        <div className="play-row">
          <button className="play" onClick={() => setNotice(t('home.playNotBuilt'))}>
            <span className="play-label">{t('home.play')}</span>
          </button>

          <label className="instance-picker">
            <span className="visually-hidden">{t('nav.instances')}</span>
            <select value={instance.id} onChange={(e) => onSelect(e.target.value)}>
              {instances.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name} ({i.kind === 'official' ? t('instance.official') : t('instance.custom')})
                </option>
              ))}
            </select>
            <ChevronIcon className="instance-chevron" />
          </label>
        </div>

        <p className="play-status" role="status">
          {notice ?? t('home.notInstalled')}
        </p>
      </section>

      <section className="news" aria-labelledby="news-title">
        <h2 id="news-title" className="section-title">
          {t('home.news')}
        </h2>
        <ul className="news-list">
          {NEWS_KEYS.map((n) => (
            <li key={n.title} className="news-item">
              <time className="news-date" dateTime={n.date}>
                {dateFormat.format(new Date(n.date))}
              </time>
              <h3 className="news-title">{t(n.title)}</h3>
              <p className="news-body">{t(n.body)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
