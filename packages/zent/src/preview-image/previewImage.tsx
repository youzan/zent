import * as ReactDOM from 'react-dom';

import createElement from '../utils/dom/createElement';
import Image from './Image';

export interface IPreviewImageConfig {
  images?: string[];
  index?: number;
  showRotateBtn?: boolean;
  scaleRatio?: number;
  parentComponent?: React.ReactInstance;
  className?: string;
}

export function previewImage(options: IPreviewImageConfig = {}) {
  const { parentComponent, ...rest } = options;
  let container: HTMLElement | null = createElement('div');

  const closePreviewMask = () => {
    if (!container) {
      return;
    }

    ReactDOM.unmountComponentAtNode(container);
    container = null;
  };

  const props = {
    ...rest,
    onClose: closePreviewMask,
  };

  // 保持context
  const render = parentComponent
    ? ReactDOM.unstable_renderSubtreeIntoContainer.bind(
        ReactDOM,
        parentComponent
      )
    : ReactDOM.render;

  render(<Image {...props} />, container);
}

export default previewImage;
