// SPDX-License-Identifier: GPL-3.0-only
import { useState } from 'react';
import { VEYRA_VERSIONS, type Instance } from '../data';
import { useI18n } from '../i18n';
import { ConfirmDialog } from './ConfirmDialog';
import { describeInstance } from './describe';

interface Props {
  instance: Instance;
  onChange: (instance: Instance) => void;
  onDelete: (id: string) => void;
}

export function InstanceView({ instance, onChange, onDelete }: Props) {
  const { t } = useI18n();
  const official = instance.kind === 'official';
  const [confirming, setConfirming] = useState(false);
  const [deleteWorlds, setDeleteWorlds] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="page">
      <div className="page-head">
        <h1 className="page-title">{instance.name}</h1>
        <span className={`badge badge-${instance.kind}`}>
          {official ? t('instance.official') : t('instance.custom')}
        </span>
      </div>
      <p className="page-intro">{official ? t('official.intro') : t('custom.intro')}</p>

      <div className="settings">
        <div className="setting">
          {official ? (
            <>
              <label htmlFor="mc-version" className="setting-label">
                {t('instance.version')}
              </label>
              <div className="setting-control">
                <select
                  id="mc-version"
                  className="select"
                  value={instance.mcVersion}
                  onChange={(e) => onChange({ ...instance, mcVersion: e.target.value })}
                >
                  {VEYRA_VERSIONS.map((v) => (
                    <option key={v} value={v}>
                      Minecraft {v}
                    </option>
                  ))}
                </select>
              </div>
              <p className="setting-help">{t('instance.versionHelp')}</p>
            </>
          ) : (
            <>
              <span className="setting-label">{t('instance.version')}</span>
              <p className="setting-help">{describeInstance(instance, t)}</p>
            </>
          )}
        </div>

        <div className="setting setting-row">
          <div>
            <span className="setting-label">{official ? t('instance.reset') : t('instance.delete')}</span>
            <p className="setting-help">{official ? t('instance.resetHelp') : t('instance.deleteHelp')}</p>
          </div>
          <button className="btn btn-danger" onClick={() => setConfirming(true)}>
            {official ? t('reset.confirm') : t('delete.confirm')}
          </button>
        </div>
      </div>

      <p className="page-note" role="status">
        {status ?? t('common.previewNote')}
      </p>

      <ConfirmDialog
        open={confirming}
        danger
        title={official ? t('reset.title') : t('delete.title', { name: instance.name })}
        confirmLabel={official ? t('reset.confirm') : t('delete.confirm')}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          if (official) setStatus(t('reset.done'));
          else onDelete(instance.id);
        }}
      >
        <p>{official ? t('reset.body') : t('delete.body')}</p>
        {official && (
          <label className="check">
            <input type="checkbox" checked={deleteWorlds} onChange={(e) => setDeleteWorlds(e.target.checked)} />
            {t('reset.deleteWorlds')}
          </label>
        )}
      </ConfirmDialog>
    </div>
  );
}
