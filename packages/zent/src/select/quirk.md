---
order: 2.5
zh-CN:
	title: 怪异模式(不推荐，留作调试使用)
	pla: 请选择
	re: 重新渲染
en-US:
	title: Controlled Mode
	pla: Select an option..
	re: Rerender
---

```js
import { Select, Button } from 'zent';

const Option = Select.Option;
const data = [
	{ value: undefined, text: 'Option 1' },
	{ value: '', text: 'Option 2' },
	{ value: false, text: 'Option 3' },
	{ value: 0, text: 'Option 3' }
];

class Demo extends Component {
	reRender = () => {
		this.forceUpdate();
	};

  render() {
  	return (
    	<div>
				<Select
					placeholder="{i18n.pla}"
					data={data}
					resetOption
					initialValue={false} />
				<Button onClick={this.reRender}>{i18n.re}</Button>
    	</div>
    );
  }
}

ReactDOM.render(
	<Demo />,
	mountNode
);
```
