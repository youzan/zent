import * as React from 'react';
import FileInput from './FileInput';
import { IUploadTriggerProps } from '../types';

abstract class AbstractTrigger extends React.PureComponent<
  IUploadTriggerProps
> {
  fileInputRef = React.createRef<FileInput>();

  get remainAmount() {
    const { maxAmount, fileList } = this.props;
    return maxAmount - fileList.length;
  }

  protected onOverMaxAmount() {}

  protected onOverMaxSize(files: File[]) {}

  /**
   * 检查文件列表是否可以添加到文件队列中
   */
  protected onInputChange = (files: File[]) => {
    const { maxSize } = this.props;

    // 检查是否超过剩余最大上传数
    const overMaxAmount = files.length > this.remainAmount;
    if (overMaxAmount) {
      this.onOverMaxAmount();
      return false;
    }

    // 检查是否存在文件体积超过最大上传大小限制
    const overMaxSizeFiles = files.filter(file => file.size > maxSize);
    if (overMaxSizeFiles.length) {
      this.onOverMaxSize(overMaxSizeFiles);
      return false;
    }

    return true;
  };

  renderFileInput() {
    const { accept, filterFiles } = this.props;
    return (
      <FileInput
        ref={this.fileInputRef}
        accept={accept}
        filterFiles={filterFiles}
        onChange={this.onInputChange}
        remainAmount={this.remainAmount}
      />
    );
  }
}

export default AbstractTrigger;
