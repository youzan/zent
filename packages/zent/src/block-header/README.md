## BlockHeader 标题

这是一个模块标题。

### 代码演示

:::demo 基础用法
```js
import { BlockHeader } from 'zent';

class Simple extends React.Component {
	render() {
		return (
			<div>
				<BlockHeader
					title="有赞微商城"
					tooltip={<span>test</span>}
					content={<a href="/">content</a>}
					position="top-center"
				/>
				<br />
				<BlockHeader
					className="test-class"
					title="有赞微商城"
					tooltip={<span>test</span>}
					position="top-center"
				>
					<a href="/">children</a>
				</BlockHeader>
			</div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

## API

| 参数            | 说明               | 类型             | 默认值      | 备选值     |
|------          |------              |------            |--------    |--------   |
| prefix         | 自定义前缀           | string          | `'zent'`    |           |
| className      | 自定义类名          | string            |   ''    |              |
| title          | 标题               | string            |         |              |
| tooltip        | pop显示内容         | node             |          |             |
| content        | 自定义content       | node             |            |           |
| position       | pop posotion       | string           | 'top-right' |          |

