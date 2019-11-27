import * as React from 'react';
import FileInput from './FileInput';
import { IAbstractUploadTriggerProps, IUploadFileItem } from '../types';

abstract class AbstractTrigger<
  UPLOAD_ITEM extends IUploadFileItem
> extends React.PureComponent<IAbstractUploadTriggerProps<UPLOAD_ITEM>> {
  fileInputRef = React.createRef<FileInput>();

  /**
   * 剩余可上传文件数量
   */
  get remainAmount() {
    const { maxAmount, availableUploadItemsCount } = this.props;
    // maxAmount 为 0 表示无数量上限
    if (maxAmount === 0) {
      return Infinity;
    }
    return maxAmount - availableUploadItemsCount;
  }

  protected clickFileInput = () => {
    this.fileInputRef.current && this.fileInputRef.current.open();
  };

  protected onOverMaxAmount() {
    const { maxAmount } = this.props;
    this.props.onError('overMaxAmount', { maxAmount });
  }

  protected onOverMaxSize(files: File[]) {
    const { maxSize } = this.props;
    this.props.onError('overMaxSize', { maxSize });
  }

  /**
   * 检查文件列表是否可以添加到文件队列中
   */
  protected onInputChange = (files: File[]) => {
    const { maxSize } = this.props;

    // 检查是否超过剩余最大上传数
    const overMaxAmount = files.length > this.remainAmount;
    if (overMaxAmount) {
      this.onOverMaxAmount();
    }

    // 检查是否存在文件体积超过最大上传大小限制
    const overMaxSizeFiles = files.filter(file => file.size > maxSize);
    if (overMaxSizeFiles.length) {
      this.onOverMaxSize(overMaxSizeFiles);
    }

    files.forEach(file => {
      this.props.onAddFile(file);
    });
  };

  renderFileInput() {
    const { accept, multiple, disabled } = this.props;
    return (
      <FileInput
        ref={this.fileInputRef}
        accept={accept}
        disabled={disabled}
        onChange={this.onInputChange}
        multiple={multiple}
        remainAmount={this.remainAmount}
      />
    );
  }
}

export default AbstractTrigger;
