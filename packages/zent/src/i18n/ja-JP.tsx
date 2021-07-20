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
  II18nLocaleUpload,
  II18nLocaleTransfer,
  LocaleMark,
} from './locale';
import { jaJP, setLocale } from './time-locale';

const common: II18nLocaleCommon = {
  confirm: '確認',
  cancel: 'キャンセル',
  comma: ', ',
  ok: '了解',
  reset: 'リセット',
};

export const mark: LocaleMark = 'ja-JP';

export const CopyButton: II18nLocaleCopyButton = {
  copy: 'コピー',
  success: 'コピーしました',
  error: 'コピーに失敗しました',
};

export const Pagination: II18nLocalePagination = {
  jumpTo({ input }) {
    return <>ページ指定 {input}</>;
  },

  pageStats({ total, Text, select }) {
    return (
      <>
        合計 <Text type="middle">{total}</Text> 項目, {select}
        <Text type="right">/ページ</Text>
      </>
    );
  },

  pageStatsStatic({ total, pageSize, Text }) {
    return (
      <>
        合計 <Text type="middle">{total}</Text> 項目,
        <Text type="middle">{pageSize}</Text> /ページ
      </>
    );
  },

  selectWidth: 100,

  items: '',
};

export const Pop: II18nLocalePop = {
  ...common,
};

export const PreviewImage: II18nLocalePreviewImage = {
  alt: '画像のダウンロードに失敗しました',
  prev: '前',
  next: '次',
  rotate: '回転',
};

export const RangePicker: II18nLocaleRangePicker = {
  7: '7日間',
  30: '30日間',
};

export const Select: II18nLocaleSelect = {
  input: '選択',
  empty: '見つかりません',
  tagSeparator: ', ',
  create: '+作成: ',
};

export const Sweetalert: II18nLocaleSweetalert = {
  ...common,
  title: 'アラート',
};

export const Switch: II18nLocaleSwitch = {
  checked: 'オン',
  unchecked: 'オフ',
};

export const Grid: II18nLocaleGrid = {
  ...common,
  emptyLabel: 'データがありません',
};

export const Cascader: II18nLocaleCascader = {
  ...common,
  title: 'タイトル',
  placeholder: '選択',
  searchPlaceholder: '選択/検索',
  searchEmpty: '見つかりません',
  empty: '見つかりません',
};

const QUARTER_NAMES = ['1期', '2期', '3期', '4期'];

export const TimePicker: I18nLocaleTimePicker = () => {
  setLocale(jaJP);
  return {
    ...common,
    time: '時間を選択',
    date: '日付を選択',
    week: '週を選択',
    month: '月を選択',
    quarter: '期を選択',
    year: '年を選択',
    range: '範囲を選択',
    timeErrorPop: '選択された時間が無効です',
    dateErrorPop: '選択された日付が無効です',
    start: '開始日',
    end: '終了日',
    startTime: '開始時間',
    endTime: '終了時間',
    to: '〜',
    current: {
      time: '現在',
      date: '今日',
      week: '今週',
      month: '今月',
      year: '今年',
    },
    panel: {
      hour: '',
      minute: '',
      second: '',
      year: '',
      hourSelect: '時間を選択',
      minuteSelect: '分を選択',
      secondSelect: '秒を選択',
      titleFormat: 'MMMM YYYY',
      quarterNames: QUARTER_NAMES,
      yearQuarterName({ year, quarter }) {
        const val = QUARTER_NAMES[quarter];
        return `${year}/${val}`;
      },
      dayNames: ['日', '月', '火', '水', '木', '金', '土'],
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
  delete: '削除',
  retry: '再度試す',
  failed: '失敗',
  limit: 'ファイル数の上限に達しました',
  add: 'ファイル追加',
  uploading: 'アップロード中',
};

export const Mention: II18nLocaleMention = {
  noContent: '該当ありません。SPACEキーで終了',
};

export const Transfer: II18nLocaleTransfer = {
  placeholder: '',
  item: '項目',
  items: '項目',
  emptyLabel: '',
};
