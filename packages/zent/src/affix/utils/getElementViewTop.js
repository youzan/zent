function getElementViewTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  let elementScrollTop;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  if (document.compatMode === 'BackCompat') {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop === 0
      ? document.body.scrollTop
      : document.documentElement.scrollTop;
  }
  return actualTop - elementScrollTop;
}
export default getElementViewTop;
