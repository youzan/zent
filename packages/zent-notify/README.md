# zent-notify

[![npm version](https://img.shields.io/npm/v/zent-notify.svg?style=flat)](https://www.npmjs.com/package/zent-notify) [![downloads](https://img.shields.io/npm/dt/zent-notify.svg)](https://www.npmjs.com/package/zent-notify)

提示信息组件

## 使用指南

组件由 3 个函数构成, 使用临时创建的 DOM 节点来渲染组件, 并且外部保存 `containerList: object`.

### 显示

提供两种预定样式, 调用显示函数返回唯一的 containerId.

**text 参数必须是能转换为 HTMLElement 的类型, 比如 string/node.**

#### `Notify.error`

```ts
interface Notify.error {
  (text: any, duration: number): number;
}
```

#### `Notify.success`

```ts
interface Notify.sucess {
  (text: any, duration: number): number;
}
```
### 关闭

#### `Notify.clear`

```ts
interface Notify.clear {
  (?containerId: number): void;
}
```

输入具体的 containerId 时关闭对应的 Notify, 如果不输入任何参数, 则关闭所有 Notify.

## API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | node   | `''`   |
| duration | 持续时间          | number | `3000` |
| callback | 自定义notify结束回调 | func   |        |
