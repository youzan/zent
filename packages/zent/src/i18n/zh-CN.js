import { setLocale, zhCN } from './time-locale';

const common = {
  confirm: '确认',
  cancel: '取消',
  ok: '我知道了',
  comma: '，'
};

export const mark = 'zh-CN';

export const CopyButton = {
  copy: '复制',
  success: '复制成功',
  error: '复制失败'
};

export const Pagination = {
  total: '共',
  pages: '页',
  items: '条',
  perPage: '每页',
  comma: common.comma
};

export const Pop = {
  ...common
};

export const PreviewImage = {
  alt: '图片下载失败',
  prev: '上一张',
  next: '下一张',
  rotate: '翻转'
};

export const RangePicker = {
  7: '近7天',
  30: '近30天'
};

export const Select = {
  input: '请选择',
  search: '没有找到匹配项'
};

export const Switch = {
  checked: '开启',
  unchecked: '关闭'
};

export const Sweetalert = {
  ...common,
  title: '提示'
};

export const TimePicker = () => {
  setLocale(zhCN);

  return {
    ...common,
    date: '请选择日期',
    week: '请选择自然周',
    month: '请选择月份',
    quater: '请选择季度',
    year: '请选择年',
    range: '开始日期 至 结束日期',
    rangeError: '请选择起止时间',
    start: '开始日期',
    end: '结束日期',
    to: '至',
    current: {
      time: '此刻',
      date: '今天',
      week: '本周',
      month: '当前月',
      year: '今年'
    },
    panel: {
      hour: '时',
      minute: '分',
      second: '秒',
      hourSelect: '选择小时',
      minuteSelect: '选择分钟',
      secondSelect: '选择秒',
      titleFormat: 'YYYY年MMM',
      quaterNames: ['第一季度', '第二季度', '第三季度', '第四季度'],
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
        '12月'
      ]
    }
  };
};
