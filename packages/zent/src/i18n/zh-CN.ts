import { setLocale, zhCN } from './time-locale';
import {
  II18nLocaleCommon,
  II18nLocaleCopyButton,
  II18nLocalePagination,
  II18nLocalePop,
  II18nLocalePreviewImage,
  II18nLocaleRangePicker,
  II18nLocaleSelect,
  II18nLocaleSwitch,
  II18nLocaleSweetalert,
  II18nLocaleGrid,
  II18nLocaleTable,
  II18nLocaleCascader,
  I18nLocaleTimePicker,
  II18nLocaleTypeMap,
  II18nLocaleUpload,
  II18nLocaleMention,
} from './locale';

const common: II18nLocaleCommon = {
  confirm: '确认',
  cancel: '取消',
  ok: '我知道了',
  comma: '，',
  reset: '重置',
};

export const mark = 'zh-CN';

export const CopyButton: II18nLocaleCopyButton = {
  copy: '复制',
  success: '复制成功',
  error: '复制失败',
};

export const Pagination: II18nLocalePagination = {
  page: '页',
  jump: '跳至',
  total: '共',
  items: '条',
  perPage: '每页',
  comma: common.comma,
};

export const Pop: II18nLocalePop = {
  ...common,
};

export const PreviewImage: II18nLocalePreviewImage = {
  alt: '图片下载失败',
  prev: '上一张',
  next: '下一张',
  rotate: '翻转',
};

export const RangePicker: II18nLocaleRangePicker = {
  7: '近7天',
  30: '近30天',
};

export const Select: II18nLocaleSelect = {
  input: '请选择',
  empty: '没有找到匹配项',
};

export const Switch: II18nLocaleSwitch = {
  checked: '开启',
  unchecked: '关闭',
};

export const Sweetalert: II18nLocaleSweetalert = {
  ...common,
  title: '提示',
};

export const Grid: II18nLocaleGrid = {
  ...common,
  emptyLabel: '没有更多数据了',
};

export const Table: II18nLocaleTable = {
  ...common,
  emptyLabel: '没有更多数据了',
};

export const Cascader: II18nLocaleCascader = {
  ...common,
  title: '标题',
  placeholder: '请选择',
};

export const TimePicker: I18nLocaleTimePicker = () => {
  setLocale(zhCN);

  return {
    ...common,
    time: '请选择时间',
    date: '请选择日期',
    week: '请选择自然周',
    month: '请选择月份',
    quarter: '请选择季度',
    year: '请选择年',
    range: '开始日期 至 结束日期',
    rangeError: '请选择起止时间',
    start: '开始日期',
    end: '结束日期',
    startTime: '开始时间',
    endTime: '结束时间',
    to: '至',
    current: {
      time: '此刻',
      date: '今天',
      week: '本周',
      month: '当前月',
      year: '今年',
    },
    panel: {
      hour: '时',
      minute: '分',
      second: '秒',
      hourSelect: '选择小时',
      minuteSelect: '选择分钟',
      secondSelect: '选择秒',
      titleFormat: 'YYYY年MMM',
      quarterNames: ['第一季度', '第二季度', '第三季度', '第四季度'],
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
  };
};

const TypeMap: II18nLocaleTypeMap = {
  image: '图片',
  voice: '音频',
};

const TypeUnitMap = {
  image: '张',
  voice: '个',
};

export const Upload: II18nLocaleUpload = {
  ...common,
  title_voice: '声音选择',
  title_image: '图片选择',
  input: {
    holder: '添加',
    maxAmount({ maxAmount, type }) {
      return `最多上传 ${maxAmount} ${TypeUnitMap[type]}${TypeMap[type]}`;
    },
    maxSize({ maxSize, type }) {
      return `不能上传大于 ${maxSize} 的${TypeMap[type]}`;
    },
    type({ type }) {
      return `不能上传不支持的${TypeMap[type]}类型`;
    },
  },
  popup: {
    web: '网络图片',
    group: '上传至分组',
    holder: '请添加网络图片地址',
    title_voice: '本地音频',
    title_image: '本地图片',
    type({ types, size }) {
      return `仅支持 ${types.join('、')} ${
        types.length
      }种格式, 大小不超过${size}`;
    },
    extract: '提取',
    extracting: '提取中...',
  },
};

export const Mention: II18nLocaleMention = {
  noContent: '无匹配结果，轻敲空格完成输入',
};
