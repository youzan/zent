import getElementViewTop from './getElementViewTop';

function getElementViewBottom(element) {
  const top = getElementViewTop(element);
  let height;
  if (document.compatMode === 'BackCompat') {
    height = document.body.clientHeight;
  } else {
    height = document.documentElement.clientHeight === 0
      ? document.body.clientHeight
      : document.documentElement.clientHeight;
  }
  return height - top - element.offsetHeight;
}
export default getElementViewBottom;
