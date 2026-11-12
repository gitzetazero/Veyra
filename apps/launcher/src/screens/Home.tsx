// SPDX-License-Identifier: GPL-3.0-only
import { NEWS_KEYS, type Instance } from '../data';
import { useI18n } from '../i18n';
import { describeInstance } from './describe';

export function Home({ instance }: { instance: Instance }) {
  const { t, language } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(language.replace('_', '-'), { dateStyle: 'medium' });

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="wordmark">
          {instance.name}
        </h1>
        <p className="hero-version">{describeInstance(instance, t)}</p>
      </section>

      <section aria-labelledby="news-title">
        <h2 id="news-title" className="visually-hidden">
          {t('home.news')}
        </h2>
        <ul className="news-list">
          {NEWS_KEYS.map((n) => (
            <li key={n.title} className="news-item glass">
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
