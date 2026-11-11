// SPDX-License-Identifier: GPL-3.0-only
import { useI18n } from '../i18n';

export function Account() {
  const { t } = useI18n();
  return (
    <div className="page">
      <h1 className="page-title">{t('account.title')}</h1>
      <div className="settings">
        <div className="setting setting-row">
          <div className="account">
            <span className="avatar" aria-hidden />
            <span className="account-text">
              <span className="account-name">{t('account.signedOut')}</span>
              <span className="account-hint">{t('account.hint')}</span>
            </span>
          </div>
          <button className="btn" disabled title={t('account.notBuilt')}>
            {t('account.signIn')}
          </button>
        </div>
      </div>
      <p className="page-note">{t('account.notBuilt')}</p>
    </div>
  );
}
