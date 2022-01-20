import { PropsWithChildren, ComponentType, ReactElement } from 'react';

export interface IVerticalDivide {
  divide: true;
}

export interface IFixedProps<Id = string | number> {
  canFixed?: boolean;
  fixedIds?: Id[];
  onFixedChange?: (ids: Id[]) => void;
}

export interface ITab<Id> {
  key: Id;
  title: React.ReactNode;
  disabled?: boolean;
  className?: string;
  canFixed?: boolean;
  candel?: boolean;
}

export type IVerticalTab<Id> = ITab<Id> | IVerticalDivide;

export interface IInnerTab<Id> extends ITab<Id>, IFixedProps<Id> {
  actived: boolean;
  unmountOnHide?: boolean;
  panelChildren?: React.ReactNode;
  candel?: boolean;
}

export type IVerticalInnerTab<Id> = IInnerTab<Id> | IVerticalDivide;

export type TabType = 'normal' | 'card' | 'button';
export type ITabOverflowMode = 'slide' | 'anchor';
export interface ITabPanelProps<Id> {
  id: Id;
  tab: React.ReactNode;
  className?: string;
  disabled?: boolean;
  actived?: boolean;
  unmountOnHide?: boolean;
  canFixed?: boolean;
  candel?: boolean;
}

export type IVerticalTabPanelProps<Id> = ITabPanelProps<Id> | IVerticalDivide;

export type ITabPanelElement<TabPanelProps> = React.ReactElement<
  PropsWithChildren<TabPanelProps>
>;

export interface IBaseTabsProps<Id, TabPanelProps> {
  onChange: (id: Id) => void;
  activeId: Id;
  className?: string;
  tabs?: Array<ITab<Id>>;
  unmountPanelOnHide?: boolean;
  disableLazyMount?: boolean;
  children?:
    | ITabPanelElement<TabPanelProps>
    | Array<ITabPanelElement<TabPanelProps>>;
}

export interface ITabsProps<Id>
  extends IBaseTabsProps<Id, ITabPanelProps<Id>>,
    IFixedProps<Id> {
  onDelete: (id: Id) => void;
  onAdd: () => void;
  candel: boolean;
  stretch: boolean;
  navExtraContent: React.ReactNode;
  type?: TabType;
  overflowMode?: ITabOverflowMode;
  renderTabBar?: (
    props: ITabsNavProps<Id>,
    TabBar: ComponentType<ITabsNavProps<any>>
  ) => ReactElement;
}

export interface IVerticalTabsProps<Id>
  extends IBaseTabsProps<Id, IVerticalTabPanelProps<Id>> {
  scrollHeight?: React.CSSProperties['maxHeight'];
}

export interface IBaseTabsNavProps<Id, InnerTab> {
  onChange: (id: Id) => void;
  tabDataList: InnerTab[];
}

export interface ITabsNavProps<Id>
  extends IBaseTabsNavProps<Id, IInnerTab<Id>>,
    IFixedProps<Id> {
  onDelete: (id: Id) => void;
  candel: boolean;
  stretch: boolean;
  navExtraContent: React.ReactNode;
  type: TabType;
  overflowMode: ITabOverflowMode;
  onAdd?: () => void;
  activeId: Id;
  className?: string;
  style?: React.CSSProperties;
}

export interface ITabNavState {
  fixed: boolean;
}

export interface IVerticalTabsNavProps<Id>
  extends IBaseTabsNavProps<Id, IVerticalInnerTab<Id>> {
  scrollHeight?: React.CSSProperties['maxHeight'];
}

export interface ITabProps<Id> extends IFixedProps<Id> {
  id: Id;
  onSelected: (id: Id) => void;
  onDelete?: (id: Id) => void;
  actived?: boolean;
  disabled?: boolean;
  candel?: boolean;
}
