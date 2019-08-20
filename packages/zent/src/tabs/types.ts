import { PropsWithChildren } from 'react';

export interface ITab<Id extends string | number = string> {
  key: Id;
  title: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface IInnerTab<Id extends string | number = string>
  extends ITab<Id> {
  actived: boolean;
  content?: React.ReactNode;
}

export type TabType = 'normal' | 'card' | 'button' | 'vertical';
export type TabAlign = 'left' | 'right' | 'center';
export type TabNavExtraContentAlign = 'left' | 'right';

export type ITabPanelElement<
  Id extends string | number = string
> = React.ReactElement<PropsWithChildren<ITabPanelProps<Id>>>;

export interface ITabsAndTabsNavCommonProps<
  Id extends string | number = string
> {
  align: TabAlign;
  onChange: (id: Id) => void;
  onDelete: (id: Id) => void;
  candel: boolean;
  stretch: boolean;
  navExtraContent: React.ReactNode;
  navExtraContentAlign: TabNavExtraContentAlign;
}

export interface ITabsProps<Id extends string | number = string>
  extends Partial<ITabsAndTabsNavCommonProps<Id>> {
  activeId: Id;
  className?: string;
  tabs?: Array<ITab<Id>>;
  type?: TabType;
  children?: ITabPanelElement<Id> | Array<ITabPanelElement<Id>>;
}

export interface ITabsNavProps<Id extends string | number = string>
  extends ITabsAndTabsNavCommonProps<Id> {
  tabListData: Array<IInnerTab<Id>>;
}

export interface ITabProps<Id extends string | number = string> {
  id: Id;
  onSelected: (id: Id) => void;
  onDelete: (id: Id) => void;
  actived?: boolean;
  disabled?: boolean;
  candel?: boolean;
}

export interface ITabPanelProps<Id extends string | number = string> {
  id: Id;
  tab: React.ReactNode;
  className?: string;
  actived?: boolean;
  disabled?: boolean;
}
