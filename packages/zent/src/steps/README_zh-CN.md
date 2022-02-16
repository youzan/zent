---
title: Steps
subtitle: 步骤条
path: component/steps
group: 导航
scatter: true
---

## Steps 步骤条

位于表单头部，用于大体量或强逻辑表单的分步骤展示，提供跳转能力。

### 建议

- 当任务复杂或存在先后关系时，步骤条将其分解成多个步骤，简化用户每一步的认知与操作成本和反馈当前状态；
- 当大体量或强逻辑表单需要分步骤展示，且提供跳转能力，使用步骤条；
- 当一项任务包含多个有前后关系的节点，且需要反馈任务流转状态时，使用进度指示；
- 当一项任务仅有进度不包含多个有前后节点时，请使用进度条；
- 当内容可拆分为多个没有前后逻辑关系的子内容时，请使用标签页；

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### API

#### Steps

| 参数         | 说明                                                              | 类型    | 默认值         | 备选值                             |
| ------------ | ----------------------------------------------------------------- | ------- | -------------- | ---------------------------------- |
| type         | steps 组件类型                                                    | string  | `'number'`     | `'card'`, `'breadcrumb'`, `'tabs'` |
| direction    | 步骤条的方向（竖直只针对 number 类型步骤条有效）                  | string  | `'horizontal'` | `'vertical'`                       |
| current      | 指定当前步骤, 从 1 开始记数 (当不传值时, 默认为 0, 状态都为 wait) | number  | `0`            |                                    |
| sequence     | 是否使用默认的步骤序号                                            | boolean | `true`         |                                    |
| onStepChange | 传该参数后 step 可点击切换 (针对 card, breadcrumb，tabs 类型)     | func    | `''`           |                                    |
| className    | 自定义额外类名                                                    | string  | `''`           |                                    |
| ghost        | 是否使用反色样式（仅支持 breadcrumb 类型）                        | boolean | false          |

**[type=number]类型的进度指示器请使用 Indicator 组件**

#### Steps.Step

步骤条的每一个子项

| 参数        | 说明                                                     | 类型                   |
| ----------- | -------------------------------------------------------- | ---------------------- |
| title       | 标题                                                     | `'node'`               |
| description | 步骤的详情描述 (card, breadcrumb, tabs 类型不支持该属性) | `'node'`               |
| icon        | 自定义图标                                               | `'string'` \| `'node'` |

### 已知问题

尚未处理步骤条只存在一项的边界情况。(当只有一项时不应该使用 steps)

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
