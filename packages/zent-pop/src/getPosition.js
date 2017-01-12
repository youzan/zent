export function getElementPositionType(element) {
  if (element.style.position === 'fixed') {
    return true;
  }
  let current = element.offsetParent;

  while (current !== null) {
    if (current.style.position === 'fixed') {
      return true;
    }
    current = current.offsetParent;
  }

  return false;
}

export function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  let scrollTop = element.scrollTop;
  let parentNode = element.parentNode;

  while (parentNode !== null) {
    if (parentNode.parentNode.nodeName === 'BODY') {
      break;
    }
    scrollTop += parentNode.scrollTop ? parentNode.scrollTop : 0;
    parentNode = parentNode.parentNode;
  }

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop - scrollTop;
}

export function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  let scrollLeft = element.scrollLeft;
  let parentNode = element.parentNode;

  while (parentNode !== null) {
    if (parentNode.parentNode.nodeName === 'BODY') {
      break;
    }
    scrollLeft += parentNode.scrollLeft ? parentNode.scrollLeft : 0;
    parentNode = parentNode.parentNode;
  }

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft - scrollLeft;
}

export function calculateStyle({ style, position, width, height }) {
  switch (position) {
    case 'top-left':
      style.top += -height;
      // style.left += -width / 2 + style.width / 2 + width / 2 - 12;
      style.arrow_left = width > style.width ? style.width / 2 : width / 2;
      break;
    case 'top-center':
      style.top += -height;
      style.left += -width / 2 + style.width / 2;
      break;
    case 'top-right':
      style.top += -height;
      // style.left += -width / 2 + style.width / 2 - width / 2 + 12;
      style.left += -width + style.width;
      style.arrow_right = width > style.width ? style.width / 2 - 6 : width / 2 - 6;
      break;
    case 'right-top':
      // style.top += style.height / 2 - 12;
      style.left += style.width;
      style.arrow_top = height > style.height ? style.height / 2 : height / 2;
      break;
    case 'right-center':
      style.top += -height / 2 + style.height / 2;
      style.left += style.width;
      break;
    case 'right-bottom':
      // style.top += -height + style.height / 2 + 12;
      style.top += -height + style.height;
      style.left += style.width;
      style.arrow_bottom = height > style.height ? style.height / 2 - 6 : height / 2 - 6;
      break;
    case 'bottom-left':
      style.top += style.height;
      // style.left += -width / 2 + style.width / 2 + width / 2 - 12;
      style.arrow_left = width > style.width ? style.width / 2 : width / 2;
      break;
    case 'bottom-center':
      style.top += style.height;
      style.left += -width / 2 + style.width / 2;
      break;
    case 'bottom-right':
      style.top += style.height;
      // style.left += -width / 2 + style.width / 2 - width / 2 + 12;
      style.left += -width + style.width;
      style.arrow_right = width > style.width ? style.width / 2 - 6 : width / 2 - 6;
      break;
    case 'left-top':
      // style.top += style.height / 2 - 12;
      style.left += -width;
      style.arrow_top = height > style.height ? style.height / 2 : height / 2;
      break;
    case 'left-center':
      style.top += -height / 2 + style.height / 2;
      style.left += -width;
      break;
    case 'left-bottom':
      // style.top += -height + style.height / 2 + 12;
      style.top += -height + style.height;
      style.left += -width;
      style.arrow_bottom = height > style.height ? style.height / 2 - 6 : height / 2 - 6;
      break;
    default:
      // 当前默认是上中'top-center'
      style.top += -height;
      style.left += -width / 2 + style.width / 2;
  }

  return style;
}
