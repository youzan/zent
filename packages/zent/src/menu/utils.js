export function getKeyFromChildrenIndex(child, index, subPrefix = 'item') {
  return child.key || `${subPrefix}_${index}`;
}

export function getExtraStyle({ isInline, depth, inlineIndent }) {
  let styleObject = {};

  if (isInline) {
    styleObject = {
      paddingLeft: `${depth * inlineIndent}px`,
    };
  }

  return styleObject;
}
