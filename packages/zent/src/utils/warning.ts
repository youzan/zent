/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

const __DEV__ = process.env.NODE_ENV !== 'production';

let warning = (
  _shouldBeTrue: boolean,
  _format: string,
  ..._args: string[]
) => {};

if (__DEV__) {
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

  warning = (shouldBeTrue: boolean, format: string, ...args: string[]) => {
    if (format === undefined) {
      throw new Error(
        '`warning(shouldBeTrue, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!shouldBeTrue) {
      printWarning(format, ...args);
    }
  };
}

export { warning };

// For backward compatibility with @zent/compat
export default warning;
