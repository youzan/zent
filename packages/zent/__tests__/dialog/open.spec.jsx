import Dialog from '../../src/dialog';

const { closeDialog } = Dialog;

function openDialog(...args) {
  return Dialog.openDialog(...args);
}

describe('Dialog component', () => {
  let close;

  function unmount(arg) {
    close(arg);
    jest.runAllTimers();
  }

  it('should open a dialog when called', () => {
    close = openDialog({
      title: 'hello',
      children: 'content',
    });
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
    unmount();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('should ignore `visible` config', () => {
    close = openDialog({
      children: 'content',
      visible: false,
    });
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
    unmount();
  });

  it('supports function ref', () => {
    const onRefChagne = jest.fn();
    close = openDialog({
      children: '',
      ref: onRefChagne,
    });
    expect(onRefChagne.mock.calls.length).toBe(1);
    unmount();
    expect(onRefChagne.mock.calls.length).toBe(2);
    expect(onRefChagne.mock.calls[1][0]).toBe(null);
  });

  it('does not support string ref', () => {
    close = openDialog({
      children: '',
      ref: 'stringRefNotWorking',
    });

    // 根据DOM node找到react的component instance
    // const rootNode = document.querySelector(
    //   '.zent-dialog-r-anchor div[data-reactroot]'
    // );
    // const instance = rootNode[Object.keys(rootNode)[0]];
    // const dialog = instance._currentElement._owner._instance; // eslint-disable-line

    // expect(dialog.refs).toBeDefined();
    // expect(dialog.refs.stringRefNotWorking).toBeUndefined();

    unmount();
  });

  it('skips onClose callback if `false` is passed as argument to close', () => {
    const onClose = jest.fn();
    close = openDialog({
      children: '',
      onClose,
    });

    unmount(false);
    expect(onClose.mock.calls.length).toBe(0);
  });

  it('should call onClose callback', () => {
    const onClose = jest.fn();
    close = openDialog({
      children: '',
      onClose,
    });
    unmount();
    expect(onClose.mock.calls.length).toBe(1);

    // should be a noop when called multiple times
    close();
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('closeDialog close a given dialog', () => {
    openDialog({
      dialogId: 'foobar',
      title: 'hello',
      children: 'content',
    });
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(1);
    closeDialog('foobar');
    jest.runAllTimers();
    expect(document.querySelectorAll('.zent-dialog-r-anchor').length).toBe(0);
  });

  it('closeDialog is a noop if dialogId not found', () => {
    expect(() => closeDialog('quux')).not.toThrow();
  });

  it('openDialog throws if dialogId has duplicates', () => {
    openDialog({
      dialogId: 'foobar',
      title: 'hello',
      children: 'content',
    });

    expect(() => {
      openDialog({
        dialogId: 'foobar',
        title: 'hello',
        children: 'content',
      });
    }).toThrow();

    unmount();
  });
});
