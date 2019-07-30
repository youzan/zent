/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const warning = require('warning');

let warnValidStyle: (
  name: string,
  value: string | undefined
) => void = () => {};

if (process.env.NODE_ENV !== 'production') {
  // 'msTransform' is correct, but the other prefixes should be capitalized
  const badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
  const msPattern = /^-ms-/;
  const hyphenPattern = /-(.)/g;

  // style values shouldn't contain a semicolon
  const badStyleValueWithSemicolonPattern = /;\s*$/;

  const warnedStyleNames = {};
  const warnedStyleValues = {};
  let warnedForNaNValue = false;
  let warnedForInfinityValue = false;

  /**
   * TypeScript says:
   *   Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'. Modules are automatically in strict mode.
   *
   * make TypeScript happy
   * since this code only runs in development mode, we can ignore performance lost
   */
  const utils = {
    camelize(str: string) {
      return str.replace(hyphenPattern, (_, character) => {
        return character.toUpperCase();
      });
    },

    warnHyphenatedStyleName(name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
      warning(
        false,
        'Unsupported style property %s. Did you mean %s?',
        name,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        utils.camelize(name.replace(msPattern, 'ms-'))
      );
    },

    warnBadVendoredStyleName(name) {
      if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
        return;
      }

      warnedStyleNames[name] = true;
      warning(
        false,
        'Unsupported vendor-prefixed style property %s. Did you mean %s?',
        name,
        name.charAt(0).toUpperCase() + name.slice(1)
      );
    },

    warnStyleValueWithSemicolon(name: string, value: string) {
      if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
        return;
      }

      warnedStyleValues[value] = true;
      warning(
        false,
        "Style property values shouldn't contain a semicolon. " +
          'Try "%s: %s" instead.',
        name,
        value.replace(badStyleValueWithSemicolonPattern, '')
      );
    },

    warnStyleValueIsNaN(name: string) {
      if (warnedForNaNValue) {
        return;
      }

      warnedForNaNValue = true;
      warning(
        false,
        '`NaN` is an invalid value for the `%s` css style property.',
        name
      );
    },

    warnStyleValueIsInfinity(name: string) {
      if (warnedForInfinityValue) {
        return;
      }

      warnedForInfinityValue = true;
      warning(
        false,
        '`Infinity` is an invalid value for the `%s` css style property.',
        name
      );
    },
  };

  warnValidStyle = (name: string, value: string) => {
    if (name.indexOf('-') > -1) {
      utils.warnHyphenatedStyleName(name);
    } else if (badVendoredStyleNamePattern.test(name)) {
      utils.warnBadVendoredStyleName(name);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      utils.warnStyleValueWithSemicolon(name, value);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        utils.warnStyleValueIsNaN(name);
      } else if (!isFinite(value)) {
        utils.warnStyleValueIsInfinity(name);
      }
    }
  };
}

export default warnValidStyle;
