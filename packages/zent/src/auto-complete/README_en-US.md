---
title: AutoComplete
subtitle: AutoComplete
path: component/auto-complete
group: Data Entry
---

## AutoComplete

AutoComplete of input field.

### API

| Props    |   Description          | Type     | Required            | Default        | Alternative |
| --------- | ------------- | ------ | ---------- | ------------------- | -------------- |
| value | Selected value | any | No | | |
| initialValue | Initial value | any | No | | |
| placeholder | Input placeholder | string | No | | |
| data | Option data | array | No | [] | |
| onChange | The callback when value is changed | function (value) {} | No | | |
| onSearch | The callback when input text is changed | function (searchText) {} | No | | |
| onSelect | The callback when option is selected | function (value) {} | No | | |
| filterOption | Filter function for options | function (searchText, { value, content }) {} | No | caselessMatch | |
| valueFromOptions | Whether value can only be one of the options' value | bool | No | `false` | |
| className | Optional, custom input wrapper className | string | No | `''` | |
| popupClassName | Optional, custom popup classname  | string | No | `''` | |
| width | Input width | `string` \| `number` | No | | |
| inline | Input inline display | `boolean` | No | | |

### data structure
* Case 1: string array, the content and value is the same, recommended.
* Case 2: object array, the struct of each item is like：
```
{
  value: 'value', // Reqiured, as the option value; When content is not passed in, value is also used as content; When content is not passed in, or content is not string type, value is used for option filter.
  content: 'content', // Optional, as the option display content，could be react node type, when content is string type, content will be sued for option filter instead of value.
  isGroup: false, // Optional, means this option will be rendered as group header, the header content will be content passed in, and the option is not selectable.
  isDivider: false, // Optional, means this option will be rendered as divider, in, and the option is not selectable.
}
```
Note that here `value` and `content` could be different. User input will be returned by `onSearch`, used for the filter of `content` or `value`, string `content` prior to `value`. When user select one option, the value will be returned by `onSelect`. No matter user select an option or input text, the new value of input will be returned by `onChange`. Specially, when `valueFromOptions` is true, the blur of input will trigger a check for current value to determine whether this is a value from its options, if not, `onSelect` and `onChange` will be triggered and null will be passed in.
