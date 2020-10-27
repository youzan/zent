import toggleSelection from './toggleSelection';
import createElement from '../utils/dom/createElement';

function copy(text: string) {
  let reselectPrevious: () => void;
  let range: Range;
  let selection: Selection;
  let mark: HTMLSpanElement;
  let success = false;

  try {
    reselectPrevious = toggleSelection();

    range = document.createRange();
    selection = document.getSelection();

    mark = createElement('span');
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = 'unset';
    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = '0';
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    (mark.style as any).MozUserSelect = 'text';
    (mark.style as any).msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    try {
      (window as any).clipboardData.setData('text', text);
      success = true;
    } catch (e) {
      console.error(e);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

export default copy;
