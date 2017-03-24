## Steps 步骤条

[![npm version](https://img.shields.io/npm/v/zent-steps.svg?style=flat)](https://www.npmjs.com/package/zent-steps) [![downloads](https://img.shields.io/npm/dt/zent-steps.svg)](https://www.npmjs.com/package/zent-steps)

### 使用指南

步骤项多于1项时才使用该组件，尚未处理只存在一项的边界情况。

### 代码演示

:::demo 类型为 number 的步骤条 (默认为该类型)
```js
import { Steps } from 'zent';

ReactDOM.render(
    <Steps current={2} status="error">
      <Steps.Step title="第一步" description="这里是多信息的描述啊描述啊描述啊" />
      <Steps.Step title="第二步" description="这里是多信息的描述啊描述啊描" />
      <Steps.Step title="第三步" description="这里是多信息的描述啊描述啊描述啊描述啊" />
    </Steps>
  , mountNode
);
```
:::

:::demo 类型为 breadcrumb 的步骤条
```js
import { Steps } from 'zent';

ReactDOM.render(
  <Steps current={2} type="breadcrumb" >
    <Steps.Step title="登录有赞账号" />
    <Steps.Step title="选择门店" />
    <Steps.Step title="绑定门店" />
    <Steps.Step title="完成" />
  </Steps>
  , mountNode
);
```
:::

:::demo 类型为 card 的步骤条
```js
import { Steps } from 'zent';

ReactDOM.render(
    <Steps current={2} type="card" >
      <Steps.Step title="登录有赞账号" />
      <Steps.Step title="选择门店" />
      <Steps.Step title="绑定门店" />
      <Steps.Step title="完成" />
    </Steps>
  , mountNode
);
```
:::

### API

### Steps

| 参数        | 说明                                         | 类型     | 默认值            | 备选值                       |
| --------- | ------------------------------------------ | ------ | -------------- | ------------------------- |
| className | 自定义额外类名                                    | string | `''`           |                           |
| prefix    | 自定义前缀                                      | string | `'zent'`       |                           |
| type      | steps组件类型                                  | string | `'number'`     | `'card'`,  `'breadcrumb'` |
| current   | 指定当前步骤, 从 1 开始记数 (当不传值时, 默认为 0, 状态都为 wait) | number | `0`            |                           |
| status    | 步骤条的状态                                     | string | `'finish'`     | `'wait'`, `'error'`       |

### Steps.Step

| 参数          | 说明                                  | 类型   |
| ----------- | ----------------------------------- | ---- |
| title       | 标题                                  | node |
| description | 步骤的详情描述 (card, breadcrumb 类型不支持该属性) | node |
