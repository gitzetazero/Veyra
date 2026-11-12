// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { INITIAL_INSTANCES, OFFICIAL_ID, VEYRA_VERSIONS, type Instance } from './data';
import { I18nProvider, useI18n } from './i18n';
import { ChevronIcon, UserIcon, VeyraMark } from './icons';
import { Account } from './screens/Account';
import { CreateInstance } from './screens/CreateInstance';
import { Home } from './screens/Home';
import { InstanceView } from './screens/InstanceView';
import { Instances } from './screens/Instances';
import { Settings } from './screens/Settings';

type Screen = 'home' | 'instances' | 'instance' | 'create' | 'settings' | 'account';

export function App() {
  return (
    <I18nProvider>
      <Launcher />
    </I18nProvider>
  );
}

function Launcher() {
  const { t } = useI18n();
  const [instances, setInstances] = useState<Instance[]>(INITIAL_INSTANCES);
  const [selectedId, setSelectedId] = useState(OFFICIAL_ID);
  const [screen, setScreen] = useState<Screen>('home');
  const [notice, setNotice] = useState<string | null>(null);

  const selected = instances.find((i) => i.id === selectedId) ?? instances[0];
  if (!selected) return null;

  const updateInstance = (next: Instance) => setInstances((list) => list.map((i) => (i.id === next.id ? next : i)));

  const openInstance = (id: string) => {
    setSelectedId(id);
    setScreen('instance');
  };

  const deleteInstance = (id: string) => {
    if (id === OFFICIAL_ID) return; // The official instance can never be removed.
    setInstances((list) => list.filter((i) => i.id !== id));
    setSelectedId(OFFICIAL_ID);
    setScreen('instances');
  };

  const tabs: { id: Screen; label: string; active: boolean }[] = [
    { id: 'home', label: t('nav.home'), active: screen === 'home' },
    { id: 'instances', label: t('nav.instances'), active: ['instances', 'instance', 'create'].includes(screen) },
    { id: 'settings', label: t('nav.settings'), active: screen === 'settings' },
  ];

  return (
    <div className="app">
      <div className="backdrop" aria-hidden />

      <header className="topbar">
        <VeyraMark className="topbar-mark" />
        <nav className="tabs" aria-label="VEYRA">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab"
              aria-current={tab.active ? 'page' : undefined}
              onClick={() => setScreen(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          className="account-button"
          aria-current={screen === 'account' ? 'page' : undefined}
          onClick={() => setScreen('account')}
        >
          <span className="account-avatar" aria-hidden>
            <UserIcon width={16} height={16} />
          </span>
          {t('account.signedOut')}
        </button>
      </header>

      <main className="content">
        {screen === 'home' && <Home instance={selected} />}
        {screen === 'instances' && (
          <Instances instances={instances} onOpen={openInstance} onCreate={() => setScreen('create')} />
        )}
        {screen === 'instance' && (
          <InstanceView key={selected.id} instance={selected} onChange={updateInstance} onDelete={deleteInstance} />
        )}
        {screen === 'create' && (
          <CreateInstance
            onCreate={(instance) => {
              setInstances((list) => [...list, instance]);
              openInstance(instance.id);
            }}
          />
        )}
        {screen === 'settings' && <Settings />}
        {screen === 'account' && <Account />}
      </main>

      <footer className="playbar">
        <label className="picker">
          {selected.kind === 'official' ? (
            <VeyraMark className="picker-icon" />
          ) : (
            <span className="picker-initial" aria-hidden>
              {selected.name.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="visually-hidden">{t('nav.instances')}</span>
          <select value={selected.id} onChange={(e) => setSelectedId(e.target.value)}>
            {instances.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} ({i.kind === 'official' ? t('instance.official') : t('instance.custom')})
              </option>
            ))}
          </select>
          <ChevronIcon className="picker-chevron" />
        </label>

        <label className="picker picker-version">
          <span className="visually-hidden">{t('instance.version')}</span>
          <select
            value={selected.mcVersion}
            disabled={selected.kind !== 'official'}
            onChange={(e) => updateInstance({ ...selected, mcVersion: e.target.value })}
          >
            {(selected.kind === 'official' ? VEYRA_VERSIONS : [selected.mcVersion]).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ChevronIcon className="picker-chevron" />
        </label>

        <p className="playbar-status" role="status">
          {notice ?? t('home.notInstalled')}
        </p>

        <button className="play" onClick={() => setNotice(t('home.playNotBuilt'))}>
          {t('home.play')}
        </button>
      </footer>
    </div>
  );
}
