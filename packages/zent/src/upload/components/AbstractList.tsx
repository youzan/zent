import * as React from 'react';
import {
  IUploadFileItem,
  IAbstractUploadListProps,
  IUploadFileItemInner,
} from '../types';

abstract class AbstractUploadList<
  UPLOAD_ITEM extends IUploadFileItem,
  P extends IAbstractUploadListProps<UPLOAD_ITEM>,
  S = {}
> extends React.PureComponent<P, S> {
  /**
   * 展示单个上传文件项
   */
  abstract renderFileItem(
    item: IUploadFileItemInner<UPLOAD_ITEM>,
    index: number
  ): React.ReactNode;

  /**
   * 获取渲染时要展示的上传项列表
   */
  abstract getRenderFileList(): Array<IUploadFileItemInner<UPLOAD_ITEM>>;

  /**
   * sortable 的 change 回调，用于实现文件列表的拖拽排序
   */
  abstract onFileListSortChange(
    list: Array<IUploadFileItemInner<UPLOAD_ITEM>>
  ): void;
}

export default AbstractUploadList;
