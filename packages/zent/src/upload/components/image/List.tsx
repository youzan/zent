import * as React from 'react';
import {
  IUploadFileItem,
  IUploadFileItemInner,
  IImageUploadFileItem,
  IImageUploadListProps,
} from '../../types';
import AbstractUploadList from '../AbstractList';
import ImageUploadItem from './Item';
import Sortable from '../../../sortable';

export default class ImageUploadList extends AbstractUploadList<
  IImageUploadFileItem,
  IImageUploadListProps
> {
  getRenderFileList() {
    return this.props.fileList;
  }

  onFileListSortChange = (
    list: Array<IUploadFileItemInner<IUploadFileItem>>
  ) => {
    this.props.onSortChange(list);
  };

  renderFileItem = (
    item: IUploadFileItemInner<IUploadFileItem>
  ): React.ReactNode => {
    return (
      <ImageUploadItem
        key={item._id}
        item={item}
        i18n={this.props.i18n}
        onDelete={this.props.onDelete}
        onRetry={this.props.onRetry}
      />
    );
  };

  render() {
    const { sortable, trigger } = this.props;

    const fileList = this.getRenderFileList();
    const fileListContent = fileList.map(this.renderFileItem);

    const listContent = sortable ? (
      <Sortable
        tag="ul"
        items={fileList}
        className="zent-image-upload-list"
        onChange={this.onFileListSortChange}
        filterClass="zent-image-upload-trigger"
      >
        {fileListContent}
        {trigger}
      </Sortable>
    ) : (
      <ul className="zent-image-upload-list">
        {fileListContent}
        {trigger}
      </ul>
    );

    return <div className="zent-image-upload-list-wrapper">{listContent}</div>;
  }
}
