import Notify from '../src/Notify';

describe('Notify component', () => {

  it('should render a notfy in body', () => {
    Notify.success('test success')
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('should render a notify in body', () => {
    Notify.error('test error')
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('clear notify', () => {
    Notify.error('test error', 2000)
    Notify.clear()
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
  });

  it('test duration', () => {
    Notify.error('test error', 2000)
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    setTimeout(() => {
      expect(document.querySelectorAll('.zent-notify').length).toBe(0);
    }, 2500)
  });

});
