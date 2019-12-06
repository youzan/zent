import * as React from 'react';
import {
  IUploadFileItem,
  IUploadFileItemInner,
  IUploadListProps,
} from '../../types';
import AbstractUploadList from '../AbstractList';
import NormalUploadItem from './Item';
import MiniPagination, {
  IMiniPaginationProps,
} from '../../../pagination/MiniPagination';
import { PaginationChangeHandler } from '../../../pagination/impl/BasePagination';

interface INormalUploadListState {
  pageInfo: Omit<IMiniPaginationProps, 'onChange'>;
}

export default class NormalUploadList extends AbstractUploadList<
  IUploadFileItem,
  IUploadListProps,
  INormalUploadListState
> {
  state: INormalUploadListState = {
    pageInfo: {
      current: 1,
      pageSize: 5,
    },
  };

  /**
   * 需要显示的文件列表范围
   */
  get displayListRange() {
    if (!this.props.pagination) {
      return [0, this.props.fileList.length];
    }
    const { current, pageSize } = this.state.pageInfo;
    return [(current - 1) * pageSize, current * pageSize];
  }

  getRenderFileList(): Array<IUploadFileItemInner<IUploadFileItem>> {
    const [start, end] = this.displayListRange;
    return this.props.fileList.slice(start, end);
  }

  onFileListSortChange = (
    list: Array<IUploadFileItemInner<IUploadFileItem>>
  ) => {
    console.log(list);
    const [start, end] = this.displayListRange;
    const rawFileList = this.props.fileList;
    const newList = [
      ...rawFileList.slice(0, start),
      ...list,
      ...rawFileList.slice(end),
    ];
    this.props.onSortChange(newList);
  };

  onPagiantionChange: PaginationChangeHandler = pageInfo => {
    this.setState({
      pageInfo,
    });
  };

  renderExtraListContent() {
    if (!this.props.pagination) {
      return null;
    }
    const { current, pageSize } = this.state.pageInfo;
    return (
      <MiniPagination
        className="zent-upload-list-pagination"
        onChange={this.onPagiantionChange}
        current={current}
        pageSize={pageSize}
        total={this.props.fileList.length}
      />
    );
  }

  renderFileItem = (
    item: IUploadFileItemInner<IUploadFileItem>
  ): React.ReactNode => {
    return (
      <NormalUploadItem
        key={item._id}
        item={item}
        i18n={this.props.i18n}
        onDelete={this.props.onDelete}
        onRetry={this.props.onRetry}
      />
    );
  };
}
