import { ITabsNavProps } from '../../types';

export function getRenderTabListData<Id extends string | number = string>(
  props: ITabsNavProps<Id>
) {
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
