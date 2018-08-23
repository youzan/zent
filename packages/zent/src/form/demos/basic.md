---
order: 1
zh-CN:
	title: 基础用法
	name: 用户名
	nameTip: 用户名用于个人账号登录
	nameHelpdesc: 用户名为5-25个字符
	password: 密码
	pwHelpDesc: 密码由6-20位英文字母、数字组成，
	link: 查看更多
	notice: 重要提示：填写后无法修改，请谨慎设置
en-US:
	title: Basic usage
	name: User Name
	nameTip: User name is used for personal login.
	nameHelpdesc: User name is 5-25 characters.
	password: Password
	pwHelpDesc: The password consists of 6-20 letters or numbers.
	link: Watch more.
	notice: Notice that user name and password cannot be modified after submitting. Please submit carefully.
---

```jsx
import { Form, Icon, Pop } from 'zent';
const { Field, FormInputField, createForm } = Form;

class FieldForm extends React.Component {
	render() {
		return (
			<Form horizontal>
				<FormInputField
					name="name"
					type="text"
					label={
						<span>
							{i18n.name}&nbsp;
							<Pop trigger="hover" content="{i18n.nameTip}" centerArrow>
								<Icon type="error-circle-o" />
							</Pop>:
						</span>
					}
					helpDesc="{i18n.nameHelpdesc}"
					required
				/>
				<FormInputField
					name="password"
					type="password"
					label="{i18n.password}:"
					helpDesc={
						<span>
							{i18n.pwHelpDesc}
							<a href="https://youzan.com" target="_blank">
								{i18n.link}
							</a>
						</span>
					}
					notice="{i18n.notice}"
					required
				/>
			</Form>
		);
	}
}

const WrappedForm = createForm()(FieldForm);

ReactDOM.render(<WrappedForm />, mountNode);
```
