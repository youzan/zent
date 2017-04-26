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
});
