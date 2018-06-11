---
title: SplitButton
subtitle: 下拉按钮
path: component/split-button
group: 数据
---

## SplitButton 下拉按钮

SplitButton 带有下拉菜单功能的按钮

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ----------------- | ----------------- | -----------------  | -------------------|
| type | 按钮风格 | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| disabled | 按钮是否禁用 | bool | `false` | `true`、`false` |
| loading | 是否显示loading图标 | bool | `false` | `true`, `false` |
| size | 按钮尺寸 | string | `'medium'`  | `'large'`、`'medium'`、`'small'`  |
| dropdownTrigger | 下拉菜单触发方式 | string | `'click'` | `'click'`、`'hover'` |
| dropdownData | 下拉菜单数据 | array | [] | |
| dropdownValue | 自定义选项的值对应的key, 如{ id: 1, name: '文案' }, dropdownValue="id" | string | `'value'` | |
| dropdownText | 自定义选项显示文案对应的key, 如{ id: 1, name: '文案' }, dropdownText="name" | string | `'text'` | |
| dropdownPosition | 下拉菜单位置 | string | `'auto-bottom-left'` | 同Pop中的position |
| onClick | 左侧按钮点击时的回调函数 | func | | |
| onSelect | 右侧下拉菜单选择时的回调函数 | func | | |
| className          | 自定义额外类名                  | string              | `''`						 |      |
| prefix             | 自定义前缀                     | string              | `'zent'`				|	    |

### onSelect

回调函数内参数为dropdownValue
