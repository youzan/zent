import uniqueId from '../../utils/uniqueId';
import { IUploadFileItem, IUploadFileItemInner } from '../types';

/**
 * 创建一个唯一 Id
 */
export const createUploadItemId = () => {
  return uniqueId('zent-upload-item-');
};

/**
 * 为 upload item 添加 _id 属性
 */
export const patchUploadItemId = <UPLOAD_ITEM extends IUploadFileItem>(
  item: IUploadFileItemInner<UPLOAD_ITEM>
) => {
  item._id = createUploadItemId();
};
