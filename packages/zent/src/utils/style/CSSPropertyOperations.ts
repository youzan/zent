/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dangerousStyleValue from './dangerousStyleValue';
import warnValidStyle from './warnValidStyle';

import { CSSProperties } from 'react';

/**
 * Operations for dealing with CSS properties.
 */

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
export function setValueForStyles(node: HTMLElement, styles: CSSProperties) {
  const style = node.style;
  const keys = Object.keys(styles) as Array<keyof CSSProperties>;
  for (let i = 0; i < keys.length; i += 1) {
    let styleName = keys[i];
    const isCustomProperty = styleName.indexOf('--') === 0;
    if (process.env.NODE_ENV !== 'production') {
      if (!isCustomProperty) {
        warnValidStyle(styleName, styles[styleName as any]);
      }
    }
    const styleValue = dangerousStyleValue(
      styleName,
      styles[styleName],
      isCustomProperty
    );
    if (styleName === 'float') {
      styleName = 'cssFloat' as any;
    }
    if (isCustomProperty) {
      style.setProperty(styleName, styleValue);
    } else {
      style[styleName as any] = styleValue;
    }
  }
}
