// SPDX-License-Identifier: GPL-3.0-only
import { useEffect, useRef, type ReactNode } from 'react';
import { useI18n } from '../i18n';

interface Props {
  open: boolean;
  title: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
}

/** Modal confirmation built on <dialog>: focus trapping and Escape come from the browser. */
export function ConfirmDialog({ open, title, confirmLabel, danger, onConfirm, onClose, children }: Props) {
  const { t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="dialog" aria-labelledby="dialog-title" onClose={onClose}>
      <h2 id="dialog-title" className="dialog-title">
        {title}
      </h2>
      <div className="dialog-body">{children}</div>
      <div className="dialog-actions">
        <button className="btn" onClick={onClose} autoFocus>
          {t('common.cancel')}
        </button>
        <button className={danger ? 'btn btn-danger' : 'btn btn-primary'} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
