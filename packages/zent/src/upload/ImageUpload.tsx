import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';
import {
  IUploadFileItemInner,
  IImageUploadProps,
  IImageUploadFileItem,
  IUploadTipConfig,
} from './types';
import {
  DEFAULT_MAX_AMOUNT,
  DEFAULT_MAX_SIZE,
  DEFAULT_ENABLE_MULTIPLE,
  FILE_UPLOAD_STATUS,
} from './constants';
import { PartialRequired } from '../utils/types';
import {
  formatFileSize,
  createUploadItemId,
  defaultGetThumbSrcFromFile,
  defaultPreview,
} from './utils';
import { II18nLocaleUpload } from '../i18n/locale';
import ImageUploadList from './components/image/List';
import ImageUploadTrigger from './components/image/Trigger';
import { I18nReceiver } from '../i18n';

type IImageUploadPropsInner = PartialRequired<
  IImageUploadProps,
  | 'maxAmount'
  | 'maxSize'
  | 'multiple'
  | 'getThumbSrcFromFile'
  | 'preview'
  | 'accept'
>;

export class ImageUpload extends AbstractUpload<
  IImageUploadFileItem,
  IImageUploadProps
> {
  static defaultProps: Partial<IImageUploadProps> = {
    maxAmount: DEFAULT_MAX_AMOUNT,
    maxSize: DEFAULT_MAX_SIZE,
    multiple: DEFAULT_ENABLE_MULTIPLE,
    getThumbSrcFromFile: defaultGetThumbSrcFromFile,
    preview: defaultPreview,
    accept: 'image/*',
  };

  protected renderUploadList(i18n: II18nLocaleUpload): React.ReactNode {
    const { sortable } = this.props;

    // 上传 trigger
    const uploadTrigger = this.remainAmount > 0 && this.renderTrigger(i18n);

    return (
      <ImageUploadList
        i18n={i18n}
        fileList={this.fileList}
        onRetry={this.retryUploadItem}
        onDelete={this.deleteUploadItem}
        onSortChange={this.updateFileList}
        sortable={sortable}
        trigger={uploadTrigger}
      />
    );
  }

  protected createNewUploadFileItem(file: File) {
    const thumbPromise = this.props.getThumbSrcFromFile(file);
    return Promise.resolve(thumbPromise).then<
      IUploadFileItemInner<IImageUploadFileItem>
    >(thumbSrc => {
      return {
        _id: createUploadItemId(),
        _file: file,
        thumbSrc,
        name: file.name,
        type: file.type,
        status: FILE_UPLOAD_STATUS.uploading,
        percent: 0,
      };
    });
  }

  protected renderTips(i18n: II18nLocaleUpload): React.ReactNode {
    const { tips, maxSize } = this.props as IImageUploadPropsInner;
    const config: IUploadTipConfig<IImageUploadProps> = {
      ...this.props,
      formattedMaxSize: formatFileSize(maxSize),
    };
    const tipGenerator = typeof tips === 'function' ? tips : i18n.image.tips;
    return <div className="zent-image-upload-tips">{tipGenerator(config)}</div>;
  }

  protected renderTrigger(i18n: II18nLocaleUpload): React.ReactNode {
    const { accept, maxAmount, maxSize, multiple } = this
      .props as IImageUploadPropsInner;
    const { fileList } = this.state;
    return (
      <ImageUploadTrigger
        i18n={i18n}
        accept={accept}
        maxAmount={maxAmount}
        maxSize={maxSize}
        multiple={multiple}
        availableUploadItemsCount={this.availableUploadItemsCount}
        remainAmount={this.remainAmount}
        fileList={fileList}
        onAddFile={this.onTriggerUploadFile}
        onError={this.emitOnError}
      />
    );
  }

  render() {
    return (
      <I18nReceiver<II18nLocaleUpload> componentName="Upload">
        {i18n => {
          return (
            <div className="zent-image-upload">
              {this.renderUploadList(i18n)}
              {this.renderTips(i18n)}
            </div>
          );
        }}
      </I18nReceiver>
    );
  }
}

export default ImageUpload;
