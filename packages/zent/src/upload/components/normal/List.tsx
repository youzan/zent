import {
  IUploadFileItem,
  IUploadFileItemInner,
  IUploadListProps,
  INormalUploadItemProps,
} from '../../types';
import AbstractUploadList from '../AbstractList';
import NormalUploadItem from './Item';
import MiniPagination from '../../../pagination/MiniPagination';
import { PaginationChangeHandler } from '../../../pagination/impl/BasePagination';
import Sortable from '../../../sortable';

interface INormalUploadListState {
  current: number;
}

export default class NormalUploadList extends AbstractUploadList<
  IUploadFileItem,
  INormalUploadItemProps,
  IUploadListProps,
  INormalUploadListState
> {
  state: INormalUploadListState = {
    current: 1,
  };

  componentDidUpdate(prevProps: IUploadListProps) {
    const { fileList: prevFileList, pageSize: prevPageSize } = prevProps;
    const { fileList, pageSize } = this.props;
    const { current } = this.state;

    // 删除过文件，需要修正页数
    if (fileList.length < prevFileList.length || prevPageSize !== pageSize) {
      const maxPage = Math.max(Math.ceil(fileList.length / pageSize), 1);
      // 如果最大支持页数已经小于当期页数，则更新当期页数到最大支持页数，
      if (maxPage < current) {
        this.setState({
          current: maxPage,
        });
      }
    }
  }

  /**
   * 需要显示的文件列表范围
   */
  get displayListRange() {
    if (!this.props.pagination) {
      return [0, this.props.fileList.length];
    }
    const { current } = this.state;
    const { pageSize } = this.props;
    return [(current - 1) * pageSize, current * pageSize];
  }

  getRenderFileList(): Array<IUploadFileItemInner<IUploadFileItem>> {
    const [start, end] = this.displayListRange;
    return this.props.fileList.slice(start, end);
  }

  onFileListSortChange = (
    list: Array<IUploadFileItemInner<IUploadFileItem>>
  ) => {
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
      current: pageInfo.current,
    });
  };

  /**
   * 渲染分页器
   */
  renderPagination() {
    if (!this.props.pagination) {
      return null;
    }

    const { current } = this.state;
    const { pageSize } = this.props;
    return (
      <MiniPagination
        className="zent-file-upload-list-pagination"
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
    const { customUploadItem: CustomUploadItem } = this.props;
    const UploadItem = CustomUploadItem || NormalUploadItem;
    return (
      <UploadItem
        key={item._id}
        item={item}
        i18n={this.props.i18n}
        onDelete={this.props.onDelete}
        onRetry={this.props.onRetry}
      />
    );
  };

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
        className="zent-file-upload-list"
        onChange={this.onFileListSortChange}
      >
        {fileListContent}
      </Sortable>
    ) : (
      <ul className="zent-file-upload-list">{fileListContent}</ul>
    );
    return (
      <div className="zent-file-upload-list-wrapper">
        {listContent}
        {this.renderPagination()}
      </div>
    );
  }
}
