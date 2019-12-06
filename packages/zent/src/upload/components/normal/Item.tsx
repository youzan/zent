import * as React from 'react';
import cn from 'classnames';
import { Icon } from '../../../icon';
import InlineLoading from '../../../loading/InlineLoading';
import { IUploadFileItem, INormalFileItemProps } from '../../types';
import { FILE_UPLOAD_STATUS } from '../../constants';
import { Progress, IProgressStatus } from '../../../progress';
import FileIcon from '../icons/File';
import VideoIcon from '../icons/Video';
import AudioIcon from '../icons/Audio';
import Pop from '../../../pop';

/**
 * 获取状态展示图标
 */
const mimeTypeIconMap: {
  [type: string]: React.ReactNode;
} = {
  audio: <AudioIcon />,
  video: <VideoIcon />,
};
const getFileIcon = (item: IUploadFileItem) => {
  const { status, type: mimeType } = item;

  // 上传失败 icon
  if (status === FILE_UPLOAD_STATUS.failed) {
    return <Icon className="zent-upload-item__icon" type="warning" />;
  }

  // 上传中 icon
  if (status === FILE_UPLOAD_STATUS.uploading) {
    return (
      <InlineLoading
        className="zent-upload-item__icon"
        loading
        icon="circle"
        iconSize={16}
      />
    );
  }

  // 文件分类 icon
  for (const type in mimeTypeIconMap) {
    if (mimeTypeIconMap.hasOwnProperty(type) && mimeType.indexOf(type) === 0) {
      return mimeTypeIconMap[type];
    }
  }

  // 默认文件 icon
  return <FileIcon />;
};

/** 上传状态到进度条状态常量的映射 */
const uploadToProgressStatusMap: {
  [key in FILE_UPLOAD_STATUS]: IProgressStatus;
} = {
  [FILE_UPLOAD_STATUS.failed]: 'exception',
  [FILE_UPLOAD_STATUS.success]: 'success',
  [FILE_UPLOAD_STATUS.uploading]: 'normal',
};

/**
 * 通用上传组件上传项
 */
const NormalUploadItem: React.FC<INormalFileItemProps> = props => {
  const { i18n, item, onDelete, onRetry } = props;
  const isFailed = item.status === FILE_UPLOAD_STATUS.failed;

  const deleteHandler = React.useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >(
    e => {
      e.stopPropagation();
      onDelete(item);
    },
    [item, onDelete]
  );
  const retryHandler = React.useCallback<
    React.MouseEventHandler<HTMLAnchorElement>
  >(
    e => {
      e.stopPropagation();
      onRetry(item);
    },
    [item, onRetry]
  );

  const cls = cn('zent-upload-item', {
    ['zent-upload-item__failed']: isFailed,
  });

  return (
    <li key={item._id} className={cls}>
      <div className="zent-upload-item__info">
        {getFileIcon(item)}
        <Pop content={item.name} trigger="hover">
          <span className="zent-upload-item__name">{item.name}</span>
        </Pop>
        <div className="zent-upload-item__actions">
          {isFailed && (
            <a className="zent-upload-item__retry" onClick={retryHandler}>
              {i18n.retry}
            </a>
          )}
          <a onClick={deleteHandler}>{i18n.delete}</a>
        </div>
      </div>
      {item.status === FILE_UPLOAD_STATUS.uploading && (
        <Progress
          showInfo={false}
          className="zent-upload-item__progress"
          strokeWidth={2}
          status={uploadToProgressStatusMap[item.status]}
          percent={item.percent}
        />
      )}
    </li>
  );
};

export default NormalUploadItem;
