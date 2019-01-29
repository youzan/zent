export function getElementLeft(element: HTMLElement) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement;
  }
  return actualLeft;
}

export function getElementTop(element: HTMLElement) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }
  return actualTop;
}
