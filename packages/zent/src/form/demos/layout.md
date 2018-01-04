---
order: 11
zh-CN:
	title: 三种 Form 布局
	name: 用户名
	name2: 用户名2
	submit: 获取表单值
en-US:
	title: Three layout of form
	name: name
	name2: name2
	submit: submit
---

```jsx
import { Form, Radio, Notify } from 'zent';
const { Field, FormInputField, createForm } = Form;

const RadioGroup = Radio.Group;

class FieldForm extends React.Component {
	state = {
		formLayout: 'vertical'
	}

	onRadioChange = (e) => {
		this.setState({
			formLayout: e.target.value
		})
	}

	submit = (values, zentForm) => {
		Notify.success(JSON.stringify(values));
	};

	render() {
		const { formLayout } = this.state;
		const { handleSubmit } = this.props;
		return (
			<div>
				<RadioGroup value={formLayout} onChange={this.onRadioChange}  className="form-layout">
					<Radio value="vertical">vertical</Radio>
					<Radio value="horizontal">horizontal</Radio>
					<Radio value="inline">inline</Radio>
				</RadioGroup>
				<Form inline={formLayout === 'inline'} horizontal={formLayout === 'horizontal'} onSubmit={handleSubmit(this.submit)}>
					<FormInputField
						name="name"
						type="text"
						label="{i18n.name}:"
						value=""
					/>
					<FormInputField
						name="name2"
						type="text"
						label="{i18n.name2}:"
						value=""
					/>
					<div className="zent-form__form-actions">
						<Button type="primary" htmlType="submit">{i18n.submit}</Button>
					</div>
				</Form>
			</div>
		);
	}
};
const WrappedForm = createForm()(FieldForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```

<style>
.form-layout {
	margin-bottom: 30px;
}
</style>
