---
order: 7
zh-CN:
	title: 异步校验
	asyncValidationError: 已被占用
	name: 用户名
	validationError: 用户名不能为空
	validationError2: 用户名必须是字母
	submit: 获取表单值
	tipOne: 试试输入pangxie
	tipTwo: 试试输入pangxie2
en-US:
	title: Asynchronous validation
	asyncValidationError: is occupied.
	name: name
	validationError: The value should be non-empty.
	validationError2: The value should be characters.
	submit: submit
	tipOne: try to enter 'pangxie'
	tipTwo: try to enter 'pangxie2'
---

```jsx
import { Form, Notify } from 'zent';
const { Field, FormInputField, createForm } = Form;

class AsyncForm extends React.Component {
	render() {
		const { handleSubmit, zentForm } = this.props;
		const isSubmitting = zentForm.isSubmitting();

		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}:"
					value="pangxie"
					validations={{
						required: true,
						matchRegex: /[a-zA-Z]+/
					}}
					validationErrors={{
						required: '{i18n.validationError}',
						matchRegex: '{i18n.validationError2}'
					}}
					asyncValidation={this.asyncValidation}
					helpDesc="{i18n.tipOne}"
				/>
				<FormInputField
					name="name2"
					type="text"
					label="{i18n.name}:"
					value="pangxie2"
					asyncValidation={this.asyncValidation2}
					helpDesc="{i18n.tipTwo}"
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit" loading={isSubmitting}>{i18n.submit}</Button>
				</div>
			</Form>
		);
	}

	asyncValidation = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie') {
				reject('pangxie {i18n.asyncValidationError}');
			} else {
				resolve();
			}
		}, 1000));
	}
	
	asyncValidation2 = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie2') {
				reject('pangxie2 {i18n.asyncValidationError}');
			} else {
				resolve();
			}
		}, 1000));
	}
	
	submit = (values) => {
		Notify.success(JSON.stringify(values));
	}
};
const WrappedForm = createForm()(AsyncForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
