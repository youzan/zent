import cn from 'classnames';
import * as React from 'react';

import AbstractUpload from './components/AbstractUpload';
import ImageUploadList from './components/image/List';
import ImageUploadTrigger from './components/image/Trigger';
import {
  DEFAULT_ENABLE_MULTIPLE,
  DEFAULT_MAX_AMOUNT,
  DEFAULT_MAX_SIZE,
  FILE_UPLOAD_STATUS,
} from './constants';
import {
  IImageOnUploadSuccessReturn,
  IImageUploadFileItem,
  IImageUploadProps,
  IUploadFileItemInner,
  IUploadTipConfig,
} from './types';
import {
  defaultGetThumbSrcFromFile,
  defaultPreview,
} from './utils/default-image-props';
import { formatFileSize } from './utils/format-file-size';
import { createUploadItemId } from './utils/id';

import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import isNil from '../utils/isNil';
import { PartialRequired } from '../utils/types';

type IImageUploadPropsInner = PartialRequired<
  IImageUploadProps,
  | 'maxAmount'
  | 'maxSize'
  | 'multiple'
  | 'getThumbSrcFromFile'
  | 'preview'
  | 'accept'
  | 'skipUpload'
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
    skipUpload: false,
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
        status: FILE_UPLOAD_STATUS.beforeUpload,
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
