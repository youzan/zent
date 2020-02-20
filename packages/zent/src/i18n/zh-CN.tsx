import * as React from 'react';

import {
  I18nLocaleTimePicker,
  II18nLocaleCascader,
  II18nLocaleCommon,
  II18nLocaleCopyButton,
  II18nLocaleGrid,
  II18nLocaleMention,
  II18nLocalePagination,
  II18nLocalePop,
  II18nLocalePreviewImage,
  II18nLocaleRangePicker,
  II18nLocaleSelect,
  II18nLocaleSweetalert,
  II18nLocaleSwitch,
  II18nLocaleTable,
  II18nLocaleUpload,
} from './locale';
import { setLocale, zhCN } from './time-locale';

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
  jumpTo({ input }) {
    return <>跳至{input}页</>;
  },

  pageStats({ total, select, Text }) {
    return (
      <>
        共 <Text type="middle">{total}</Text> 条，每页
        {select}
      </>
    );
  },

  pageStatsStatic({ total, pageSize, Text }) {
    return (
      <>
        共 <Text type="middle">{total}</Text> 条，每页
        <Text type="middle">{pageSize}</Text> 条
      </>
    );
  },

  selectWidth: 80,

  items: '条',
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

const QUARTER_NAMES = ['第一季度', '第二季度', '第三季度', '第四季度'];

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
      quarterNames: QUARTER_NAMES,
      yearQuarterName({ year, quarter }) {
        const val = QUARTER_NAMES[quarter];
        return `${year}年${val}`;
      },
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

export const Upload: II18nLocaleUpload = {
  ...common,
  delete: '删除',
  retry: '重新上传',
  failed: '上传失败',
  limit: '文件添加个数已达上限',
  normal: {
    add: '添加文件',
    tips: config => {
      const { tips, formattedMaxSize } = config;
      const tipStr = tips ? tips : '';
      const sizeLimitStr = formattedMaxSize
        ? `单个文件不超过 ${formattedMaxSize}`
        : '';
      return [tipStr, sizeLimitStr].filter(Boolean).join(common.comma);
    },
  },
  image: {
    tips: config => {
      const { tips, formattedMaxSize, maxAmount } = config;
      const tipStr = tips ? tips : '';
      const amoutLimitStr =
        maxAmount !== Infinity ? `最多 ${maxAmount} 张` : '';
      const sizeLimitStr = formattedMaxSize
        ? `单张图片不超过 ${formattedMaxSize}`
        : '';
      return [tipStr, amoutLimitStr, sizeLimitStr]
        .filter(Boolean)
        .join(common.comma);
    },
  },
};

export const Mention: II18nLocaleMention = {
  noContent: '无匹配结果，轻敲空格完成输入',
};
