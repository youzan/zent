---
order: 4
zh-CN:
	title: 封装多个表单元素
	countyListText1: 中国 +86
	countyListText2: 中国澳门 +853
	comment1: 覆盖部分value
	contact: 联系方式
	phonePlaceholder: 请填写手机号
	contactPlaceholder: 目前仅支持中国内陆地区和澳门地区电话号码
	contactError: 请输入正确的手机号
	getFormValue: 获取表单值
	reset: 重置表单值
en-US:
	title: Package multiple form elements
	countyListText1: China +86
	countyListText2: China Macau +853
	comment1: rewrite part of value
	contact: Contact Phone
	phonePlaceholder: Enter your phone
	contactPlaceholder: Only phone numbers of China mainland and Macau are supported now.
	contactError: Please enter right phone numbers.
	getFormValue: get form values
	reset: reset 
---

```jsx
import cx from 'classnames';
import { Form, Select, Input, Notify } from 'zent';

const { Field, createForm } = Form;
const { SelectTrigger } = Select;
const countyCodeList = [
	{ code: '+86', zh: 'zhongguo', eng: 'china', value: '{i18n.countyListText1}', index: 0 },
	{ code: '+853', zh: 'aomen', eng: 'Macau', value: '{i18n.countyListText2}', index: 1 }
];

class ContactPhone extends React.Component {
	onSelectChange = (e, selectedItem) => {
		const newValue = {
			areacode: selectedItem.index
		};
		// {i18n.comment1}
		this.props.onChange(newValue, { merge: true });
	};

	onPhoneChange = (e) => {
		const value = this.props.value;
		const newValue = Object.assign({}, value,{
			mobile: e.target.value
		});
		this.props.onChange(newValue);
	};

	filterHandler = (item, keyword) => {
		return keyword && item.text.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
	};
	
	render() {
		const props = this.props;
		const { value, displayError } = props;
		const showError = displayError === undefined ?  props.isDirty && props.error !== null : displayError;
		const helpDesc = props.helpDesc;
		const mobileClassName = cx({
			'zent-form__control-group': true,
			'has-error': showError
		});

		return (
			<div className={mobileClassName}>
				<label className="zent-form__control-label">{i18n.contact}:</label>
				<div className="zent-form__controls">
					<Select className="areacode"
						value={value.areacode}
						data={props.areadata}
						filter={this.filterHandler}
						optionValue="index"
						optionText="value"
						trigger={SelectTrigger}
						onChange={this.onSelectChange}
					/>
					<div className="zent-input-wrapper phone-num" style={{ display: 'inline-block' }}>
						<input 
							className="zent-input" 
							type="text" 
							placeholder="{i18n.phonePlaceholder}" 
							value={value.mobile} 
							onChange={this.onPhoneChange} 
						/>
					</div>
					{showError && <p className="zent-form__error-desc">{props.error}</p>}
					{helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
				</div>
			</div>
		);
	};
}

class CustomFieldForm extends React.Component {
	getFormValues = () => {
		const { zentForm } = this.props;
		Notify.success(JSON.stringify(zentForm.getFormValues()));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	};

	render() {
		return (
			<Form horizontal>
				<Field
					name="contactPhone"
					value={{
						areacode: 1,
						mobile: 15899776666
					}}
					areadata={countyCodeList}
					component={ContactPhone}
					helpDesc='{i18n.contactPlaceholder}'
					validations={{
						validMobile(values, value) {
							let mobile = +value.mobile;
							let mobileReg = /^\d{1,10}$/;
							return mobileReg.test(mobile);
						}
					}}
					validationErrors={{ validMobile: '{i18n.contactError}' }}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" onClick={this.getFormValues}>{i18n.getFormValue}</Button>
					<Button type="primary" outline onClick={this.resetForm}>{i18n.reset}</Button>
				</div>
			</Form>
		);
	}
}

const WrappedForm = createForm()(CustomFieldForm);

ReactDOM.render(
	<WrappedForm />, mountNode
);
```
