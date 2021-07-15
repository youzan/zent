import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
  addEventListener,
  targetMap,
  EventHandler,
} from '../../../src/utils/component/event-handler';
import { TargetEventHandlers } from '../../../src/utils/component/event-handler/TargetEventHandlers';

Enzyme.configure({ adapter: new Adapter() });

class MockTarget {
  constructor() {
    this.addEventListener = jest.fn();
    this.removeEventListener = jest.fn();
  }
}

describe('addEventListener()', () => {
  it('initializes an instance of TargetEventHandlers on new targets', () => {
    const target = new MockTarget();
    addEventListener(target, 'scroll', () => {});
    expect(targetMap.get(target)).toBeInstanceOf(TargetEventHandlers);
    expect(targetMap.get(target).target).toBe(target);
  });

  it('normalizes event options', () => {
    const target = new MockTarget();
    addEventListener(target, 'scroll', () => {}, { capture: true });

    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { capture: true }
    );
  });

  it('returns an unsubscribe function', () => {
    const target = new MockTarget();
    const remove = addEventListener(target, 'scroll', () => {}, {
      capture: true,
    });

    expect(typeof remove).toBe('function');
  });

  it('register only once', () => {
    const target = new MockTarget();
    const cb = jest.fn();
    addEventListener(target, 'scroll', cb);
    expect(target.addEventListener.mock.calls.length).toBe(1);
    addEventListener(target, 'scroll', cb);
    expect(target.addEventListener.mock.calls.length).toBe(1);
  });

  it('safe remove even when target no longer available', () => {
    const target = new MockTarget();
    const remove = addEventListener(target, 'scroll', () => {});
    targetMap.get(target).target = null;
    expect(() => remove()).not.toThrow();
  });

  it('nested remove', () => {
    const remove = addEventListener(window, 'click', () => {});
    const remove2 = addEventListener(window, 'click', () => {
      remove();
    });
    const clickEvt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    expect(() => {
      window.dispatchEvent(clickEvt);
      remove2();
      remove();
    }).not.toThrow();
  });
});

describe('EventHandler', () => {
  it('register events', () => {
    const onClick = jest.fn();
    mount(
      <EventHandler target={window} eventName="click" listener={onClick} />
    );
    const clickEvt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    window.dispatchEvent(clickEvt);
    expect(onClick.mock.calls.length).toBe(1);

    const onMove = jest.fn();
    mount(
      <>
        <EventHandler target={window} eventName="mousemove" listener={onMove} />
        <EventHandler target={window} eventName="mousemove" listener={onMove} />
      </>
    );
    const moveEvt = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    window.dispatchEvent(moveEvt);
    expect(onMove.mock.calls.length).toBe(2);
  });
});
