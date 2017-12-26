import React from 'react';
import ReactDOM from 'react-dom';
import partial from 'lodash/partial';

import Image from './Image';

export default function previewImage(options = {}) {
  const { parentComponent, ...rest } = options;
  let container = document.createElement('div');

  const closePreviewMask = () => {
    if (!container) {
      return;
    }

    ReactDOM.unmountComponentAtNode(container);
    container = undefined;
  };

  const props = {
    ...rest,
    onClose: closePreviewMask
  };

  // 保持context
  const render = parentComponent
    ? partial(ReactDOM.unstable_renderSubtreeIntoContainer, parentComponent)
    : ReactDOM.render;

  render(React.createElement(Image, props), container);
}
