const oneMB = 1024 * 1024;
const oneGB = 1024 * oneMB;

/**
 * 将文件的Byte转换为可读性更好的GB\MB\KB\B
 * @param  {number} size    大小，单位Byte
 * @param  {number} toFixed 保留几位小数，默认值为1
 * @return {string}         格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 MB'
 */
export function formatFileSize(size, toFixed?: number) {
  size = +size || 0;

  if (typeof toFixed === 'undefined') {
    toFixed = 1;
  }

  if (size >= oneGB) {
    return `${(size / oneGB).toFixed(toFixed)} GB`;
  }

  if (size >= oneMB) {
    return `${(size / oneMB).toFixed(toFixed)} MB`;
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(toFixed)} KB`;
  }

  return `${size.toFixed(toFixed)} B`;
}

export function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function formatErrorMessages(type, data, defaults) {
  if (typeof type === 'undefined') {
    type = defaults;
  }
  if (typeof type === 'function') {
    return type(data);
  }
  return type;
}
