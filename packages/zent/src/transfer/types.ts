import { IGridColumn, IGridProps } from '../grid';

export type TransferDirection = 'left' | 'right';

export interface ITransferData {
  disabled?: boolean; // 设置项应该不可选
  [key: string]: any;
}

export type TransferColumnType = Array<
  {
    title?: React.ReactNode;
    name: string;
  } & Omit<IGridColumn<ITransferData>, 'title' | 'name'>
>;

export interface ITransferDirectionChangeProps {
  targetKeys: string[];
  transferredKeys: string[];
  direction: TransferDirection;
  selectedKeys: string[];
}

interface ITransferChildrenProps {
  direction: TransferDirection;
  selectedKeys: string[];
  handleSelectChange: (keys: string[]) => void;
}

export type ListPropsType =
  | 'rowKey'
  | 'onChange'
  | 'scroll'
  | 'sortBy'
  | 'sortType'
  | 'defaultSortType'
  | 'emptyLabel'
  | 'bordered'
  | 'onRowClick'
  | 'ellipsis'
  | 'components'
  | 'rowProps'
  | 'autoStick'
  | 'autoStickOffsetTop'
  | 'disableHoverHighlight';

export type TransferListPropsType =
  | 'onChange'
  | 'scroll'
  | 'sortBy'
  | 'sortType'
  | 'defaultSortType'
  | 'emptyLabel'
  | 'bordered'
  | 'ellipsis'
  | 'components'
  | 'rowProps'
  | 'autoStick'
  | 'autoStickOffsetTop'
  | 'disableHoverHighlight';

type ListType = {
  columns: TransferColumnType | [TransferColumnType, TransferColumnType];
  selection?: {
    getCheckboxProps: (
      data: ITransferData
    ) => { disabled?: boolean; reason?: React.ReactNode };
  };
} & Pick<IGridProps<ITransferData>, ListPropsType>;

type OneRequired =
  | {
      children?: (props: ITransferChildrenProps) => React.ReactNode;
      list: ListType;
    }
  | {
      children: (props: ITransferChildrenProps) => React.ReactNode;
      list?: ListType;
    };

export interface ITransferItem {
  title?: React.ReactNode;
  direction: TransferDirection;
  keyName: string; // 主键
  dataSets: ITransferData[];
  selectedKeys: string[]; // 设置哪些项应该被选中
  handleSelectChange: (keys: string[]) => void;
  showSearch?: boolean; // 是否显示搜索框
  searchPlaceholder?: string; //搜索框文案
  filterOption?: (inputValue: string, option: ITransferData) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  list: Omit<ListType, 'columns'> & { columns: TransferColumnType };
  prefix: string;
}

interface ITransfer {
  keyName: string; // 指定dataSource的主键，会使用主键值从dataSource中筛选出targetKeys
  dataSource: ITransferData[]; // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
  onChange: (params: ITransferDirectionChangeProps) => void; // 选项在两栏之间转移时的回调函数
  targetKeys?: string[]; // 显示在右侧框数据的 key 集合
  selectedKeys?: string[]; // 设置哪些项应该被选中，会和勾选的项合并
  onSelectChange?: (selectedKeys: string[]) => void; // 选中项发生改变时的回调函数
  titles?: React.ReactNode[]; // 标题集合，顺序从左至右
  showSearch?: boolean; // 是否显示搜索框
  searchPlaceholder?: string; //搜索框文案
  filterOption?: (inputValue: string, option: ITransferData) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  className?: string;
}

export type TransferType = OneRequired & ITransfer;

export interface ITransferArrowButton {
  direction: TransferDirection;
  disabled: boolean;
  prefix: string;
  onChange: () => void;
}

export interface ITransferHook {
  selectedKeys?: string[];
  targetKeys?: string[];
}
