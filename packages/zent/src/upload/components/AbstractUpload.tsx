import * as React from 'react';
import {
  IAbstractUploadProps,
  IUploadFileItemInner,
  IUploadFileItem,
  IUploadOnErrorCallback,
  IUploadChangeDetail,
} from '../types';
import { FILE_UPLOAD_STATUS } from '../constants';
import isEqual from 'lodash-es/isEqual';
import { II18nLocaleUpload } from '../../i18n';
import { wrapPromise } from '../utils';

export interface IAbstractUploadState<UPLOAD_ITEM extends IUploadFileItem> {
  fileList: Array<IUploadFileItemInner<UPLOAD_ITEM>>;
}

abstract class AbstractUpload<
  UPLOAD_ITEM extends IUploadFileItem,
  P extends IAbstractUploadProps<UPLOAD_ITEM>,
  S extends IAbstractUploadState<UPLOAD_ITEM> = IAbstractUploadState<
    UPLOAD_ITEM
  >
> extends React.PureComponent<P, S> {
  // update state fileList from props
  static getDerivedStateFromProps(
    nextProps: Readonly<IAbstractUploadProps<IUploadFileItem>>,
    prevState: IAbstractUploadState<IUploadFileItem>
  ) {
    const fileList = nextProps.fileList;
    if (nextProps.fileList && !isEqual(fileList, prevState.fileList)) {
      return {
        fileList,
      };
    }
    return null;
  }

  constructor(props: P) {
    super(props);
  }

  /**
   * 判断是否受控
   */
  get isControlled() {
    return !!this.props.fileList;
  }

  get fileList() {
    return this.isControlled ? this.props.fileList! : this.state.fileList;
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
   * 在队列中的可用上传文件
   */
  get availableUploadItemsCount() {
    return this.fileList.filter(
      item => item.status !== FILE_UPLOAD_STATUS.failed
    ).length;
  }

  /**
   * 触发 onError 回调
   */
  emitOnError: IUploadOnErrorCallback = (type, data) => {
    this.props.onError && this.props.onError(type, data);
  };

  /**
   * 删除上传文件项
   */
  deleteUploadItem(
    deleteItem: IUploadFileItemInner<UPLOAD_ITEM>,
    index: number
  ) {
    const innerFileList = this.fileList as Array<
      IUploadFileItemInner<UPLOAD_ITEM>
    >;
    const newFileList = innerFileList.filter(
      item => item._id !== deleteItem._id
    );
    this.updateFileList(newFileList, {
      index,
      item: deleteItem,
      type: 'delete',
    });
  }

  /**
   * 重新上传文件
   */
  retryUploadItem(retryItem: IUploadFileItemInner<UPLOAD_ITEM>, index: number) {
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
    this.updateFileList(newFileList, {
      index,
      item: newRetryItem,
      type: 'change',
    });
  }

  /**
   * 更新某个上传项的属性
   */
  updateUploadItem = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>,
    overrideProps: Partial<IUploadFileItemInner<UPLOAD_ITEM>>
  ) => {
    this.setState(prevState => {
      const newItem: IUploadFileItemInner<UPLOAD_ITEM> = {
        ...updateItem,
        ...overrideProps,
      };
      const newFileList = prevState.fileList.map(item =>
        item._id === updateItem._id ? newItem : item
      );
      return {
        fileList: newFileList,
      };
    });
  };

  /**
   * 更新上传项状态为成功
   */
  updateUploadItemStatusToSuccess = (
    updateItem: IUploadFileItemInner<UPLOAD_ITEM>
  ) => {
    const overrideProps = {
      status: FILE_UPLOAD_STATUS.success,
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
    const { beforeUpload, onUpload } = this.props;
    const beforeUploadRes = wrapPromise(
      beforeUpload ? beforeUpload(file) : true
    );

    // check is need upload
    beforeUploadRes.then(() => {
      const { fileList } = this.state;
      const innerFileList = fileList as Array<
        IUploadFileItemInner<UPLOAD_ITEM>
      >;
      const newUploadFileItem: IUploadFileItemInner<
        UPLOAD_ITEM
      > = this.createNewUploadFileItem(file);
      const newFileList: Array<IUploadFileItemInner<UPLOAD_ITEM>> = [
        ...innerFileList,
        newUploadFileItem,
      ];

      // update file list
      this.updateFileList(
        newFileList,
        {
          index: innerFileList.length,
          item: newUploadFileItem,
          type: 'add',
        },
        () => {
          // start upload
          onUpload(
            file,
            this.updateUploadItemPercent.bind(this, newUploadFileItem)
          )
            .then(() => {
              this.updateUploadItemStatusToSuccess(newUploadFileItem);
            })
            .catch(() => {
              this.updateUploadItemStatusToFailed(newUploadFileItem);
            });
        }
      );
    });
  };

  /**
   * 创建一个新的上传文件项
   */
  protected abstract createNewUploadFileItem(
    file: File
  ): IUploadFileItemInner<UPLOAD_ITEM>;

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
