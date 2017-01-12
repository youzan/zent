# @youzan/zent-switch

开关选择器，提供 size、disabled、checked 等状态自定义，以及onChange回调方法定义。

[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-switch.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-switch.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-switch

## 使用场景
需要表示开关状态/两种状态之间的切换时

主要通过size控制开关的大小。同时提供 disabled、checked 等状态属性。当改变switch状态后，可以设置onChange回调，进行一些操作。

## API

| 参数          | 说明        | 类型        | 默认值      | 备选值     |
|------        |------       |------       |--------    |--------   |
| checked      | 指定当前状态   | bool               | false      |  true, false  |
| onChange     | 变化时回调函数, 参数是改变后的checked值 | func(checked: bool) |   noop     |       |
| disabled     | 状态控制      | bool                | false      | true, false  |
| checkedText  | 选中时的文案   | string              | '开启'      |         |
| uncheckedText| 未选中时的文案 | string              | '关闭'      |         |
| loading      | 加载中状态     | bool                | false      | true, false |
| size         | 开关大小      | string              | 'default'  | 'default', 'small' |
| className    | 自定义额外类名 | string             | ''         |        |
| prefix       | 自定义前缀     | string             | 'zent'     |        |

