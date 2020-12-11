---
title: Select
path: component/select
group: Data Entry
---

## Select

Select is a drop-down selection component with variety functions.

### API

| Props               | Description                                                                                     | Type                 | Default                                | Required |
| ------------------- | ----------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------- | -------- |
| options             | Option data                                                                                     | array                | `[]`                                   | yes      |
| value               | Selected value, when tags type, can be passed into the array                                    | any                  | `null`                                 | no       |
| disabled            | Disable switch                                                                                  | bool                 | `false`                                | no       |
| placeholder         | The default prompt text                                                                         | string               | `'please choose'`                      | no       |
| notFoundContent     | Empty list prompt text                                                                          | string               | `'No matches found'`                   | no       |
| onChange            | Select changed callback                                                                         | function             | `noop`                                 | no       |
| filter              | Filter conditions, set to open the filter function                                              | function             | `false`                                | no       |
| highlight           | Highlight filterd options                                                                       | function             | `noop`                                 | no       |
| className           | Optional, custom trigger additional classname                                                   | string               | `''`                                   | no       |
| width               | input-box's width                                                                               | `string` \| `number` | `''`                                   | no       |
| popupWidth          | pupup's width                                                                                   | `string` \| `number` | `''`                                   | no       |
| multiple            | Support multiple selected options                                                               | bool                 | `false`                                | no       |
| collapsable         | Support collapsed tags in multiple mode                                                         | bool                 | 
`false`                                | no       |
| hideCollapsePop     | Hide tags content pop in collapsed mode                                                       | bool                 | 
`false`                                | no       |
| collapseAt          | Dispaly tags count in collapsed mode                                                            | number               | `1`                                    | no       |
| clearable           | Is the select value clearable                                                                   | bool                 | `false`                                | no       |
| loading             | Is the select in a state of loading                                                             | bool                 | `false`                                | no       |
| creatable           | Allow options to be created                                                                     | bool                 | `false`                                | no       |
| onCreate            | Select create callback                                                                          | function             | `(keyword) => Promise<void>`           | no       |
| isValidNewOption    | Determines whether the "+Click add" option should be displayed based on the current input value | function             | `(keyword, options) => boolean`        | no       |
| keyword             | Search's keyword                                                                                | string               | `''`                                   | no       |
| onKeywordChange     | Keyword changed callback                                                                        | function             | `noop`                                 | no       |
| isEqual             | Compare two option is equal                                                                     | function             | `(a, b) => a.key === b.key`            | no       |
| inline              | Is inline display                                                                               | bool                 | `false`                                | no       |
| open                | Whether the menu is open                                                                        | bool                 | `false`                                | no       |
| onOpenChange        | Menu visible changed callback                                                                   | function             | `noop`                                 | no       |
| renderOptionList    | Render menu list                                                                                | function             | `(options, renderOption) => ReactNode` | no       |
| renderValue         | Render option value                                                                             | function             | `option => ReactNode`                  | no       |
| renderOptionContent | Render menu item content                                                                        | function             | `option => ReactNode`                  | no       |
| disableSearch       | Disable search                                                                                  | boolean              | `false`                                | no       |
