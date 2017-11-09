import Notify from 'notify';

describe('Notify component', () => {
  it('should render a notfy in body', () => {
    Notify.success('test success');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.runAllTimers();
  });

  it('should render a notify in body', () => {
    Notify.error('test error');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.runAllTimers();
  });

  it('clear notify', () => {
    Notify.error('test error', 2000);
    Notify.clear();
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
  });

  it('test duration', () => {
    Notify.error('test error', 2000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    }, 2500);
    jest.runAllTimers();
  });

  it('supports close callback', () => {
    const cb = jest.fn();
    Notify.error('test', 2000, cb);
    jest.runAllTimers();
    expect(cb.mock.calls.length).toBe(1);
  });

  it('can clear all pendings', () => {
    const cb = jest.fn();
    const id = Notify.error('test', 1000, cb);
    Notify.clear(123);
    Notify.clear(id);
    expect(cb.mock.calls.length).toBe(1);
  });

  // This test case needs to be placed last
  it('Global default duration configurable', () => {
    Notify.config({ duration: 3000 });
    Notify.error('test error');
    jest.runTimersToTime(2500);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.runTimersToTime(1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    Notify.config({ duration: 1000 });
    jest.runTimersToTime(500);
    Notify.error('test error');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.runTimersToTime(1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
  });
});
