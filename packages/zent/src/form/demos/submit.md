---
order: 9
zh-CN:
	title: 提交表单及结果处理
	name: 用户名
	asyncValidationError: 用户名已被占用
	nameValidationError: 用户名不能为空
	password: 密码
	pwValidationError: 密码不能为空
	comfirmPw: 确认密码
	comfirmValidatiaonError1: 两次填写的密码不一致
	comfirmValidatiaonError2: 确认密码不能为空
	comment1: 可以使用throw SubmissionError 在 onSubmitFail 中处理，也可以在这里直接 alert 错误信息
	comment2: 可以将返回值传入到 onSubmitSuccess ，也可以直接在这里处理掉
	submitSuccess: 注册成功
	submit: 注册
	reset: 重置
en-US:
	title: Submit the form and deal with the result
	name: user name
	asyncValidationError: This name is occupied.
	nameValidationError: The user name should be non-empty.
	password: password
	pwValidationError: The password should be non-empty.
	comfirmPw: Comfirm password
	comfirmValidatiaonError1: The password you enter the second time is not the same as the one you first filled in.
	comfirmValidatiaonError2: The field should be non-empty.
	comment1: You can throw a SubmissionError to deal with the error in the onSubmitFail function. Otherwise, you can use alert to show the error message directly. 
	comment2: You can pass the return value to the onSubmitSuccess function. Otherwise, you can hanle the successful result directly.
	submitSuccess: Congratulations, the registration is successful!
	submit: register
	reset: reset
---

```jsx
import { Form, Button, Notify } from 'zent';

const { FormInputField, createForm, SubmissionError } = Form;

function onSubmitFail(error) {
	Notify.error(error);
}

function onSubmitSuccess(result) {
	Notify.success(result);
}

class SubmitForm extends React.Component {
	submit = (values, zentForm) => {
		const promise = new Promise((resolve) => setTimeout(resolve, 1000));

		return promise.then(() => {
			const random = Math.random() * 10;
			if (random > 4) {
				zentForm.setFieldExternalErrors({
					user: '{i18n.asyncValidationError}'
				});
				// {i18n.comment1}
				throw new SubmissionError('{i18n.asyncValidationError}');
			} else {
				// {i18n.comment2}
				return '{i18n.submitSuccess}';
			}
		});
	};

	resetForm = () => {
		const { zentForm } = this.props;
		
		zentForm.resetFieldsValue();
	};
	
	render() {
		const { handleSubmit, zentForm } = this.props;
		const isSubmitting = zentForm.isSubmitting();

		return (
			<Form onSubmit={handleSubmit(this.submit)} horizontal>
				<FormInputField
					name="user"
					type="text"
					label="{i18n.name}:"
					value="111"
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.nameValidationError}' }}
				/>
				<FormInputField
					name="password"
					type="password"
					label="{i18n.password}:"
					value="222"
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.pwValidationError}' }}
				/>
				<FormInputField
					name="confirmPassword"
					type="password"
					label="{i18n.comfirmPw}:"
					value="222"
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
					<Button type="primary" outline onClick={this.resetForm}>{i18n.reset}</Button>
				</div>
			</Form>
		);
	}
}

const WrappedForm = createForm()(SubmitForm);

ReactDOM.render(
	<WrappedForm scrollToError onSubmitFail={onSubmitFail} onSubmitSuccess={onSubmitSuccess} />
	, mountNode
)
```
