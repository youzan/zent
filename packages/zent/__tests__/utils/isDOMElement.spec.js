import isDOMElement from '../../src/utils/isDOMElement';

describe('isDOMElement', () => {
  it('returns true if argument is a DOM element', () => {
    expect(isDOMElement(null)).toBe(false);
    expect(isDOMElement(undefined)).toBe(false);
    expect(isDOMElement({})).toBe(false);
    expect(isDOMElement({ then: 1 })).toBe(false);
    expect(isDOMElement(() => {})).toBe(false);
    expect(isDOMElement(document.createElement('div'))).toBe(false);
    expect(isDOMElement(<span>11</span>)).toBe(true);
  });
});
