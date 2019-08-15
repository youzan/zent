import { ITabsNavProps } from './types';

export function getOffsetWH(node: HTMLElement) {
  return node.offsetWidth;
}

// 获取偏移量
export function getOffsetLT(node: HTMLElement) {
  const clientRect = node.getBoundingClientRect();
  return clientRect.left;
}

export function getWidth<Id extends string | number = string>(
  props: ITabsNavProps<Id>
) {
  // 当 align 为 center 时做处理
  const { align, tabListData } = props;

  if (align === 'center') {
    let width = '';
    let lastWidth = '';
    const childCount = tabListData.length;
    width = `${(1 / childCount) * 100}%`;
    lastWidth = `${(1 - (1 / childCount) * (childCount - 1)) * 100}%`;
    return {
      width,
      lastWidth,
    };
  }
  return {};
}

export function getRenderTabListData<Id extends string | number = string>(
  props: ITabsNavProps<Id>
) {
  const widthInfo = getWidth(props);
  const { tabListData, candel } = props;

  return tabListData.map((tabItem, i) => {
    return {
      key: tabItem.key,
      actived: tabItem.actived,
      disabled: tabItem.disabled,
      title: tabItem.title,
      className: tabItem.className,
      candel: candel && !tabItem.disabled,
    };
  });
}
