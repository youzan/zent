import noop from 'lodash/noop';

export default function() {
  const selection = document.getSelection();
  if (!selection.rangeCount) {
    return noop;
  }

  let active = document.activeElement;

  let ranges = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function() {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(range => {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
}
