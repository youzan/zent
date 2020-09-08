function clone(options) {
  return (options || []).map(x => {
    return {
      ...x,
      children: clone(x.children),
    };
  });
}

function getNode(options, path) {
  let node = null;
  let children = options;
  for (let i = 0; i < path.length; i++) {
    const { value } = path[i];
    node = children.find(x => x.value === value);
    if (!node) {
      return null;
    }
    children = node.children;
  }

  return node;
}
