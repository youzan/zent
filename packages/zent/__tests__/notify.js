import Notify from 'notify';

describe('Notify component', () => {
  afterEach(() => {
    Notify.clear();
    jest.runAllTimers();
  });

  it('render success notify', () => {
    Notify.success('test success', 1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('render error notify', () => {
    Notify.error('test error');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('have move out class', () => {
    Notify.error('test error', 1000);
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-notify-out').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    }, 300);
  });

  it('test duration', () => {
    Notify.error('test error', 2000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    }, 2500);
  });

  it('supports close callback', () => {
    const cb = jest.fn();
    Notify.error('test', 2000, cb);
    Notify.clear();
    expect(cb.mock.calls.length).toBe(1);
  });

  it('can clear all pendings', () => {
    const cb = jest.fn();
    const id = Notify.error('test', 1000, cb);
    Notify.clear(123);
    Notify.clear(id);
    expect(cb.mock.calls.length).toBe(1);
  });

  it('Global default duration configurable', () => {
    Notify.config({ duration: 3000 });
    Notify.config({ duration: 1000 });
    Notify.error('test error');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    }, 2000);
  });
});
