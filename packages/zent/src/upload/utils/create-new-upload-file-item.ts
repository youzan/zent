import { FILE_UPLOAD_STATUS } from '../constants';
import { IUploadFileItem, IUploadFileItemInner } from '../types';
import { createUploadItemId } from './id';

export function createBaseNewUploadFileItem(
  file: File
): IUploadFileItemInner<IUploadFileItem> {
  const id = createUploadItemId();
  const item: IUploadFileItemInner<IUploadFileItem> = {
    // 拷贝一份 id 和 file 的值，这两个属性理论上在内部不会被修改
    // getter 和 setter 在解构时依旧会变成两个属性
    _id: id,
    _file: file,
    id,
    file,
    name: file.name,
    type: file.type,
    status: FILE_UPLOAD_STATUS.beforeUpload,
    percent: 0,
  };
  return item;
}
