/**
 * The MIT License (MIT)

  Copyright (c) 2015 Treasure Data

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 * Adapted from https://sourcegraph.com/github.com/bvaughn/react-highlight-words/-/blob/src/Highlighter.js
 */

import * as React from 'react';
import cx from 'classnames';
import assign from 'lodash-es/assign';
import {
  findAll,
  TextMarkFindChunksFunction,
  TextMarkSanitizeFunction,
  TextMarkSearchWords,
} from './chunk';
import memoizeOne from '../utils/memorize-one';

export interface ITextMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  activeClassName: string;
  activeIndex: number;
  activeStyle: React.CSSProperties;
  highlightClassName: string | { [key: string]: string };
  highlightStyle: React.CSSProperties;
  unhighlightClassName: string;
  unhighlightStyle: React.CSSProperties;
  highlightTag: React.ElementType;
  sanitize: TextMarkSanitizeFunction;
  searchWords: TextMarkSearchWords[];
  textToHighlight: string;
  autoEscape: boolean;
  caseSensitive: boolean;
  className: string;
  findChunks: TextMarkFindChunksFunction;
}

function lowercaseProps(object: { [key: string]: any }) {
  const mapped: { [key: string]: any } = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      mapped[key.toLowerCase()] = object[key];
    }
  }
  return mapped;
}
const memoizedLowercaseProps = memoizeOne(lowercaseProps);

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <span>s (wrapping highlighted words).
 */
export function TextMark({
  textToHighlight,
  searchWords,
  highlightClassName = '',
  highlightStyle = {},
  activeIndex = -1,
  activeClassName = '',
  activeStyle,
  unhighlightClassName = '',
  unhighlightStyle,
  highlightTag = 'mark',
  autoEscape = false,
  caseSensitive = false,
  sanitize,
  findChunks,
  className,
  ...rest
}: ITextMarkProps) {
  const chunks = findAll({
    autoEscape,
    caseSensitive,
    findChunks,
    sanitize,
    searchWords,
    textToHighlight,
  });
  const HighlightTag = highlightTag;
  let highlightIndex = -1;
  let highlightClassNames = '';
  let highlightStyles: React.CSSProperties;

  return (
    <span className={className} {...rest}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start
        );

        if (chunk.highlight) {
          highlightIndex++;

          let highlightClass: string;
          if (typeof highlightClassName === 'object') {
            if (!caseSensitive) {
              highlightClassName = memoizedLowercaseProps(highlightClassName);
              highlightClass = highlightClassName[text.toLowerCase()];
            } else {
              highlightClass = highlightClassName[text];
            }
          } else {
            highlightClass = highlightClassName;
          }

          const isActive = highlightIndex === +activeIndex;

          highlightClassNames = cx(highlightClass, {
            [activeClassName]: isActive,
          });
          highlightStyles =
            isActive === true && activeStyle != null
              ? assign({}, highlightStyle, activeStyle)
              : highlightStyle;

          // Don't attach arbitrary props to DOM elements; this triggers React DEV warnings (https://fb.me/react-unknown-prop)
          // Only pass through the highlightIndex attribute for custom components.
          const props =
            typeof HighlightTag !== 'string'
              ? {
                  highlightIndex,
                }
              : {};

          return (
            <HighlightTag
              key={index}
              className={highlightClassNames}
              style={highlightStyles}
              {...props}
            >
              {text}
            </HighlightTag>
          );
        } else {
          return (
            <span
              key={index}
              className={unhighlightClassName}
              style={unhighlightStyle}
            >
              {text}
            </span>
          );
        }
      })}
    </span>
  );
}
