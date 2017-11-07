---
order: 8
zh-CN:
	title: 格式化 value 值
en-US:
	title: Format value
---

```jsx
import { Form } from 'zent';
const { Field, FormInputField, createForm } = Form;

class FormattedForm extends React.Component {
	lower = (value) => {
		return value && value.toLowerCase();
	}

	upper = (value) => {
		return value && value.toUpperCase();
	}

render() {
		return (
			<Form horizontal>
				<FormInputField
					name="field1"
					type="text"
					label="To Lower:"
					value="AAA"
					normalize={this.lower}
					format={this.lower}
				/>
				<FormInputField
					name="field2"
					type="text"
					label="To Upper:"
					value="bbb"
					normalize={this.upper}
					format={this.upper}
				/>
			</Form>
		);
	}
}

const WrappedForm = createForm()(FormattedForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
