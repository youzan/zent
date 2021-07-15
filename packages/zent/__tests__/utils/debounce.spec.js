import debounce from '../../src/utils/debounce';

describe('debounce', () => {
  it('debounce the call', () => {
    const cb = jest.fn();
    const wrapper = debounce(cb);
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(0);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(10);
    expect(cb.mock.calls[0][1]).toBe(20);
  });

  it('call on leading edge', () => {
    const cb = jest.fn();
    const wrapper = debounce(cb, 100, { immediate: true });
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(1);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(1);
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(1);
    expect(cb.mock.calls[0][1]).toBe(2);
  });

  it('cancel', () => {
    const cb = jest.fn();
    const wrapper = debounce(cb, 100);
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(0);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(0);
    wrapper.cancel();
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(0);
  });
});
