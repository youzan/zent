import { setLocale, enUS } from './time-locale';

const common = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  comma: ', ',
  ok: 'OK',
  reset: 'Reset',
};

export const mark = 'en-US';

export const CopyButton = {
  copy: 'Copy',
  success: 'Copied',
  error: 'Copy failed',
};

export const Pagination = {
  comma: common.comma,
  total: 'Total',
  pages: 'pages',
  items: ' items',
  perPage: ' per page',
};

export const Pop = {
  ...common,
};

export const PreviewImage = {
  alt: 'Image download failed',
  prev: 'Previous',
  next: 'Next',
  rotate: 'Rotate',
};

export const RangePicker = {
  7: '7 days',
  30: '30 days',
};

export const Select = {
  input: 'Please choose...',
  empty: 'No matches found',
};

export const Sweetalert = {
  ...common,
  title: 'Alert',
};

export const Switch = {
  checked: 'On',
  unchecked: 'Off',
};

export const Grid = {
  ...common,
  emptyLabel: 'No data',
};

export const Table = {
  ...common,
  emptyLabel: 'No data',
};

export const Cascader = {
  ...common,
  title: 'Title',
  placeholder: 'Please choose',
};

export const TimePicker = () => {
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
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
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

export const Sku = {
  notify: 'The same sku name not allowed',
  buttonAdd: 'Add sku',
  container: {
    del: 'Delete',
    replace: 'Replace',
    add: '+Add',
  },
  group: {
    add: 'Add sku image',
    imageTip1: 'Only the first sku portrait can be set',
    imageTip2:
      'After setting, corresponding portrait of the choosen sku will be rendered.',
    imageTip3: 'Recommended size: 640 x 640 pixels.',
  },
};

const TypeMap = {
  image: 'Image',
  voice: 'Audio',
};

export const Upload = {
  ...common,
  title_voice: 'Choose voice',
  title_image: 'Choose image',
  input: {
    holder: 'Add',
    maxAmount({ maxAmount, type }) {
      return `Only ${maxAmount} ${TypeMap[type]} files can be added`;
    },
    maxSize({ maxSize, type }) {
      return `${TypeMap[type]} files larger than ${maxSize} have been filtered`;
    },
    type({ type }) {
      return `${TypeMap[type]} files with incorrect type have been filtered`;
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

export const Mention = {
  noContent: 'No result found, press SPACE to finish typing',
};
