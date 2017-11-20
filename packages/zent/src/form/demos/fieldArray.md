---
order: 14
zh-CN:
	title: FieldArray
	addHobby: 添加兴趣爱好
	delHobby: 删除该爱好
	hobby: 兴趣爱好
	hobbyValidation: 请填写兴趣爱好
	addMember: 添加成员
	delMember: 删除该成员
	member: 成员
	name: 名字
	sex: 性别
	nameValidationError: 请填写成员名字
	sexValidationError: 请选择性别
	male: 男
	female: 女
	totalNumber: 家庭总人数
	totalNumberError: 请填写家庭总人数
	submit: 获取表单值
en-US:
	title: FieldArray
	addHobby: Add hobby
	delHobby: Delete hobby
	hobby: Hobby
	hobbyValidation: Please enter the hobby.
	addMember: Add member
	delMember: Delete member
	member: Member
	name: Name
	sex: Sex
	nameValidationError: Please enter the name of member.
	sexValidationError: Please select the sex of member.
	male: male
	female: female
	totalNumber: Total number
	totalNumberError: Please enter the total number of the family.
	submit: submit
---

```jsx
import { Form, Icon, Pop } from 'zent';
const { Field, FormInputField, FormRadioGroupField, createForm, FormSection, FieldArray } = Form;

class Hobbies extends React.Component {
	render() {
		const { fields } = this.props;
		return (
			<ul>
				<Button onClick={() => fields.push()} className="add-btn">{i18n.addHobby}</Button>
				{fields.map((hobby, index) => {
					return (
						<li key={`hobby${index}`}>
							<div className="hobby-title">
								<span>{i18n.hobby}{index + 1}</span>
								<Pop centerArrow trigger="hover" content="{i18n.delHobby}">
									<Icon type="close-circle" onClick={() => fields.shift()} />
								</Pop>
							</div>
							<FormInputField
								name={`${hobby}`}
								type="text"
								label="{i18n.hobby}:"
								validations={{ required: true }} 
								validationErrors={{ required: '{i18n.hobbyValidation}' }}
							/>
						</li>
					);
				})}
			</ul>
		);
	}
}

class Members extends React.Component {
	render() {
		const { fields } = this.props;
		return (
			<ul>
				<Button onClick={() => fields.push({})} className="add-btn">{i18n.addMember}</Button>
				{fields.map((member, index) => {
					return (
						<li key={`member${index}`}>
							<div className="member-title">
								<span>{i18n.member}{index + 1}</span>
								<Pop centerArrow trigger="hover" content="{i18n.delMember}">
									<Icon type="close-circle" onClick={() => fields.remove(index)} 
									/>
								</Pop>
							</div>
							<FormInputField
								name={`${member}.name`}
								type="text"
								label="{i18n.name}:"
								required
								validations={{ required: true }}
								validationErrors={{ required: '{i18n.nameValidationError}' }}
							/>
							<FormRadioGroupField
								name={`${member}.sex`}
								label="{i18n.sex}:"
								required
								validations={{ 
									required(values, value) {
										return value !== ''
									}
								}} 
								validationErrors={{ 
									required: '{i18n.sexValidationError}'
								}}
							>
								<Radio value="1">{i18n.male}</Radio>
								<Radio value="2">{i18n.female}</Radio>
							</FormRadioGroupField>
							<FieldArray name={`${member}.hobbies`} component={Hobbies} />
						</li>
					);
				})}
			</ul>
		);
	}
}

class FieldForm extends React.Component {
	submit = (values, zenForm) => {
		alert(JSON.stringify(values));
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)} className="demo-form">
				<FormInputField
					name="number"
					type="text"
					label="{i18n.totalNumber}:"
					required
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.totalNumberError}' }}
				/>
				<FieldArray name="members" component={Members} />
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
				</div>
			</Form>
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
.add-btn {
	margin-left: 130px;
}

.demo-form{
	.member-title{
		margin: 30px 0 20px;
	}
	.hobby-title {
		margin: 10px 0 5px;
	}
	.zenticon {
		margin-left: 10px;
	}
}
</style>
