import ImageUploadItem from './Item';

import Sortable from '../../../sortable';
import {
  IImageUploadFileItem,
  IImageUploadListProps,
  IUploadFileItem,
  IImageUploadItemProps,
} from '../../types';
import AbstractUploadList from '../AbstractList';

export default class ImageUploadList extends AbstractUploadList<
  IImageUploadFileItem,
  IImageUploadItemProps,
  IImageUploadListProps
> {
  getRenderFileList() {
    return this.props.fileList;
  }

  onFileListSortChange = (list: Array<IUploadFileItem>) => {
    this.props.onSortChange(list);
  };

  onItemPreview = (item: IUploadFileItem) => {
    this.props.onPreview(item, this.props.fileList);
  };

  renderFileItem = (item: IUploadFileItem): React.ReactNode => {
    const { customUploadItem: CustomUploadItem } = this.props;
    const UploadItem = CustomUploadItem || ImageUploadItem;
    return (
      <UploadItem
        key={item.id}
        item={item}
        i18n={this.props.i18n}
        onDelete={this.props.onDelete}
        onRetry={this.props.onRetry}
        onPreview={this.onItemPreview}
      />
    );
  };

  render() {
    const { sortable, trigger } = this.props;

    const fileList = this.getRenderFileList();
    const fileListContent = fileList.map(this.renderFileItem);

    const listContent = (
      <Sortable
        tag="ul"
        disabled={!sortable}
        items={fileList}
        className="zent-image-upload-list"
        onChange={this.onFileListSortChange}
        filterClass="zent-image-upload-trigger"
      >
        {fileListContent}
        {trigger}
      </Sortable>
    );

    return <div className="zent-image-upload-list-wrapper">{listContent}</div>;
  }
}
