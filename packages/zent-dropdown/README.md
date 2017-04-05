## 下拉选单 Dropdown

下拉菜单组件, 封装组合 Popover 和 Menu.

### API

| 参数        | 说明            | 类型     | 默认值        | 备选值                               |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| className | 自定义额外类名  | string | `''`       |                                   |
| prefix    | 自定义类名前缀    | string | `'zent'`   |                                   |
| mode    | 触发模式    | string | `'hover'`   |          `'click'`                      |
| position    | 弹出位置    | string | `'right-top'`   |  `'right-center'`, `'right-bottom'`, `'bottom-right'`, `'bottom-center'`, `'bottom-left'`            |
| visible    | 菜单显示开关    | boolean | `false`   |                                   |
| onVisibleChange | 显示状态变化回调 | func(visible: bool)|`noop`    |                      |
