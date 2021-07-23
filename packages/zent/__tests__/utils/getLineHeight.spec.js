import { getLineHeight } from '../../src/utils/dom/getLineHeight';

const createElement = document.createElement;

function mock(lineHeight, fontSize, offsetHeight, cb) {
  jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
    return {
      getPropertyValue(prop) {
        if (prop === 'font-size') {
          return fontSize;
        }
        if (prop === 'line-height') {
          return lineHeight;
        }
      },
    };
  });
  jest.spyOn(document, 'createElement').mockImplementation((tag, options) => {
    const node = createElement.call(document, tag, options);
    Object.defineProperty(node, 'offsetHeight', {
      value: offsetHeight,
      writable: true,
    });
    return node;
  });
  cb();
  window.getComputedStyle.mockRestore();
  document.createElement.mockRestore();
}

describe('getLineHeight', () => {
  it('returns element line height', () => {
    const node = document.createElement('div');
    mock('normal', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(10);
    });
    mock('10px', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(10);
    });
    mock('10pt', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(13);
    });
    mock('10mm', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(38);
    });
    mock('10cm', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(378);
    });
    mock('10in', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(960);
    });
    mock('10pc', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(160);
    });
    mock('10', '10px', 10, () => {
      node.style.lineHeight = '10';
      expect(getLineHeight(node)).toBe(10);

      node.style.lineHeight = '';
      expect(getLineHeight(node)).toBe(10);
    });
  });

  it('textarea', () => {
    const node = document.createElement('textarea');
    mock('normal', '10px', 10, () => {
      expect(getLineHeight(node)).toBe(10);
    });
  });
});
