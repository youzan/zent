import defer from '../../src/utils/defer';

describe('defer', () => {
  it('defers exection', () => {
    const cb = jest.fn();
    defer(cb, 1, 2);
    expect(cb.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe(1);
    expect(cb.mock.calls[0][1]).toBe(2);
  });

  it('cancel', () => {
    const cb = jest.fn();
    const future = defer(cb, 10);
    expect(cb.mock.calls.length).toBe(0);
    future.cancel();
    jest.runOnlyPendingTimers();
    expect(cb.mock.calls.length).toBe(0);
  });
});
