import uniqueId from 'lodash-es/uniqueId';
import isPromise from '../../utils/isPromise';

/**
 * 创建一个唯一 Id
 */
export const createUploadItemId = () => {
  return uniqueId('zent-upload-item-');
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
