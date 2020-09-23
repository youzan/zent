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

export function getInputNodeForTrigger(
  node: Element | Text | null
): HTMLInputElement | HTMLTextAreaElement | null {
  if (!node || node.nodeType === Node.TEXT_NODE) {
    return null;
  }

  const elem = node as Element;
  const { tagName } = elem;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    return elem as HTMLInputElement | HTMLTextAreaElement;
  }

  return elem.querySelector('input') || elem.querySelector('textarea') || null;
}

export function getMenuListItems(suggestions, notFoundContent) {
  if (!suggestions || suggestions.length === 0) {
    return [
      {
        content: notFoundContent,
        value: '',
        disabled: true,
      },
    ];
  }

  return suggestions.map(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        content: item,
        value: item,
      };
    }

    // Otherwise, it's a config object
    return item;
  });
}
