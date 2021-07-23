import isBrowser from '../../isBrowser';
import memorize from '../../memorize-one';

// Adapted from Modernizr
// https://github.com/Modernizr/Modernizr/blob/acb3f0d9/feature-detects/dom/passiveeventlisteners.js#L26-L37
function testPassiveEventListeners() {
  if (!isBrowser) {
    return false;
  }

  if (
    !window.addEventListener ||
    !window.removeEventListener ||
    !Object.defineProperty
  ) {
    return false;
  }

  let supportsPassiveOption = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveOption = true;
        return true;
      },
    });
    const noop = () => {};
    // eslint-disable-next-line ban/ban
    window.addEventListener('testPassiveEventSupport', noop, opts);
    // eslint-disable-next-line ban/ban
    window.removeEventListener('testPassiveEventSupport', noop, opts);
  } catch (e) {
    // silent on errors
  }

  return supportsPassiveOption;
}

export const canUsePassiveEventListeners = memorize(testPassiveEventListeners);
