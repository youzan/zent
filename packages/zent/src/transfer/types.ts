import { IGridColumn, IGridProps } from '../grid';

import { Direction } from './constants';

export interface IData {
  disabled?: boolean; // 设置项应该不可选
  [key: string]: any;
}

export type ColumnType = Array<
  Omit<IGridColumn<any>, 'title'> & {
    title?: React.ReactNode;
  }
>;

export interface ITransferItem extends Omit<IGridProps, 'columns'> {
  prefix: string;
  title?: React.ReactNode;
  direction: Direction;
  rowKey: string; // 指定数据列的主键
  datasets: IData[];
  selectedRowKeys: string[]; // 设置哪些项应该被选中
  showSearch?: boolean; // 是否显示搜索框
  filterOption?: (inputValue: string, option: any) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  changeSelectedRowKeys: (keys: string[]) => void;
  columns: ColumnType;
  searchPlaceholder?: string; //搜索框文案
}

export interface IDirectionChangeProps {
  datasets: IData[];
  targetKeys: string[];
  selectedRowKeys: string[];
  direction: Direction;
}

export interface ITransfer {
  rowKey: string; // 指定数据列的主键，会使用主键值从datasets中筛选出targetKeys
  datasets: IData[]; // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
  showSearch?: boolean; // 是否显示搜索框
  filterOption?: (inputValue: string, option: IData) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  targetKeys?: string[]; // 显示在右侧框数据的 key 集合
  selectedRowKeys?: string[]; // 设置哪些项应该被选中，会和勾选的项合并
  titles?: React.ReactNode[]; // 标题集合，顺序从左至右
  onChange: (params: IDirectionChangeProps) => void; // 选项在两栏之间转移时的回调函数
  columns: ColumnType | [ColumnType, ColumnType]; // 表格列配置
  prefix?: string;
  searchText?: string;
  className?: string;
}

export interface IArrowButton {
  direction: Direction;
  onChange: () => void;
  disabled: boolean;
  prefix: string;
}
