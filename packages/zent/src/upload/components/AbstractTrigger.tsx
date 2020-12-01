import { PureComponent, createRef } from 'react';
import FileInput from './FileInput';

import Notify from '../../notify';
import { IAbstractUploadTriggerProps, IUploadFileItem } from '../types';
import { formatFileSize } from '../utils/format-file-size';
import { execPromiseQueue } from '../../utils/promise-queue';

abstract class AbstractTrigger<
  UPLOAD_ITEM extends IUploadFileItem
> extends PureComponent<IAbstractUploadTriggerProps<UPLOAD_ITEM>> {
  fileInputRef = createRef<FileInput>();

  /**
   * 点击 file input 标签，打开文件选择对话框
   */
  protected clickFileInput = () => {
    this.fileInputRef.current && this.fileInputRef.current.open();
  };

  /**
   * 点击检查上传数量限制，若未达到上限则触发文件上传
   */
  protected onClickTrigger = () => {
    const { remainAmount, i18n } = this.props;
    if (remainAmount <= 0) {
      Notify.error(i18n.limit);
    } else {
      this.clickFileInput();
    }
  };

  protected onOverMaxAmount() {
    const { maxAmount } = this.props;
    this.props.onError('overMaxAmount', { maxAmount });
  }

  protected onOverMaxSize(_files: File[]) {
    const { maxSize } = this.props;
    this.props.onError('overMaxSize', {
      maxSize,
      formattedMaxSize: formatFileSize(maxSize)!,
    });
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

    execPromiseQueue(files, file => this.props.onAddFile(file));
  };

  protected onTriggerDragOver: React.DragEventHandler = e => {
    e.preventDefault();
  };

  /**
   * 支持文件拖拽上传的处理函数
   */
  protected onTriggerDrop: React.DragEventHandler = e => {
    const { disabled } = this.props;
    e.preventDefault();
    if (e.dataTransfer.files && !disabled) {
      const files = Array.from(e.dataTransfer.files);
      this.onInputChange(files);
    }
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
