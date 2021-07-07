/**
 * Similar to `warning`, but only warns once for each id.
 */
const __DEV__ = process.env.NODE_ENV !== 'production';

let warningOnce = (
  _shouldBeTrue: boolean,
  _id: string,
  _format: string,
  ..._args: string[]
) => {};

if (__DEV__) {
  const warningCache = {};

  const printWarning = (format: string, ...args: string[]) => {
    let argIndex = 0;
    const message = 'Warning: ' + format.replace(/%s/g, () => args[argIndex++]);
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the call site that caused this warning to fire.
      throw new Error(message);
    } catch (x) {
      // silent
    }
  };

  warningOnce = (
    shouldBeTrue: boolean,
    id: string,
    format: string,
    ...args: string[]
  ) => {
    if (id === undefined) {
      throw new Error(
        '`warningOnce(shouldBeTrue, id, format, ...args)` requires a warning ' +
          'id argument'
      );
    }

    if (format === undefined) {
      throw new Error(
        '`warningOnce(shouldBeTrue, id, format, ...args)` requires a warning ' +
          'message argument'
      );
    }

    if (!warningCache[id] && !shouldBeTrue) {
      warningCache[id] = true;
      printWarning(format, ...args);
    }
  };
}

export { warningOnce };
