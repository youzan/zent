# zent-pop

[![npm version](https://img.shields.io/npm/v/zent-pop.svg?style=flat)](https://www.npmjs.com/package/zent-pop) [![downloads](https://img.shields.io/npm/dt/zent-pop.svg)](https://www.npmjs.com/package/zent-pop)

气泡组件

## 使用指南

-   支持多种触发, 如 click, hover, focus 等.

-   当目标元素状态有更新时, 可以收纳到卡片中, 根据用户行为展现相关内容.

-   集成了 ToolTip 和 PopConfirm 功能, 支持对浮层上的元素进行操作, 可以承载相对复杂的内容, 比如链接或按钮等. 提供`onConfirm`方法, 以实现 PopConfirm 功能.

## API

| 参数               | 说明                                              | 类型     | 默认值            | 备选值                                  |
| ---------------- | ----------------------------------------------- | ------ | -------------- | ------------------------------------ |
| trigger          | 触发方式                                            | string | `'none'`       | `'click'`, `'hover'`, `'focus'`      |
| position         | 弹出框的位置, 目前的设定是前一位表示相对触发元素的位置, 后一位表示箭头相对于Pop的位置. | string | `'top-center'` | `'position-position'`                |
| content          | 弹层的内容                                           | node   |                |                                      |
| header           | 用户可以自定义头部                                       | node   |                |                                      |
| block            | 弹层在文档流里是否以块级元素出现                                | bool   | `false`        |                                      |
| onShow           | 弹层打开后的回掉函数                                      | func   | `noop`         |                                      |
| onClose          | 弹层关闭后的回掉函数                                      | func   | `noop`         |                                      |
| onConfirm        | 用户自定义回掉，设置以后pop 表现为confirm                      | func   |                |                                      |
| onCancel         | 用户使用 confirm 的时候可自定义取消的回掉                       | func   |                |                                      |
| confirmText      | 用户自定义按钮名                                        | string | `'确定'`         |                                      |
| cancelText       | 用户自定义取消按钮                                       | string | `'取消'`         |                                      |
| type             | 影响确定按钮的样式                                       | string | `'primary'`    | `'default'`, `'danger'`, `'success'` |
| className        | 自定义类名                                           | string | `''`           |                                      |
| wrapperClassName | 自定义trigger包裹节点的类名                               | string | `''`           |                                      |
| prefix           | 自定义前缀                                           | string | `'zent'`       |                                      |

### 根据trigger值的不同, Pop 提供了一些额外的控制参数.

#### click-trigger

| 参数                  | 说明                    | 类型   | 默认值    |
| ------------------- | --------------------- | ---- | ------ |
| closeOnClickOutside | 点击弹层和trigger节点外部时自动关闭 | bool | `true` |

#### hover-trigger

| 参数              | 说明                 | 类型     | 默认值   |
| --------------- | ------------------ | ------ | ----- |
| mouseEnterDelay | hover打开的延迟（单位: ms） | number | `200` |
| mouseLeaveDelay | 关闭的的延迟（单位: ms）     | number | `200` |

#### none-trigger

| 参数      | 说明                                | 类型   | 默认值     |
| ------- | --------------------------------- | ---- | ------- |
| visible | 外部维护 Pop 的显示状态, 此时外部拥有 Pop 的全部控制权 | bool | `false` |

这种模式下 `onConfirm` 和 `onCancel` 不会自动关闭Pop, 需要使用者自己在回掉中控制 `visible` 来关闭Pop.
