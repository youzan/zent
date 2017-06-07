## CopyButton 复制按钮

复制按钮，点击后复制指定的文本

### 使用指南

-  当需要复制某些文本的时候，可以使用此组件

### 代码演示

:::demo 基础用法
```jsx
import { CopyButton, Button } from 'zent';

const Simple = props => {
	return (<div>
		<CopyButton text="复制组件" />
		<CopyButton text="复制组件2" onCopySuccess="复制成功！">
			<Button type="primary">复制</Button>
		</CopyButton>
	</div>);
}

ReactDOM.render(<Simple />, mountNode);
```
:::


### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| text        | 需要复制的文本                    | text   |     |
| onCopySuccess | 复制成功后的回调函数             | func, string  | `复制成功` |
| onCopyError   | 复制失败后的回调函数             | func, string  | `复制失败，请手动复制链接` |

