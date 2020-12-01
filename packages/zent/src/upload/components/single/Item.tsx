import cn from 'classnames';
import * as React from 'react';
import Icon from '../../../icon';
import InlineLoading from '../../../loading/InlineLoading';

import { FILE_UPLOAD_STATUS } from '../../constants';
import { useItemHandler } from '../../hooks/item-handler';
import { INormalUploadItemProps, IUploadFileItem } from '../../types';

const getFileIcon = (item: IUploadFileItem) => {
  const { status } = item;

  // 上传失败 icon
  if (status === FILE_UPLOAD_STATUS.failed) {
    return (
      <Icon className="zent-single-upload-item-icon" type="error-circle" />
    );
  }

  // 上传中 icon
  if (status === FILE_UPLOAD_STATUS.uploading) {
    return (
      <InlineLoading
        className="zent-single-upload-item-icon"
        loading
        icon="circle"
        iconSize={14}
      />
    );
  }

  return null;
};

/**
 * 通用上传组件上传项
 */
const SingleUploadItem: React.FC<INormalUploadItemProps> = props => {
  const { i18n, item } = props;
  const { deleteHandler, retryHandler } = useItemHandler(props);

  const isFailed = item.status === FILE_UPLOAD_STATUS.failed;
  const isUploading = item.status === FILE_UPLOAD_STATUS.uploading;

  const displayName = [
    FILE_UPLOAD_STATUS.beforeUpload,
    FILE_UPLOAD_STATUS.uploading,
  ].includes(item.status)
    ? i18n.uploading
    : item.name;

  const cls = cn('zent-single-upload-item', {
    ['zent-single-upload-item__failed']: isFailed,
    ['zent-single-upload-item__uploading']: isUploading,
  });

  const actions = {
    retry: (
      <a
        key="retry"
        className="zent-single-upload-item-retry"
        onClick={retryHandler}
      >
        {i18n.retry}
      </a>
    ),
    cancel: (
      <a key="cancel" onClick={deleteHandler}>
        {i18n.cancel}
      </a>
    ),
    delete: (
      <a key="delete" onClick={deleteHandler}>
        {i18n.delete}
      </a>
    ),
  };

  const statusActions = {
    [FILE_UPLOAD_STATUS.uploading]: [actions.cancel],
    [FILE_UPLOAD_STATUS.failed]: [actions.retry, actions.delete],
    [FILE_UPLOAD_STATUS.success]: [actions.delete],
  };

  return (
    <div key={item._id} className={cls}>
      <div className="zent-single-upload-item-info">
        {getFileIcon(item)}
        <div className="zent-single-upload-item-name">{displayName}</div>
        <div className="zent-single-upload-item-actions">
          {statusActions[item.status]}
        </div>
      </div>
    </div>
  );
};

export default SingleUploadItem;
