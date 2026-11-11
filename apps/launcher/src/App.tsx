// SPDX-License-Identifier: GPL-3.0-only
import { useState, type ReactNode } from 'react';
import { INITIAL_INSTANCES, OFFICIAL_ID, type Instance } from './data';
import { I18nProvider, useI18n } from './i18n';
import { HomeIcon, PinIcon, PlusIcon, SettingsIcon, UserIcon, VeyraMark } from './icons';
import { Account } from './screens/Account';
import { CreateInstance } from './screens/CreateInstance';
import { Home } from './screens/Home';
import { InstanceView } from './screens/InstanceView';
import { Settings } from './screens/Settings';

type Screen = 'home' | 'instance' | 'create' | 'settings' | 'account';

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

  const selected = instances.find((i) => i.id === selectedId) ?? instances[0];
  if (!selected) return null;

  const openInstance = (id: string) => {
    setSelectedId(id);
    setScreen('instance');
  };

  const deleteInstance = (id: string) => {
    if (id === OFFICIAL_ID) return; // The official instance can never be removed.
    setInstances((list) => list.filter((i) => i.id !== id));
    setSelectedId(OFFICIAL_ID);
    setScreen('home');
  };

  const railButton = (target: Screen, label: string, icon: ReactNode) => (
    <button
      className="rail-item"
      aria-current={screen === target ? 'page' : undefined}
      onClick={() => setScreen(target)}
      title={label}
    >
      {icon}
      <span className="visually-hidden">{label}</span>
    </button>
  );

  return (
    <div className="shell">
      <nav className="rail" aria-label={t('nav.instances')}>
        {railButton('home', t('nav.home'), <HomeIcon />)}
        <hr className="rail-divider" />

        <ul className="rail-instances">
          {instances.map((i) => (
            <li key={i.id}>
              <button
                className={`rail-instance${i.id === selectedId ? ' is-selected' : ''}`}
                aria-current={screen === 'instance' && i.id === selectedId ? 'page' : undefined}
                onClick={() => openInstance(i.id)}
                title={`${i.name} (${i.kind === 'official' ? t('instance.official') : t('instance.custom')})`}
              >
                {i.kind === 'official' ? (
                  <>
                    <VeyraMark />
                    <PinIcon className="rail-pin" />
                  </>
                ) : (
                  <span className="rail-initial" aria-hidden>
                    {i.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="visually-hidden">{i.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <hr className="rail-divider" />
        {railButton('create', t('nav.newInstance'), <PlusIcon />)}
        <div className="rail-spacer" />
        {railButton('settings', t('nav.settings'), <SettingsIcon />)}
        {railButton('account', t('nav.account'), <UserIcon />)}
      </nav>

      <main className="content">
        {screen === 'home' && <Home instance={selected} instances={instances} onSelect={setSelectedId} />}
        {screen === 'instance' && (
          <InstanceView
            key={selected.id}
            instance={selected}
            onChange={(next) => setInstances((list) => list.map((i) => (i.id === next.id ? next : i)))}
            onDelete={deleteInstance}
          />
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
    </div>
  );
}
