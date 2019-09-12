---
title: Notice
subtitle: 通知提醒
path: component/notice
group: 反馈
---

## Notice 通知提醒

### API

| Property  | Description                                 | Type                | Required | Default     | Alternative                                            |
| --------- | ------------------------------------------- | ------------------- | -------- | ----------- | ------------------------------------------------------ |
| title     | 标题                                        | string              | 是       |             |                                                        |
| className | 自定义类名                                  | string              | 否       |             |                                                        |
| style     | 自定义样式                                  | React.CSSProperties | 否       |             |                                                        |
| type      | 样式                                        | string              | 否       |             | `info`, `success`,`warning`, `error`                   |
| closable  | 是否显示关闭按钮，当是`false`时不会自动关闭 | boolean             | 否       |             |                                                        |
| onClose   | 关闭按钮点击时的回调                        | function            | 否       |             |                                                        |
| autoClose | 是否自动关闭                                | boolean             | 否       |             |                                                        |
| timeout   | 自动关闭的延迟时间                          | number              | 否       |             |                                                        |
| children  | 内容                                        | React.ReactNode     | 否       |             |                                                        |
| position  | 位置                                        | string              | 否       | `top-right` | `right-top`, `right-bottom`, `left-top`, `left-bottom` |
