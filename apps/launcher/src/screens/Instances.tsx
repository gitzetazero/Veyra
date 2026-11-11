// SPDX-License-Identifier: GPL-3.0-only
import { INSTANCES } from '../data';

export function Instances() {
  return (
    <div className="page">
      <div className="page-head">
        <h1 className="page-title">Instances</h1>
        <button className="btn" disabled title="Creating instances is not built yet">
          New instance
        </button>
      </div>
      <p className="page-intro">
        Official instances run the files VEYRA publishes. Custom instances can run any mods and are labelled Custom.
      </p>

      <ul className="instance-list">
        {INSTANCES.map((i) => (
          <li key={i.id} className="instance-row">
            <div className="instance-icon" aria-hidden>
              {i.name.charAt(0)}
            </div>
            <div className="instance-info">
              <span className="instance-name">{i.name}</span>
              <span className="instance-meta">{i.version}</span>
            </div>
            <span className={`badge badge-${i.mode}`}>{i.mode === 'official' ? 'Official' : 'Custom'}</span>
            <span className="instance-played">{i.lastPlayed ?? 'Never played'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
