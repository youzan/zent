import { ReactNode } from 'react';
import { IFixedProps, IInnerTab, ITabPanelProps, ITabsNavProps } from './types';

const isBoolean = val => typeof val === 'boolean';

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
    canFixed,
    candel,
  } = child.props;
  const props: IInnerTab<Id> = {
    title: tab,
    disabled,
    key: id,
    actived: activeId === id,
    panelChildren,
    className: panelClassName,
    unmountOnHide,
    canFixed,
    candel,
  };

  return props;
}

export function commonTransformTabData<Id>(
  tabItem: IInnerTab<Id>,
  propCandel: boolean,
  fixedProps: IFixedProps<Id> = {}
) {
  let candel = propCandel;
  if (isBoolean(tabItem.candel)) {
    candel = tabItem.candel;
  }
  let { canFixed, ...restFixedProps } = fixedProps;
  if (isBoolean(tabItem.canFixed)) {
    canFixed = tabItem.canFixed;
  }

  return {
    key: tabItem.key,
    actived: tabItem.actived,
    disabled: tabItem.disabled,
    title: tabItem.title,
    className: tabItem.className,
    candel: candel && !tabItem.disabled,
    canFixed,
    ...restFixedProps,
  };
}

export const getTabPanelStringTitle = (title: ReactNode) => {
  if (typeof title === 'string') return title;
  return undefined;
};

export const getFixedProps = <Id>(
  props: ITabsNavProps<Id>
): IFixedProps<Id> => {
  const { canFixed, fixedIds, onFixedChange } = props;
  const fixedProps: IFixedProps<Id> = {
    canFixed,
    onFixedChange,
  };
  if ('fixedIds' in props) {
    fixedProps.fixedIds = fixedIds;
  }
  return fixedProps;
};
