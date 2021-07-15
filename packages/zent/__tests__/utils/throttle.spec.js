/* eslint-disable import/no-deprecated */

import throttle from '../../src/utils/throttle';

describe('throttle', () => {
  it('throttle the call', () => {
    const cb = jest.fn();
    const wrapper = throttle(cb);
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(0);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(10);
    expect(cb.mock.calls[0][1]).toBe(20);
  });

  it('throttle the call2', () => {
    const cb = jest.fn();
    const wrapper = throttle(cb, 100);
    setTimeout(() => {
      wrapper(100, 200);
    }, 100);
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(0);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(100);
    expect(cb.mock.calls[0][1]).toBe(200);
  });

  it('call on leading edge', () => {
    const cb = jest.fn();
    const wrapper = throttle(cb, 100, { immediate: true });
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
    const wrapper = throttle(cb, 100);
    wrapper(1, 2);
    expect(cb.mock.calls.length).toBe(0);
    wrapper(10, 20);
    expect(cb.mock.calls.length).toBe(0);
    wrapper.cancel();
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(0);
  });
});
