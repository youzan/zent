---
order: 13
zh-CN:
	title: FormSection 基本使用
	buyerInfo: 购买者信息
	recipientInfo: 发票信息
	street: 街道
	streetValidationError1: 街道必填
	streetValidationError2: 超过最大长度
	number: 门牌号
	numberValidationError1: 门牌号必填
	numberValidationError2: 不足最小长度
	zipCode: 邮政编码
	name: 名字
	mobile: 手机号
	orderNo: 订单号
	orderNoError: 订单号错误
	mobileError: 手机号错误
	zipCodeError: 格式不对
	mobileError2: 请重填手机号
	submit: 获取表单值
	initialize: 初始化表单
	setError: 设置额外错误
	setValue: 设置表单值
	reset: 重置
en-US:
	title: Basic usage of FormSection
	buyerInfo: Buyer Info
	recipientInfo: Recipient Info
	street: Street
	streetValidationError1: The street should be non-empty.
	streetValidationError2: The length of value exceeds the maximum length.
	number: House number
	numberValidationError1: The house number should be non-empty.
	numberValidationError2: The length of value is less than minimum length.
	zipCode: Zip code
	name: Name
	mobile: Mobile
	orderNo: Order Number
	orderNoError: The order number is wrong.
	mobileError: The mobile is wrong.
	zipCodeError: The format of the zip code is incorrect.
	mobileError2: The mobile needs to be refilled.
	submit: submit
	setError: set extra errors
	initialize: initialize
	setValue: set value
	reset: reset
---

```jsx
import { Form, Notify } from 'zent';
const { Field, FormSection, FormInputField, createForm } = Form;

class Address extends React.Component {
	render() {
		return (
			<div>
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
						maxLength: '{i18n.streetValidationError2}',
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
						minLength: '{i18n.numberValidationError2}',
					}}
				/>
				<FormInputField name="zipCode" label="{i18n.zipCode}:" type="text" />
			</div>
		);
	}
}

class BasicInfo extends React.Component {
	render() {
		return (
			<div>
				<FormInputField name="name" label="{i18n.name}:" type="text" />
				<FormInputField name="mobile" label="{i18n.mobile}:" type="text" />
				<FormSection name="address">
					<Address />
				</FormSection>
			</div>
		);
	}
}

class FieldsetForm extends React.Component {
	submit = (values, zenForm) => {
		Notify.success(JSON.stringify(values));
	};

	setError = () => {
		const { zentForm } = this.props;
		zentForm.setFieldExternalErrors({
			orderNo: '{i18n.orderNoError}',
			buyer: {
				mobile: ['{i18n.mobileError}', 'test'],
			},
			recipient: {
				address: {
					zipCode: '{i18n.zipCodeError}',
				},
				mobile: '{i18n.mobileError2}',
			},
		});
	};

	initialize = () => {
		const { zentForm } = this.props;
		zentForm.initialize({
			orderNo: 'E1111111',
			buyer: {
				mobile: 13423532345,
				name: 'Allen',
				address: {
					number: 14234,
					zipCode: 2222,
				},
			},
			recipient: {
				mobile: 13245343533,
				name: 'Selina',
				address: {
					number: 14234,
					zipCode: 2222,
				},
			},
		});
	};

	setFieldsValue = () => {
		const { zentForm } = this.props;
		zentForm.setFieldsValue({
			orderNo: 'E143423',
			buyer: {
				name: 'Sherldon',
				address: {
					number: 1111111,
					zipCode: 11111,
				},
			},
			recipient: {
				name: 'Leonard',
				address: {
					number: 11111,
					zipCode: 1111,
				},
			},
		});
	};

	reset = () => {
		const { zentForm } = this.props;
		zentForm.resetFieldsValue();
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<FormInputField name="orderNo" label="{i18n.orderNo}:" type="text" />
				<FormSection name="buyer">
					<div className="sec-label">{i18n.buyerInfo}</div>
					<BasicInfo />
				</FormSection>
				<FormSection name="recipient">
					<div className="sec-label">{i18n.recipientInfo}</div>
					<BasicInfo />
				</FormSection>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">
						{i18n.submit}
					</Button>
					<Button type="primary" onClick={this.setError}>
						{i18n.setError}
					</Button>
					<Button type="primary" onClick={this.initialize}>
						{i18n.initialize}
					</Button>
					<Button type="primary" onClick={this.setFieldsValue}>
						{i18n.setValue}
					</Button>
					<Button type="primary" onClick={this.reset}>
						{i18n.reset}
					</Button>
				</div>
			</Form>
		);
	}
}
const WrappedForm = createForm()(FieldsetForm);

ReactDOM.render(<WrappedForm />, mountNode);
```

<style>
.sec-label {
	color: #666;
	border-bottom: 1px solid #e5e5e5;
	margin-bottom: 20px;
	padding-bottom: 5px;
}
</style>
