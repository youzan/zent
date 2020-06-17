import { formatDate } from '../utils/index';
/**
 * 选中日期范围对应的展示text
 * 仅支持combinedDate
 * @param value 当前日期范围
 * @param format
 */
export default function useInputRangeText(value: [Date, Date], format: string) {
  if (!value) return [null, null];
  const start = value[0] ? formatDate(value[0], format) : '';
  const end = value[1] ? formatDate(value[1], format) : '';
  return [start, end];
}
