---
title: DateRangeQuickPicker
path: component/component/date-range-quick-picker
group: Data Entry
---

## DateRangeQuickPicker

DateRangeQuickPicker is used for time range selection, it has 2 quick options which points previous 7 days and previous 30 days.

### Usage Scenarios

Select a date range in one click.

### API

| Props                      | Description                             | Type                | Default                                                      | Alternatives                     |
| -------------------------- | --------------------------------------- | ------------------- | ------------------------------------------------------------ | -------------------------------- |
| onChange                   | Change event callback                   | func                |                                                              |                                  |
| value                      | Starting and end time                   | array               | `[]`                                                         |                                  |
| preset                     | Custom quick options                    | array               | `[{text: '7 days', value: 7}, {text: '30 days', value: 30}]` |                                  |
| defaultSelectedPresetIndex | Default selected item index in `preset` | `number`            |                                                              |                                  |
| valueType                  | Argument type of onChange               | `string`            | `''`                                                         | `'date'`, `'number'`, `'string'` |
| format                     | Format of returned Date string          | `string`            | `'YYYY-MM-DD'`, `'YYYY-MM-DD HH:mm:ss'`                      |                                  |
| chosenDays                 | Number of choosen days                  | `number` \| `array` |                                                              |                                  |
| min                        | Minimum value of optional date          | `string` \| `Date`  | `''`                                                         |                                  |
| max                        | Maximum number of optional date         | `string` \| `Date`  | `''`                                                         |                                  |
| className                  | custom classname                        | `string`            | `''`                                                         |                                  |
