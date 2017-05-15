## Steps 步骤条

步骤条组件，适用于需分步引导的操作。

### 代码演示

:::demo 类型为 number 的步骤条 (默认为该类型)
```jsx
import { Steps } from 'zent';

ReactDOM.render(
    <Steps current={2} status="error">
      <Steps.Step title="第一步" description="分享邀请码给好友" />
      <Steps.Step title="第二步" description="订购时输入你的邀请码" />
      <Steps.Step title="第三步" description="获得有赞E卡奖励" />
    </Steps>
  , mountNode
);
```
:::

:::demo 类型为 breadcrumb 的步骤条
```jsx
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
```jsx
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

#### Steps

| 参数        | 说明                                         | 类型     | 默认值            | 备选值                       |
| --------- | ------------------------------------------ | ------ | -------------- | ------------------------- |
| type      | steps组件类型                                  | string | `'number'`     | `'card'`,  `'breadcrumb'` |
| current   | 指定当前步骤, 从 1 开始记数 (当不传值时, 默认为 0, 状态都为 wait) | number | `0`            |                           |
| status    | 步骤条的状态                                     | string | `'finish'`     | `'wait'`, `'error'`       |
| className | 自定义额外类名                                    | string | `''`           |                           |
| prefix    | 自定义前缀                                      | string | `'zent'`       |                           |

#### Steps.Step

步骤条的每一个子项

| 参数          | 说明                                  | 类型   |
| ----------- | ----------------------------------- | ---- |
| title       | 标题                                  | node |
| description | 步骤的详情描述 (card, breadcrumb 类型不支持该属性) | node |

### 已知问题

尚未处理步骤条只存在一项的边界情况。(当只有一项时不应该使用 steps)
