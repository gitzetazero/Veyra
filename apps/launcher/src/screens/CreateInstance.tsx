// SPDX-License-Identifier: GPL-3.0-only
import { useState, type FormEvent } from 'react';
import { MINECRAFT_VERSIONS, VEYRA_VERSIONS, guessModpackFormat, type Instance, type Loader } from '../data';
import { useI18n } from '../i18n';

type Source = 'copy' | 'loader' | 'import';

interface Props {
  onCreate: (instance: Instance) => void;
}

export function CreateInstance({ onCreate }: Props) {
  const { t } = useI18n();
  const [source, setSource] = useState<Source>('copy');
  const [name, setName] = useState('');
  const [loader, setLoader] = useState<Exclude<Loader, 'veyra'>>('fabric');
  const [version, setVersion] = useState(MINECRAFT_VERSIONS[0] ?? '26.3');
  const [veyraVersion, setVeyraVersion] = useState(VEYRA_VERSIONS[0] ?? '26.3');
  const [fileMessage, setFileMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sources: { id: Source; title: string; body: string }[] = [
    { id: 'copy', title: t('create.copy.title'), body: t('create.copy.body') },
    { id: 'loader', title: t('create.loader.title'), body: t('create.loader.body') },
    { id: 'import', title: t('create.import.title'), body: t('create.import.body') },
  ];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (source === 'import') {
      setError(t('create.importNotBuilt'));
      return;
    }
    const trimmed = name.trim();
    if (!trimmed) {
      setError(t('create.nameRequired'));
      return;
    }
    onCreate({
      id: `${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
      name: trimmed,
      kind: 'custom',
      loader: source === 'copy' ? 'fabric' : loader,
      mcVersion: source === 'copy' ? veyraVersion : version,
    });
  };

  return (
    <form className="page" onSubmit={submit} noValidate>
      <h1 className="page-title">{t('create.title')}</h1>

      <fieldset className="choices">
        {sources.map((s) => (
          <label key={s.id} className={`choice${source === s.id ? ' is-chosen' : ''}`}>
            <input
              type="radio"
              name="source"
              value={s.id}
              checked={source === s.id}
              onChange={() => {
                setSource(s.id);
                setError(null);
              }}
            />
            <span className="choice-title">{s.title}</span>
            <span className="choice-body">{s.body}</span>
          </label>
        ))}
      </fieldset>

      <div className="settings">
        {source !== 'import' && (
          <div className="setting">
            <label htmlFor="name" className="setting-label">
              {t('create.name')}
            </label>
            <input
              id="name"
              className="text-input"
              value={name}
              placeholder={t('create.namePlaceholder')}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
            />
          </div>
        )}

        {source === 'copy' && (
          <div className="setting">
            <label htmlFor="veyra-version" className="setting-label">
              {t('instance.version')}
            </label>
            <select
              id="veyra-version"
              className="select"
              value={veyraVersion}
              onChange={(e) => setVeyraVersion(e.target.value)}
            >
              {VEYRA_VERSIONS.map((v) => (
                <option key={v} value={v}>
                  Minecraft {v}
                </option>
              ))}
            </select>
          </div>
        )}

        {source === 'loader' && (
          <div className="setting setting-pair">
            <div>
              <label htmlFor="loader" className="setting-label">
                {t('create.loader')}
              </label>
              <select
                id="loader"
                className="select"
                value={loader}
                onChange={(e) => setLoader(e.target.value as 'fabric' | 'vanilla')}
              >
                <option value="vanilla">{t('create.loader.vanilla')}</option>
                <option value="fabric">{t('create.loader.fabric')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="version" className="setting-label">
                {t('instance.version')}
              </label>
              <select id="version" className="select" value={version} onChange={(e) => setVersion(e.target.value)}>
                {MINECRAFT_VERSIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {source === 'import' && (
          <div className="setting">
            <label htmlFor="modpack" className="setting-label">
              {t('create.file')}
            </label>
            <input
              id="modpack"
              type="file"
              accept=".mrpack,.zip"
              className="file-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return setFileMessage(null);
                const format = guessModpackFormat(file.name);
                if (format === null) setFileMessage(t('create.unknownFormat'));
                else if (format === 'zip') setFileMessage(t('create.fileHelp'));
                else setFileMessage(t('create.detected', { format }));
              }}
            />
            <p className="setting-help">{fileMessage ?? t('create.fileHelp')}</p>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {t('create.submit')}
        </button>
        <p className="form-error" role="alert">
          {error}
        </p>
      </div>
    </form>
  );
}
