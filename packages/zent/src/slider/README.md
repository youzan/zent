## Slider 滑动输入条

通过拖动、点击 `Slider` 组件选择数值

### 使用指南

- 可设置单滑块或者双滑块
- 可与 `Input` 输入框配合使用

### 代码演示

:::demo 基础用法

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
  state = {
    value: 0
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
:::

:::demo 双滑块选择范围

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
  state = {
    value: [30, 100]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
:::

:::demo 设置最大值，最小值，间隔

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
  state = {
    value: 1.3
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider max={2} min={1} step={0.1} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
:::

:::demo 标签值

```jsx
import { Slider } from 'zent';

const marks = {
  0: '0°C',
  100: '100°C'
};

class Test extends React.Component {
  state = {
    value: [30, 100]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range marks={marks} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
:::

:::demo 只能选择标签值，此时无输入框

```jsx
import { Slider } from 'zent';

const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C'
};

class Test extends React.Component {
  state = {
    value: [0, 50]
  }

  onChange = value => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (<Slider range dots marks={marks} value={value} onChange={this.onChange} />);
  }
}

ReactDOM.render(
    <Test />
    , mountNode
);
```
:::

:::demo disabled

```jsx
import { Slider } from 'zent';

ReactDOM.render(
    <Slider value={[30, 100]} range disabled />
    , mountNode
);
```
:::

### API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | 输入值    | [number,array] |    0      |    [0,0]    | 是    |
| onChange     | change 事件        | func(e:Event) |          |                         | 否    |
| range        | 是否选择范围    | bool          |     false     |                         | 否    |
| max          | 最大范围     | number     | 100 | 50 | 否    |
| min          | 最小范围     | number     |  0  |   -100        | 否    |
| step         | 间隔 | number        |  1     |                 | 否    |
| withInput    | 是否带输入框            | bool          |       true   |                  | 否    |
| dots         | 是否只能在标签值中选择     | bool |       true   |                         | 否    |
| marks        | 标签值     | object |          |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| className    | 自定义额外类名         | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀          | string        | `'zent'` |                         | 否    |

`range` 属性设置了必须给一个 `value` 值，且一定为一个长度为2的数组，数组项必须为数字。`dots` 属性配合 `marks` 属性使用。
