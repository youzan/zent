import isInteger from '../../utils/isInteger';

const oneMB = 1024 * 1024;
const oneGB = 1024 * oneMB;
const oneKB = 1024;

/**
 * 将文件的Byte转换为可读性更好的G\M\K\B
 * @param size    大小，单位Byte
 * @param toFixed 保留几位小数，默认值为1
 * @return        格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 KB'
 */
export function formatFileSize(size: number, toFixed = 1) {
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

  return `${
    isInteger(formattedSize) ? formattedSize : formattedSize.toFixed(toFixed)
  }${unit}`;
}
