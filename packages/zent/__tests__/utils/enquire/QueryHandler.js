import { QueryHandler } from 'utils/enquire/QueryHandler';

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
    let handler = new QueryHandler(options);
    expect(handler.initialized).toBe(true);
  });

  it('is not initialized if setup deferred', () => {
    options.deferSetup = true;
    let handler = new QueryHandler(options);

    expect(handler.initialized).toBeFalsy();
  });

  it('stores supplied handler', () => {
    let handler = new QueryHandler(options);

    expect(handler.options).toBe(options);
  });

  it('calls setup handler and sets to initialized during setup', () => {
    options.deferSetup = true;
    let handler = new QueryHandler(options);

    handler.setup();

    expect(options.setup).toHaveBeenCalled();
    expect(handler.initialized).toBe(true);
  });

  it('will call a setup function followed by on', () => {
    options.deferSetup = true;
    let handler = new QueryHandler(options);

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
    let handler = new QueryHandler(options);
    handler.off();

    expect(options.unmatch.mock.calls.length).toBe(1);
  });

  it('can test for equality', () => {
    let handler = new QueryHandler(options);

    let equalityByObject = handler.equals(options);
    let equalityByFunction = handler.equals(options.match);

    expect(equalityByObject).toBe(true);
    expect(equalityByFunction).toBe(true);
  });

  it('calls through to destroy if supplied', () => {
    let handler = new QueryHandler(options);
    handler.destroy();

    expect(options.destroy.mock.calls.length).toBe(1);
  });

  it('calls through to unmatch if destroy not available', () => {
    let spy = {
      match: jest.fn(),
      unmatch: jest.fn(),
    };
    let handler = new QueryHandler(spy);

    handler.destroy();

    expect(spy.unmatch.mock.calls.length).toBe(1);
  });
});
