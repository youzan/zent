---
title: DateRangeQuickPicker
path: component/component/date-range-quick-picker
group: Data Entry
---

## DateRangeQuickPicker

DateRangeQuickPicker is used for time range selection, it has 2 quick options which points previous 7 days and previous 30 days.

### Usage Scenarios

As a filter control above list pages.

### API

| Props            | Description               | Type             | Default      | Alternatives     |
|------          |------              |------            |--------    |--------   |
| prefix         | custom prefix           | string          | `'zent'`    |           |
| className      | custom classname          | string            |   `''`      |              |
| preset         | custom quick option text      | array             | `[{text: '7 days', value: 7}, {text: '30 days', value: 30}]`    |           |
| onChange       | change event callback  | func             |         |              |
| value          | starting and end time       | array           |   `[]`        |             |
| valueType | Argument type of onChange | string | `''` | `'string'`, `'number'` |
| format         | Format of returned Date string |  string          |   `'YYYY-MM-DD'`, `'YYYY-MM-DD HH:mm:ss'`   |           |
| chooseDays     | Number of choosen days |  number          |               |         |
| min            | Minimum value of optional date | string, Date  | `''`  |    |
| max            | Maximum number of optional date  | string, Date  | `''`  |    |
