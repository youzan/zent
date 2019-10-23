---
title: Select
subtitle: 下拉选择
path: component/select
group: 数据
---

## Select 下拉选择

下拉选择，提供多种选择器功能。

### API

| 参数              | 说明                                     | 类型             | 默认值             | 是否必填 |
| ----------------- | ---------------------------------------- | ---------------- | ------------------ | -------- |
| options           | 选项数据                                 | array            | `[]`               | 是       |
| value             | 选中的值，当为 tags 类型时，可以传入数组 | any              | `null`             | 否       |
| disabled          | 禁用组件                                 | bool             | `false`            | 否       |
| placeholder       | 默认提示文案                             | string           | `'请选择'`         | 否       |
| optionPlaceholder | 空列表提示文案                           | string           | `'没有找到匹配项'` | 否       |
| onChange          | 选择变更后的回调函数                     | function         | `noop`             | 否       |
| filter            | 过滤条件，设置以后才会开启过滤功能       | function         | false              |          | 否 |
| className         | 可选，自定义 trigger 额外类名            | string           | `''`               | 否       |
| width             | 输入框宽度                               | string or number |                    | 否       |
