import { setLocale, enUS } from './time-locale';
import {
  II18nLocaleCommon,
  II18nLocaleCopyButton,
  II18nLocalePagination,
  II18nLocalePop,
  II18nLocalePreviewImage,
  II18nLocaleRangePicker,
  II18nLocaleSelect,
  II18nLocaleSweetalert,
  II18nLocaleSwitch,
  II18nLocaleGrid,
  II18nLocaleTable,
  II18nLocaleCascader,
  I18nLocaleTimePicker,
  II18nLocaleUpload,
  II18nLocaleMention,
  II18nLocaleTypeMap,
} from './locale';

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
  comma: common.comma,
  page: 'page',
  jump: 'Goto',
  total: 'Total',
  items: ' items',
  perPage: 'per page',
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
      quarterNames: [
        '1st Quarter',
        '2nd Quarter',
        '3rd Quarter',
        '4th Quarter',
      ],
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

const TypeMap: II18nLocaleTypeMap = {
  image: 'Image',
  voice: 'Audio',
};

export const Upload: II18nLocaleUpload = {
  ...common,
  title_voice: 'Choose voice',
  title_image: 'Choose image',
  input: {
    holder: 'Add',
    maxAmount({ maxAmount, type }) {
      return `Only ${maxAmount} ${TypeMap[type]} files can be added`;
    },
    maxSize({ maxSize, type }) {
      return `Cannot upload ${TypeMap[type]} files larger than ${maxSize}`;
    },
    type({ type }) {
      return `Cannot upload ${TypeMap[type]} files with unsupported type`;
    },
  },
  popup: {
    web: 'Web image',
    group: 'Group',
    holder: 'Image url',
    title_voice: 'Local audio',
    title_image: 'Local image',
    type({ types, size }) {
      return `Supports ${types.join(' /')} only, smaller than ${size}`;
    },
    extract: 'Extract',
    extracting: 'Extracting...',
  },
};

export const Mention: II18nLocaleMention = {
  noContent: 'No result found, press SPACE to finish typing',
};
