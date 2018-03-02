---
title: Select
path: component/select
group: Data Entry
---

## Select

Select is a drop-down selection component with variety functions.

### Guides

Component mainly made up of Select, Popup, Trigger three modules.

#### Select

Core controller, the main responsibility is to format data and data transfer between Popup and Trigger.

#### Popup

Options list pop-up layer, is mainly responsible for display options, data filtering control.

#### Trigger

- Triggers, exposed to the user, can be configured via the trigger prop.
- Core triggers are SelectTrigger and InputTrigger.
- TagsTrigger is based on the InputTrigger extended multi-select function.
- Users can expand or develop their own trigger.

### API

| Props | Description | Type | Default | Required |
|------|------|------|--------|--------|
| data | Option data | array | `[]` | yes |
| value | Selected value, when tags type, can be passed into the array | any | `null` | no |
| index | Select the index | any | `null` | no |
| disabled | Disable switch | bool | `false` | no |
| placeholder | The default prompt text | string | `'please choose'` | no |
| searchPlaceholder | Search box default text | string | `''` | no |
| emptyText | Empty list prompt text | string | `'No matches found'` | no |
| trigger | Custom trigger | function | `Select.SelectTrigger` | no |
| optionText | Custom options display text's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `optionText="name"` | string | `'text'` | no |
| optionValue | Custom options value's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `optionValue="id"` | string | `'value'` | no |
| onChange | Select changed callback | function | `noop` | no |
| onDelete | Tag removed callback | function | `noop` | no |
| filter | Filter conditions, set to open the filter function | function | `null` | no |
| maxToShow | When there is a filter, set the maximum number options to display | number | | no |
| onAsyncFilter | Asynchronous filter function | function | `null` | no |
| onEmptySelected | Empty filtered data callback | function | `noop` | no |
| onOpen | Expanded callback | function | `noop` | no |
| className | Optional, custom trigger additional classname | string | `''` | no |
| popupClassName | Optional, custom popup classname | string | `''`    | no |
| autoWidth | Whether to automatically set the width of pop-up layer equal with input-box's width | bool | `false` | no |
| resetOption | Whether to add a reset option | bool | `false` | no |
| resetText | Reset option text | string | `'...'` | no |
| width |  input-box's width | string or number |  | no |
| prefix | Custom prefix | string | `'zent'` | no |

If both data and children are used, data will cover the children, mainly in order to receive asynchronous data directly change the data property to change the options.

#### Trigger

| Props | Desctription | Type | Default | Required |
|------|------|------|--------|--------|
| selectedItems | Selected entry | array | `[]` | no |
| extraFilter | Whether has filter function | boolean | `false` | no |
| open | Whether to open Popup | boolean | `false` | no |

Trigger can pass parameter changes by changing the props of Popup by calling `this.props.onChange({...})`.
