import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';
import {
  IUploadFileItemInner,
  IImageUploadProps,
  IImageUploadFileItem,
} from './types';

export class ImageUpload extends AbstractUpload<
  IImageUploadFileItem,
  IImageUploadProps
> {
  state = {
    fileList: [],
  };

  static defaultProps: Partial<IImageUploadProps> = {
    maxAmount: 0,
    maxSize: 1024 * 1024,
    multiple: false,
  };

  protected renderUploadList(
    i18n: import('..').II18nLocaleUpload
  ): React.ReactNode[] {
    throw new Error('Method not implemented.');
  }
  protected createNewUploadFileItem(
    file: File
  ): IUploadFileItemInner<IImageUploadFileItem> {
    throw new Error('Method not implemented.');
  }
  protected renderTips(i18n: import('..').II18nLocaleUpload): React.ReactNode {
    throw new Error('Method not implemented.');
  }
  protected renderUploadItem(
    item: IUploadFileItemInner<IImageUploadFileItem>
  ): React.ReactNode {
    throw new Error('Method not implemented.');
  }
  protected renderTrigger(): React.ReactNode {
    return null;
  }

  render() {
    return this.renderTrigger();
  }
}

export default ImageUpload;
