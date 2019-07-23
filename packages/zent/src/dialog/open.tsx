import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, createRef } from 'react';
import noop from 'lodash-es/noop';
import uniqueId from 'lodash-es/uniqueId';
import { Omit } from 'utility-types';

import isBrowser from '../utils/isBrowser';
import Dialog, { IDialogProps } from './Dialog';

const dialogInstanceMap = new Map<string, React.RefObject<StandaloneDialog>>();

function ensureUniqDialogInstance(dialogId: string) {
  if (dialogInstanceMap.has(dialogId)) {
    throw new Error(`Duplicate dialog id found: ${dialogId}`);
  }
}

function addDialogInstance(
  dialogId: string,
  ref: React.RefObject<StandaloneDialog>
) {
  dialogInstanceMap.set(dialogId, ref);
}

export interface ICloseDialogOption {
  triggerOnClose?: boolean;
}

interface IStandaloneDialogProps {
  options: Partial<IOpenDialogOption> & { dialogId: string };
  container: HTMLDivElement;
}

class StandaloneDialog extends Component<IStandaloneDialogProps> {
  state = {
    visible: true,
  };

  closeOptions: ICloseDialogOption = {};

  close(options: ICloseDialogOption = {}) {
    this.closeOptions = options;
    this.setState({
      visible: false,
    });
  }

  onClosed = () => {
    const {
      options: { onClose },
      container,
    } = this.props;
    const { triggerOnClose = true } = this.closeOptions;
    if (triggerOnClose && onClose) {
      onClose();
    }
    ReactDOM.unmountComponentAtNode(container);
  };

  onClose = (e: unknown) => {
    this.close({
      triggerOnClose: e !== false,
    });
  };

  componentWillUnmount() {
    const {
      options: { dialogId },
    } = this.props;
    dialogInstanceMap.delete(dialogId);
  }

  render() {
    const { options } = this.props;
    const { visible } = this.state;
    return (
      <Dialog
        {...options}
        onClose={this.onClose}
        onClosed={this.onClosed}
        visible={visible}
      />
    );
  }
}

export function closeDialog(
  dialogId: string,
  options: ICloseDialogOption = {}
) {
  const dialog = dialogInstanceMap.get(dialogId);

  if (!dialog) {
    return;
  }
  const wrapper = dialog.current;
  if (!wrapper) {
    return;
  }
  wrapper.close(options);
}

export interface IOpenDialogOption extends Omit<IDialogProps, 'onClose'> {
  dialogId?: string;
  ref?: (ins: Dialog) => void | React.RefObject<Dialog>;
  parentComponent?: React.ReactInstance;
  onClose?: () => void;
}

/*
  打开一个dialog，返回值是一个用来关闭dialog的函数。
*/
export function openDialog(options: Partial<IOpenDialogOption> = {}) {
  if (!isBrowser) return noop;

  const { dialogId = uniqueId('__zent-dialog__'), parentComponent } = options;

  ensureUniqDialogInstance(dialogId);

  const container = document.createElement('div');

  // 确保多次调用close不会报错
  const closeHandler = (evt: unknown) => {
    closeDialog(dialogId, {
      triggerOnClose: evt !== false,
    });
  };

  const render = parentComponent
    ? ReactDOM.unstable_renderSubtreeIntoContainer.bind(
        ReactDOM,
        parentComponent
      )
    : ReactDOM.render;

  const ref = createRef<StandaloneDialog>();

  // 不要依赖render的返回值，以后可能行为会改变
  render(
    <StandaloneDialog
      ref={ref}
      options={{
        ...options,
        dialogId,
      }}
      container={container}
    />,
    container
  );

  addDialogInstance(dialogId, ref);

  return closeHandler;
}
