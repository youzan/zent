---
order: 13
zh-CN:
	title: FormSection
	street: 街道
	streetValidationError1: 街道必填
	streetValidationError2: 超过最大长度
	number: 门牌号
	numberValidationError1: 门牌号必填
	numberValidationError2: 不足最小长度
	zipCode: 邮政编码
	name: 用户名
	age: 年龄
	address: 地址
	totalNumber: 总人数
	totalNumberError: 总人数有错
	ageError: 年龄错误
	zipCodeError: 格式不对
	ageError2: 年龄重填
	submit: 获取表单值
	initialize: 初始化表单
	setError: 设置额外错误
	setValue: 设置表单值
	reset: 重置
en-US:
	title: FormSection
	street: Street
	streetValidationError1: The street should be non-empty.
	streetValidationError2: The length of value exceeds the maximum length.
	number: House number
	numberValidationError1: The house number should be non-empty.
	numberValidationError2: The length of value is less than minimum length.
	zipCode: Zip code
	name: Name
	age: Age
	address: Address
	totalNumber: Total number
	totalNumberError: The total number is wrong.
	ageError: The age is wrong.
	zipCodeError: The format of the zip code is incorrect.
	ageError2: The age needs to be refilled.
	submit: submit
	setError: set extra errors
	initialize: initialize
	setValue: set value
	reset: reset
---

```jsx
import { Form } from 'zent';
const { Field, FormSection, FormInputField, createForm } = Form;

class Address extends React.Component {
	render() {
		return <div>
			<FormInputField
				name="streetName"
				label="{i18n.street}:"
				type="text"
				validations={{
					required: true,
					maxLength: 5,
				}}
				validationErrors={{
					required: '{i18n.streetValidationError1}',
					maxLength: '{i18n.streetValidationError2}'
				}}
			/>
			<FormInputField
				name="number"
				label="{i18n.number}:"
				type="text"
				validations={{
					required: true,
					minLength: 6,
				}}
				validationErrors={{
					required: '{i18n.numberValidationError1}',
					minLength: '{i18n.numberValidationError2}'
				}}
			/>
			<FormInputField
				name="zipCode"
				label="{i18n.zipCode}:"
				type="text"
			/>
		</div>
	}
}

class Party extends React.Component {
	render() {
		return <div>
			<FormInputField
				name="name"
				label="{i18n.name}:"
				type="text"
			/>
			<FormInputField
				name="age"
				label="{i18n.age}:"
				type="text"
			/>
			<FormSection
				name="address"
				label="{i18n.address}:"
			>
				<Address />
			</FormSection>
		</div>
	}
}

class FieldsetForm extends React.Component {
	submit = (values, zenForm) => {
		alert(JSON.stringify(values));
	}

	setError = () => {
		const { zentForm } = this.props;
		zentForm.setFieldExternalErrors({
			all: '{i18n.totalNumberError}',
			buyer: {
				age: ['{i18n.ageError}', 'test']
			},
			recipient: {
				address: {
					zipCode: '{i18n.zipCodeError}' 
				},
				age: '{i18n.ageError2}'
			}
		});
	}

	initialize = () => {
		const { zentForm } = this.props;
		zentForm.initialize({
			all: '2',
			buyer: {
				age: 12,
				name: 'Allen',
				address: {
					number: 14234,
					zipCode: 2222
				}
			},
			recipient: {
				age: 11,
				name: 'Selina',
				address: {
					number: 14234,
					zipCode: 2222
				}
			}
		});
	}

	setFieldsValue = () => {
		const { zentForm } = this.props;
		zentForm.setFieldsValue({
			all: '14',
			buyer: {
				age: 30,
				name: 'Sherldon',
				address: {
					number: 1111111,
					zipCode: 11111
				}
			},
			recipient: {
				age: 32,
				name: 'Leonard',
				address: {
					number: 11111,
					zipCode: 1111
				}
			}
		});
	}

	reset = () => {
		const { zentForm } = this.props;
		zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FormInputField
					name="all"
					label="{i18n.totalNumber}:"
					type="text"
				/>
				<FormSection
					name="buyer"
					label="buyer"
				>
						<Party/>
				</FormSection>
				<FormSection
					name="recipient"
					label="recipient"
				>
						<Party/>
				</FormSection>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">{i18n.submit}</Button>
					<Button type="primary" onClick={this.setError}>{i18n.setError}</Button>
					<Button type="primary" onClick={this.initialize}>{i18n.initialize}</Button>
					<Button type="primary" onClick={this.setFieldsValue}>{i18n.setValue}</Button>
					<Button type="primary" onClick={this.reset}>{i18n.reset}</Button>
				</div>
			</Form>
		);
	}
};
const WrappedForm = createForm()(FieldsetForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)

```
