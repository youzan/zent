## Notify 消息通知

提示信息组件

### 使用指南

-  组件由 3 个函数构成, 使用临时创建的 DOM 节点来渲染组件。
-  主要用于提示简要的文字信息。

### 代码演示

:::demo 基础用法
```js
import { Notify } from 'zent';
import { Button } from 'zent';

function testSuccess() {
	Notify.success('成功通知', 1000);
}

function testError() {
	Notify.error('错误通知');
}

ReactDOM.render(
	<div>
		<Button onClick={testSuccess.bind(this)}>成功通知</Button>
		<Button onClick={testError.bind(this)}>错误通知</Button>
	</div>
	, mountNode
);

```
:::

:::demo 自定义通知内容
```js
import { Notify } from 'zent';
import { Button } from 'zent';

function customContent() {
	Notify.success(
		<div>
			<span style={{ color: '#f67' }}>颜色</span>
			<i>斜体</i>
			<b>粗体</b>
		</div>
    );
}

ReactDOM.render(
	<Button onClick={customContent.bind(this)}>自定义内容通知</Button>
	, mountNode
);

```
:::

:::demo 自定义通知显示时间
```js
import { Notify } from 'zent';
import { Button } from 'zent';

function testSuccess1() {
	Notify.success('成功通知1s', 1000);
}

function testSuccess3() {
	Notify.success('成功通知3s');
}

ReactDOM.render(
	<div>
		<Button onClick={testSuccess1.bind(this)}>通知1s</Button>
		<Button onClick={testSuccess3.bind(this)}>通知3s</Button>
	</div>
	, mountNode
);

```
:::

:::demo 自定义通知结束回调
```js
import { Notify } from 'zent';
import { Button } from 'zent';

function closeCallback() {
	alert('Notify has over');
}

function testSuccess() {
	Notify.success('通知结束回调函数', 1000, closeCallback);
}

ReactDOM.render(
	<Button onClick={testSuccess.bind(this)}>自定义通知结束回调</Button>
	, mountNode
);

```
:::

:::demo 清楚屏幕所有通知
```js
import { Notify } from 'zent';
import { Button } from 'zent';

function clearNotify() {
	Notify.clear();
}

ReactDOM.render(
	<Button onClick={clearNotify.bind(this)}>清除通知</Button>
	, mountNode
);

```
:::


### API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `3000` |
| callback | 自定义notify结束回调 | func   |        |
