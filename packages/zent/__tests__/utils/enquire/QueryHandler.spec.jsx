import { QueryHandler } from '../../../src/utils/enquire/QueryHandler';

describe('QueryHandler', () => {
  let options;

  beforeEach(() => {
    options = {
      match: jest.fn(),
      unmatch: jest.fn(),
      setup: jest.fn(),
      destroy: jest.fn(),
    };
  });

  it('is initialized if setup not deferred', () => {
    const handler = new QueryHandler(options);
    expect(handler.initialized).toBe(true);
  });

  it('is not initialized if setup deferred', () => {
    options.deferSetup = true;
    const handler = new QueryHandler(options);

    expect(handler.initialized).toBeFalsy();
  });

  it('stores supplied handler', () => {
    const handler = new QueryHandler(options);

    expect(handler.options).toBe(options);
  });

  it('calls setup handler and sets to initialized during setup', () => {
    options.deferSetup = true;
    const handler = new QueryHandler(options);

    handler.setup();

    expect(options.setup).toHaveBeenCalled();
    expect(handler.initialized).toBe(true);
  });

  it('will call a setup function followed by on', () => {
    options.deferSetup = true;
    const handler = new QueryHandler(options);

    handler.on();

    expect(options.setup.mock.calls.length).toBe(1);
    expect(options.match.mock.calls.length).toBe(1);
  });

  it('calls match handler when turned on', () => {
    let handler = new QueryHandler(options);
    handler.on();

    handler = new QueryHandler({
      match: null,
    });
    expect(() => handler.on()).not.toThrow();
    expect(() => handler.off()).not.toThrow();

    expect(options.match.mock.calls.length).toBe(1);
  });

  it('calls unmatch handler when turned off', () => {
    const handler = new QueryHandler(options);
    handler.off();

    expect(options.unmatch.mock.calls.length).toBe(1);
  });

  it('can test for equality', () => {
    const handler = new QueryHandler(options);

    const equalityByObject = handler.equals(options);
    const equalityByFunction = handler.equals(options.match);

    expect(equalityByObject).toBe(true);
    expect(equalityByFunction).toBe(true);
  });

  it('calls through to destroy if supplied', () => {
    const handler = new QueryHandler(options);
    handler.destroy();

    expect(options.destroy.mock.calls.length).toBe(1);
  });

  it('calls through to unmatch if destroy not available', () => {
    const spy = {
      match: jest.fn(),
      unmatch: jest.fn(),
    };
    const handler = new QueryHandler(spy);

    handler.destroy();

    expect(spy.unmatch.mock.calls.length).toBe(1);
  });
});
