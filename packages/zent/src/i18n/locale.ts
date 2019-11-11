import * as React from 'react';

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

export interface II18nLocalePop extends II18nLocaleCommon {}

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

export interface II18nLocaleTable extends II18nLocaleCommon {
  emptyLabel: string;
}

export interface II18nLocaleCascader extends II18nLocaleCommon {
  title: React.ReactNode;
  placeholder: string;
}

export interface II18nLocaleTimePicker extends II18nLocaleCommon {
  time: string;
  date: string;
  week: string;
  month: string;
  quarter: string;
  year: string;
  range: string;
  rangeError: string;
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
    hourSelect: string;
    minuteSelect: string;
    secondSelect: string;
    titleFormat: string;
    quarterNames: string[];
    yearQuarterName(options: { year: string; quarter: string }): string;
    dayNames: string[];
    monthNames: string[];
  };
}

export type I18nLocaleTimePicker = () => II18nLocaleTimePicker;

export interface II18nLocaleTypeMap {
  image: string;
  voice: string;
}

export interface II18nLocaleUpload extends II18nLocaleCommon {
  title_voice: string;
  title_image: string;
  input: {
    holder: string;
    maxAmount(options: { maxAmount: number; type: string }): string;
    maxSize(options: { maxSize: number; type: string }): string;
    type(options: { type: string }): string;
  };
  popup: {
    web: string;
    group: string;
    holder: string;
    title_voice: string;
    title_image: string;
    type(options: { types: string[]; size: number }): string;
    extract: string;
    extracting: string;
  };
}

export interface II18nLocaleMention {
  noContent: string;
}
