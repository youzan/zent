import React from 'react';

export function getKeyFromChildrenIndex(child, index) {
  return child.key || `item_${index}`;
}

export function noop() {}

export function renderCommonMenuItem(onClick, c, i, extraProps) {
  const newChildProps = {
    index: getKeyFromChildrenIndex(c, i),
    onClick,
    ...extraProps
  };

  return React.cloneElement(c, newChildProps);
}
