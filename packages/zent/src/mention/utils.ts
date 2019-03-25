import isEmpty from 'lodash-es/isEmpty';
import isString from 'lodash-es/isString';
import isNumber from 'lodash-es/isNumber';

// Return empty string when start is greater than end
export function substring(str, start, end) {
  if (start <= end) {
    return str.substring(start, end);
  }

  return '';
}

export function replaceSubstring(str, start, end, replacer) {
  const prefix = str.substring(0, start);
  let suffix = str.substring(end + 1);

  // Ensure suffix starts with a SPACE,
  // caret will be on the same line after replacing
  if (suffix[0] !== ' ') {
    suffix = ` ${suffix}`;
  }

  const prefixAndContent = `${prefix}${replacer}`;

  return {
    value: `${prefixAndContent}${suffix}`,
    caret: prefixAndContent.length + 1,
  };
}

export function isWhiteSpace(c) {
  return /^\s$/.test(c);
}

export function getInputNodeForTrigger(node) {
  if (!node) {
    return node;
  }

  if (node.tagName === 'INPUT') {
    return node;
  }

  return node.querySelector('input') || node;
}

export function getMenuListItems(suggestions, notFoundContent) {
  if (isEmpty(suggestions)) {
    return [
      {
        content: notFoundContent,
        value: '',
        disabled: true,
      },
    ];
  }

  return suggestions.map(item => {
    if (isString(item) || isNumber(item)) {
      return {
        content: item,
        value: item,
      };
    }

    // Otherwise, it's a config object
    return item;
  });
}
