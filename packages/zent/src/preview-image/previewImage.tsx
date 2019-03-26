import * as React from 'react';
import * as ReactDOM from 'react-dom';
import partial from 'lodash-es/partial';

import Image from './Image';

export interface IPreviewImageConfig {
  images?: string[];
  index?: number;
  showRotateBtn?: boolean;
  scaleRatio?: number;
  parentComponent?: React.ReactInstance;
  className?: string;
  prefix?: string;
}

export function previewImage(options: IPreviewImageConfig = {}) {
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
    onClose: closePreviewMask,
  };

  // 保持context
  const render = parentComponent
    ? partial(ReactDOM.unstable_renderSubtreeIntoContainer, parentComponent)
    : ReactDOM.render;

  render(<Image {...props} />, container);
}

export default previewImage;
