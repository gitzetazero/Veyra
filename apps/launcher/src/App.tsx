// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { INITIAL_INSTANCES, OFFICIAL_ID, type Instance } from './data';
import { I18nProvider, useI18n } from './i18n';
import { Backdrop } from './Backdrop';
import { ChevronIcon, NotesIcon, PlusIcon, SlidersIcon, UserIcon, VeyraMark } from './icons';
import { Account } from './screens/Account';
import { CreateInstance } from './screens/CreateInstance';
import { Home, News } from './screens/Home';
import { InstanceView } from './screens/InstanceView';
import { Settings } from './screens/Settings';
import { WindowControls } from './WindowControls';

type Screen = 'play' | 'installation' | 'news' | 'create' | 'settings' | 'account';

export function App() {
  return (
    <I18nProvider>
      <Launcher />
    </I18nProvider>
  );
}

function InstanceIcon({ instance }: { instance: Instance }) {
  return instance.kind === 'official' ? (
    <VeyraMark width={24} height={24} />
  ) : (
    <span className="instance-initial" aria-hidden>
      {instance.name.charAt(0).toUpperCase()}
    </span>
  );
}

function Launcher() {
  const { t } = useI18n();
  const [instances, setInstances] = useState<Instance[]>(INITIAL_INSTANCES);
  const [selectedId, setSelectedId] = useState(OFFICIAL_ID);
  const [screen, setScreen] = useState<Screen>('play');

  const selected = instances.find((i) => i.id === selectedId) ?? instances[0];
  if (!selected) return null;

  const updateInstance = (next: Instance) => setInstances((list) => list.map((i) => (i.id === next.id ? next : i)));

  const selectInstance = (id: string) => {
    setSelectedId(id);
    if (screen === 'create' || screen === 'settings' || screen === 'account') setScreen('play');
  };

  const deleteInstance = (id: string) => {
    if (id === OFFICIAL_ID) return; // The official instance can never be removed.
    setInstances((list) => list.filter((i) => i.id !== id));
    setSelectedId(OFFICIAL_ID);
    setScreen('play');
  };

  const tabs: { id: Screen; label: string }[] = [
    { id: 'play', label: t('home.play') },
    { id: 'installation', label: t('nav.installation') },
    { id: 'news', label: t('home.news') },
  ];

  return (
    <div className="app">
      <Backdrop />

      {/* Frameless window: this strip and the header's empty space move the window. */}
      <div className="titlebar" data-tauri-drag-region>
        <WindowControls />
      </div>

      <header className="header" data-tauri-drag-region>
        <button
          className="account-chip"
          aria-current={screen === 'account' ? 'page' : undefined}
          onClick={() => setScreen('account')}
        >
          <span className="account-avatar" aria-hidden>
            <UserIcon width={22} height={22} />
          </span>
          <span className="account-chip-text">
            <span className="account-chip-name">
              {t('account.signedOut')}
              <ChevronIcon className="account-chip-chevron" />
            </span>
            <span className="account-chip-kind">{t('account.microsoft')}</span>
          </span>
        </button>

        <div className="header-center">
          <ul className="switcher" aria-label={t('nav.instances')}>
            {instances.map((i) => {
              const current = i.id === selected.id;
              const kind = i.kind === 'official' ? t('instance.official') : t('instance.custom');
              return (
                <li key={i.id}>
                  <button
                    className={`switcher-item${current ? ' is-current' : ''}`}
                    aria-pressed={current}
                    title={`${i.name} (${kind})`}
                    onClick={() => selectInstance(i.id)}
                  >
                    <span className="switcher-icon">
                      <InstanceIcon instance={i} />
                    </span>
                    {current ? (
                      <span className="switcher-label">
                        <span className="switcher-kind">{kind}</span>
                        <span className="switcher-name">{i.name}</span>
                      </span>
                    ) : (
                      <span className="visually-hidden">{i.name}</span>
                    )}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                className="switcher-item switcher-add"
                aria-current={screen === 'create' ? 'page' : undefined}
                title={t('nav.newInstance')}
                onClick={() => setScreen('create')}
              >
                <PlusIcon width={20} height={20} />
                <span className="visually-hidden">{t('nav.newInstance')}</span>
              </button>
            </li>
          </ul>

          <nav className="tabs" aria-label={selected.name}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className="tab"
                aria-current={screen === tab.id ? 'page' : undefined}
                onClick={() => setScreen(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <button
            className="tile-button"
            aria-current={screen === 'news' ? 'page' : undefined}
            title={t('home.news')}
            onClick={() => setScreen('news')}
          >
            <NotesIcon />
            <span className="visually-hidden">{t('home.news')}</span>
          </button>
          <button
            className="tile-button"
            aria-current={screen === 'settings' ? 'page' : undefined}
            title={t('nav.settings')}
            onClick={() => setScreen('settings')}
          >
            <SlidersIcon />
            <span className="visually-hidden">{t('nav.settings')}</span>
          </button>
        </div>
      </header>

      <main className={`content${screen === 'play' ? ' content-play' : ''}`}>
        {screen === 'play' && (
          <Home instance={selected} onChange={updateInstance} onShowNews={() => setScreen('news')} />
        )}
        {screen === 'installation' && (
          <InstanceView key={selected.id} instance={selected} onChange={updateInstance} onDelete={deleteInstance} />
        )}
        {screen === 'news' && <News />}
        {screen === 'create' && (
          <CreateInstance
            onCreate={(instance) => {
              setInstances((list) => [...list, instance]);
              setSelectedId(instance.id);
              setScreen('play');
            }}
          />
        )}
        {screen === 'settings' && <Settings />}
        {screen === 'account' && <Account />}
      </main>
    </div>
  );
}
