import cn from 'classnames';

import { Icon } from '../../../icon';
import Pop from '../../../pop';
import { Progress } from '../../../progress';
import { FILE_UPLOAD_STATUS } from '../../constants';
import { useItemHandler } from '../../hooks/item-handler';
import { INormalUploadItemProps, IUploadFileItem } from '../../types';
import { hasOwnProperty } from '../../../utils/hasOwn';

/**
 * 获取状态展示图标
 */
const mimeTypeIconMap: {
  [type: string]: React.ReactNode;
} = {
  audio: (
    <Icon
      className="zent-file-upload-item-icon zent-file-upload-item-icon__type"
      type="voice"
    />
  ),
  video: (
    <Icon
      className="zent-file-upload-item-icon zent-file-upload-item-icon__type"
      type="video"
    />
  ),
};
const getFileIcon = (item: IUploadFileItem) => {
  const { status, type: mimeType } = item;

  // 上传失败 icon
  if (status === FILE_UPLOAD_STATUS.failed) {
    return <Icon className="zent-file-upload-item-icon" type="error-circle" />;
  }

  // 文件分类 icon
  for (const type in mimeTypeIconMap) {
    if (hasOwnProperty(mimeTypeIconMap, type) && mimeType.indexOf(type) === 0) {
      return mimeTypeIconMap[type];
    }
  }

  // 默认文件 icon
  return (
    <Icon
      className="zent-file-upload-item-icon zent-file-upload-item-icon__type"
      type="doc"
    />
  );
};

const splitFileNameParts = (filename: string) => {
  // .gitignore 之类 .开头的文件名
  if (filename[0] === '.') {
    return [filename];
  }

  // 使用 lastIndexOf 是为了处理拥有两个或以上.数量的文件名，如 webpack.config.js
  const splitIndex = filename.lastIndexOf('.');
  return [filename.slice(0, splitIndex), filename.slice(splitIndex)];
};

/**
 * 通用上传组件上传项
 */
const NormalUploadItem: React.FC<INormalUploadItemProps> = props => {
  const { i18n, item } = props;
  const isFailed = item.status === FILE_UPLOAD_STATUS.failed;
  const { deleteHandler, retryHandler } = useItemHandler(props);

  const isUploading = item.status === FILE_UPLOAD_STATUS.uploading;

  const cls = cn('zent-file-upload-item', {
    ['zent-file-upload-item__failed']: isFailed,
    ['zent-file-upload-item__uploading']: isUploading,
  });

  const [filename, ext] = splitFileNameParts(item.name);

  return (
    <li key={item.id} className={cls}>
      <div className="zent-file-upload-item-info">
        {getFileIcon(item)}
        <div className="zent-file-upload-item-name-wrapper">
          <Pop content={item.name} trigger="hover" mouseEnterDelay={500}>
            <p className="zent-file-upload-item-name-line">
              <span className="zent-file-upload-item-name">{filename}</span>
              <span className="zent-file-upload-item-name-ext">{ext}</span>
            </p>
          </Pop>
        </div>
        <div className="zent-file-upload-item-actions">
          {isFailed && (
            <a className="zent-file-upload-item-retry" onClick={retryHandler}>
              {i18n.retry}
            </a>
          )}
          <a onClick={deleteHandler}>{i18n.delete}</a>
        </div>
      </div>
      {isUploading && (
        <Progress
          showInfo={false}
          className="zent-file-upload-item-progress"
          strokeWidth={2}
          status="normal"
          percent={item.percent}
        />
      )}
    </li>
  );
};

export default NormalUploadItem;
