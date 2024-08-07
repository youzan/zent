import isBrowser from '../isBrowser';
import createElement from './createElement';

let scrollbarWidth = 0;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
};

export default function measureScrollbar() {
  if (!isBrowser) {
    return 0;
  }
  if (scrollbarWidth) {
    return scrollbarWidth;
  }
  const scrollDiv = createElement('div');
  const scrollProps = Object.keys(scrollbarMeasure);
  scrollProps.forEach(scrollProp => {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  document.body.appendChild(scrollDiv);
  const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  scrollbarWidth = width;
  return scrollbarWidth;
}
