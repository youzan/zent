export const IMAGE_DEFAULT_ACCEPT =
  'image/jpeg, image/png, image/bmp, image/gif';

export enum FILE_UPLOAD_STATUS {
  beforeUpload = 'beforeUpload', // 上传前
  uploading = 'uploading', // 上传中
  failed = 'failed', // 上传失败
  success = 'success', // 上传成功
}

// 默认最大上传数
export const DEFAULT_MAX_AMOUNT = Infinity;

// 默认最大上传文件大小
export const DEFAULT_MAX_SIZE = Infinity;

// 默认是否启用多选上传
export const DEFAULT_ENABLE_MULTIPLE = false;
