import isBrowser from './isBrowser';
import createElement from './dom/createElement';

const MEASURE_STYLE = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};

function getScrollbarWidth() {
  if (!isBrowser) {
    return 0;
  }
  const scrollDiv = createElement('div');
  Object.assign(scrollDiv.style, MEASURE_STYLE);
  document.body.appendChild(scrollDiv);
  const scrollbarWidth =
    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export const SCROLLBAR_WIDTH = getScrollbarWidth();
