import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';

export default function previewImage(options = {}) {
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
    onClose: closePreviewMask
  };

  ReactDOM.render(React.createElement(Image, props), container);
}
