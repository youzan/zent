import { ICascaderItem, ICascaderValue } from '../types';

/**
 * 查找树中某个节点的子节点
 */
export function recursiveNextOptions(options: ICascaderItem[], id: unknown) {
  if (options && options.length > 0) {
    const currOptions = options.find(it => it.value === id);
    if (currOptions && currOptions.children) {
      return currOptions.children;
    }
  }

  return null;
}

/**
 * 从树形数据中查找匹配的节点
  const data = [{
    value: 'a',
    children: [{
      value: 'b',
      children: [{
        value: 'c'
      }, {
        value: 'd',
      }]
    }],
  }];
  const values = ['a', 'b', 'c'];
  const result = arrayTreeFilter(data, values);

  console.log(result);
  [
    { value: 'a', children: [...] },
    { value: 'b', children: [...] },
    { value: 'c', children: [...] }
  ]
 */
export function arrayTreeFilter<Item extends ICascaderItem>(
  value: ICascaderValue[] | Array<ICascaderValue[]>,
  options?: Item[]
) {
  const selected: Item[] = [];

  if (options && options.length > 0 && value && value.length > 0) {
    for (let i = 0; i < value.length; i++) {
      const id = value[i];
      const nextOption = options.find(it => it.value === id);
      if (!nextOption) break;

      options = (nextOption.children as Item[]) || [];
      selected.push(nextOption);
    }
  }

  return selected;
}

/**
 * 比较两个数组是否相等
 */
export function isEqualArrays(arrA: any[], arrB: any[]): boolean {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  const len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}

/**
 * 初始化 tree 的数据结构
 */
export function linkedTreeNode(
  tree: ICascaderItem[],
  parent: ICascaderItem | null = null
) {
  if (Array.isArray(tree)) {
    tree.forEach(item => {
      item.parent = parent;
      linkedTreeNode(item.children, item);
    });
  }
}

function checkedChildrenNode(node: ICascaderItem, checked: boolean) {
  node.checked = checked;
  node.indeterminate = false;

  if (Array.isArray(node.children)) {
    node.children.forEach(item => {
      if (!item.disabled) {
        checkedChildrenNode(item, checked);
      }
    });
  }
}

function checkedParentNode(parent: ICascaderItem | null) {
  if (parent) {
    const children = parent.children;
    const everyChecked = children.every(item => item.checked);
    parent.checked = everyChecked;
    parent.indeterminate = everyChecked
      ? false
      : children.some(item => item.checked || item.indeterminate);

    checkedParentNode(parent.parent);
  }
}

/**
 * 平铺树形结构
 */
export function flattenTree(
  tree: ICascaderItem[],
  sum: ICascaderItem[] = []
): Array<ICascaderItem[]> {
  let result = [] as Array<ICascaderItem[]>;

  tree.forEach(node => {
    const path = sum.concat(node);

    if (Array.isArray(node.children)) {
      result = result.concat(flattenTree(node.children, path));
    } else {
      result.push(path);
    }
  });

  return result;
}

function traverseTree4CheckedOptions(tree: ICascaderItem[]) {
  const flattenNodes = flattenTree(tree);
  return flattenNodes.filter(list => list[list.length - 1].checked);
}

/**
 * 树中某一个节点的复选框选中时
 */
export function checkedTreeNode(
  tree: ICascaderItem[],
  node: ICascaderItem,
  checked: boolean
): Array<ICascaderItem[]> {
  // 1. 遍历子节点
  checkedChildrenNode(node, checked);

  // 2. 遍历父节点
  checkedParentNode(node.parent);

  // 3. 获取所有选中的节点
  return traverseTree4CheckedOptions(tree);
}

/**
 * 清空节点的选中状态
 */
export function uncheckAllNode(tree: ICascaderItem[]) {
  tree.forEach(node => checkedChildrenNode(node, false));
}

/**
 * 初始化选中的节点
 */
export function initialCheckedNodes(
  tree: ICascaderItem[],
  values: Array<ICascaderValue[]>
) {
  const result = [];

  if (values && values.length > 0) {
    values.forEach(value => {
      const checkedNodes = arrayTreeFilter(value, tree);
      result.push(checkedNodes);

      const leafNode = checkedNodes[checkedNodes.length - 1];

      // 1. 遍历子节点
      checkedChildrenNode(leafNode, true);

      // 2. 遍历父节点
      checkedParentNode(leafNode.parent);
    });
  }

  return result;
}
