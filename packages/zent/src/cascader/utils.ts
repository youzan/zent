import { ICascaderItem, CascaderValue } from './types';

/**
 * 查找树中某个节点的子节点
 */
export function findNextOptions(options: ICascaderItem[], id: unknown) {
  if (options?.length > 0) {
    const currOptions = options.find(it => it.value === id);
    if (currOptions && Array.isArray(currOptions.children)) {
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
  getPathInTree(data, values);

  [
    { value: 'a', children: [...] },
    { value: 'b', children: [...] },
    { value: 'c' }
  ]
 */
export function getPathInTree<Item extends ICascaderItem>(
  value: CascaderValue[] | Array<CascaderValue[]>,
  options?: Item[]
) {
  const selected: Item[] = [];

  if (options?.length > 0 && value?.length > 0) {
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
 * 赋值父节点的指向 parent 字段给所有叶子节点
 * @param children 子节点列表
 * @param parent 父节点
 */
export function linkChildrenNode(
  children: ICascaderItem[],
  parent: ICascaderItem | null = null
) {
  if (Array.isArray(children)) {
    children.forEach(item => {
      item.parent = parent;
      linkChildrenNode(item.children, item);
    });
  }
}

/**
 * 递归选中后代节点
 */
function toggleChildren(node: ICascaderItem, checked: boolean) {
  node.checked = checked;
  node.indeterminate = false;

  if (Array.isArray(node.children)) {
    node.children.forEach(item => {
      if (!item.disabled) {
        toggleChildren(item, checked);
      }
    });
  }
}

/**
 * 递归更新祖先节点状态
 */
function updateParentState(parent: ICascaderItem | null) {
  if (parent) {
    const children = parent.children;
    const everyChecked = children.every(item => item.checked);
    parent.checked = everyChecked;
    parent.indeterminate = everyChecked
      ? false
      : children.some(item => item.checked || item.indeterminate);

    updateParentState(parent.parent);
  }
}

function recursiveFlattenTree(
  list: ICascaderItem[],
  path: ICascaderItem[]
): Array<ICascaderItem[]> {
  let result = [] as Array<ICascaderItem[]>;

  list.forEach(node => {
    const currentPath = path.concat(node);

    if (Array.isArray(node.children)) {
      result = result.concat(recursiveFlattenTree(node.children, currentPath));
    } else {
      result.push(currentPath);
    }
  });

  return result;
}

/**
 * 平铺树形结构
 * @param tree 树形结构
 */
export function flattenTree(tree: ICascaderItem[]): Array<ICascaderItem[]> {
  return recursiveFlattenTree(tree, []);
}

/**
 * 获取所有选中的节点
 */
function getCheckedOptions(tree: ICascaderItem[]) {
  const flattenNodes = flattenTree(tree);
  return flattenNodes.filter(list => list[list.length - 1].checked);
}

/**
 * 更新节点的选中状态，获取所有选中的值
 */
export function checkTreeNode(
  tree: ICascaderItem[],
  node: ICascaderItem,
  checked: boolean
): Array<ICascaderItem[]> {
  // 1. 遍历子节点
  toggleChildren(node, checked);

  // 2. 遍历父节点
  updateParentState(node.parent);

  // 3. 获取所有选中的节点
  return getCheckedOptions(tree);
}

/**
 * 清空节点的选中状态
 */
export function uncheckAll(tree: ICascaderItem[]) {
  tree.forEach(node => toggleChildren(node, false));
}

/**
 * 更新树所有节点的状态及获取值对应的 options
 */
export function updateTreeState(
  tree: ICascaderItem[],
  values: Array<CascaderValue[]>
): Array<ICascaderItem[]> {
  const result = [];

  if (values?.length > 0) {
    values.forEach(value => {
      const nodePath = getPathInTree(value, tree);
      result.push(nodePath);

      const leafNode = nodePath[nodePath.length - 1];

      // 1. 遍历子节点
      toggleChildren(leafNode, true);

      // 2. 遍历父节点
      updateParentState(leafNode.parent);
    });
  }

  return result;
}

/**
 * 将平铺结构转换成树
 */
export function buildTree(tree: ICascaderItem[], selected: ICascaderItem[]) {
  const firstNode = selected[0];

  if (selected.length > 1) {
    firstNode.children = [];
    buildTree(firstNode.children, selected.slice(1));
  }

  tree.push(firstNode);
  return firstNode;
}

/**
 * 将节点插入到树中
 */
export function appendNodeInTree(
  tree: ICascaderItem[],
  selected: ICascaderItem[]
) {
  const firstNodeValue = selected[0].value;
  const target = tree.find(item => item.value === firstNodeValue);

  if (target) {
    if (selected.length > 1) {
      target.children = target.children || [];
      appendNodeInTree(target.children, selected.slice(1));
    }
  } else if (selected.length > 0) {
    tree.push(buildTree([], selected));
  }
}

/**
 * 获取级联项的文本
 */
export const getOptionsLabel = (items: ICascaderItem[]): string =>
  items.map(it => it.label).join(' / ');

/**
 * 获取级联项的值
 */
export const getOptionsValue = (items: ICascaderItem[]): string =>
  items.map(it => it.value).join('-');
