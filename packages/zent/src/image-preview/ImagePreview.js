import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';

export default function imagePreview(options = {}) {
  let container = document.createElement('div');

  const closePreviewMask = () => {
    if (!container) {
      return;
    }

    ReactDOM.unmountComponentAtNode(container);
    container = undefined;
  };

  const props = {
    ...options,
    visible: true,
    onClose: closePreviewMask
  };

  ReactDOM.render(React.createElement(Image, props), container);
}
