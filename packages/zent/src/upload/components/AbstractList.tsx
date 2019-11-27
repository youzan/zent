import * as React from 'react';
import {
  IUploadFileItem,
  IAbstractUploadListProps,
  IUploadFileItemInner,
} from '../types';
import Sortable from '../../sortable';

abstract class AbstractUploadList<
  UPLOAD_ITEM extends IUploadFileItem,
  P extends IAbstractUploadListProps<UPLOAD_ITEM>
> extends React.PureComponent<P> {
  /**
   * 展示单个上传文件项
   */
  abstract renderFileItem(
    item: IUploadFileItemInner<UPLOAD_ITEM>,
    index: number
  ): React.ReactNode;

  /**
   * sortable 的 change 回调，用于实现文件列表的拖拽排序
   */
  protected onFileListSortChange(
    list: Array<IUploadFileItemInner<UPLOAD_ITEM>>
  ) {
    this.props.onSortChange(list);
  }

  render() {
    const { fileList, sortable } = this.props;
    const fileListContent = fileList.map(this.renderFileItem);
    return sortable ? (
      <Sortable
        tag="ul"
        items={fileList}
        className="zent-upload-file-list"
        onChange={this.onFileListSortChange}
      >
        {fileListContent}
      </Sortable>
    ) : (
      <ul className="zent-upload-file-list">{fileListContent}</ul>
    );
  }
}

export default AbstractUploadList;
