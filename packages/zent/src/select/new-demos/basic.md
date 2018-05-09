---
order: 1
zh-CN:
	title: 基础用法
	pla: 选择一项
	reset: 重置为初始状态
	re: 重新渲染
	external: 外部状态
en-US:
	title: Basic Usage
	pla: Select an option..
	reset: Reset
	re: Rerender
	external: External state
---

```js
import { Select, Button } from 'zent';

const Option = Select.NewOption;
const data = [
	{ value: '1', text: 'Option 1' },
	{ value: '2', text: 'Option 2' },
	{ value: '3', text: 'Option 3' },
];

class Demo extends Component {
	state = {
  	selectedValue: '2'
  };

	reRender = () => {
		this.forceUpdate();
	};

	selectChangeHandler = (value, selected) => {
		this.setState({
			selectedValue: value // or selected[your optionValue]
		});
	};

	reset = () => this.select.reset();

  render() {
  	return (
    	<div>
				<span>{i18n.external}: {this.state.selectedValue}</span>
				<br />
				<br />
				<Select
					ref={node => (this.select = node)}
					mode={this.props.mode || null}
					placeholder="{i18n.pla}"
					data={data}
					onChange={this.selectChangeHandler}
					value={this.state.selectedValue} />
				<Button onClick={this.reset}>{i18n.reset}</Button>
				<Button onClick={this.reRender}>{i18n.re}</Button>
    	</div>
    );
  }
}

const BasicDemo = props => (
	<Select {...props}>
		<Option key="zero0" value="0" disabled>zero</Option>
		<Option key="zero1" value={0}>number-zero</Option>
		<Option key="one0" value="1">one</Option>
		<Option key="one1" value={1}>number-one</Option>
		<Option key="two0" value="2">two</Option>
		<Option key="two1" value={2}>number-two</Option>
	</Select>
)

ReactDOM.render(
	<div className="wrapper">
		<BasicDemo mode="base" />
		<br />
		<br />
		<BasicDemo placeholder="reset" mode="base" allowReset />
		<br />
		<br />
		<BasicDemo mode="search" />
		<br />
		<br />
		<BasicDemo mode="search" placeholder="reset" allowReset />
		<br />
		<br />
		<BasicDemo mode="tags" />
		<br />
		<br />
		<BasicDemo placeholder="disabled" disabled mode="base" />
		<br />
		<br />
		<BasicDemo placeholder="disabled" disabled mode="search" />
		<br />
		<br />
		<BasicDemo placeholder="disabled" disabled mode="tags" />
		<br />
		<br />
		<Select mode="base" placeholder="请选择" allowReset>
			<Option key="0" value="0000" disabled>010101</Option>
			<Option key="1" value="3333">1111</Option>
			<Option key="2" value="2222">2222</Option>
			<Option key="3" value="4444" disabled>2233322</Option>
			<Option key="4" value="5555">444444</Option>
			<Option key="5" value="6666">444444</Option>
			<Option key="6" value="7777">444444</Option>
			<Option key="7" value="8888" disabled>444444</Option>
		</Select>
	</div>,
	mountNode
);
```
