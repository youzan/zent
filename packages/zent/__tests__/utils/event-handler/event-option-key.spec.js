import { eventOptionsKey } from '../../../src/utils/component/event-handler/event-option-key';

it('treats undefined and false the same', () => {
  expect(eventOptionsKey(undefined)).toBe(eventOptionsKey(false));
});

it('treats false and empty objects the same', () => {
  expect(eventOptionsKey(false)).toBe(eventOptionsKey({}));
});

it('treats empty objects and true differently', () => {
  expect(eventOptionsKey({})).not.toBe(eventOptionsKey(true));
});

it('treats empty objects and a good option differently', () => {
  expect(eventOptionsKey({})).not.toBe(eventOptionsKey({ capture: true }));
});

it('treats true and a good option differently', () => {
  expect(eventOptionsKey(true)).not.toBe(eventOptionsKey({ capture: true }));
});

it('treats capture and passive differently', () => {
  expect(eventOptionsKey({ capture: true })).not.toBe(
    eventOptionsKey({ passive: true })
  );
});

it('treats capture and only differently', () => {
  expect(eventOptionsKey({ capture: true })).not.toBe(
    eventOptionsKey({ only: true })
  );
});

it('treats passive and only differently', () => {
  expect(eventOptionsKey({ passive: true })).not.toBe(
    eventOptionsKey({ only: true })
  );
});

it('treats capture/passive differently from capture', () => {
  expect(eventOptionsKey({ capture: true, passive: true })).not.toBe(
    eventOptionsKey({ capture: true })
  );
});

it('treats capture/once differently from capture', () => {
  expect(eventOptionsKey({ capture: true, once: true })).not.toBe(
    eventOptionsKey({ capture: true })
  );
});

it('treats capture/once differently from capture/passive', () => {
  expect(eventOptionsKey({ capture: true, once: true })).not.toBe(
    eventOptionsKey({ capture: true, passive: true })
  );
});

it('treats capture/passive/once differently from capture/passive', () => {
  expect(
    eventOptionsKey({ capture: true, passive: true, once: true })
  ).not.toBe(eventOptionsKey({ capture: true, passive: true }));
});

it('treats capture/passive/once differently from capture/once', () => {
  expect(
    eventOptionsKey({ capture: true, passive: true, once: true })
  ).not.toBe(eventOptionsKey({ capture: true, once: true }));
});

it('does not care about the order of options', () => {
  expect(eventOptionsKey({ capture: true, passive: true, once: true })).toBe(
    eventOptionsKey({ passive: true, once: true, capture: true })
  );
});
