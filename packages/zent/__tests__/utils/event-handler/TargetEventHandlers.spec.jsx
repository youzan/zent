import { TargetEventHandlers } from '../../../src/utils/component/event-handler/TargetEventHandlers';

class MockTarget {
  constructor() {
    this.addEventListener = jest.fn();
    this.removeEventListener = jest.fn();
  }
}

describe('#add()', () => {
  it('adds a single event listener to the target the first time', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const listener = () => {};
    eventHandlers.add('scroll', listener);

    expect(target.addEventListener).toHaveBeenCalledTimes(1);
    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
  });

  it('does not add an event listener to the target the second time', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const listener = () => {};
    const listener2 = () => {};
    eventHandlers.add('scroll', listener);
    eventHandlers.add('scroll', listener2);

    expect(target.addEventListener).toHaveBeenCalledTimes(1);
    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
  });

  it('adds an event listener for each set of options', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const listener = () => {};
    const listener2 = () => {};
    eventHandlers.add('scroll', listener);
    eventHandlers.add('scroll', listener2, { passive: true });

    expect(target.addEventListener).toHaveBeenCalledTimes(2);
    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });

  it('adds an event listener for each event type', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const listener = () => {};
    const listener2 = () => {};
    eventHandlers.add('scroll', listener);
    eventHandlers.add('resize', listener2);

    expect(target.addEventListener).toHaveBeenCalledTimes(2);
    expect(target.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
    expect(target.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      undefined
    );
  });

  it('returns an unsubscribe function', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});

    expect(typeof remove).toBe('function');
  });

  it('unsubscribe deletes the event listener when the only handler is removed', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    remove();

    expect(target.removeEventListener).toHaveBeenCalledTimes(1);
    expect(target.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
  });

  it('unsubscribe does not throw when called twice', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    remove();

    expect(remove).not.toThrow();
  });

  it('unsubscribe does not delete the event listener when there are more handlers left', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    eventHandlers.add('scroll', () => {});
    remove();

    expect(target.removeEventListener).toHaveBeenCalledTimes(0);
  });

  it('unsubscribe called multiple times does not delete the event listener when there are more handlers left', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    eventHandlers.add('scroll', () => {});
    remove();
    remove();

    expect(target.removeEventListener).toHaveBeenCalledTimes(0);
  });

  it('unsubscribe deletes the event listener when all handlers are removed', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    const remove2 = eventHandlers.add('scroll', () => {});
    remove();
    remove2();

    expect(target.removeEventListener).toHaveBeenCalledTimes(1);
    expect(target.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
  });

  it('unsubscribe handles different options separately', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const remove = eventHandlers.add('scroll', () => {});
    const remove2 = eventHandlers.add('scroll', () => {}, { passive: true });
    remove();
    remove2();

    expect(target.removeEventListener).toHaveBeenCalledTimes(2);
    expect(target.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      undefined
    );
    expect(target.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });
});

describe('#handleEvent', () => {
  it('calls each handler', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const handlers = [jest.fn(), jest.fn(), jest.fn()];
    handlers.forEach(handler => {
      eventHandlers.add('scroll', handler);
    });
    const event = {};
    eventHandlers.handleEvent('scroll', undefined, event);

    handlers.forEach(handler => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });
  });

  it('calls each handler even when one is removed when called', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);

    // eslint-disable-next-line prefer-const
    let remove;
    const firstHandler = jest.fn(() => remove());
    remove = eventHandlers.add('scroll', firstHandler);

    const secondHandler = jest.fn();
    eventHandlers.add('scroll', secondHandler);

    const event = {};
    eventHandlers.handleEvent('scroll', undefined, event);

    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(firstHandler).toHaveBeenCalledWith(event);

    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledWith(event);
  });

  it('calls each handler with options', () => {
    const target = new MockTarget();
    const eventHandlers = new TargetEventHandlers(target);
    const handlers = [jest.fn(), jest.fn(), jest.fn()];
    handlers.forEach(handler => {
      eventHandlers.add('scroll', handler, { passive: true });
    });
    const event = {};
    eventHandlers.handleEvent('scroll', { passive: true }, event);

    handlers.forEach(handler => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });
  });
});
