# @youzan/zent-pop

点击元素，弹出气泡框。

[![version][version-image]][download-url]
[![download][download-image]][download-url]

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
集成了ToolTip和PopConfirm功能，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。提供onConfirm方法，就可以实现PopConfirm的相关功能

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| trigger | 触发方式，在需要使用confirm功能的情况下使用缺省即可 | string | 'click' | 备选'click'、'hover'、'focus' |
| position | 弹出框的位置，目前的设定是前一位表示相对触发元素的位置，后一位表示箭头相对于Pop的位置 | string | 'top-center' | 'position-position' |
| content | pop的内容 | node | | |
| header | 用户可以自定义头部 | string or react element | null |  |
| onConfirm | 用户自定义回掉，设置以后pop 表现为 confirm | func | null |  |
| onCancel | 用户使用 confirm 的时候可自定义取消的回掉 | func | null |  |
| confirmText | 用户自定义按钮名 | string | 确定 |  |
| cancelText | 用户自定义取消按钮 | string | 取消 |  |
| type | popConfirm 风格，影响确定按钮 | string | primary | primary\default\danger\success |
| className | 自定义类名, 请注意这个 className 将会添加到pop 元素外部 | string |  |  |
| prefix | 自定义前缀 | string | zent |  |
| visible | 用户自维护显示状态，仅在设置了 onVisibleChange 的情况下生效 | bool | false |  |
| onVisibleChange | Pop开启关闭的回掉 | func | null |  |
| mouseLeaveDelay | 设置 blur 自动隐藏的时间 | number | 300 |  |

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-pop.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-pop.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-pop
