import * as React from 'react';
import cn from 'classnames';
import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import AbstractUpload from './components/AbstractUpload';
import {
  ISingleUploadItemProps,
  ISingleUploadProps,
  IUploadChangeDetail,
  IUploadFileItem,
  IUploadTipConfig,
} from './types';
import { formatFileSize } from './utils/format-file-size';
import { getTipsContent } from './utils/get-tips-content';
import { PartialRequired } from '../utils/types';
import { FILE_UPLOAD_STATUS } from './constants';
import { wrapPromise } from './utils/wrap-promise';
import SingleUploadTrigger from './components/single/Trigger';
import SingleUploadItem from './components/single/Item';
import { createBaseNewUploadFileItem } from './utils/create-new-upload-file-item';

interface ISingleUploadState {
  value: IUploadFileItem | null;
}

type ISingleUploadPropsInner = PartialRequired<
  ISingleUploadProps,
  'maxSize' | 'manualUpload'
>;

export class SingleUpload extends AbstractUpload<
  IUploadFileItem,
  void,
  ISingleUploadItemProps,
  ISingleUploadProps,
  ISingleUploadState
> {
  state: ISingleUploadState = {
    value: null,
  };

  get isControlled() {
    return this.props.value !== undefined;
  }

  get value() {
    return this.isControlled ? this.props.value : this.state.value;
  }

  onChange = (
    item: IUploadFileItem | null,
    detail?: IUploadChangeDetail<IUploadFileItem>,
    cb?: () => void
  ) => {
    const updateCallback = () => {
      this.props.onChange(item, detail);
      cb && cb();
    };
    if (this.isControlled) {
      updateCallback();
    } else {
      this.setState(
        {
          value: item,
        },
        updateCallback
      );
    }
  };

  getUploadItem(id: string): IUploadFileItem | null {
    return this.value?.id === id ? this.value : null;
  }

  /**
   * 更新某个上传项的属性
   */
  updateUploadItem = (
    updateItemId: string,
    overrideProps: Partial<IUploadFileItem>
  ) => {
    const updateItem = this.getUploadItem(updateItemId);
    // 上传项已经不存在，不执行 update 操作
    if (!updateItem) {
      return;
    }

    const newItem: IUploadFileItem = {
      ...updateItem,
      ...overrideProps,
    };

    this.onChange(newItem, {
      item: newItem,
      type: 'change',
    });
  };

  createNewUploadFileItem(file: File): IUploadFileItem {
    return createBaseNewUploadFileItem(file);
  }

  deleteUploadItem = (deleteItem: IUploadFileItem) => {
    this.onChange(null, {
      item: deleteItem,
      type: 'delete',
    });
  };

  retryUploadItem = (retryItem: IUploadFileItem) => {
    const newRetryItem = {
      ...retryItem,
      status: FILE_UPLOAD_STATUS.uploading,
      percent: 0,
    };

    this.onChange(
      newRetryItem,
      {
        item: newRetryItem,
        type: 'retry',
      },
      () => this.emitOnUpload(retryItem.file, newRetryItem)
    );
  };

  onTriggerUploadFile = (file: File) => {
    const { beforeUpload } = this.props;
    const beforeUploadRes = wrapPromise(
      beforeUpload ? beforeUpload(file) : true
    );

    // check is need upload
    return beforeUploadRes
      .then(() => {
        // create upload file item async
        return this.createNewUploadFileItem(file);
      })
      .then(newUploadFileItem => {
        // update file list
        this.onChange(
          newUploadFileItem,
          {
            item: newUploadFileItem,
            type: 'add',
          },
          () => this.emitOnUpload(file, newUploadFileItem)
        );
      });
  };

  protected renderTips() {
    const { tips, maxSize } = this.props as ISingleUploadPropsInner;
    const config: IUploadTipConfig<ISingleUploadProps> = {
      ...this.props,
      formattedMaxSize: formatFileSize(maxSize),
    };

    const tipsContent = getTipsContent(tips, config);
    return (
      tipsContent && (
        <div className="zent-single-upload-tips">{tipsContent}</div>
      )
    );
  }

  protected renderTrigger(i18n: II18nLocaleUpload): React.ReactNode {
    const { accept, maxSize, disabled } = this.props as ISingleUploadPropsInner;
    return (
      <SingleUploadTrigger
        i18n={i18n}
        accept={accept}
        maxAmount={1}
        maxSize={maxSize}
        multiple={false}
        disabled={disabled}
        remainAmount={this.value ? 0 : 1}
        onAddFile={this.onTriggerUploadFile}
        onError={this.emitOnError}
      />
    );
  }

  renderItem(i18n: II18nLocaleUpload): React.ReactNode {
    const { customUploadItem } = this.props;

    const UploadItem = customUploadItem || SingleUploadItem;
    return (
      <UploadItem
        item={this.value}
        i18n={i18n}
        onDelete={this.deleteUploadItem}
        onRetry={this.retryUploadItem}
      />
    );
  }

  render() {
    const { className } = this.props;
    return (
      <I18nReceiver<II18nLocaleUpload> componentName="Upload">
        {i18n => {
          return (
            <div className={cn('zent-single-upload', className)}>
              {this.value ? this.renderItem(i18n) : this.renderTrigger(i18n)}
              {this.renderTips()}
            </div>
          );
        }}
      </I18nReceiver>
    );
  }
}

export default SingleUpload;
