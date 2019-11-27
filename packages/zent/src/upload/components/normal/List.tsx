import * as React from 'react';
import {
  IUploadFileItem,
  IUploadFileItemInner,
  IUploadListProps,
  IUploadPaginationType,
} from '../../types';
import AbstractUploadList from '../AbstractList';
import ClampLines from '../../../clamp-lines';
import { FILE_UPLOAD_STATUS } from '../../constants';
import { Icon } from '../../../icon';
import InlineLoading from '../../../loading/InlineLoading';
import Progress from '../../../progress';

/**
 * 获取状态展示图标
 */
const mimeTypeIconMap: {
  [type: string]: React.ReactNode;
} = {
  audio: <Icon type="video-guide" />,
  video: <Icon type="summary" />,
};
const getFileIcon = (item: IUploadFileItem) => {
  const { status, type: mimeType } = item;
  if (status === FILE_UPLOAD_STATUS.uploading) {
    return <InlineLoading loading />;
  }
  for (const type in mimeTypeIconMap) {
    if (mimeTypeIconMap.hasOwnProperty(type)) {
      const icon = mimeTypeIconMap[type];
      if (mimeType.indexOf(type) === 0) {
        return icon;
      }
    }
  }
  return <Icon type="message" />;
};

export default class NormalUploadList<
  PAGINATION_TYPE extends IUploadPaginationType
> extends AbstractUploadList<
  IUploadFileItem,
  IUploadListProps<PAGINATION_TYPE>
> {
  renderFileItem = (
    item: IUploadFileItemInner<IUploadFileItem>,
    index: number
  ): React.ReactNode => {
    const { i18n } = this.props;
    const { status } = item;
    return (
      <li key={item._id} className="zent-upload-item">
        <div className="zent-upload-item__info">
          {getFileIcon(item)}
          <ClampLines lines={1} text={item.name} />
          {status === FILE_UPLOAD_STATUS.failed && (
            <a className="zent-link">{i18n.retry}</a>
          )}
          <a className="zent-link">{i18n.delete}</a>
        </div>
        {item.status === FILE_UPLOAD_STATUS.uploading && (
          <Progress
            className="zent-upload-item__progress"
            strokeWidth={2}
            percent={20}
          />
        )}
      </li>
    );
  };
}
