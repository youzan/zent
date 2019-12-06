import * as React from 'react';
import {
  IUploadFileItem,
  IAbstractUploadListProps,
  IUploadFileItemInner,
} from '../types';
import Sortable from '../../sortable';

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

  /**
   * 渲染列表未的额外元素
   */
  protected renderExtraListContent() {}

  render() {
    const { sortable } = this.props;
    const fileList = this.getRenderFileList();

    if (!fileList || !fileList.length) {
      return null;
    }

    const fileListContent = fileList.map(this.renderFileItem);
    const listContent = sortable ? (
      <Sortable
        tag="ul"
        items={fileList}
        className="zent-upload-list"
        onChange={this.onFileListSortChange}
      >
        {fileListContent}
      </Sortable>
    ) : (
      <ul className="zent-upload-list">{fileListContent}</ul>
    );
    return (
      <div className="zent-upload-list-wrapper">
        {listContent}
        {this.renderExtraListContent()}
      </div>
    );
  }
}

export default AbstractUploadList;
