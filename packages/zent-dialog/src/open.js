import React from 'react';
import ReactDOM from 'react-dom';
import noop from 'zent-utils/lodash/noop';
import isBrowser from 'zent-utils/isBrowser';

import Dialog from './Dialog';

/**
  打开一个dialog，返回值是一个用来关闭dialog的函数。
**/
export default function openDialog(options = {}) {
  if (!isBrowser) return noop;

  const { onClose: oldOnClose, ref } = options;
  let container = document.createElement('div');

  // 确保多次调用closeDialog不会报错
  const closeDialog = (evt) => {
    if (!container) {
      return;
    }

    if (evt !== false && oldOnClose) {
      oldOnClose(evt);
    }

    ReactDOM.unmountComponentAtNode(container);
    container = undefined;
  };
  const props = {
    ...options,
    visible: true,
    onClose: closeDialog
  };

  // 只支持函数形式的ref
  if (ref && typeof ref !== 'function') {
    delete props.ref;
  }

  // 不要依赖render的返回值，以后可能行为会改变
  ReactDOM.render(
    React.createElement(Dialog, props),
    container
  );

  return closeDialog;
}
