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
import { enUS, setLocale } from './time-locale';

import capitalize from '../utils/capitalize';

const common: II18nLocaleCommon = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  comma: ', ',
  ok: 'OK',
  reset: 'Reset',
};

export const mark = 'en-US';

export const CopyButton: II18nLocaleCopyButton = {
  copy: 'Copy',
  success: 'Copied',
  error: 'Copy failed',
};

export const Pagination: II18nLocalePagination = {
  jumpTo({ input }) {
    return <>Goto page {input}</>;
  },

  pageStats({ total, Text, select }) {
    return (
      <>
        Total <Text type="middle">{total}</Text> items, {select}
        <Text type="right">per page</Text>
      </>
    );
  },

  pageStatsStatic({ total, pageSize, Text }) {
    return (
      <>
        Total <Text type="middle">{total}</Text> items,
        <Text type="middle">{pageSize}</Text> items per page
      </>
    );
  },

  selectWidth: 100,

  items: ' items',
};

export const Pop: II18nLocalePop = {
  ...common,
};

export const PreviewImage: II18nLocalePreviewImage = {
  alt: 'Image download failed',
  prev: 'Previous',
  next: 'Next',
  rotate: 'Rotate',
};

export const RangePicker: II18nLocaleRangePicker = {
  7: '7 days',
  30: '30 days',
};

export const Select: II18nLocaleSelect = {
  input: 'Please choose...',
  empty: 'No matches found',
};

export const Sweetalert: II18nLocaleSweetalert = {
  ...common,
  title: 'Alert',
};

export const Switch: II18nLocaleSwitch = {
  checked: 'On',
  unchecked: 'Off',
};

export const Grid: II18nLocaleGrid = {
  ...common,
  emptyLabel: 'No data',
};

export const Table: II18nLocaleTable = {
  ...common,
  emptyLabel: 'No data',
};

export const Cascader: II18nLocaleCascader = {
  ...common,
  title: 'Title',
  placeholder: 'Please choose',
};

const QUARTER_NAMES = [
  '1st Quarter',
  '2nd Quarter',
  '3rd Quarter',
  '4th Quarter',
];

export const TimePicker: I18nLocaleTimePicker = () => {
  setLocale(enUS);
  return {
    ...common,
    time: 'Please select a time',
    date: 'Please select a date',
    week: 'Please select a week',
    month: 'Please select a month',
    quarter: 'Please select a quarter',
    year: 'Please select a year',
    range: 'Please select a range',
    rangeError: 'Please select the starting and ending time',
    start: 'Start date',
    end: 'End date',
    startTime: 'Start time',
    endTime: 'End time',
    to: 'to',
    current: {
      time: 'Now',
      date: 'Today',
      week: 'This week',
      month: 'This month',
      year: 'This year',
    },
    panel: {
      hour: '',
      minute: '',
      second: '',
      hourSelect: 'Choose hours',
      minuteSelect: 'Choose minutes',
      secondSelect: 'Choose seconds',
      titleFormat: 'MMMM YYYY',
      quarterNames: QUARTER_NAMES,
      yearQuarterName({ year, quarter }) {
        const val = QUARTER_NAMES[quarter];
        return `${val} of ${year}`;
      },
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      monthNames: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  };
};

export const Upload: II18nLocaleUpload = {
  ...common,
  delete: 'Delete',
  retry: 'Retry',
  failed: 'Failed',
  limit: 'Maximum number of files has been reached',
  normal: {
    add: 'Add File',
    tips: config => {
      const { tips, formattedMaxSize } = config;
      const tipStr = tips ? tips : '';
      const sizeLimitStr = formattedMaxSize
        ? `single file no more than ${formattedMaxSize}`
        : '';
      return capitalize(
        [tipStr, sizeLimitStr].filter(Boolean).join(common.comma)
      );
    },
  },
  image: {
    tips: config => {
      const { tips, formattedMaxSize, maxAmount } = config;
      const tipStr = tips ? tips : '';
      const amoutLimitStr = maxAmount ? `up to ${maxAmount}` : '';
      const sizeLimitStr = formattedMaxSize
        ? `single file no more than ${formattedMaxSize}`
        : '';
      return capitalize(
        [tipStr, amoutLimitStr, sizeLimitStr].filter(Boolean).join(common.comma)
      );
    },
  },
};

export const Mention: II18nLocaleMention = {
  noContent: 'No result found, press SPACE to finish typing',
};
