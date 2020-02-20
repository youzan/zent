import * as React from 'react';
import Button from '../button';
import { I18nReceiver as Receiver } from '../i18n';
import isPromise from '../utils/isPromise';
import Popover from '../popover';
import { usePopover } from '../popover/withPopover';
import { IPopState } from './Pop';

export interface IPopActionCallback {
  (close: () => void): void;
  (): Promise<void>;
}

export interface IChangePending {
  (key: keyof IPopState, state: boolean, callback?: () => void): void;
}

export interface IPopActionProps {
  type: 'primary' | 'default' | 'danger' | 'success' | 'secondary';
  onConfirm?: IPopActionCallback;
  onCancel?: IPopActionCallback;
  confirmText?: string;
  cancelText?: string;
  confirmPending: boolean;
  cancelPending: boolean;
  changePending: IChangePending;
}

function handleClick(
  stateKey: keyof IPopState,
  changePending: IChangePending,
  popover: Popover,
  callback: IPopActionCallback
) {
  if (typeof callback !== 'function') {
    return popover.close();
  }
  const startClose = () => {
    changePending(stateKey, true);
  };
  const finishClose = () => {
    changePending(stateKey, false, popover.close);
  };

  if (callback.length >= 1) {
    startClose();
    return callback(finishClose);
  }

  const maybePromise = callback();
  if (isPromise(maybePromise)) {
    startClose();
    maybePromise.then(finishClose).catch(() => changePending(stateKey, false));
  } else {
    popover.close();
  }
}

function PopAction({
  type,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmPending,
  cancelPending,
  changePending,
}: IPopActionProps) {
  const popover = usePopover();
  const onConfirmClick = React.useCallback(() => {
    if (!onConfirm) {
      return;
    }
    handleClick('confirmPending', changePending, popover, onConfirm);
  }, [onConfirm, popover, changePending]);
  const onCancelClick = React.useCallback(() => {
    if (!onCancel) {
      return;
    }
    handleClick('cancelPending', changePending, popover, onCancel);
  }, [onCancel, popover, changePending]);
  return (
    <div className="zent-pop-buttons">
      <Receiver componentName="Pop">
        {i18n => (
          <Button
            loading={cancelPending}
            disabled={confirmPending}
            size="small"
            onClick={onCancelClick}
          >
            {cancelText || i18n.cancel}
          </Button>
        )}
      </Receiver>
      <Receiver componentName="Pop">
        {i18n => (
          <Button
            loading={confirmPending}
            disabled={cancelPending}
            size="small"
            type={type}
            onClick={onConfirmClick}
          >
            {confirmText || i18n.confirm}
          </Button>
        )}
      </Receiver>
    </div>
  );
}

export default PopAction;
