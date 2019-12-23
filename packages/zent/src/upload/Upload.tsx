import cn from 'classnames';
import * as React from 'react';

import AbstractUpload from './components/AbstractUpload';
import NormalUploadList from './components/normal/List';
import NormalUploadTrigger from './components/normal/Trigger';
import {
  DEFAULT_ENABLE_MULTIPLE,
  DEFAULT_MAX_AMOUNT,
  DEFAULT_MAX_SIZE,
  FILE_UPLOAD_STATUS,
} from './constants';
import {
  IUploadFileItem,
  IUploadFileItemInner,
  IUploadProps,
  IUploadTipConfig,
} from './types';
import { formatFileSize } from './utils/format-file-size';
import { guessSupportTypes } from './utils/guess-support-types';
import { createUploadItemId } from './utils/id';

import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import { PartialRequired } from '../utils/types';

type IUploadPropsInner = PartialRequired<
  IUploadProps,
  | 'maxAmount'
  | 'maxSize'
  | 'multiple'
  | 'pagination'
  | 'pageSize'
  | 'skipUpload'
>;

export class Upload extends AbstractUpload<
  IUploadFileItem,
  void,
  IUploadProps
> {
  static defaultProps: Partial<IUploadProps> = {
    maxAmount: DEFAULT_MAX_AMOUNT,
    maxSize: DEFAULT_MAX_SIZE,
    multiple: DEFAULT_ENABLE_MULTIPLE,
    skipUpload: false,
    sortable: false,
    pageSize: 5,
    pagination: false,
  };

  protected createNewUploadFileItem(
    file: File
  ): IUploadFileItemInner<IUploadFileItem> {
    return {
      _id: createUploadItemId(),
      _file: file,
      name: file.name,
      type: file.type,
      status: FILE_UPLOAD_STATUS.beforeUpload,
      percent: 0,
    };
  }

  protected renderTips(i18n: II18nLocaleUpload) {
    const { tips, maxSize, accept, supportTypes } = this
      .props as IUploadPropsInner;
    const config: IUploadTipConfig<IUploadProps> = {
      ...this.props,
      formattedMaxSize: formatFileSize(maxSize),
      supportTypes: supportTypes || guessSupportTypes(accept),
    };
    const tipGenerator = typeof tips === 'function' ? tips : i18n.normal.tips;
    return <div className="zent-upload-tips">{tipGenerator(config)}</div>;
  }

  protected renderUploadList(i18n: II18nLocaleUpload): React.ReactNode {
    const { sortable, pagination, pageSize } = this.props;
    return (
      <NormalUploadList
        i18n={i18n}
        fileList={this.fileList}
        onRetry={this.retryUploadItem}
        onDelete={this.deleteUploadItem}
        onSortChange={this.updateFileList}
        sortable={sortable}
        pagination={pagination}
        pageSize={pageSize}
      />
    );
  }

  protected renderTrigger(i18n: II18nLocaleUpload): React.ReactNode {
    const { accept, maxAmount, maxSize, multiple, disabled } = this
      .props as IUploadPropsInner;
    const { fileList } = this.state;
    return (
      <NormalUploadTrigger
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
            <div className={cn('zent-upload', className)}>
              {this.renderUploadList(i18n)}
              {/* 到达上传文件数量上限，隐藏 Trigger */}
              {this.remainAmount > 0 && (
                <div className="zent-upload-trigger-wrapper">
                  {this.renderTrigger(i18n)}
                  {this.renderTips(i18n)}
                </div>
              )}
            </div>
          );
        }}
      </I18nReceiver>
    );
  }
}

export default Upload;
