export interface II18nLocaleCommon {
  confirm: string;
  cancel: string;
  ok: string;
  comma: string;
  reset: string;
}

export interface II18nLocaleCopyButton {
  copy: string;
  success: string;
  error: string;
}

export interface II18nLocalePagination {
  jumpTo(options: { input: React.ReactNode }): React.ReactNode;

  pageStats(options: {
    total: React.ReactNode;
    select: React.ReactNode;
    Text: React.ComponentType<{ type: 'middle' | 'right' }>;
  }): React.ReactNode;

  pageStatsStatic(options: {
    total: React.ReactNode;
    pageSize: React.ReactNode;
    Text: React.ComponentType<{ type: 'middle' | 'right' }>;
  }): React.ReactNode;

  selectWidth: number;

  items: string;
}

export type II18nLocalePop = II18nLocaleCommon;

export interface II18nLocalePreviewImage {
  alt: string;
  prev: string;
  next: string;
  rotate: string;
}

export interface II18nLocaleRangePicker {
  '7': string;
  '30': string;
}

export interface II18nLocaleSelect {
  input: string;
  empty: string;
  tagSeparator: string;
  create: string;
}

export interface II18nLocaleSwitch {
  checked: string;
  unchecked: string;
}

export interface II18nLocaleSweetalert extends II18nLocaleCommon {
  title: string;
}

export interface II18nLocaleGrid extends II18nLocaleCommon {
  emptyLabel: string;
}

export interface II18nLocaleCascader extends II18nLocaleCommon {
  title: React.ReactNode;
  placeholder: string;
  searchPlaceholder: string;
  searchEmpty: string;
  empty: string;
}

export interface II18nLocaleTimePicker extends II18nLocaleCommon {
  time: string;
  date: string;
  week: string;
  month: string;
  quarter: string;
  year: string;
  range: string;
  timeErrorPop: string;
  dateErrorPop: string;
  start: string;
  end: string;
  startTime: string;
  endTime: string;
  to: string;
  current: {
    time: string;
    date: string;
    week: string;
    month: string;
    year: string;
  };
  panel: {
    hour: string;
    minute: string;
    second: string;
    year: string;
    hourSelect: string;
    minuteSelect: string;
    secondSelect: string;
    titleFormat: string;
    quarterNames: string[];
    yearQuarterName(options: { year: number; quarter: number }): string;
    dayNames: string[];
    monthNames: string[];
  };
}

export type I18nLocaleTimePicker = () => II18nLocaleTimePicker;

export interface II18nLocaleUpload extends II18nLocaleCommon {
  retry: string;
  delete: string;
  failed: string;
  limit: string;
  add: string;
  uploading: string;
}

export interface II18nLocaleMention {
  noContent: string;
}

export interface II18nLocaleTransfer {
  placeholder: string;
  item: string;
  items: string;
  emptyLabel: string;
}

export type LocaleMark = 'zh-CN' | 'en-US';

export interface ILocaleData {
  mark: LocaleMark;
  CopyButton: II18nLocaleCopyButton;
  Pagination: II18nLocalePagination;
  Pop: II18nLocalePop;
  PreviewImage: II18nLocalePreviewImage;
  RangePicker: II18nLocaleRangePicker;
  Select: II18nLocaleSelect;
  Switch: II18nLocaleSwitch;
  Sweetalert: II18nLocaleSweetalert;
  Grid: II18nLocaleGrid;
  Cascader: II18nLocaleCascader;
  TimePicker: I18nLocaleTimePicker;
  Upload: II18nLocaleUpload;
  Mention: II18nLocaleMention;
  Transfer: II18nLocaleTransfer;
}
