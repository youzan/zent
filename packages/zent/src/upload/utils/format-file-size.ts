const oneMB = 1024 * 1024;
const oneGB = 1024 * oneMB;
const oneKB = 1024;

/**
 * 将文件的Byte转换为可读性更好的G\M\K\B
 * @param size    大小，单位Byte
 * @return        格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 KB'
 */
export function formatFileSize(size: number) {
  if (size === Infinity) {
    return null;
  }

  let formattedSize = size;
  let unit = 'B';

  if (size >= oneGB) {
    formattedSize = size / oneGB;
    unit = 'G';
  } else if (size >= oneMB) {
    formattedSize = size / oneMB;
    unit = 'M';
  } else if (size >= oneKB) {
    formattedSize = size / oneKB;
    unit = 'K';
  }

  return `${formattedSize}${unit}`;
}
