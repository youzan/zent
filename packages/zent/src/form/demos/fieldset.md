---
order: 12
zh-CN:
	title: Fieldset
	name: 用户名
	name2: 用户名2
	submit: 获取表单值
en-US:
	title: Fieldset
	name: name
	name2: name2
	submit: submit
---

```jsx
import { Form, Nofity } from 'zent';

const { Field, Fieldset, FormInputField, createForm } = Form;

class FieldsetForm extends React.Component {
	submit = (values, zentForm) => {
		Nofity.success(JSON.stringify(values));
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<Fieldset legend="Fieldset1">
					<FormInputField
						name="name"
						type="text"
						label="{i18n.name}:"
						value=""
					/>
				</Fieldset>
				<Fieldset legend="Fieldset2">
					<FormInputField
						name="name2"
						type="text"
						label="{i18n.name2}:"
						value=""
					/>
				</Fieldset>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
				</div>
			</Form>
		);
	}
}

const WrappedForm = createForm()(FieldsetForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
