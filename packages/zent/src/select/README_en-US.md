---
title: Select
path: component/select
group: Data Entry
---

## Select

Select is a drop-down selection component with variety functions.

### API

| Props             | Description                                                  | Type             | Default              | Required |
| ----------------- | ------------------------------------------------------------ | ---------------- | -------------------- | -------- |
| options           | Option data                                                  | array            | `[]`                 | yes      |
| value             | Selected value, when tags type, can be passed into the array | any              | `null`               | no       |
| disabled          | Disable switch                                               | bool             | `false`              | no       |
| placeholder       | The default prompt text                                      | string           | `'please choose'`    | no       |
| optionPlaceholder | Empty list prompt text                                       | string           | `'No matches found'` | no       |
| onChange          | Select changed callback                                      | function         | `noop`               | no       |
| filter            | Filter conditions, set to open the filter function           | function         | `false`              | no       |
| highlight         | Highlight filterd options                                    | function         | `noop`               | no       |
| className         | Optional, custom trigger additional classname                | string           | `''`                 | no       |
| width             | input-box's width                                            | string or number | `''`                 | no       |
| popupWidth        | pupup's width                                                | string or number | `''`                 | no       |
| multiple          | Support multiple selected options                            | bool             | `false`             | no       |
| clearable         | Is the select value clearable                                | bool             | `false`             | no       |
| loading           | Is the select in a state of loading                          | bool             | `false`             | no       |
| creatable         | Allow options to be created                                  | bool             | `false`             | no       |
| onCreate          | Select create callback                                       | function         | `noop`             | no       |
| keyword           | Search's keyword                                             | string           | `''`              | no       |
| onKeywordChange   | Keyword changed callback                                     | function         | `noop`             | no       |
| isEqual           | Compare two option is equal                            | function         | `(a, b) => a.key === b.key`   | no       |
| inline            | Is inline display                                            | bool             | `false`             | no       |
| open              | Whether the menu is open                                     | bool             | `false`             | no       |
| onOpenChange      | Menu visible changed callback                                | function         | `noop`             | no       |
| renderOptionList  | Render menu list                    | function         | `(options, renderOption) => ReactNode`             | no       |
| renderValue       | Render option value                                   | function         | `option => ReactNode`             | no       |
| renderOptionContent | Render menu item content                            | function         | `option => ReactNode`             | no       |
