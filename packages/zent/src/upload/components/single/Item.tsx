import cn from 'classnames';
import * as React from 'react';
import InlineLoading from '../../../loading/InlineLoading';

import Pop from '../../../pop';
import { Progress } from '../../../progress';
import { FILE_UPLOAD_STATUS } from '../../constants';
import { useItemHandler } from '../../hooks/item-handler';
import { INormalUploadItemProps } from '../../types';

/**
 * 通用上传组件上传项
 */
const SingleUploadItem: React.FC<INormalUploadItemProps> = props => {
  const { i18n, item } = props;
  const isFailed = item.status === FILE_UPLOAD_STATUS.failed;
  const { deleteHandler, retryHandler } = useItemHandler(props);

  const isUploading = item.status === FILE_UPLOAD_STATUS.uploading;

  const cls = cn('zent-single-upload-item', {
    ['zent-single-upload-item__failed']: isFailed,
    ['zent-single-upload-item__uploading']: isUploading,
  });

  return (
    <div key={item._id} className={cls}>
      <div className="zent-single-upload-item-info">
        {isUploading && (
          <InlineLoading
            className="zent-single-upload-item-loading"
            loading
            icon="circle"
            iconSize={16}
          />
        )}
        <div className="zent-single-upload-item-name">{item.name}</div>
        <div className="zent-single-upload-item-actions">
          {isFailed && (
            <a className="zent-single-upload-item-retry" onClick={retryHandler}>
              {i18n.retry}
            </a>
          )}
          <a onClick={deleteHandler}>{i18n.delete}</a>
        </div>
      </div>
    </div>
  );
};

export default SingleUploadItem;
