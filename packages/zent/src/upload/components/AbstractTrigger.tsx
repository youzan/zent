import * as React from 'react';
import FileInput from './FileInput';
import { IAbstractUploadTriggerProps, IUploadFileItem } from '../types';

abstract class AbstractTrigger<
  UPLOAD_ITEM extends IUploadFileItem
> extends React.PureComponent<IAbstractUploadTriggerProps<UPLOAD_ITEM>> {
  fileInputRef = React.createRef<FileInput>();

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
    const { maxSize, remainAmount } = this.props;

    // 检查是否超过剩余最大上传数
    const overMaxAmount = files.length > remainAmount;
    if (overMaxAmount) {
      return this.onOverMaxAmount();
    }

    // 检查是否存在文件体积超过最大上传大小限制
    const overMaxSizeFiles = files.filter(file => file.size > maxSize);
    if (overMaxSizeFiles.length) {
      return this.onOverMaxSize(overMaxSizeFiles);
    }

    files.forEach(file => {
      this.props.onAddFile(file);
    });
  };

  renderFileInput() {
    const { accept, multiple, disabled, remainAmount } = this.props;
    return (
      <FileInput
        ref={this.fileInputRef}
        accept={accept}
        disabled={disabled}
        onChange={this.onInputChange}
        multiple={multiple}
        remainAmount={remainAmount}
      />
    );
  }
}

export default AbstractTrigger;
