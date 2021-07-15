import * as React from 'react';

import { II18nLocaleUpload } from '../../i18n';
import { FILE_UPLOAD_STATUS } from '../constants';
import {
  IAbstractMultiUploadProps,
  IUploadChangeDetail,
  IUploadFileItem,
  IUploadItemProps,
} from '../types';
import { patchUploadItemId } from '../utils/id';
import { wrapPromise } from '../utils/wrap-promise';
import AbstractUpload from './AbstractUpload';

export interface IAbstractMultiUploadState<
  UPLOAD_ITEM extends IUploadFileItem
> {
  fileList: Array<UPLOAD_ITEM>;
}

abstract class AbstractMultiUpload<
  UPLOAD_ITEM extends IUploadFileItem,
  ON_UPLOAD_SUCCESS_RETURN,
  UPLOAD_ITEM_COMP_PROPS extends IUploadItemProps<UPLOAD_ITEM>,
  P extends IAbstractMultiUploadProps<
    UPLOAD_ITEM,
    ON_UPLOAD_SUCCESS_RETURN,
    UPLOAD_ITEM_COMP_PROPS
  >
> extends AbstractUpload<
  UPLOAD_ITEM,
  ON_UPLOAD_SUCCESS_RETURN,
  UPLOAD_ITEM_COMP_PROPS,
  P,
  IAbstractMultiUploadState<UPLOAD_ITEM>
> {
  constructor(props: P) {
    super(props);

    const { fileList, defaultFileList } = props;
    if (fileList && defaultFileList) {
      throw new Error(
        `'fileList' can't be used with 'defaultFileList', 'defaultFileList' can only used in uncontrolled component`
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

  static getDerivedStateFromProps(
    nextProps: IAbstractMultiUploadProps<
      IUploadFileItem,
      any,
      IUploadItemProps<IUploadFileItem>
    >
  ) {
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || [],
      };
    }
    return null;
  }

  /**
   * 判断是否受控
   */
  get isControlled() {
    return !!this.props.fileList;
  }

  /** 上传项列表 */
  get fileList() {
    return this.isControlled
      ? (this.props.fileList as UPLOAD_ITEM[])
      : this.state.fileList;
  }

  /**
   * 剩余可上传文件数量
   */
  get remainAmount() {
    const { maxAmount } = this.props;
    return maxAmount - this.fileList.length;
  }

  getUploadItem(id: string): UPLOAD_ITEM | null {
    return this.fileList.find((item: UPLOAD_ITEM) => item.id === id) || null;
  }

  /**
   * 修改文件列表内容
   */
  updateFileList = (
    list: UPLOAD_ITEM[],
    detail?: IUploadChangeDetail<UPLOAD_ITEM>,
    cb?: () => void
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
   * 删除上传文件项
   */
  deleteUploadItem = (deleteItem: UPLOAD_ITEM) => {
    const innerFileList = this.fileList;
    const newFileList = innerFileList.filter(item => item.id !== deleteItem.id);
    this.updateFileList(newFileList, {
      item: deleteItem,
      type: 'delete',
    });
  };

  /**
   * 重新上传文件
   */
  retryUploadItem = (retryItem: UPLOAD_ITEM) => {
    const innerFileList = this.fileList;
    const newRetryItem = {
      ...retryItem,
      status: FILE_UPLOAD_STATUS.uploading,
      percent: 0,
    };
    const newFileList = innerFileList.map(item =>
      item.id === retryItem.id ? newRetryItem : item
    );
    this.updateFileList(
      newFileList,
      {
        item: newRetryItem,
        type: 'retry',
      },
      () => this.emitOnUpload(retryItem.file, newRetryItem)
    );
  };

  /**
   * 更新某个上传项的属性
   */
  updateUploadItem = (
    updateItemId: string,
    overrideProps: Partial<UPLOAD_ITEM>
  ) => {
    const updateItem = this.getUploadItem(updateItemId);
    // 上传项已经不存在，不执行 update 操作
    if (!updateItem) {
      return;
    }

    const newItem: UPLOAD_ITEM = {
      ...updateItem,
      ...overrideProps,
    };

    const newFileList = this.fileList.map(item =>
      item.id === updateItem.id ? newItem : item
    );
    this.updateFileList(newFileList, {
      item: newItem,
      type: 'change',
    });
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
    return beforeUploadRes
      .then(() => {
        // create upload file item async
        return this.createNewUploadFileItem(file);
      })
      .then(newUploadFileItem => {
        const { fileList } = this.state;
        const innerFileList = fileList;
        const newFileList: Array<UPLOAD_ITEM> = [
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
   * 创建一个新的上传文件项
   */
  protected abstract createNewUploadFileItem(
    file: File
  ): UPLOAD_ITEM | Promise<UPLOAD_ITEM>;

  /**
   * 渲染上传列表
   */
  protected abstract renderUploadList(i18n: II18nLocaleUpload): React.ReactNode;
}

export default AbstractMultiUpload;
