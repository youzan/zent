import * as React from 'react';
import {
  IAbstractUploadProps,
  IUploadFileItemInner,
  IUploadFileItem,
  IUploadOnErrorCallback,
  IUploadChangeDetail,
} from '../types';
import { FILE_UPLOAD_STATUS } from '../constants';
import { II18nLocaleUpload } from '../../i18n';
import { wrapPromise, patchUploadItemId } from '../utils';

export interface IAbstractUploadState<UPLOAD_ITEM extends IUploadFileItem> {
  fileList: Array<IUploadFileItemInner<UPLOAD_ITEM>>;
}

abstract class AbstractUpload<
  UPLOAD_ITEM extends IUploadFileItem,
  ON_UPLOAD_SUCCESS_RETURN,
  P extends IAbstractUploadProps<UPLOAD_ITEM, ON_UPLOAD_SUCCESS_RETURN>
> extends React.PureComponent<P, IAbstractUploadState<UPLOAD_ITEM>> {
  constructor(props: P) {
    super(props);

    const { fileList, defaultFileList } = props;
    if (fileList && defaultFileList) {
      throw new Error(
        `props fileList can't use with defaultFileList, defaultFileList can only used in uncontrolled component`
      );
    }

    if (fileList) {
      fileList.forEach(patchUploadItemId);
    }

    if (defaultFileList) {
      defaultFileList.forEach(patchUploadItemId);
    }

    this.state = {
      fileList: defaultFileList || [],
    };
  }

  /**
   * 判断是否受控
   */
  get isControlled() {
    return !!this.props.fileList;
  }

  /** 上传项列表 */
  get fileList() {
    return this.isControlled ? this.props.fileList! : this.state.fileList;
  }

  /**
   * 在队列中的可用上传文件
   */
  get availableUploadItemsCount() {
    return this.fileList.filter(
      item => item.status !== FILE_UPLOAD_STATUS.failed
    ).length;
  }

  /**
   * 剩余可上传文件数量
   */
  get remainAmount() {
    const { maxAmount } = this.props;
    return maxAmount - this.availableUploadItemsCount;
  }

  /**
   * 修改文件列表内容
   */
  updateFileList = (
    list: UPLOAD_ITEM[],
    detail?: IUploadChangeDetail<UPLOAD_ITEM>,
    cb?: Function
  ) => {
    const updateCallback = () => {
      this.props.onChange(list, detail);
      cb && cb();
    };
    if (this.isControlled) {
      updateCallback();
    } else {
      this.setState(
        {
          fileList: list,
        },
        updateCallback
      );
    }
  };

  /**
   * 触发 onError 回调
   */
  emitOnError: IUploadOnErrorCallback = (type, data) => {
    this.props.onError && this.props.onError(type, data);
  };

  /**
   * 触发外部上传方法
   */
  emitOnUpload = (
    file: File,
    uploadItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => {
    const { onUpload } = this.props;
    // start upload
    onUpload(file, this.updateUploadItemPercent.bind(this, uploadItem))
      .then(onUploadReturn => {
        this.updateUploadItemStatusToSuccess(uploadItem, onUploadReturn);
      })
      .catch(() => {
        this.updateUploadItemStatusToFailed(uploadItem);
      });
  };

  /**
   * 删除上传文件项
   */
  deleteUploadItem = (deleteItem: IUploadFileItemInner<UPLOAD_ITEM>) => {
    const innerFileList = this.fileList as Array<
      IUploadFileItemInner<UPLOAD_ITEM>
    >;
    const newFileList = innerFileList.filter(
      item => item._id !== deleteItem._id
    );
    this.updateFileList(newFileList, {
      item: deleteItem,
      type: 'delete',
    });
  };

  /**
   * 重新上传文件
   */
  retryUploadItem = (retryItem: IUploadFileItemInner<UPLOAD_ITEM>) => {
    const innerFileList = this.fileList as Array<
      IUploadFileItemInner<UPLOAD_ITEM>
    >;
    const newRetryItem = {
      ...retryItem,
      status: FILE_UPLOAD_STATUS.uploading,
      percent: 0,
    };
    const newFileList = innerFileList.map(item =>
      item._id === retryItem._id ? newRetryItem : item
    );
    this.updateFileList(
      newFileList,
      {
        item: newRetryItem,
        type: 'change',
      },
      () => this.emitOnUpload(retryItem._file, newRetryItem)
    );
  };

  /**
   * 更新某个上传项的属性
   */
  updateUploadItem = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>,
    overrideProps: Partial<IUploadFileItemInner<UPLOAD_ITEM>>
  ) => {
    const itemExist = this.fileList.find(
      (item: IUploadFileItemInner<UPLOAD_ITEM>) => item._id === updateItem._id
    );
    // 上传项已经不存在，不执行 update 操作
    if (!itemExist) {
      return;
    }

    const newItem: IUploadFileItemInner<UPLOAD_ITEM> = {
      ...updateItem,
      ...overrideProps,
    };

    const newFileList = this.fileList.map(
      (item: IUploadFileItemInner<UPLOAD_ITEM>) =>
        item._id === updateItem._id ? newItem : item
    );
    this.updateFileList(newFileList, {
      item: newItem,
      type: 'change',
    });
  };

  /**
   * 更新上传项状态为成功
   */
  updateUploadItemStatusToSuccess = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>,
    onUploadSuccessReturn: ON_UPLOAD_SUCCESS_RETURN
  ) => {
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.success,
      ...this.getUploadSuccessOverrideProps(onUploadSuccessReturn),
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItem, overrideProps);
  };

  /**
   * 更新上传项状态为失败
   */
  updateUploadItemStatusToFailed = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => {
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.failed,
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItem, overrideProps);
  };

  /**
   * 更新文件上传进度
   */
  updateUploadItemPercent = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>,
    percent: number
  ) => {
    if (updateItem.status !== FILE_UPLOAD_STATUS.uploading) {
      return;
    }
    const overrideProps = {
      percent,
    } as Partial<IUploadFileItemInner<UPLOAD_ITEM>>;
    this.updateUploadItem(updateItem, overrideProps);
  };

  /**
   * 添加新的上传项
   */
  onTriggerUploadFile = (file: File) => {
    const { beforeUpload } = this.props;
    const beforeUploadRes = wrapPromise(
      beforeUpload ? beforeUpload(file) : true
    );

    // check is need upload
    beforeUploadRes
      .then(() => {
        // create upload file item async
        return this.createNewUploadFileItem(file);
      })
      .then(newUploadFileItem => {
        const { fileList } = this.state;
        const innerFileList = fileList as Array<
          IUploadFileItemInner<UPLOAD_ITEM>
        >;
        const newFileList: Array<IUploadFileItemInner<UPLOAD_ITEM>> = [
          ...innerFileList,
          newUploadFileItem,
        ];

        // update file list
        this.updateFileList(
          newFileList,
          {
            item: newUploadFileItem,
            type: 'add',
          },
          () => this.emitOnUpload(file, newUploadFileItem)
        );
      });
  };

  /**
   * 获取上传成功时要覆盖到 item 上的属性
   */
  protected getUploadSuccessOverrideProps(
    onUploadSuccessReturn: ON_UPLOAD_SUCCESS_RETURN
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

  /**
   * 渲染上传列表
   */
  protected abstract renderUploadList(i18n: II18nLocaleUpload): React.ReactNode;
}

export default AbstractUpload;
