import * as React from 'react';
import AbstractUpload from './components/AbstractUpload';
import {
  IUploadFileItemInner,
  IUploadProps,
  IUploadFileItem,
  IUploadTipConfig,
  IUploadPaginationType,
} from './types';
import { FILE_UPLOAD_STATUS } from './constants';
import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import { createUploadItemId, formatFileSize } from './utils';
import flatMap from 'lodash-es/flatMap';
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
  return flatMap<string, string>(
    accept.split(',').map(type => type.trim()),
    acceptType => {
      // .jpg
      if (acceptType[0] === '.') {
        return acceptType.slice(1);
      }

      // image/jpeg, image/*
      if (acceptType.indexOf('/') !== -1) {
        const [mimeType, subtype] = acceptType.split('/', 2);
        if (subtype !== '*') {
          return subtype;
        } else {
          return subTypeGuessMap[mimeType] || [];
        }
      }

      return [];
    }
  );
};

type IUploadPropsInner<
  PAGINATION_TYPE extends IUploadPaginationType
> = PartialRequired<
  IUploadProps<PAGINATION_TYPE>,
  'maxAmount' | 'maxSize' | 'multiple'
>;

export class Upload<
  PAGINATION_TYPE extends IUploadPaginationType = undefined
> extends AbstractUpload<IUploadFileItem, IUploadProps<PAGINATION_TYPE>> {
  state = {
    fileList: [],
  };

  static defaultProps: Partial<IUploadProps<undefined>> = {
    maxAmount: 0,
    maxSize: 1024 * 1024,
    multiple: false,
    sortable: true,
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
      .props as IUploadPropsInner<PAGINATION_TYPE>;
    const config: IUploadTipConfig<IUploadProps<PAGINATION_TYPE>> = {
      ...this.props,
      formattedMaxSize: formatFileSize(maxSize),
      supportTypes: supportTypes || guessSupportTypes(accept),
    };
    const tipGenerator = typeof tips === 'function' ? tips : i18n.normal.tips;
    return <div className="zent-upload-tips">{tipGenerator(config)}</div>;
  }

  protected renderUploadList(i18n: II18nLocaleUpload): React.ReactNode {
    const { sortable } = this.props;
    return (
      <NormalUploadList
        i18n={i18n}
        fileList={this.fileList}
        onRetry={this.retryUploadItem}
        onDelete={this.deleteUploadItem}
        onSortChange={this.updateFileList}
        sortable={sortable}
      />
    );
  }

  protected renderTrigger(i18n: II18nLocaleUpload): React.ReactNode {
    const { accept, maxAmount, maxSize, multiple } = this
      .props as IUploadPropsInner<PAGINATION_TYPE>;
    const { fileList } = this.state;
    return (
      <NormalUploadTrigger
        i18n={i18n}
        accept={accept}
        maxAmount={maxAmount}
        maxSize={maxSize}
        multiple={multiple}
        availableUploadItemsCount={this.availableUploadItemsCount}
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
              <div className="zent-upload-list-wrapper">
                {this.renderUploadList(i18n)}
              </div>
              <div className="zent-upload-trigger-wrapper">
                {this.renderTrigger(i18n)}
                {this.renderTips(i18n)}
              </div>
            </div>
          );
        }}
      </I18nReceiver>
    );
  }
}

export default Upload;
