---
order: 5
zh-CN:
	title: 常用表单校验
	name: 昵称
	nameHelpdesc: 正则校验
	nameValidationError1: 请填写昵称
	nameValidationError2: 昵称只能是字母
	password: 密码
	pwHelpdesc: 非空校验
	pwValidationError: 请填写密码
	comfirmPw: 确认密码
	comfirmPwHelpdesc: 与其他表单域对比校验
	comfirmValidatiaonError: 两次填写的密码不一致
	email: 邮件
	emailHelodesc: 邮件校验
	emailValidationError: 请填写正确的邮件
	url: 个人网站链接
	urlHelpdesc: 超链接校验
	urlValidationError: 请填写正确的网址
	id: 证件号码
	idHelpdesc: 自定义校验函数
	idValidationError1: 证件号码必须是数字
	idValidationError2: 证件号码是10位或者15位数字
	hobbies: 兴趣标签
	hobbiesHelpdesc: 长度校验
	hobbiesValidationError: 请至少选择两个
	hobbiesText1: 电影
	hobbiesText2: 书籍
	hobbiesText3: 旅行
	submit: 获取表单值
	reset: 重置表单值
en-US:
	title: Common valiations of form
	name: Name
	nameHelpdesc: regular validation
	nameValidationError1: Please enter the name.
	nameValidationError2: Name can only be letters. 
	password: Password
	pwHelpdesc: non-empty validation
	pwValidationError: Please enter the password.
	comfirmPw: Comfirm password
	comfirmPwHelpdesc: validations of comparing with other field
	comfirmValidatiaonError: The password you enter the second time is not the same as the one you first filled in.
	email: Email
	emailHelodesc: validation of email
	emailValidationError: Please enter the right email.
	url: Personal website
	urlHelpdesc: validation of website link
	urlValidationError: Please enter the right website link.
	id: ID Number
	idHelpdesc: custom validations
	idValidationError1: ID number can only be numbers.
	idValidationError2: ID number is 10 or 15 digits.
	hobbies: hobbies
	hobbiesHelpdesc: length validation
	hobbiesValidationError: Please select at least two hobbies.
	hobbiesText1: movie
	hobbiesText2: book
	hobbiesText3: travel
	submit: submit
	reset: reset 
---


```jsx
import { Form, Radio, Checkbox, Notify } from 'zent';
const { Field, FormInputField, FormCheckboxGroupField, createForm } = Form;

class FieldForm extends React.Component {
	state = {
		checkedList: []
	}

	onCheckboxChange = (checkedList) => {
		this.setState({ checkedList });
	}

	submit = (values, zentForm) => {
		Notify.success(JSON.stringify(values));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } =this.props;

		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}:"
					required
					helpDesc="{i18n.nameHelpdesc}"
					validations={{
						required: true, 
						matchRegex: /^[a-zA-Z]+$/
					}} 
					validationErrors={{
						required: '{i18n.nameValidationError1}',
						matchRegex: '{i18n.nameValidationError2}'
					}} 
				/>
				<FormInputField
					name="password"
					type="text"
					label="{i18n.password}:"
					required
					helpDesc="{i18n.pwHelpdesc}"
					validations={{
						required: true
					}} 
					validationErrors={{
						required: '{i18n.pwValidationError}'
					}} 
				/>
				<FormInputField
					name="confirmPw"
					type="text"
					label="{i18n.comfirmPw}:"
					required
					helpDesc="{i18n.comfirmPwHelpdesc}"
					validations={{
						equalsField: 'password'
					}} 
					validationErrors={{
						equalsField: '{i18n.comfirmValidatiaonError}'
					}} 
				/>
				<FormInputField
					name="email"
					type="text"
					label="{i18n.email}:"
					helpDesc="{i18n.emailHelodesc}"
					validations={{
						isEmail: true
					}} 
					validationErrors={{
						isEmail: '{i18n.emailValidationError}'
					}} 
				/>
				<FormInputField
					name="url"
					type="text"
					label="{i18n.url}:"
					helpDesc="{i18n.urlHelpdesc}"
					validations={{
						isUrl: true
					}} 
					validationErrors={{
						isUrl: '{i18n.urlValidationError}'
					}}
				/>
				<FormInputField
					name="id"
					type="text"
					label="{i18n.id}:"
					required
					helpDesc="{i18n.idHelpdesc}"
					validations={{
						matchRegex: /^\d+$/,
						format(values, value) {
							return value.length === 15 || value.length === 10
						}
					}} 
					validationErrors={{
						matchRegex: '{i18n.idValidationError1}',
						format: '{i18n.idValidationError2}'
					}} 
				/>
				<FormCheckboxGroupField
					name="hobbies"
					type="text"
					label="{i18n.hobbies}:"
					value={this.state.checkedList}
					onChange={this.onCheckboxChange}
					required
					helpDesc="{i18n.hobbiesHelpdesc}"
					validations={{ 
						minLength: 2
					}} 
					validationErrors={{ 
						minLength: '{i18n.hobbiesValidationError}'
					}}
				>
					<Checkbox value="movie">{i18n.hobbiesText1}</Checkbox>
					<Checkbox value="book">{i18n.hobbiesText2}</Checkbox>
					<Checkbox value="travel">{i18n.hobbiesText3}</Checkbox>
				</FormCheckboxGroupField>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
					<Button type="primary" outline onClick={this.resetForm}>{i18n.reset}</Button>
				</div>
			</Form>
		);
	}
}

const WrappedForm = createForm()(FieldForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
