import { IErrorMessageConfig } from '../types';

import * as Sortable from 'sortablejs';

const UNSORTABLE = 'unsortable';

export function initSortable(el, onMove) {
  let initState = [];
  const sortable = Sortable.create(el, {
    filter: `.${UNSORTABLE}`,
    onStart() {
      initState = sortable.toArray();
    },
    onMove(evt) {
      return evt.related.className !== UNSORTABLE;
    },
    onEnd(evt) {
      const { newIndex, oldIndex } = evt;
      sortable.sort(initState);
      onMove(oldIndex, newIndex);
    },
  });
  return sortable;
}

export function swapArray(list, fromIndex, toIndex) {
  const result = Array.from([].concat(list));
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

const oneMB = 1024 * 1024;
const oneGB = 1024 * oneMB;

/**
 * 将文件的Byte转换为可读性更好的GB\MB\KB\B
 * @param size    大小，单位Byte
 * @param toFixed 保留几位小数，默认值为1
 * @return        格式化后的字符串
 * @example
 * formatFileSize(1024) => '1 KB'
 */
export function formatFileSize(size: number, toFixed = 1) {
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

/**
 * 格式化错误展示信息
 */
export function formatErrorMessages<Data>(
  type: IErrorMessageConfig<Data> | undefined,
  data: Data,
  defaults: IErrorMessageConfig<Data>
) {
  if (typeof type === 'undefined') {
    type = defaults;
  }
  if (typeof type === 'function') {
    return type(data);
  }
  return type;
}
