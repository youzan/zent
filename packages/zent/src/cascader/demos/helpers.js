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

function insertPath(options, path) {
  const stack = [
    {
      children: options,
      node: path.shift(),
    },
  ];

  while (stack.length > 0) {
    const frame = stack.pop();
    if (!frame) {
      continue;
    }

    const { children, node } = frame;

    // done
    if (!node) {
      break;
    }

    const nval = node.value;
    let matchedNode = children.find(n => n.value === nval);
    if (!matchedNode) {
      matchedNode = { ...node, children: [] };
      children.push(matchedNode);
    }

    stack.push({
      children: matchedNode.children,
      node: path.shift(),
    });
  }

  return options;
}
