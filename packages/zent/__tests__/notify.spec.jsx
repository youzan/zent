import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Notify from '../src/notify';

Enzyme.configure({ adapter: new Adapter() });

describe('Notify component', () => {
  afterEach(() => {
    Notify.clear();
    jest.runAllTimers();
  });

  it('render info notify', () => {
    Notify.info('test info', 1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('render success notify', () => {
    Notify.success('test success', 1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('render warn notify', () => {
    Notify.warn('test warn', 1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('render error notify', () => {
    Notify.error('test error');
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });

  it('test duration', () => {
    Notify.error('test error', 2000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.advanceTimersByTime(1000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
    jest.advanceTimersByTime(2000);
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
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
    jest.advanceTimersByTime(1800);
    expect(document.querySelectorAll('.zent-notify').length).toBe(0);
  });

  it('custom container selector', () => {
    const div = document.createElement('div');
    div.className = 'custom-container';
    document.body.appendChild(div);

    const cb = jest.fn();
    Notify.info('test info', 3000, cb, '.custom-container');
    jest.advanceTimersByTime(1000);

    expect(
      document.querySelectorAll('.custom-container > .zent-notify-container')
        .length
    ).toBe(1);

    Notify.error('test error', 3000);
    jest.advanceTimersByTime(1000);
    expect(
      document.querySelectorAll('body > .zent-notify-container').length
    ).toBe(1);

    Notify.error('test error', 3000, cb, '.empty-class');
    jest.advanceTimersByTime(1000);
    expect(
      document.querySelectorAll('.empty-class > .zent-notify-container').length
    ).toBe(0);
  });

  it('custom container class name', () => {
    const cb = jest.fn();
    Notify.error('test error', 3000, cb, '', 'test-custom-container');
    jest.advanceTimersByTime(1000);

    expect(
      document.querySelectorAll('.zent-notify-container.test-custom-container')
        .length
    ).toBe(1);
  });

  it('Global default container selector', () => {
    const div = document.createElement('div');
    div.className = 'custom-container';
    document.body.appendChild(div);

    Notify.config({ containerSelector: '.custom-container' });
    Notify.error('test error', 2000);
    jest.advanceTimersByTime(1000);

    expect(
      document.querySelectorAll('.custom-container > .zent-notify-container')
        .length
    ).toBe(1);
  });

  it('react node content', () => {
    Notify.error(<div>test error</div>);
    expect(document.querySelectorAll('.zent-notify').length).toBe(1);
  });
});
