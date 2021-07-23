beforeEach(() => {
  jest
    .spyOn(document, 'documentElement', 'get')
    .mockImplementation(() => ({ clientWidth: 1024, clientHeight: 768 }));
});

describe('getViewportSize', () => {
  it('returns viewport size', () => {
    // eslint-disable-next-line global-require
    const getViewportSize = require('../../src/utils/dom/getViewportSize');
    const sz = getViewportSize.getViewportSize();

    expect(sz.width > 0).toBe(true);
    expect(sz.height > 0).toBe(true);
  });
});
