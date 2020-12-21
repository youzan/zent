import { PureComponent } from 'react';
import { II18nLocaleUpload } from '../../i18n';
import { FILE_UPLOAD_STATUS } from '../constants';
import {
  IAbstractUploadProps,
  IUploadFileItem,
  IUploadFileItemInner,
  IUploadOnErrorHandler,
  IUploadItemProps,
} from '../types';

abstract class AbstractUpload<
  UPLOAD_ITEM extends IUploadFileItem,
  ON_UPLOAD_SUCCESS_RETURN,
  UPLOAD_ITEM_COMP_PROPS extends IUploadItemProps<UPLOAD_ITEM>,
  P extends IAbstractUploadProps<
    UPLOAD_ITEM,
    ON_UPLOAD_SUCCESS_RETURN,
    UPLOAD_ITEM_COMP_PROPS
  >,
  S = unknown
> extends PureComponent<P, S> {
  /**
   * 判断是否受控
   */
  abstract get isControlled();

  abstract getUploadItem(id: string): IUploadFileItemInner<UPLOAD_ITEM>;

  /**
   * 触发 onError 回调
   */
  emitOnError: IUploadOnErrorHandler = (type, data) => {
    this.props.onError && this.props.onError(type, data);
  };

  /**
   * 触发外部上传方法
   */
  emitOnUpload = (
    file: File,
    uploadItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => {
    const { onUpload, manualUpload } = this.props;
    const uplodaItemId = uploadItem._id;
    // auto start upload
    if (!manualUpload && onUpload) {
      onUpload(file, this.updateUploadItemPercent.bind(this, uplodaItemId))
        .then(onUploadReturn => {
          this.updateUploadItemStatusToSuccess(uplodaItemId, onUploadReturn);
        })
        .catch(() => {
          this.updateUploadItemStatusToFailed(uplodaItemId);
        });
    }
  };

  /**
   * 删除上传文件项
   */
  abstract deleteUploadItem: (
    deleteItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => void;

  /**
   * 重新上传文件
   */
  abstract retryUploadItem: (
    retryItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => void;

  /**
   * 更新某个上传项的属性
   */
  abstract updateUploadItem: (
    updateItemId: string,
    overrideProps: Partial<IUploadFileItemInner<UPLOAD_ITEM>>
  ) => void;

  /**
   * 更新上传项状态为成功
   */
  updateUploadItemStatusToSuccess = (
    updateItemId: string,
    onUploadSuccessReturn: ON_UPLOAD_SUCCESS_RETURN
  ) => {
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.success,
      ...this.getUploadSuccessOverrideProps(onUploadSuccessReturn),
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItemId, overrideProps);
  };

  /**
   * 更新上传项状态为失败
   */
  updateUploadItemStatusToFailed = (updateItemId: string) => {
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.failed,
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItemId, overrideProps);
  };

  /**
   * 更新文件上传进度
   */
  updateUploadItemPercent = (updateItemId: string, percent: number) => {
    const updateItem = this.getUploadItem(updateItemId);
    // 已成功、已失败、已删除的上传项，不进行进度更新
    if (
      !updateItem ||
      updateItem.status === FILE_UPLOAD_STATUS.success ||
      updateItem.status === FILE_UPLOAD_STATUS.failed
    ) {
      return;
    }
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.uploading,
      percent,
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItemId, overrideProps);
  };

  /**
   * 添加新的上传项
   */
  abstract onTriggerUploadFile: (file: File) => Promise<any>;

  /**
   * 获取上传成功时要覆盖到 item 上的属性
   */
  protected getUploadSuccessOverrideProps(
    _onUploadSuccessReturn: ON_UPLOAD_SUCCESS_RETURN
  ): Partial<IUploadFileItemInner<UPLOAD_ITEM>> {
    return {};
  }

  /**
   * 创建一个新的上传文件项
   */
  protected abstract createNewUploadFileItem(
    file: File
  ):
    | IUploadFileItemInner<UPLOAD_ITEM>
    | Promise<IUploadFileItemInner<UPLOAD_ITEM>>;

  /**
   * 渲染文件上传触发器
   */
  protected abstract renderTrigger(i18n: II18nLocaleUpload): React.ReactNode;

  /**
   * 渲染说明文案
   */
  protected abstract renderTips(i18n: II18nLocaleUpload): React.ReactNode;
}

export default AbstractUpload;
