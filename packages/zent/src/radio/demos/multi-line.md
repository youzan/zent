---
order: 5
zh-CN:
	title: 多行文本
	text1: 我不能创造的东西，我就不了解。
	text2: 我很早就明白知道一样事物(Know-how) 和知道一样事物的名字(Know-what)的分别。
	text3: 事实证明真理总是比你想象得更简单。
	switch: 切换标签 `display`
en-US:
	title: Multi line text
	text1: What I cannot create, I do not understand.
	text2: I learned very early the difference between knowing the name of something and knowing something.
	text3: The truth always turns out to be simpler than you thought.
	switch: Switch label `display`
---

```js
import { Radio, Button } from 'zent';

const RadioGroup = Radio.Group;

class App extends Component {
	state = {
		style: {
      display: 'inline-block'
		},
	};

	onChange = e => {};

	render() {
		return (
			<div className="demo-multiple-line">
				<RadioGroup onChange={this.onChange} value="1">
					<Radio value="1" labelStyle={this.state.style}>
						{i18n.text1}
						<p>{i18n.text2}</p>
					</Radio>
				</RadioGroup>
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
<style>
.demo-multiple-line .zent-radio{
  vertical-align: 10px !important;
}
</style>
