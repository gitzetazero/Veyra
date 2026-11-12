// SPDX-License-Identifier: GPL-3.0-only
import type { Instance } from '../data';
import { useI18n } from '../i18n';
import { PinIcon, PlusIcon, VeyraMark } from '../icons';
import { describeInstance } from './describe';

interface Props {
  instances: Instance[];
  onOpen: (id: string) => void;
  onCreate: () => void;
}

export function Instances({ instances, onOpen, onCreate }: Props) {
  const { t } = useI18n();

  return (
    <div className="page page-wide">
      <h1 className="page-title">{t('nav.instances')}</h1>
      <p className="page-intro">{t('instances.intro')}</p>

      <ul className="instance-grid">
        {instances.map((i) => (
          <li key={i.id}>
            <button className="instance-card glass" onClick={() => onOpen(i.id)}>
              <span className={`instance-cover cover-${i.kind}`} aria-hidden>
                {i.kind === 'official' ? (
                  <VeyraMark width={48} height={48} />
                ) : (
                  <span className="cover-initial">{i.name.charAt(0).toUpperCase()}</span>
                )}
                {i.kind === 'official' && <PinIcon className="cover-pin" width={14} height={14} />}
              </span>
              <span className="instance-card-body">
                <span className="instance-card-name">{i.name}</span>
                <span className="instance-card-meta">{describeInstance(i, t)}</span>
                <span className={`badge badge-${i.kind}`}>
                  {i.kind === 'official' ? t('instance.official') : t('instance.custom')}
                </span>
              </span>
            </button>
          </li>
        ))}
        <li>
          <button className="instance-card instance-card-new" onClick={onCreate}>
            <PlusIcon width={28} height={28} />
            <span className="instance-card-name">{t('nav.newInstance')}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
