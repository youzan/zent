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

#### `Notice.push(node: ReactNode): string`

打开一个新的通知，返回值是这个通知的 `id`，可通过 `Notice.close(id)` 手动关闭通知。

注意：由于 `ReactDOM.render` 在某些场景下是异步的（比如在 `useEffect` 内部调用的时候），所以 `push` 返回的 `id` 并不能立刻用于 `close`，如果调用 `close(id)` 时 `ReactDOM.render`
还未渲染出来，那么此次 `close` 调用不会有效果。

#### `Notice.close(id: string): void`

关闭 `id` 指定的通知。
