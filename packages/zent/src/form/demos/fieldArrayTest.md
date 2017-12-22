---
order: 15
zh-CN:
	title: FieldArrayTest
en-US:
	title: FieldArrayTest
---

```jsx
import { Form, Icon, Dialog, Pop, Notify } from 'zent';
const { Field, FormInputField, FormRadioGroupField, createForm, FormSection, FieldArray } = Form;

const { openDialog, closeDialog } = Dialog;

class Members extends React.Component {
	render() {
		const { fields } = this.props;
		return (
			<ul>
				<Button onClick={() => fields.push({})} className="add-btn">添加成员</Button>
				{fields.map((member, key, index, value, fieldValues) => {
					return (
						<li key={`member${key}`}>
							<div className="member-title">
								<span>成员{index + 1}</span>
								<Pop centerArrow trigger="hover" content="删除成员">
									<Icon type="close-circle" onClick={() => fields.remove(index)} 
									/>
								</Pop>
							</div>
							<FormInputField
								name={`${member}.name`}
								type="text"
								label="姓名:"
								required
								validations={{ required: true }}
								validationErrors={{ required: '请填写姓名' }}
							/>
							<FormRadioGroupField
								name={`${member}.sex`}
								label="性别:"
								required
								validations={{ 
									required(values, value) {
										return value !== ''
									}
								}} 
								validationErrors={{ 
									required: '请选择性别'
								}}
							>
								<Radio value="1">男</Radio>
								<Radio value="2">女</Radio>
							</FormRadioGroupField>
						</li>
					);
				})}
			</ul>
		);
	}
}

class FieldForm extends React.Component {
	submit = (values, zenForm) => {
		Notify.success(JSON.stringify(values));
	}

	

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FieldArray name="members" component={Members} />
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">提交表单</Button>
				</div>
			</Form>
		);
	}
};

const WrappedForm = createForm()(FieldForm);

const id = 'formDialog';

class App extends React.Component {
	showDialog = () => {
		const { handleSubmit } = this.props;
		openDialog({
			dialogId: id, // id is used to close the dialog
			title: '使用 openDialog 直接打开对话框',
			children: <WrappedForm />,
			footer: <Button onClick={() => closeDialog(id)}>关闭</Button>,
			onClose() {
				console.log('outer dialog closed');
			}
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Button onClick={this.showDialog}>添加成员</Button>
		)
	}
}

ReactDOM.render(
	<App />
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
