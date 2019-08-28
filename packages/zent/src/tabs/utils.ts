import { IInnerTab } from './types';

export function commonTransformTabData<Id>(
  tabItem: IInnerTab<Id>,
  candel: boolean
) {
  return {
    key: tabItem.key,
    actived: tabItem.actived,
    disabled: tabItem.disabled,
    title: tabItem.title,
    className: tabItem.className,
    candel: candel && !tabItem.disabled,
  };
}
