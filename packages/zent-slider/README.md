## Slider 滑块

通过拖动、点击Slider组件选择数值

### 使用指南

- 可设置单滑块或者双滑块
- 可与Input输入框配合使用

### 代码演示

:::demo 基础用法

```js
import { Slider } from 'zent';

ReactDOM.render(
    <div>
        <Slider />
    </div>
    , mountNode
);

```
:::

:::demo 双滑块选择范围

```js
import { Slider } from 'zent';

ReactDOM.render(
    <Slider value={[30, 100]} range />
    , mountNode
);
```
:::

:::demo 设置最大值，最小值，间隔

```js
import { Slider } from 'zent';

ReactDOM.render(
    <Slider value={1.3} max={2} min={1} step={0.1} />
    , mountNode
);
```
:::

:::demo 标签值

```js
import { Slider } from 'zent';

const marks = {
	0: '0°C',
	30: '30°C',
	60: '60°C',
	100: '100°C'
};
ReactDOM.render(
    <Slider value={[30, 100]} marks={marks} range dots />
    , mountNode
);
```
:::

:::demo 回调函数与disabled

```js
import { Slider } from 'zent';

class EventTest extends React.Component {
	state = { disabled: false }

	onChange = value => {
		if (value > 50) {
			this.setState({ disabled: true });
		}
	}

	render() {
		return (<Slider value={40} onChange={this.onChange} disabled={this.stete.disabled} />);
	}
}

ReactDOM.render(
    <EventTest />
    , mountNode
);
```
:::

### API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| className    | 自定义额外类名         | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀          | string        | `'zent'` |                         | 否    |
| max         | 最大范围     | number     | 100 | 50 | 否    |
| min         | 最小范围     | number     |  0  |   -100        | 否    |
| value        | 输入值    | [number,array] |    0      |    [0,0]    | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| step  | 间隔 | number        |  1     |                 | 否    |
| range  | 是否选择范围    | bool          |     false     |                         | 否    |
| withInput   | 是否带输入框            | bool          |       true   |                         | 否    |
| dots | 是否只能在标签值中选择     | bool |       true   |                         | 否    |
| marks | 标签值     | object |          |                         | 否    |
| onChange     | change事件        | func(e:Event) |          |                         | 否    |

range属性设置了必须给一个value值，且一定为一个长度为2的数组，数组项必须为数字。dots属性配合marks属性使用。
