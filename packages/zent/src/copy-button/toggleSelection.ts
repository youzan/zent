import noop from 'lodash-es/noop';

export default function toggleSelection() {
  const selection = document.getSelection();
  if (!selection.rangeCount) {
    return noop;
  }

  let active = document.activeElement;

  const ranges = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (
    active.tagName.toUpperCase() // .toUpperCase handles XHTML
  ) {
    case 'INPUT':
    case 'TEXTAREA':
      (active as HTMLElement).blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function restoreSelection() {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(range => {
        selection.addRange(range);
      });
    }

    active && (active as HTMLElement).focus();
  };
}
