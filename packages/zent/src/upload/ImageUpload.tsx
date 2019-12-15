import * as React from 'react';
import cn from 'classnames';
import AbstractUpload from './components/AbstractUpload';
import {
  IUploadFileItemInner,
  IImageUploadProps,
  IImageUploadFileItem,
  IUploadTipConfig,
  IImageOnUploadSuccessReturn,
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
import { II18nLocaleUpload, I18nReceiver } from '../i18n';
import ImageUploadList from './components/image/List';
import ImageUploadTrigger from './components/image/Trigger';
import isNil from '../utils/isNil';

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
  IImageOnUploadSuccessReturn,
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

  protected getUploadSuccessOverrideProps(
    onUploadSuccessReturn: IImageOnUploadSuccessReturn
  ): Partial<IUploadFileItemInner<IImageUploadFileItem>> {
    if (isNil(onUploadSuccessReturn)) {
      return {};
    }
    return typeof onUploadSuccessReturn === 'string'
      ? {
          src: onUploadSuccessReturn,
          thumbSrc: onUploadSuccessReturn,
        }
      : onUploadSuccessReturn;
  }

  protected renderUploadList(i18n: II18nLocaleUpload): React.ReactNode {
    const { sortable, preview } = this.props as IImageUploadPropsInner;

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
        onPreview={preview}
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
    const { accept, maxAmount, maxSize, multiple, disabled } = this
      .props as IImageUploadPropsInner;
    const { fileList } = this.state;
    return (
      <ImageUploadTrigger
        i18n={i18n}
        accept={accept}
        maxAmount={maxAmount}
        maxSize={maxSize}
        multiple={multiple}
        disabled={disabled}
        availableUploadItemsCount={this.availableUploadItemsCount}
        remainAmount={this.remainAmount}
        fileList={fileList}
        onAddFile={this.onTriggerUploadFile}
        onError={this.emitOnError}
      />
    );
  }

  render() {
    const { className } = this.props;
    return (
      <I18nReceiver<II18nLocaleUpload> componentName="Upload">
        {i18n => {
          return (
            <div className={cn('zent-image-upload', className)}>
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
