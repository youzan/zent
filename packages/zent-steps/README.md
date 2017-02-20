# zent-steps

[![npm version](https://img.shields.io/npm/v/zent-steps.svg?style=flat)](https://www.npmjs.com/package/zent-steps) [![downloads](https://img.shields.io/npm/dt/zent-steps.svg)](https://www.npmjs.com/package/zent-steps)

步骤展示组件

## 使用场景

-   订购类步骤
-   注册步骤
-   创建类步骤

## 使用指南

```javascript
import Steps from 'zent-steps';
<Steps>
  <Steps.Step title="第一步" />
  <Steps.Step title="第二步" />
  <Steps.Step title="第三步" />
</Steps>
```

## API

### Steps

| 参数        | 说明                                         | 类型     | 默认值            | 备选值                       | 是否必须 |
| --------- | ------------------------------------------ | ------ | -------------- | ------------------------- | ---- |
| className | 自定义额外类名                                    | string | `''`           |                           | 否    |
| prefix    | 自定义前缀                                      | string | `'zent'`       |                           | 否    |
| type      | steps组件类型                                  | string | `'number'`     | `'card'`,  `'breadcrumb'` | 否    |
| current   | 指定当前步骤, 从 1 开始记数 (当不传值时, 默认为 0, 状态都为 wait) | number | `0`            |                           | 否    |
| direction | 显示方向 (暂不支持)                                | string | `'horizontal'` | `'vertical'`              | 否    |
| size      | 指定大小 (暂不支持)                                | string | `'normal'`     | `'small'`                 | 否    |
| status    | 步骤条的状态                                     | string | `'finish'`     | `'wait'`, `'error'`       | 否    |

### Step

| 参数          | 说明                                  | 类型   | 是否必须 |
| ----------- | ----------------------------------- | ---- | ---- |
| title       | 标题                                  | node | 是    |
| description | 步骤的详情描述 (card, breadcrumb 类型不支持该属性) | node | 否    |
