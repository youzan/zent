---
order: 5
zh-CN:
	title: 全选，在实现全选效果时，你可能会用到 `indeterminate` 属性
	content: 全选
en-US:
	title: Select all. You may use `indeterminate` when implementing a full selection.
	content: Select All
---

```jsx
import { Checkbox } from 'zent'

const CheckboxGroup = Checkbox.Group
const ITEMS = ['Item 1', 'Item 2', 'Item 3']

class App extends Component {

	state = {
		checkedList: []
	}

	handleCheckedAll = (e) => {
		this.setState({
			checkedList: e.target.checked ? ITEMS.slice() : []
		})
	}

	handleChange(checkedList) {
		this.setState({ checkedList })
	}

	render() {
		const { checkedList } = this.state
		const checkedAll = !!checkedList.length && (checkedList.length === ITEMS.length)
		const indeterminate = !!checkedList.length && (checkedList.length !== ITEMS.length)

		return (
			<div>
				<Checkbox 
					checked={checkedAll}
					indeterminate={indeterminate}
					onChange={this.handleCheckedAll}
				>{i18n.content}</Checkbox>

				<hr />

				<CheckboxGroup 
					value={checkedList}
					onChange={this.handleChange.bind(this)}
				>
					{ITEMS.map(item => {
                        return <Checkbox key={item} value={item}>{item}</Checkbox>
                    })}
				</CheckboxGroup>
			</div>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
