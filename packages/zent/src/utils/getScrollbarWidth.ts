import assign from 'lodash-es/assign';
import isBrowser from './isBrowser';

function getScrollbarWidth() {
  if (!isBrowser) {
    return 0;
  }
  const scrollDiv = document.createElement('div');
  assign(scrollDiv.style, {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px',
    overflow: 'scroll',
  });
  document.body.appendChild(scrollDiv);
  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export const SCROLLBAR_WIDTH = getScrollbarWidth();
