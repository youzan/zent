import { IInnerTab, ITabPanelProps } from './types';

export function getTabDataFromChild<Id>(
  child: React.ReactElement<React.PropsWithChildren<ITabPanelProps<Id>>>,
  activeId: Id
) {
  const {
    id,
    disabled,
    tab,
    children: panelChildren,
    className: panelClassName,
    unmountOnHide,
  } = child.props;
  const props: IInnerTab<Id> = {
    title: tab,
    disabled,
    key: id,
    actived: activeId === id,
    panelChildren,
    className: panelClassName,
    unmountOnHide,
  };

  return props;
}

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
