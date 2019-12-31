import wrap from 'jest-wrap';

let canUsePassiveEventListeners;
beforeEach(() => {
  jest.resetModules();
  // eslint-disable-next-line global-require
  canUsePassiveEventListeners = require('utils/component/event-handler/supports-passive')
    .canUsePassiveEventListeners;
});

describe('when not canUseDOM', () => {
  beforeEach(() => {
    jest.mock('utils/isBrowser', () => ({
      default: false,
    }));
  });

  it('returns false', () => {
    expect(canUsePassiveEventListeners()).toEqual(false);
  });

  it('returns false multiple times', () => {
    expect(canUsePassiveEventListeners()).toEqual(false);
    expect(canUsePassiveEventListeners()).toEqual(false);
  });
});

wrap()
  .withGlobal('window', () => ({
    addEventListener() {},
    removeEventListener() {},
  }))
  .describe('when canUseDOM', () => {
    beforeEach(() => {
      jest.mock('utils/isBrowser', () => ({
        default: true,
      }));
    });

    wrap()
      .withOverride(
        () => window,
        'addEventListener',
        () => null
      )
      .describe('when addEventListener is not present', () => {
        it('returns false', () => {
          expect(canUsePassiveEventListeners()).toEqual(false);
        });

        it('returns false multiple times', () => {
          expect(canUsePassiveEventListeners()).toEqual(false);
          expect(canUsePassiveEventListeners()).toEqual(false);
        });
      });

    wrap()
      .withOverrides(
        () => window,
        () => ({
          addEventListener: jest.fn(),
          removeEventListener: null,
        })
      )
      .describe('when removeEventListener is not present', () => {
        it('returns false', () => {
          expect(canUsePassiveEventListeners()).toEqual(false);
        });

        it('returns false multiple times', () => {
          expect(canUsePassiveEventListeners()).toEqual(false);
          expect(canUsePassiveEventListeners()).toEqual(false);
        });

        it('does not call addEventListener', () => {
          canUsePassiveEventListeners();
          expect(window.addEventListener).toHaveBeenCalledTimes(0);
        });
      });

    wrap()
      .withOverrides(
        () => window,
        () => ({
          addEventListener: jest.fn(),
        })
      )
      .describe(
        'when addEventListener and removeEventListener are present',
        () => {
          it('calls addEventListener', () => {
            canUsePassiveEventListeners();
            expect(window.addEventListener).toHaveBeenCalledTimes(1);
          });
        }
      );

    wrap()
      .withOverride(
        () => window,
        'addEventListener',
        () =>
          jest.fn(
            (event, listener, options) => options.passive /* invoke a getter */
          )
      )
      .describe('when "passive" property is accessed', () => {
        it('returns true', () => {
          expect(canUsePassiveEventListeners()).toEqual(true);
          expect(window.addEventListener).toHaveBeenCalledTimes(1);
        });

        it('is memoized', () => {
          expect(canUsePassiveEventListeners()).toEqual(true);
          expect(canUsePassiveEventListeners()).toEqual(true);
          expect(window.addEventListener).toHaveBeenCalledTimes(1);
        });
      });
  });
