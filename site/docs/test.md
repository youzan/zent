## Button组件

### 示例

:::demo 禁用状态
```js
import { Button } from 'zent';

ReactDOM.render(
	<Button type="primary" disabled>确认付款</Button>
	, mountNode);
```
:::

:::demo 按钮分组
```js
import { Button } from 'zent';

ReactDOM.render(
	<div className="button-group">
		<Button type="primary" size="small">确认付款</Button>
		<Button size="small">确认收货</Button>
		<Button size="small">取消订单</Button>
	</div>
	, mountNode);
```
:::

<style>
.button-group {
	.zent-btn {
		margin-right: 10px;
	}
}
</style>

### API

| 参数       | 说明      | 类型       | 默认值       | 可选值       |
|-----------|-----------|-----------|-------------|-------------|
| type | 按钮类型 | string  | 'default'          | 'primary', 'danger'   |
| size | 按钮尺寸 | string  | 'normal'          | 'large', 'small', 'mini'  |
| tag | 按钮标签 | string  | 'button'          | 'a', 'span', ...  |
| diabled | 按钮是否禁用 | Boolean  |           |      |
| block | 按钮是否显示为块级元素 | Boolean  |           |      |
