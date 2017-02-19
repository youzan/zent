# zent-steps

Steps组件

## 使用场景或者特殊 API 设计讲解

步骤条类型分为订购类步骤条、注册步骤条、创建类步骤条


## API

### Steps

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| className | 自定义额外类名 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | null | 否 |
| type | steps组件类型 | oneOf(['number', 'card', 'breadcrumb']) | 'number' | ['card', 'breadcrumb'] | 否 |
| current | 指定当前步骤，从 1 开始记数 (当不传值时，默认为 0， 状态都为 wait) | number | 0 | null | 否 |
| direction | 显示方向 (暂不支持) | oneOf(['vertical', 'horizontal']) | 'horizontal' | ['vertical'] | 否 |
| size | 指定大小 (暂不支持) | oneOf(['normal', 'small']) | 'normal' | ['small'] | 否 |
| status | 步骤条的状态 | oneOf(['wait', 'finish', 'error']) | 'finish' | ['wait', 'error'] | 否 |

### Steps.Step

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| title | 标题 | node | null | null | 是 |
| description | 步骤的详情描述 (card, breadcrumb 类型不支持该属性) | node | null | null | 否 |

## 示例

```javascript
import Steps from 'zent-steps';
<Steps>
  <Steps.Step title="第一步" />
  <Steps.Step title="第二步" />
  <Steps.Step title="第三步" />
</Steps>
```

## 如何安装

```bash
npm install zent-steps --save
```
