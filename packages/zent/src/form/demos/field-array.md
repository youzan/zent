---
order: 14
zh-CN:
	title: FieldArray 基本使用
	addHobby: 添加兴趣爱好
	delHobby: 删除该爱好
	hobby: 兴趣爱好
	hobbyValidation: 请填写兴趣爱好
	addMember: 添加一个成员
	addTwoMembers: 添加两个成员
	delMember: 删除该成员
	member: 成员
	name: 名字
	sex: 性别
	nameValidationError: 请填写成员名字
	sexValidationError: 请选择性别
	male: 男
	female: 女
	totalNumber: 总人数
	totalNumberError: 请填写总人数
	submit: 获取表单值
	setArray: 设置 FieldArray 值
en-US:
	title: Basic usage of FieldArray
	addHobby: Add hobby
	delHobby: Delete hobby
	hobby: Hobby
	hobbyValidation: Please enter the hobby.
	addMember: Add one member
	addTwoMembers: Add two members
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
	setArray: Set FieldArray
---

```jsx
import { Form, Icon, Pop, Notify } from 'zent';
const {
	Field,
	FormInputField,
	FormRadioGroupField,
	createForm,
	FormSection,
	FieldArray,
} = Form;

class Hobbies extends React.Component {
	render() {
		const { fields } = this.props;
		return (
			<ul>
				<Button onClick={() => fields.push()} className="add-btn">
					{i18n.addHobby}
				</Button>
				{fields.map((hobby, index, key) => {
					return (
						<li className="hobbies" key={`hobby${key}`}>
							<FormInputField
								name={`${hobby}`}
								type="text"
								label={`{i18n.hobby}${index + 1}:`}
								validations={{ required: true }}
								validationErrors={{ required: '{i18n.hobbyValidation}' }}
							/>
							<span className="del-btn" onClick={() => fields.remove(index)}>
								{i18n.delHobby}
							</span>
						</li>
					);
				})}
			</ul>
		);
	}
}

class MemberInfo extends React.Component {
	render() {
		const { fields, index } = this.props;

		return (
			<li className="members">
				<div className="member-title">
					<span>
						{i18n.member}
						{index + 1}
					</span>
					<Pop centerArrow trigger="hover" content="{i18n.delMember}">
						<Icon
							className="del-btn"
							type="close-circle"
							onClick={() => fields.remove(index)}
						/>
					</Pop>
				</div>
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}:"
					required
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.nameValidationError}' }}
				/>
				<FormRadioGroupField
					name="sex"
					label="{i18n.sex}:"
					required
					validations={{
						required(values, value) {
							return value !== '';
						},
					}}
					validationErrors={{
						required: '{i18n.sexValidationError}',
					}}
				>
					<Radio value="1">{i18n.male}</Radio>
					<Radio value="2">{i18n.female}</Radio>
				</FormRadioGroupField>
				<FieldArray name="hobbies" component={Hobbies} />
			</li>
		);
	}
}

class Members extends React.Component {
	addOne = () => {
		this.props.fields.push({});
	};
	addTwo = () => {
		this.props.fields.push({
			name: 'john',
			sex: '1',
			hobbies: ['H1', 'h4', 'h6'],
		});
		this.props.fields.push({});
	};
	render() {
		const { fields } = this.props;
		return (
			<ul>
				{fields.length < 3 && (
					<Button onClick={this.addOne} className="add-btn">
						{i18n.addMember}
					</Button>
				)}
				{fields.length < 2 && (
					<Button onClick={this.addTwo} className="add-btn">
						{i18n.addTwoMembers}
					</Button>
				)}
				{fields.map((member, index, key) => {
					return (
						<FormSection name={member} key={`member${key}`}>
							<MemberInfo fields={fields} index={index} />
						</FormSection>
					);
				})}
			</ul>
		);
	}
}

class FieldForm extends React.Component {
	componentDidMount() {
		this.props.zentForm.initialize({
			number: 233,
			members: [
				{
					name: 'john',
					sex: '1',
					hobbies: ['HH2'],
				},
				{},
			]
		});
	}

	submit = (values, zenForm) => {
		Notify.success(JSON.stringify(values));
	};

	setArray = () => {
		this.props.zentForm.setFieldsValue({
			number: 42,
			members: [
				{
					name: 'john',
					sex: '1',
					hobbies: ['H1'],
				},
			],
		});
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form
				horizontal
				onSubmit={handleSubmit(this.submit)}
				className="demo-form"
			>
				<FormInputField
					name="number"
					type="text"
					label="{i18n.totalNumber}:"
					required
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.totalNumberError}' }}
				/>
				<FieldArray
					name="members"
					component={Members}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">
						{i18n.submit}
					</Button>
					<Button onClick={this.setArray}>{i18n.setArray}</Button>
				</div>
			</Form>
		);
	}
}

const WrappedForm = createForm()(FieldForm);

ReactDOM.render(<WrappedForm />, mountNode);
```

<style>
.add-btn {
	margin-left: 130px;
}

.demo-form{

	.members {
		border: 1px dashed #ccc;
		margin: 20px 0;
		padding: 10px 0;
		position: relative;

		.del-btn {
			color: #666;
			cursor: pointer;
			position: absolute;
			right: -8px;
			top: -8px;
		}
	}

	.member-title{
		margin: 0 10px;
	}

	.hobbies {
		margin-top: 20px;
		position: relative;

		.del-btn {
			color: #38f;
			cursor: pointer;
			font-size: 12px;
			position: absolute;
			top: 6px;
			left: 300px;
		}
	}

	.hobby-title {
		margin: 10px 0 5px;
	}

	.zenticon {
		margin-left: 10px;
	}
}
</style>
