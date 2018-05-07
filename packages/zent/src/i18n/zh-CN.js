import { setLocale, zhCN } from './time-locale';

const common = {
  confirm: '确认',
  cancel: '取消',
  ok: '我知道了',
  comma: '，',
  reset: '重置',
};

export const mark = 'zh-CN';

export const CopyButton = {
  copy: '复制',
  success: '复制成功',
  error: '复制失败',
};

export const Pagination = {
  total: '共',
  pages: '页',
  items: '条',
  perPage: '每页',
  comma: common.comma,
};

export const Pop = {
  ...common,
};

export const PreviewImage = {
  alt: '图片下载失败',
  prev: '上一张',
  next: '下一张',
  rotate: '翻转',
};

export const RangePicker = {
  7: '近7天',
  30: '近30天',
};

export const Select = {
  input: '请选择',
  empty: '没有找到匹配项',
};

export const Switch = {
  checked: '开启',
  unchecked: '关闭',
};

export const Sweetalert = {
  ...common,
  title: '提示',
};

export const Grid = {
  ...common,
  emptyLabel: '没有更多数据了',
};

export const Table = {
  ...common,
  emptyLabel: '没有更多数据了',
};

export const Cascader = {
  ...common,
  title: '标题',
  placeholder: '请选择',
};

export const TimePicker = () => {
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

export const Sku = {
  notify: '规格名不能相同',
  buttonAdd: '添加规格项目',
  container: {
    del: '删除',
    replace: '替换',
    add: '+添加',
  },
  group: {
    add: '添加规格图片',
    imageTip1: '目前只支持为第一个规格设置不同的规格图片',
    imageTip2: '设置后，用户选择不同规格会显示不同图片',
    imageTip3: '建议尺寸：640 x 640像素',
  },
};

const TypeMap = {
  image: '图片',
  voice: '音频',
};

export const Upload = {
  ...common,
  title_voice: '声音选择',
  title_image: '图片选择',
  input: {
    holder: '添加',
    maxAmount({ maxAmount, type }) {
      return `已经自动过滤${maxAmount}张之后的${TypeMap[type]}文件`;
    },
    maxSize({ maxSize, type }) {
      return `已经自动过滤大于${maxSize}的${TypeMap[type]}文件`;
    },
    type({ type }) {
      return `已经自动过滤类型不正确的${TypeMap[type]}文件`;
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

export const Mention = {
  noContent: '无匹配结果，轻敲空格完成输入',
};
