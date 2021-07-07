import { MediaQueryDispatch } from '../../../src/utils/enquire/MediaQueryDispatch';
import { MediaQuery } from '../../../src/utils/enquire/MediaQuery';
import { QueryHandler } from '../../../src/utils/enquire/QueryHandler';

function spyOn(prototype, methods, cb) {
  const originals = methods.map(m => prototype[m]);
  const mocks = [];
  Object.assign(
    prototype,
    methods.reduce((mock, m) => {
      mock[m] = jest.fn();
      mocks.push(mock[m]);
      return mock;
    }, {})
  );
  cb(mocks);
  Object.assign(
    prototype,
    methods.reduce((mock, m, i) => {
      mock[m] = originals[i];
      return mock;
    }, {})
  );
}

describe('MediaQueryDispatch', () => {
  const query = 'max-width:1000px';
  let matchMedia;

  beforeEach(() => {
    matchMedia = window.matchMedia;
    const mql = {
      matches: true,
      addListener: jest.fn(cb => cb(mql)),
      removeListener: jest.fn(),
    };
    window.matchMedia = jest.fn(() => mql);
  });

  afterEach(() => {
    window.matchMedia = matchMedia;
  });

  it('throws if matchMedia is not present', () => {
    window.matchMedia = undefined;

    expect(() => {
      // eslint-disable-next-line
      new MediaQueryDispatch();
    }).toThrowError(
      'matchMedia not present, legacy browsers require a polyfill'
    );
  });

  it('tests for browser capability', () => {
    const mqd = new MediaQueryDispatch();

    expect(window.matchMedia).toHaveBeenCalled();
    expect(mqd.browserIsIncapable).toBe(false);
  });

  it('allows a match function to be registered', () => {
    const mqd = new MediaQueryDispatch();
    mqd.register(query, () => {});

    const mediaQuery = mqd.queries[query];
    expect(mediaQuery).not.toBe(undefined);
    expect(mediaQuery.handlers.length).toBe(1);
  });

  it('shouldDegrade', () => {
    const mqd = new MediaQueryDispatch();
    mqd.register(query, () => {}, true);

    expect(window.matchMedia).toHaveBeenCalled();
    expect(mqd.browserIsIncapable).toBe(false);
  });

  it('allows handler objects to be registered', () => {
    const mqd = new MediaQueryDispatch();
    mqd.register(query, {});

    expect(mqd.queries[query].handlers.length).toBe(1);
  });

  it('allows arrays of handlers to be registered', () => {
    const mqd = new MediaQueryDispatch();
    const handlers = [{}, {}, {}, () => {}];

    mqd.register(query, handlers);

    expect(mqd.queries[query].handlers.length).toBe(handlers.length);
  });

  it('allows multiple handlers for same query to be registered at different times', () => {
    const mqd = new MediaQueryDispatch();
    spyOn(MediaQuery.prototype, ['addHandler'], ([spy]) => {
      mqd.register(query, {});
      mqd.register(query, {});

      expect(spy.mock.calls.length).toBe(2);
    });
  });

  it('allows entire queries to be unregistered', () => {
    const mqd = new MediaQueryDispatch();
    spyOn(QueryHandler.prototype, ['destroy'], ([destroy]) => {
      const handlers = [{ match: jest.fn() }, { match: jest.fn() }];

      mqd.register(query, handlers);
      mqd.unregister(query);

      expect(destroy.mock.calls.length).toBe(handlers.length);
      expect(mqd.queries[query]).toBe(undefined);
    });
  });

  it('allows individual handlers to be unregistered', () => {
    const mqd = new MediaQueryDispatch();
    spyOn(MediaQuery.prototype, ['removeHandler'], ([removeSpy]) => {
      const handlers = [{ match: jest.fn() }, { match: jest.fn() }];

      mqd.register(query, handlers);
      mqd.unregister(query, handlers[1]);

      expect(removeSpy.mock.calls.length).toBe(1);

      mqd.unregister(query, handlers[0]);
      expect(removeSpy.mock.calls.length).toBe(2);
    });
  });

  it('returns if unregister unrecognized media query', () => {
    const mqd = new MediaQueryDispatch();
    spyOn(
      MediaQuery.prototype,
      ['removeHandler', 'destroy'],
      ([removeSpy, destroySpy]) => {
        const handler = { match: jest.fn() };

        mqd.register(query, handler);
        const result = mqd.unregister('klgfjglkfdsajflkj', handler);

        expect(removeSpy).not.toHaveBeenCalled();
        expect(destroySpy).not.toHaveBeenCalled();
        expect(result).toBe(mqd);
      }
    );
  });
});
