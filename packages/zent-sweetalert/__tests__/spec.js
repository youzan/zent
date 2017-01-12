import { Simulate } from 'react-addons-test-utils';

import { alert, confirm } from '../src';

let close;
function unmount(fn = close) {
  fn();
  jest.runOnlyPendingTimers();
}

function testCallback(modal, btnSelector, key) {
  const cb = jest.fn();
  close = modal({
    [key]: cb
  });

  Simulate.click(document.querySelector(btnSelector));
  expect(cb.mock.calls.length).toBe(1);
  unmount();

  let called = false;
  const cbWithArg = (closeFn) => {
    setTimeout(() => {
      closeFn();
      called = true;
    }, 2000);
  };
  close = modal({
    [key]: cbWithArg
  });
  Simulate.click(document.querySelector(btnSelector));
  jest.runOnlyPendingTimers();
  expect(called).toBe(true);
  unmount();

  called = false;
  const cbPromise = () => {
    return new Promise((resolve) => {
      called = true;
      setTimeout(resolve, 2000);
    });
  };
  close = modal({
    [key]: cbPromise
  });
  expect(called).toBe(false);
  Simulate.click(document.querySelector(btnSelector));
  jest.runOnlyPendingTimers();
  expect(called).toBe(true);
  unmount();

  called = false;
  const cbPromiseWithArg = (closeFn) => {
    expect(document.querySelector(btnSelector).classList.contains('zent-btn-loading')).toBe(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        called = true;
        closeFn(); // close manually
        expect(document.querySelector(btnSelector).classList.contains('zent-btn-loading')).toBe(true);
        resolve();
      }, 2000);
    });
  };
  close = modal({
    [key]: cbPromiseWithArg
  });
  expect(called).toBe(false);
  Simulate.click(document.querySelector(btnSelector));
  jest.runOnlyPendingTimers();
  expect(called).toBe(true);
  unmount();
}

describe('alert', () => {
  it('all configs are optional', () => {
    close = alert();
    expect(document.querySelectorAll('.zent-sweetalert-alert').length).toBe(1);
    unmount();
    expect(document.querySelectorAll('.zent-sweetalert-alert').length).toBe(0);
  });

  it('customize prefix and className', () => {
    close = alert({
      prefix: 'foobar',
      className: 'quux'
    });
    expect(document.querySelectorAll('.foobar-sweetalert-alert').length).toBe(1);
    expect(document.querySelectorAll('.quux').length).toBe(1);
    unmount();
  });

  it('can have custom content', () => {
    close = alert({
      title: 'hello',
      content: 'world',
      confirmText: 'OK'
    });
    expect(document.querySelector('.zent-sweetalert-alert .zent-dialog-r-body').textContent).toBe('world');
    expect(document.querySelector('.zent-sweetalert-alert-btn-confirm').textContent).toBe('OK');
    unmount();
  });

  it('can have onConfirm callback', () => {
    testCallback(alert, '.zent-sweetalert-alert-btn-confirm', 'onConfirm');
  });

  it('can have icon in title', () => {
    close = alert({
      type: 'success'
    });
    expect(document.querySelector('.zent-sweetalert-alert .zenticon')).toBeTruthy();
  });
});

describe('confirm', () => {
  it('all configs are optional', () => {
    close = confirm();
    expect(document.querySelectorAll('.zent-sweetalert-confirm').length).toBe(1);
    unmount();
    expect(document.querySelectorAll('.zent-sweetalert-confirm').length).toBe(0);
  });

  it('customize prefix and className', () => {
    close = confirm({
      prefix: 'foobar',
      className: 'quux'
    });
    expect(document.querySelectorAll('.foobar-sweetalert-confirm').length).toBe(1);
    expect(document.querySelectorAll('.quux').length).toBe(1);
    unmount();
  });

  it('can have custom content', () => {
    close = confirm({
      title: 'hello',
      content: 'world',
      confirmText: 'OK',
      cancelText: 'CANCEL'
    });
    expect(document.querySelector('.zent-sweetalert-confirm .zent-dialog-r-body').textContent).toBe('world');
    expect(document.querySelector('.zent-sweetalert-confirm-btn-confirm').textContent).toBe('OK');
    expect(document.querySelector('.zent-sweetalert-confirm-btn-cancel').textContent).toBe('CANCEL');
    unmount();
  });

  it('can have onConfirm callback', () => {
    testCallback(confirm, '.zent-sweetalert-confirm-btn-confirm', 'onConfirm');
  });

  it('can have onCancel callback', () => {
    testCallback(confirm, '.zent-sweetalert-confirm-btn-cancel', 'onCancel');
  });

  it('can have icon in title', () => {
    close = confirm({
      type: 'error'
    });
    expect(document.querySelector('.zent-sweetalert-confirm .zenticon')).toBeTruthy();
  });
});
