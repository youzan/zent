## Notify 消息通知

全局展示通知提醒信息。

### 使用指南

-  组件由 3 个函数构成, 使用临时创建的 DOM 节点来渲染组件。
-  主要用于提示简要的文字信息。
-  `Notify.success` 和 `Notify.error` 方法会返回一个id，这个id可以作为 `Notify.clear(id)` 的入参，用于关闭指定notify。

### 代码演示

:::demo 基础用法
```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知')}>成功通知</Button>
		<Button onClick={() => Notify.error('错误通知')}>错误通知</Button>
	</div>
	, mountNode
);

```
:::

:::demo 自定义通知内容
```jsx
import { Notify, Button } from 'zent';

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
	<Button onClick={customContent}>自定义内容通知</Button>
	, mountNode
);

```
:::

:::demo 自定义通知显示时间
```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知1s', 1000)}>通知1s</Button>
	</div>
	, mountNode
);

```
:::

:::demo 自定义通知结束回调
```jsx
import { Notify, Button } from 'zent';

function closeCallback() {
	alert('Notify has over');
}

ReactDOM.render(
	<Button onClick={() => Notify.success('通知结束回调函数', 1000, closeCallback)}>自定义通知结束回调</Button>
	, mountNode
);

```
:::

:::demo 清除屏幕所有通知
```jsx
import { Notify, Button } from 'zent';

function closeCallback() {
	alert('Callback has call');
}

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知', 2000, closeCallback)}>成功通知</Button>
		<Button onClick={() => Notify.clear()}>清除通知</Button>
	</div>
	, mountNode
);

```
:::

### API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
