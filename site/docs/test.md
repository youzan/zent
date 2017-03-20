## Button组件

### 禁用状态

:::demo 禁用状态
```js
import { Button } from 'zent';

ReactDOM.render(
	<div class="button-group">
		<zan-button type="primary" size="small">确认付款</zan-button>
		<zan-button size="small">确认收货</zan-button>
		<zan-button size="small">取消订单</zan-button>
	</div>
	, mountNode);
```
:::

<style>
body {
	color: red;
}
</style>

### button group

一组按钮。

:::demo
```js
import { Button } from 'zent';

ReactDOM.render(
	<div class="button-group">
		<zan-button type="primary" size="small">确认付款</zan-button>
		<zan-button size="small">确认收货</zan-button>
		<zan-button size="small">取消订单</zan-button>
	</div>
	, mountNode);
```
:::

### API

| 参数       | 说明      | 类型       | 默认值       | 可选值       |
|-----------|-----------|-----------|-------------|-------------|
| type | 按钮类型 | string  | 'default'          | 'primary', 'danger'   |
| size | 按钮尺寸 | string  | 'normal'          | 'large', 'small', 'mini'  |
| tag | 按钮标签 | string  | 'button'          | 'a', 'span', ...  |
| diabled | 按钮是否禁用 | Boolean  |           |      |
| block | 按钮是否显示为块级元素 | Boolean  |           |      |

<style>
.demo {
	content: '';
  &-button {
    .zan-row {
      padding: 0 20px;
    }
    .zan-col {
      margin-bottom: 10px;
    }
    .button-group {
      font-size: 0;
      padding: 0 20px;
    }
  }
}
</style>
