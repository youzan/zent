export interface ITab<Id extends string | number = string> {
  key: Id;
  title: React.ReactNode;
  disabled?: boolean;
  className?: string;

  onTabReady?: (id: Id) => void;
}

export interface IInnerTab<Id extends string | number = string>
  extends ITab<Id> {
  actived: boolean;
  content?: React.ReactNode;
}

export type TabType = 'normal' | 'card' | 'button' | 'vertical';
export type TabSize = 'normal' | 'huge';
export type TabAlign = 'left' | 'right' | 'center';

export interface ITabsProps<Id extends string | number = string> {
  activeId: Id;
  className?: string;
  tabs?: Array<ITab<Id>>;
  type?: TabType;
  size?: TabSize;
  align?: TabAlign;
  onChange?: (id: Id) => void;
  onDelete?: (id: Id) => void;
  onAdd?: () => void;
  candel?: boolean;
  canadd?: boolean;
  navExtraContent?: React.ReactNode;
}

export interface ITabsNavProps<Id extends string | number = string> {
  tabListData: Array<IInnerTab<Id>>;
  type: string;
  align: string;
  size: string;
  onChange: (id: Id) => void;
  onDelete: (id: Id) => void;
  onAdd: () => void;
  candel: boolean;
  canadd: boolean;
  uniqueId: number;
  navExtraContent: React.ReactNode;
}

export interface ITabProps<Id extends string | number = string> {
  id: Id;
  uniqueId: number;
  onSelected: (id: Id) => void;
  onDelete: (id: Id) => void;
  actived?: boolean;
  disabled?: boolean;
  candel?: boolean;
  minWidth?: string;
}

export interface ITabPanelProps<Id extends string | number = string> {
  className?: string;
  actived?: boolean;
  disabled?: boolean;
  tab: React.ReactNode;
  id: Id;
  onTabReady?: (id: Id) => void;
  uniqueId?: number;
}
