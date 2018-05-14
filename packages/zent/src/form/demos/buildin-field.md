---
order: 2
zh-CN:
	title: 使用内置表单元素组件
	name: 昵称
	nameValidationError: 请填写昵称
	type: 类型
	typeText1: 普通用户
	typeText2: 高级用户
	typeValidationErrors: 请选择类型
	sex: 性别
	sexValidationErrors: 请选择性别
	sexText1: 男
	sexText2: 女
	tagText: 兴趣标签
	tagValidationErrors: 请选择标签
	tagText1: 电影
	tagText2: 书籍
	tagText3: 旅行
	ageText: 年龄
	colorText: 喜欢的颜色
	dateRangeText: 身份证有效期
	dateRangeValidationErrors: 请填写有效期
	isPublicText: 公开个人信息
	agreeText: 同意许可条例
	agreeCont: 是
	submit: 获取表单值
	reset: 重置表单值
en-US:
	title: Use build-in field components
	name: Name
	nameValidationError: Please enter the name.
	type: Type
	typeText1: Volumn
	typeText2: VIP
	typeValidationErrors: Please choose the type.
	sex: Gender
	sexValidationErrors: Please choose sex.
	sexText1: Male
	sexText2: Female
	tagText: Hobbies
	tagValidationErrors: Please choose hobbies.
	tagText1: Movie
	tagText2: Book
	tagText3: Travel
	ageText: Age
	colorText: Favourite color
	dateRangeText: Validity period
	dateRangeValidationErrors: Please select the dateRange
	isPublicText: Public information
	agreeText: All permissions
	agreeCont: agree
	submit: submit
	reset: reset
---

```jsx
import { Form, Radio, Checkbox, Button, Notify } from 'zent';
const { Field, FormInputField, FormSelectField, FormRadioGroupField, FormCheckboxField, FormCheckboxGroupField, FormColorPickerField, FormDateRangePickerField, FormNumberInputField, FormSwitchField, createForm } = Form;

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
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)} >
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}:"
					required
					spellCheck={false}
					validations={{ required: true }} 
					validationErrors={{ required: '{i18n.nameValidationError}' }} 
				/>
				<FormSelectField
					name="type"
					label="{i18n.type}:"
					data = {[
						{ value: 1, text: '{i18n.typeText1}' },
						{ value: 2, text: '{i18n.typeText2}' }
					]}
					required
					validations={{ required: true }} 
					validationErrors={{ required: '{i18n.typeValidationErrors}' }} 
				/>
				<FormRadioGroupField
					name="sex"
					label="{i18n.sex}:"
					required
					validations={{ 
						required(values, value) {
							return value !== ''
						}
					}} 
					validationErrors={{ 
						required: '{i18n.sexValidationErrors}'
					}}
				>
					<Radio value="1">{i18n.sexText1}</Radio>
					<Radio value="2">{i18n.sexText2}</Radio>
				</FormRadioGroupField>
				<FormCheckboxGroupField
					name="hobbies"
					label="{i18n.tagText}:"
					value={this.state.checkedList}
					onChange={this.onCheckboxChange}
					required
					validations={{ 
						minLength: 1
					}} 
					validationErrors={{ 
						minLength: '{i18n.tagValidationErrors}'
					}}
				>
					<Checkbox value="movie">{i18n.tagText1}</Checkbox>
					<Checkbox value="book">{i18n.tagText2}</Checkbox>
					<Checkbox value="travel">{i18n.tagText3}</Checkbox>
				</FormCheckboxGroupField>
				<FormNumberInputField
					name="age"
					label="{i18n.ageText}:"
					showStepper
					value={12}
				/>
				<FormColorPickerField
					name="color"
					label="{i18n.colorText}:"
					value="#5197FF"
				/>
				<FormDateRangePickerField
					name="dateRange"
					label="{i18n.dateRangeText}:"
					type="split"
					value={[]}
					dateFormat="YYYY-MM-DD HH:mm:ss"
					validations={{
						required(values, value) {
							return value.length !== 0
						}
					}}
					validationErrors={{
						required: '{i18n.dateRangeValidationErrors}'
					}}
				/>
				<FormSwitchField
					name="isPublic"
					label="{i18n.isPublicText}:"
					value={false}
				/>
				<FormCheckboxField
					name="agree"
					label="{i18n.agreeText}:"
				>
					{i18n.agreeCont}
				</FormCheckboxField>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
					<Button type="primary" outline onClick={this.resetForm}>{i18n.reset}</Button>
				</div>
			</Form>
		);
	}
};
const WrappedForm = createForm({scrollToError: true})(FieldForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```

<style>
.zent-form__controls .zent-switch-small {
	margin-top: 5px;
}
</style>
