---
order: 10
zh-CN:
	title: 其他表单操作
	name: 用户名
	nameValidationError: 用户名不能为空
	nameValidationError2: 用户名不能为空
	age: 年龄
	ageValidationError: 年龄不能为空
	password: 密码
	pwValidationError: 密码不能为空
	comfirmPw: 确认密码
	comfirmValidatiaonError1: 两次填写的密码不一致
	comfirmValidatiaonError2: 确认密码不能为空
	submit: 获取表单值
	initialize: 初始化表单
	setValue: 设置表单值
	reset: 重置
en-US:
	title: Other operation of form
	name: name
	nameValidationError: The name should be non-empty.
	nameValidationError2: The name can only be letters.
	age: age
	ageValidationError: The age should be non-empty.
	password: password
	pwValidationError: The password should be non-empty.
	comfirmPw: Comfirm password
	comfirmValidatiaonError1: The password you enter the second time is not the same as the one you first filled in.
	comfirmValidatiaonError2: The field should be non-empty.
	submit: submit
	initialize: initialize
	setValue: set value
	reset: reset
---

```jsx
import { Form, Button, Notify } from 'zent';
const { Field, FormInputField, createForm } = Form;

class SubmitForm extends React.Component {
	submit = (values, zentForm) => {
		Notify.success(JSON.stringify(values));
	};

	setError = () => {
		const { zentForm } = this.props;
		zentForm.setFieldExternalErrors({
			name: '{i18n.nameValidationError2}'
		});
	}

	initialize = () => {
		const { zentForm } = this.props;
		zentForm.initialize({
			name: '0',
			age: '0',
			password: '0'
		});
	}

	setFieldsValue = () => {
		const { zentForm } = this.props;
		zentForm.setFieldsValue({
			name: '3'
		});
	}

	reset = () => {
		const { zentForm } = this.props;
		zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit, zentForm } = this.props;
		const isSubmitting = zentForm.isSubmitting();

		return (
			<Form onSubmit={handleSubmit(this.submit)} horizontal>
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}:"
					value="1"
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.nameValidationError}' }}
				/>
				<FormInputField
					name="age"
					type="text"
					label="{i18n.age}:"
					value="1"
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.ageValidationError}' }}
				/>
				<FormInputField
					name="password"
					type="text"
					label="{i18n.password}:"
					value="1"
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.pwValidationError}' }}
				/>
				<FormInputField
					name="confirmPassword"
					type="text"
					label="{i18n.comfirmPw}:"
					value="1"
					validations={{
						required: true,
						isPasswordEqual(values, value) {
							if (values.password !== value) {
								return '{i18n.comfirmValidatiaonError1}';
							}
							return true;
						}
					}}
					validationErrors={{
						required: '{i18n.comfirmValidatiaonError2}'
					}}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit" loading={isSubmitting}>{i18n.submit}</Button>
					<Button type="primary" outline onClick={this.initialize}>{i18n.initialize}</Button>
					<Button type="primary" outline onClick={this.setFieldsValue}>{i18n.setValue}</Button>
					<Button type="primary" outline onClick={this.reset}>{i18n.reset}</Button>
				</div>
			</Form>
		)
	}	
};
const WrappedForm = createForm()(SubmitForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
