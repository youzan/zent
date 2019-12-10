import isPromise from '../utils/isPromise';
import uniqueId from '../utils/uniqueId';
import {
  IUploadFileItemInner,
  IUploadFileItem,
  IImageUploadFileItem,
} from './types';
import previewImage from '../preview-image';

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

const oneMB = 1024 * 1024;
const oneGB = 1024 * oneMB;

/**
 * 将文件的Byte转换为可读性更好的G\M\K\B
 * @param size    大小，单位Byte
 * @param toFixed 保留几位小数，默认值为1
 * @return        格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 KB'
 */
export function formatFileSize(size: number, toFixed = 1) {
  if (size >= oneGB) {
    return `${(size / oneGB).toFixed(toFixed)}G`;
  }

  if (size >= oneMB) {
    return `${(size / oneMB).toFixed(toFixed)}M`;
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(toFixed)}K`;
  }

  return `${size.toFixed(toFixed)}B`;
}

export function wrapPromise(condition: boolean | Promise<any>) {
  if (isPromise(condition)) {
    return condition;
  }
  return condition ? Promise.resolve() : Promise.reject();
}

/**
 * 默认获取缩略图方法
 */
export function defaultGetThumbSrcFromFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => resolve(fileReader.result as string);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
}

/**
 * 默认点击图片时的放大预览方法
 */
export function defaultPreview(
  file: IImageUploadFileItem,
  fileList: IImageUploadFileItem[]
) {
  const previewIndex = fileList.indexOf(file);
  previewImage({
    index: previewIndex,
    images: fileList.map(item => item.src || item.thumbSrc),
  });
}
