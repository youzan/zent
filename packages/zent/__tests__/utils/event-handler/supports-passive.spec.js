let canUsePassiveEventListeners;
let prevAddEventListener;
let prevRemoveEventListener;

describe('when not canUseDOM', () => {
  beforeEach(() => {
    jest.resetModules();

    jest.mock('utils/isBrowser', () => false);

    canUsePassiveEventListeners =
      // eslint-disable-next-line global-require
      require('../../../src/utils/component/event-handler/supports-passive').canUsePassiveEventListeners;
  });

  it('returns false', () => {
    expect(canUsePassiveEventListeners()).toEqual(false);
  });

  it('returns false multiple times', () => {
    expect(canUsePassiveEventListeners()).toEqual(false);
    expect(canUsePassiveEventListeners()).toEqual(false);
  });
});

describe('when canUseDOM', () => {
  beforeAll(() => {
    prevAddEventListener = window.addEventListener;
    prevRemoveEventListener = window.removeEventListener;
  });

  afterAll(() => {
    window.addEventListener = prevAddEventListener;
    window.removeEventListener = prevRemoveEventListener;
  });

  beforeEach(() => {
    jest.resetModules();

    jest.mock('utils/isBrowser', () => true);

    canUsePassiveEventListeners =
      // eslint-disable-next-line global-require
      require('../../../src/utils/component/event-handler/supports-passive').canUsePassiveEventListeners;
  });

  describe('when addEventListener is not present', () => {
    beforeAll(() => {
      prevAddEventListener = window.addEventListener;

      window.addEventListener = null;
    });

    afterAll(() => {
      window.addEventListener = prevAddEventListener;
    });

    it('returns false', () => {
      expect(canUsePassiveEventListeners()).toEqual(false);
    });

    it('returns false multiple times', () => {
      expect(canUsePassiveEventListeners()).toEqual(false);
      expect(canUsePassiveEventListeners()).toEqual(false);
    });
  });

  describe('when removeEventListener is not present', () => {
    beforeAll(() => {
      prevAddEventListener = window.addEventListener;
      prevRemoveEventListener = window.removeEventListener;

      window.addEventListener = jest.fn();
      window.removeEventListener = null;
    });

    afterAll(() => {
      window.addEventListener = prevAddEventListener;
      window.removeEventListener = prevRemoveEventListener;
    });

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

  describe('when addEventListener and removeEventListener are present', () => {
    beforeAll(() => {
      prevAddEventListener = window.addEventListener;
      prevRemoveEventListener = window.removeEventListener;

      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();
    });

    afterAll(() => {
      window.addEventListener = prevAddEventListener;
      window.removeEventListener = prevRemoveEventListener;
    });

    it('calls addEventListener', () => {
      canUsePassiveEventListeners();
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    });
  });

  describe('when "passive" property is accessed', () => {
    beforeAll(() => {
      prevAddEventListener = window.addEventListener;

      window.addEventListener = jest.fn(
        (event, listener, options) => options.passive
      );
    });

    afterAll(() => {
      window.addEventListener = prevAddEventListener;
    });

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
