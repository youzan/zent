import cn from 'classnames';

import AbstractMultiUpload from './components/AbstractMultiUpload';
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
  IUploadProps,
  IUploadTipConfig,
  INormalUploadItemProps,
} from './types';
import { formatFileSize } from './utils/format-file-size';
import { getTipsContent } from './utils/get-tips-content';

import { I18nReceiver, II18nLocaleUpload } from '../i18n';
import { PartialRequired } from '../utils/types';
import { createBaseNewUploadFileItem } from './utils/create-new-upload-file-item';

type IUploadPropsInner = PartialRequired<
  IUploadProps,
  | 'maxAmount'
  | 'maxSize'
  | 'multiple'
  | 'pagination'
  | 'pageSize'
  | 'manualUpload'
>;

export class Upload extends AbstractMultiUpload<
  IUploadFileItem,
  void,
  INormalUploadItemProps,
  IUploadProps
> {
  static defaultProps: Partial<IUploadProps> = {
    maxAmount: DEFAULT_MAX_AMOUNT,
    maxSize: DEFAULT_MAX_SIZE,
    multiple: DEFAULT_ENABLE_MULTIPLE,
    manualUpload: false,
    sortable: false,
    pageSize: 5,
    pagination: false,
  };

  static FILE_UPLOAD_STATUS = FILE_UPLOAD_STATUS;

  protected createNewUploadFileItem(file: File): IUploadFileItem {
    return createBaseNewUploadFileItem(file);
  }

  protected renderTips() {
    const { tips, maxSize } = this.props as IUploadPropsInner;
    const config: IUploadTipConfig<IUploadProps> = {
      ...this.props,
      formattedMaxSize: formatFileSize(maxSize),
    };

    const tipsContent = getTipsContent(tips, config);
    return (
      tipsContent && <div className="zent-file-upload-tips">{tipsContent}</div>
    );
  }

  protected renderUploadList(i18n: II18nLocaleUpload): React.ReactNode {
    const { sortable, pagination, pageSize, customUploadItem } = this.props;
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
        customUploadItem={customUploadItem}
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
            <div className={cn('zent-file-upload', className)}>
              {this.renderUploadList(i18n)}
              <div className="zent-file-upload-trigger-wrapper">
                {this.renderTrigger(i18n)}
                {this.renderTips()}
              </div>
            </div>
          );
        }}
      </I18nReceiver>
    );
  }
}

export default Upload;
