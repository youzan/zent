---
order: 7
zh-CN:
	title: 异步校验
	asyncValidationError: 用户名已被占用
	name: 用户名
	validationError: 用户名不能为空
	submit: 获取表单值
en-US:
	title: Asynchronous validation
	asyncValidationError: This name is occupied.
	name: name
	validationError: The value should be non-empty.
	submit: submit
---

```jsx
import { Form } from 'zent';
const { Field, FormInputField, createForm } = Form;

const AsyncForm = (props) => {
	const { handleSubmit, zentForm } = props;
	const asyncValidation = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie') {
				reject('{i18n.asyncValidationError}');
			} else {
				resolve();
			}
		}, 1000));
	}
	const asyncValidation2 = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie2') {
				reject('{i18n.asyncValidationError}');
			} else {
				resolve();
			}
		}, 1000));
	}
	const submit = (values) => {
		alert(JSON.stringify(values));
	}
	const isSubmitting = zentForm.isSubmitting();
	return (
		<Form horizontal onSubmit={handleSubmit(submit)}>
			<FormInputField
				name="name"
				type="text"
				label="{i18n.name}:"
				value=""
				validations={{
					required: true,
				}}
				validationErrors={{
					required: '{i18n.validationError}',
				}}
				asyncValidation={asyncValidation}
			/>
			<FormInputField
				name="name2"
				type="text"
				label="{i18n.name}:"
				value="pangxie2"
				asyncValidation={asyncValidation2}
			/>
			<div className="zent-form__form-actions">
				<Button type="primary" htmlType="submit" loading={isSubmitting}>{i18n.submit}</Button>
			</div>
		</Form>
	);
};
const WrappedForm = createForm()(AsyncForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
