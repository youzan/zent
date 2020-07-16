import { IGridColumn, IGridProps } from '../grid';

import { Direction } from './constants';

export interface ITransferData {
  disabled?: boolean; // 设置项应该不可选
  [key: string]: any;
}

export type TransferColumnType = Array<
  Omit<IGridColumn<any>, 'title'> & {
    title?: React.ReactNode;
  }
>;

export interface ITransferItem extends Omit<IGridProps, 'columns'> {
  prefix: string;
  title?: React.ReactNode;
  direction: Direction;
  rowKey: string; // 指定数据列的主键
  datasets: ITransferData[];
  selectedRowKeys: string[]; // 设置哪些项应该被选中
  showSearch?: boolean; // 是否显示搜索框
  filterOption?: (inputValue: string, option: any) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  changeSelectedRowKeys: (keys: string[]) => void;
  columns: TransferColumnType;
  searchPlaceholder?: string; //搜索框文案
}

export interface ITransferDirectionChangeProps {
  datasets: ITransferData[];
  targetKeys: string[];
  selectedRowKeys: string[];
  direction: Direction;
}

export interface ITransfer {
  rowKey: string; // 指定数据列的主键，会使用主键值从datasets中筛选出targetKeys
  datasets: ITransferData[]; // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
  showSearch?: boolean; // 是否显示搜索框
  filterOption?: (inputValue: string, option: ITransferData) => boolean; // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
  targetKeys?: string[]; // 显示在右侧框数据的 key 集合
  selectedRowKeys?: string[]; // 设置哪些项应该被选中，会和勾选的项合并
  titles?: React.ReactNode[]; // 标题集合，顺序从左至右
  onChange: (params: ITransferDirectionChangeProps) => void; // 选项在两栏之间转移时的回调函数
  columns: TransferColumnType | [TransferColumnType, TransferColumnType]; // 表格列配置
  prefix?: string;
  searchPlaceholder?: string; //搜索框文案
  className?: string;
}

export interface ITransferArrowButton {
  direction: Direction;
  disabled: boolean;
  prefix: string;
  onChange: () => void;
}
