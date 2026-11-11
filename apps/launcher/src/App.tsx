// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { HomeIcon, InstancesIcon, SettingsIcon, VeyraMark } from './icons';
import { Home } from './screens/Home';
import { Instances } from './screens/Instances';
import { Settings } from './screens/Settings';

type Screen = 'home' | 'instances' | 'settings';

const NAV: { id: Screen; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'instances', label: 'Instances', Icon: InstancesIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
];

export function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="shell">
      <nav className="rail" aria-label="Main">
        <div className="rail-mark" title="VEYRA">
          <VeyraMark />
        </div>
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="rail-item"
            aria-current={screen === id ? 'page' : undefined}
            onClick={() => setScreen(id)}
            title={label}
          >
            <Icon />
            <span className="visually-hidden">{label}</span>
          </button>
        ))}
      </nav>

      <div className="stage">
        <header className="topbar">
          <div className="account" aria-label="Account">
            <span className="avatar" aria-hidden />
            <span className="account-text">
              <span className="account-name">Not signed in</span>
              <span className="account-hint">Sign in to play online</span>
            </span>
            <button className="btn-quiet" disabled title="Microsoft sign-in is not available yet">
              Sign in with Microsoft
            </button>
          </div>
        </header>

        <main className="content">
          {screen === 'home' && <Home />}
          {screen === 'instances' && <Instances />}
          {screen === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
