---
order: 6
zh-CN:
	title: 不同校验时机
	validationOnChange: Change时校验
	validationOnBlur: Blur时校验
	validationOnSubmit: submit时校验
	customDisplayError: 自定义错误显示
	fieldError1: 值不能为空
	fieldError2: 只能为字母
	submit: 获取表单值
en-US:
	title: Different time when the validation is triggered.
	validationOnChange: Vaidate when field is changed
	validationOnBlur: Vaidate when field is out of focus
	validationOnSubmit: Validate when form is submitted
	customDisplayError: Custom way of display error
	fieldError1: The value should be non-empty.
	fieldError2: The value can only be letters.
	submit: submit
---

```jsx
import { Form, Notify } from 'zent';

const { Field, FormInputField, createForm } = Form;

class FormattedForm extends React.Component {
	submit = (values) => {
		Notify.success(JSON.stringify(values));
	}

	render() {
		const { handleSubmit, zentForm } = this.props;

		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FormInputField
					name="field1"
					type="text"
					label="{i18n.validationOnChange}:"
					validations={{ 
						required: true,
						matchRegex: /^[a-zA-Z]+$/
					}}
					validationErrors={{
						required: '{i18n.fieldError1}',
						matchRegex: '{i18n.fieldError2}'
					}}
				/>
				<FormInputField
					name="field2"
					type="text"
					label="{i18n.validationOnBlur}:"
					validateOnChange={false}
					validations={{ 
						required: true,
						matchRegex: /^[a-zA-Z]+$/
					}}
					validationErrors={{
						required: '{i18n.fieldError1}',
						matchRegex: '{i18n.fieldError2}'
					}}
				/>
				<FormInputField
					name="field3"
					type="text"
					label="{i18n.validationOnSubmit}:"
					validateOnChange={false}
					validateOnBlur={false}
					validations={{
						required: true,
						matchRegex: /^[a-zA-Z]+$/
					}}
					validationErrors={{
						required: '{i18n.fieldError1}',
						matchRegex: '{i18n.fieldError2}'
					}}
				/>
				<FormInputField
					name="field4"
					type="text"
					label="{i18n.customDisplayError}:"
					displayError={zentForm.isFormSubmitFail() && !!zentForm.getFieldError('field4')}
					validations={{
						required: true,
						matchRegex: /^[a-zA-Z]+$/
					}}
					validationErrors={{
						required: '{i18n.fieldError1}',
						matchRegex: '{i18n.fieldError2}'
					}}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
				</div>
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
