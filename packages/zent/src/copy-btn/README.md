## CopyBtn 复制按钮

复制按钮，点击后复制指定的文本

### 使用指南

-  当需要复制某些文本的时候，可以使用此组件

### 代码演示

:::demo 基础用法
```jsx
import { CopyBtn, Button } from 'zent';

const Simple = props => {
	return (<div>
		<CopyBtn text="复制组件" />
		<CopyBtn text="复制组件2" successNotify="复制成功！">
			<Button type="primary">复制</Button>
		</CopyBtn>
	</div>);
}

ReactDOM.render(<Simple />, mountNode);
```
:::


### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| text        | 需要复制的文本                    | text   |     |
| successNotify| 复制成功显示的文案               |   text  | `复制成功`   |
| errorNotify  | 复制失败显示的文案               |  text   | `复制失败，请手动复制链接`   |
| onSuccessCopy | 复制成功后的回调函数             | func   |     |
| onErrorCopy   | 复制失败后的回调函数             | func   |     |

