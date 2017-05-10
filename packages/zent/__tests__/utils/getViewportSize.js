import getViewportSize from 'utils/dom/getViewportSize';

describe('getViewportSize', () => {
  it('returns viewport size', () => {
    let sz = getViewportSize();
    expect(sz.width >= 0).toBe(true);
    expect(sz.height >= 0).toBe(true);
  });
});
