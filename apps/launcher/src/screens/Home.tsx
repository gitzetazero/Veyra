// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { INSTANCES, NEWS } from '../data';
import { ChevronIcon } from '../icons';

export function Home() {
  const [instanceId, setInstanceId] = useState(INSTANCES[0]?.id ?? '');
  const [notice, setNotice] = useState<string | null>(null);
  const instance = INSTANCES.find((i) => i.id === instanceId);

  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-facets" aria-hidden />
        <h1 id="hero-title" className="wordmark">
          VEYRA
        </h1>
        <p className="hero-version">{instance?.version}</p>

        <div className="play-row">
          <button
            className="play"
            onClick={() => setNotice('Installing Minecraft is not built yet. This is the first version of the launcher.')}
          >
            <span className="play-label">Play</span>
          </button>

          <label className="instance-picker">
            <span className="visually-hidden">Instance</span>
            <select value={instanceId} onChange={(e) => setInstanceId(e.target.value)}>
              {INSTANCES.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                  {i.mode === 'custom' ? ' (Custom)' : ''}
                </option>
              ))}
            </select>
            <ChevronIcon className="instance-chevron" />
          </label>
        </div>

        <p className="play-status" role="status">
          {notice ?? 'Not installed yet. The first launch downloads Minecraft and Java.'}
        </p>
      </section>

      <section className="news" aria-labelledby="news-title">
        <h2 id="news-title" className="section-title">
          News
        </h2>
        <ul className="news-list">
          {NEWS.map((n) => (
            <li key={n.title} className="news-item">
              <time className="news-date">{n.date}</time>
              <h3 className="news-title">{n.title}</h3>
              <p className="news-body">{n.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
