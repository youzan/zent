import { PureComponent } from 'react';
import {
  IUploadFileItem,
  IAbstractUploadListProps,
  IUploadFileItemInner,
  IUploadItemProps,
} from '../types';

abstract class AbstractUploadList<
  UPLOAD_ITEM extends IUploadFileItem,
  UPLOAD_ITEM_COMP_PROPS extends IUploadItemProps<UPLOAD_ITEM>,
  P extends IAbstractUploadListProps<UPLOAD_ITEM, UPLOAD_ITEM_COMP_PROPS>,
  S = {} // eslint-disable-line @typescript-eslint/ban-types
> extends PureComponent<P, S> {
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
