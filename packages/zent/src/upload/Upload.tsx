import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';
import {
  IUploadFileItemInner,
  IUploadProps,
  IUploadFileItem,
  IUploadTipConfig,
} from './types';
import { FILE_UPLOAD_STATUS } from './constants';
import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import { createUploadItemId, formatFileSize } from './utils';
import NormalUploadTrigger from './components/normal/Trigger';
import { PartialRequired } from '../utils/types';
import NormalUploadList from './components/normal/List';

const subTypeGuessMap: {
  [type: string]: string[];
} = {
  image: ['jpeg', 'png', 'bmp', 'gif'],
  audio: ['mp3', 'wav', 'aac'],
  video: ['mp4', 'avi', 'webm'],
};
/** 推测可支持的文件格式 */
const guessSupportTypes = (accept?: string): string[] => {
  if (!accept) {
    return [];
  }
  const supportTypes = [];
  const acceptTypes = accept.split(',').map(type => type.trim());

  acceptTypes.forEach(acceptType => {
    // .jpg
    if (acceptType[0] === '.') {
      supportTypes.push(acceptType.slice(1));
    }

    if (acceptType.indexOf('/') !== -1) {
      const [mimeType, subtype] = acceptType.split('/', 2);
      if (subtype !== '*') {
        // image/jpeg
        supportTypes.push(subtype);
      } else {
        // image/*
        supportTypes.push(...(subTypeGuessMap[mimeType] || []));
      }
    }
  });

  return supportTypes;
};

type IUploadPropsInner = PartialRequired<
  IUploadProps,
  'maxAmount' | 'maxSize' | 'multiple' | 'pagination' | 'pageSize'
>;

export class Upload extends AbstractUpload<IUploadFileItem, IUploadProps> {
  state = {
    fileList: [],
  };

  static defaultProps: Partial<IUploadProps> = {
    maxAmount: 0,
    maxSize: 1024 * 1024,
    multiple: false,
    sortable: true,
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
      status: FILE_UPLOAD_STATUS.uploading,
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
    const { accept, maxAmount, maxSize, multiple } = this
      .props as IUploadPropsInner;
    const { fileList } = this.state;
    return (
      <NormalUploadTrigger
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
            <div className="zent-upload">
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
