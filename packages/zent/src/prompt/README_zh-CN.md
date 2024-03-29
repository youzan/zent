---
title: Prompt
subtitle: 提示
path: component/prompt
group: 信息反馈
---

## Prompt 提示

向用户传递与当前页面相关的行为反馈、确认的推送信息。

### 建议

- 使用：用于向用户传递产品或系统提示。与用户的任务或状态无关，会一直存在，直到被用户处理或关闭；
- 位置：针对页面全局的提示通常位于内容区容器内的顶部，随容器宽度自适应；针对表单某一项的提示通常位于表单项的上方或下方，宽度支持业务自定义；

### 注意

- 仅在必要时使用提示，且应将提示限制在与之内容相关的任务界面中。频繁使用可能会导致用户对提示的注意力下降；
- 禁止多条提示在同一位置叠加；
- 如提示并非由系统生成而是由任务生成，请使用「状态条」；
- 如需交互更加轻量，请使用「？」折叠帮助信息；

### API

| 参数         | 说明                   | 类型        | 是否必须 | 默认值      | 备选值                       |
| ------------ | ---------------------- | ----------- | -------- | ----------- | ---------------------------- |
| type         | 提示的默认类型         | `string`    | 否       | `'warning'` | `'strongHint'`\|`'weakHint'` |
| closeContent | 关闭触发器的自定义内容 | `ReactNode` | 否       |             |                              |
| extraContent | 右侧自定义内容         | `ReactNode` | 否       |             |                              |
| closable     | 是否可以关闭           | `boolean`   | 否       | `true`      | `false`                      |

Prompt 组件基于 Alert 实现，更多属性请参考 [Alert 文档](https://youzan.github.io/zent/zh/component/alert)
