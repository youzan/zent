---
title: Steps
subtitle: 步骤条
path: component/steps
group: 导航
---

## Steps 步骤条

步骤条组件，适用于需分步引导的操作。

### API

#### Steps

| 参数        | 说明                                         | 类型     | 默认值            | 备选值                       |
| --------- | ------------------------------------------ | ------ | -------------- | ------------------------- |
| type      | steps组件类型                                  | string | `'number'`     | `'card'`,  `'breadcrumb'`,  `'tabs'` |
| direction | 步骤条的方向（竖直只针对number类型步骤条有效）    | string | `'horizontal'`     | `'vertical'` |
| current   | 指定当前步骤, 从 1 开始记数 (当不传值时, 默认为 0, 状态都为 wait) | number | `0`            |                           |
| status    | 步骤条的状态                                     | string | `'process'`    | `'wait'`, `'finish'`, `'error'`      |
| sequence    | 是否使用默认的步骤序号						           | boolean | `true`     |        |
| onStepChange    | 传该参数后step可点击切换 (针对card, breadcrumb，tabs类型)           | func | `''`     |        |
| className | 自定义额外类名                                    | string | `''`           |                           |
| prefix    | 自定义前缀                                      | string | `'zent'`       |                           |

#### Steps.Step

步骤条的每一个子项

| 参数          | 说明                                  | 类型   |
| ----------- | ----------------------------------- | ---- |
| title       | 标题                                  | node |
| description | 步骤的详情描述 (card, breadcrumb, tabs 类型不支持该属性) | node |

### 已知问题

尚未处理步骤条只存在一项的边界情况。(当只有一项时不应该使用 steps)
