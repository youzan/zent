import { MediaQuery } from 'utils/enquire/MediaQuery';
import { QueryHandler } from 'utils/enquire/QueryHandler';

const QUERY = '((max-width:1000px))';

describe('MediaQuery', () => {
  let handler;
  let matchMedia;
  let mq;
  let mm;
  let mql;

  beforeEach(() => {
    matchMedia = window.matchMedia;
    mql = {
      addListener: jest.fn(cb => cb(mql)),
    };
    window.matchMedia = mm = jest.fn().mockReturnValue(mql);

    mq = new MediaQuery(QUERY);
    handler = {
      match: jest.fn(),
      unmatch: jest.fn(),
      setup: jest.fn(),
    };
  });

  afterEach(() => {
    window.matchMedia = matchMedia;
  });

  it('will add a media query listener when constructed', () => {
    expect(mql.addListener.mock.calls[0][0]).toBe(mq.listener);
  });

  it('can accept new handlers', () => {
    let originalLength = mq.handlers.length;

    mq.addHandler(handler);

    expect(originalLength).toBe(0);
    expect(mq.handlers.length).toBe(1);
  });

  it('will turn on handler when added if query is already matching', () => {
    mm.mockReturnValue({ matches: true, addListener() {} });
    mq = new MediaQuery('(max-width:1000px)');

    mq.addHandler(handler);

    expect(handler.match.mock.calls.length).toBe(1);
  });

  it('can remove handlers', () => {
    let handler2 = {
      match: jest.fn(),
      unmatch: jest.fn(),
    };
    const eqOrig = QueryHandler.prototype.equals;
    const destroyOrig = QueryHandler.prototype.destroy;
    let equals = jest.fn(function (...args) {
      return eqOrig.call(this, ...args);
    });
    let destroy = jest.fn();
    Object.assign(QueryHandler.prototype, {
      equals,
      destroy,
    });

    mq.addHandler(handler);
    mq.addHandler(handler2);

    let length = mq.handlers.length;

    mq.removeHandler(handler);

    // noops
    mq.removeHandler({});
    mq.removeHandler(() => {});

    expect(mq.handlers.length).toBe(length - 1);
    expect(equals.mock.calls.length).not.toBe(length); // ensure early exit
    expect(destroy.mock.calls.length).toBe(1); // destroy called just once

    Object.assign(QueryHandler.prototype, {
      equals: eqOrig,
      destroy: destroyOrig,
    });
  });

  it('can be short-circuited with isUnconditional flag', () => {
    mq = new MediaQuery(QUERY, true);
    mq.addHandler(handler);

    expect(mq.matches()).toBe(true);
  });

  it('destroys all handlers and removes listener when cleared', () => {
    let handler1 = {
      match: jest.fn(),
      unmatch: jest.fn(),
    };
    let handler2 = {
      match: jest.fn(),
      destroy: jest.fn(),
    };
    mq.mql = {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };

    mq.addHandler(handler1);
    mq.addHandler(handler2);
    expect(mq.handlers.length).toBe(2);
    expect(handler1.match.mock.calls.length).toBe(1);
    expect(handler2.match.mock.calls.length).toBe(1);

    mq.listener(mq.mql);
    expect(handler1.match.mock.calls.length).toBe(2);
    expect(handler2.match.mock.calls.length).toBe(2);

    mq.mql.matches = false;
    mq.listener(mq.mql);
    expect(handler1.unmatch.mock.calls.length).toBe(1);
    expect(handler2.destroy.mock.calls.length).toBe(0);

    mq.clear();
    expect(handler1.unmatch.mock.calls.length).toBe(2);
    expect(handler2.destroy.mock.calls.length).toBe(1);
    expect(mq.mql.removeListener.mock.calls[0][0]).toBe(mq.listener);
    expect(mq.handlers.length).toBe(0);
  });

  it('will consider a match if unconditional flag set or if media query matches', () => {
    mq.isUnconditional = true;
    let unconditionalMatch = mq.matches();

    mq.isUnconditional = false;
    mq.mql = { matches: true };

    let mediaQueryMatch = mq.matches();

    expect(unconditionalMatch).toBe(true);
    expect(mediaQueryMatch).toBe(true);
  });
});
