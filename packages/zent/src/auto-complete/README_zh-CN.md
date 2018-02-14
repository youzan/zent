---
title: AutoComplete
subtitle: 自动完成
path: component/auto-complete
group: 数据
---

## AutoComplete 自动完成

输入框自动完成功能。

### API

| 参数    |   说明          | 类型     | 是否必填            | 默认值        | 备选值 |
| --------- | ------------- | ------ | ---------- | ----------------- | ---------------- |
| value | 选中值 | any | 否 | | |
| initialValue | 初始值 | any | 否 | | |
| placeholder | 输入框的placeholder | string | 否 | | |
| data | 选项数据 | array | 否 | [] | |
| onChange | 当value改变时的callback | function (value) {} | 否 | | |
| onSearch | 当输入值改变时的callback | function (searchText) {} | 否 | | |
| onSelect | 当选中某个选项时的callback | function (value) {} | 否 | | |
| filterOption | 根据输入值过滤选项的function | function (searchText, { value, content }) {} | 否 | caselessMatch | |
| valueFromOptions | 是否只能选中选项中存在的值 | bool | 否 | `false` | |
| className | 可选，自定义输入框容器额外类名 | string | 否 | `''` | |
| popupClassName | 可选，自定义popup的类名 | string | 否 | `''` | |
| width | 输入框宽度 | string or number | 否 | | |

### data 结构
* 使用方式 1: string array, 此时选项显示内容和选项value相同, 推荐使用
* 使用方式 2: object array, 其中每项的结构是：
```
{
  value: 'value', // 必填, 作为选项 value; 当 content 未传入时, 同时作为 content 使用; 当 content 未传入, 或者 content 不是 string 类型时, 用于默认的过滤匹配
  content: 'content', // 选填, 作为选项显示内容，可以填入 react node, 当 content 是 string 类型时, 会被优先用于过滤匹配
  isGroup: false, // 选填, 此项作为分组头部渲染, 显示内容是content的值, 不可被点击选择
  isDivider: false, // 选填, 此项作为分割线渲染, 不可被点击选择
}
```
注意此时的 `value` 和 `content` 是可以不同的。用户输入的值会通过 `onSearch` 返回，用于 `value` 和 `content`  值的匹配，其优先级： string 类型的 `content` > `value`。 当用户选中某个选项时，其 value 会被通过 `onSelect` 返回。无论是选中选项，还是直接用户输入，当输入框中的值变化时，新的 value 都会通过 `onChange` 返回。特别的，当 `valueFromOptions` 为 true 时，输入框失焦时会检查当前value是否在选项值中，如果不在则会重置，触发 `onSelect` 和 `onChange` 传入 null 值。
