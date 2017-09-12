## Form 表单组件

1. [基础用法](#ji-chu-yong-fa)
2. [表单校验](#biao-dan-xiao-yan)
3. [格式化 value](#ge-shi-hua-value-zhi)
4. [表单操作](#biao-dan-cao-zuo)
5. [其他](#qi-ta)
6. [组件原理](#zu-jian-yuan-li)
7. [使用指南](#shi-yong-zhi-nan)
8. [API](#api)


### 基础用法

#### 表单 `Form`

- `Form` 组件提供三种样式：`inline`，`horizontal`， `vertical`。
- 使用 `Form` 组件，必须先调用 `createForm` 方法包装，为表单注入 `zentForm` 属性，从而提供表单和表单元素的各种操作方法，详见 demo 和 [`zentForm` API](#zentform) 。


#### 表单域 `Field`

`Field` 组件本质上是一个辅助性的组件，不提供任何样式，只负责管理表单元素 value 值的生命周期和表单元素的 error 等信息。

- `Field` 必须要有 `name` 属性；
- `Field` 的展现形式由 `component` 属性传入的组件决定，`Form` 组件中内置了常用的表单元素组件 `InputField`，`SelectField`，`RadioGroupField`，`CheckboxField`，`CheckboxGroupField`，也可以使用单独封装的自定义表单元素组件；
- `Form` 组件提供了 `getControlGroup` 方法，可以快速封装自定义表单元素组件，使用方法参考 demo 和 [`getControlGroup` API](#form-getcontrolgroup) 。


:::DEMO 基本用法
```jsx
import { Form, Icon, Pop } from 'zent';
const { Field, InputField, createForm } = Form;

const FieldForm = () => {
	return (
		<Form horizontal>
			<Field
				name="name"
				type="text"
				label={
					<span>用户名&nbsp;
						<Pop trigger="hover" content="用户名用于个人账号登录" centerArrow>
							<Icon type="error-circle-o" />
						</Pop>：
					</span>
				}
				component={InputField}
				helpDesc="用户名为5-25个字符"
				required
			/>
			<Field
				name="password"
				type="password"
				label="密码："
				component={InputField}
				helpDesc={<span>密码由6-20位英文字母、数字组成，<a href="https://youzan.com" target="_blank">查看更多</a></span>}
				required
			/>
		</Form>
	);
};
const WrappedForm = createForm()(FieldForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::

:::DEMO 使用内置表单元素组件
```jsx
import { Form, Radio, Checkbox } from 'zent';
const { Field, InputField, SelectField, RadioGroupField, CheckboxField, CheckboxGroupField, createForm } = Form;

class FieldForm extends React.Component {
	state = {
		checkedList: []
	}

	onCheckboxChange = (checkedList) => {
		this.setState({ checkedList });
	}

	submit = (values, zentForm) => {
		alert(JSON.stringify(values));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)} >
				<Field
					name="name"
					type="text"
					label="昵称："
					component={InputField}
					required
					spellCheck={false}
					validations={{ required: true }} 
					validationErrors={{ required: '请填写昵称' }} 
				/>
				<Field
					name="type"
					type="text"
					label="类型："
					component={SelectField}
					data = {[
						{ value: 1, text: '普通用户' },
						{ value: 2, text: '高级用户' }
					]}
					required
					validations={{ required: true }} 
					validationErrors={{ required: '请选择类型' }} 
				/>
				<Field
					name="sex"
					type="text"
					label="性别："
					component={RadioGroupField}
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
					<Radio Value="2">女</Radio>
				</Field>
				<Field
					name="tag"
					type="text"
					label="兴趣标签："
					value={this.state.checkedList}
					onChange={this.onCheckboxChange}
					component={CheckboxGroupField}
					required
					validations={{ 
						minLength: 1
					}} 
					validationErrors={{ 
						minLength: '请选择标签'
					}}
				>
					<Checkbox value="movie">电影</Checkbox>
					<Checkbox value="book">书籍</Checkbox>
					<Checkbox value="beauty">美妆</Checkbox>
					<Checkbox value="travel">旅行</Checkbox>
				</Field>
				<Field
					name="password"
					type="text"
					label="信息是否公开："
					component={CheckboxField}
				>
					是
				</Field>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">获取表单值</Button>
					<Button type="primary" outline onClick={this.resetForm}>重置表单值</Button>
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
:::

#### 使用 `getControlGroup` 封装自定义表单域

:::DEMO 使用 `getControlGroup` 封装自定义表单元素组件
```jsx
import { Form, NumberInput, ColorPicker, DateRangePicker, Switch, Upload } from 'zent';
const { Field, createForm, getControlGroup, unknownProps } = Form;
import omit from 'lodash/omit';

const NumberInputWrap = (props) => {
	const passableProps = omit(props, unknownProps);
	return <NumberInput {...passableProps} />;
};
const NumberInputField = getControlGroup(NumberInputWrap);

const ColorPickerWrap = (props) => {
	const passableProps = omit(props, unknownProps);
	return <ColorPicker {...passableProps} color={props.value} />;
};
const ColorPickerField = getControlGroup(ColorPickerWrap);

const DateRangePickerWrap = (props) => {
	const passableProps = omit(props, unknownProps);
	return <DateRangePicker {...passableProps} />;
};
const DateRangePickerField = getControlGroup(DateRangePickerWrap);

const SwitchWrap = (props) => {
	const passableProps = omit(props, unknownProps);
	return <Switch {...passableProps} size="small" checked={props.value} />;
};
const SwitchField = getControlGroup(SwitchWrap);

const UploadWrap = (props) => {
	const passableProps = omit(props, unknownProps);
	const wrappedOnChange = (imgs) => {
		props.onChange(imgs);
	};
	return (<div>
		<Upload {...passableProps} onUpload={wrappedOnChange} localOnly />
		{
			props.value && props.value.map((item, index) => {
				return <img width="80" height="80" key={index} src={item.src} style={{marginLeft: '10px'}} />
			})
		}
	</div>);
};
const UploadField = getControlGroup(UploadWrap);

class FieldForm extends React.Component {

	updateLocalImage(data) {
		return new Promise(resolve => {
			resolve(data);
		})
	}

	submit = (values, zentForm) => {
		alert(JSON.stringify(values));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<Field
					name="age"
					label="年龄："
					component={NumberInputField}
					showStepper
					value={12}
				/>
				<Field
					name="color"
					label="颜色："
					component={ColorPickerField}
					value="#5197FF"
				/>
				<Field
					name="dateRange"
					label="时间范围："
					component={DateRangePickerField}
					type="split"
					value={[]}
				/>
				<Field
					name="open"
					label="是否开启："
					component={SwitchField}
					value={false}
				/>
				<Field
					name="imgs"
					label="其他资料："
					component={UploadField}
					value={[]}
					maxSize={8 * 1000 * 1000}
					triggerInline
					tips="建议尺寸：640 x 640 像素；您可以拖拽图片调整图片顺序。"
					onUpload={this.updateLocalImage.bind(this)}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">获取表单值</Button>
					<Button type="primary" outline onClick={this.resetForm}>重置表单值</Button>
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
:::

#### 多个表单元素的封装

当一个 `Field` 里需要封装多个表单元素时，一般会将多个表单元素的 value 值封装在一个对象里传入到 `Field` 中。当无法使用 `getControlGroup` 满足封装要求时，可以自己封装组件，通过调用 `Field` 组件传入的 `onChange` 事件更改 `Field` 的 value。

⚠️注意：调用 `Field` 传入的 `onChange` 事件默认会覆盖原值，可以通过传入 `{ merge: true}` 参数可以部分覆盖 value 值。

:::DEMO 封装多个表单元素
```jsx
import cx from 'classnames';
import { Form, Select, Input } from 'zent';
const { Field, createForm } = Form;
const { SelectTrigger } = Select;
const countyCodeList = [
	{ code: '+86', zh: 'zhongguo', eng: 'china', value: '中国 +86', index: 0 },
	{ code: '+853', zh: 'aomen', eng: 'Macau', value: '中国澳门 +853', index: 1 }
];

const ContactPhone = (props) => {
	const value = props.value;
	const showError = props.isTouched && props.error;
	const helpDesc = props.helpDesc;
	const mobileClassName = cx({
		'zent-form__control-group': true,
		'has-error': showError
	});

	const onSelectChange = (e, selectedItem) => {
		const newValue = {
			areacode: selectedItem.index
		};
		// 覆盖部分value
		props.onChange(newValue, { merge: true });
	};

	const onPhoneChange = (e) => {
		const newValue = Object.assign({}, value,{
			mobile: e.target.value
		});
		props.onChange(newValue);
	};

	const filterHandler = (item, keyword) => {
		return keyword && item.text.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
	};

	return (
		<div className={mobileClassName}>
			<label className="zent-form__control-label">联系方式：</label>
			<div className="zent-form__controls">
				<Select className="areacode"
					value={value.areacode}
					data={props.areadata}
					filter={filterHandler}
					optionValue="index"
					optionText="value"
					trigger={SelectTrigger}
					onChange={onSelectChange}
				/>
				<div className="zent-input-wrapper phone-num" style={{ display: 'inline-block' }}>
					<input className="zent-input" type="text" placeholder="请填写手机号" value={value.mobile} onChange={onPhoneChange} />
				</div>
				{showError && <p className="zent-form__error-desc">{props.error}</p>}
				{helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
			</div>
		</div>
	);
};

const CustomFieldForm = (props) => {
	const getFormValues = () => {
		const { zentForm } = props;
		alert(JSON.stringify(zentForm.getFormValues()));
	};

	const resetForm = () => {
		props.zentForm.resetFieldsValue();
	}

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
					helpDesc='目前仅支持中国内陆地区和澳门地区电话号码'
					validations={{
						validMobile(values, value) {
							let mobile = +value.mobile;
							let mobileReg = /^\d{1,10}$/;
							return mobileReg.test(mobile);
						}
					}}
					validationErrors={{ validMobile: '请输入正确的手机号' }}
				/>
				<div className="zent-form__form-actions">
					<Button type="primary" onClick={getFormValues}>获取表单值</Button>
					<Button type="primary" outline onClick={resetForm}>重置表单值</Button>
				</div>
			</Form>
		);
};
const WrappedForm = createForm()(CustomFieldForm);

ReactDOM.render(
	<WrappedForm />, mountNode
);
```
:::

### 表单校验

#### 表单校验的使用

- `Field` 组件支持传入 `validations` 和 `validationErrors` 来指定校验规则和校验提示；
- `validations` 对象支持预置的内部校验规则（详见[内置 validation rules](#nei-zhi-validation-rules) ）, 也支持传入自定义的校验函数，校验函数返回 `true` 时表示验证通过；
- 可以通过 `Form.createForm` 扩展内部校验规则，详见 [`Form.createForm` API](#form-createform) 。

:::DEMO 常用表单校验
```jsx
import { Form, Radio, Checkbox } from 'zent';
const { Field, InputField, CheckboxGroupField, createForm } = Form;

class FieldForm extends React.Component {
	state = {
		checkedList: []
	}

	onCheckboxChange = (checkedList) => {
		this.setState({ checkedList });
	}

	submit = (values, zentForm) => {
		alert(JSON.stringify(values));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } =this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<Field
					name="name"
					type="text"
					label="昵称："
					component={InputField}
					required
					helpDesc="正则校验"
					validations={{
						required: true, 
						matchRegex: /^[a-zA-Z]+$/
					}} 
					validationErrors={{
						required: '请填写昵称',
						matchRegex: '昵称只能是字母'
					}} 
				/>
				<Field
					name="password"
					type="text"
					label="密码："
					component={InputField}
					required
					helpDesc="非空校验"
					validations={{
						required: true
					}} 
					validationErrors={{
						required: '请填写密码'
					}} 
				/>
				<Field
					name="confirmPw"
					type="text"
					label="确认密码："
					component={InputField}
					required
					helpDesc="与其他表单域对比校验"
					validations={{
						equalsField: 'password'
					}} 
					validationErrors={{
						equalsField: '两次填写的密码不一致'
					}} 
				/>
				<Field
					name="email"
					type="text"
					label="邮件："
					component={InputField}
					helpDesc="邮件校验"
					validations={{
						isEmail: true
					}} 
					validationErrors={{
						isEmail: '请填写正确的邮件'
					}} 
				/>
				<Field
					name="url"
					type="text"
					label="个人网站链接："
					component={InputField}
					helpDesc="超链接校验"
					validations={{
						isUrl: true
					}} 
					validationErrors={{
						isUrl: '请填写正确的网址'
					}}
				/>
				<Field
					name="certificate"
					type="text"
					label="证件号码："
					component={InputField}
					required
					helpDesc="自定义校验函数"
					validations={{
						matchRegex: /^\d+$/,
						format(values, value) {
							return value.length === 15 || value.length === 10
						}
					}} 
					validationErrors={{
						matchRegex: '证件号码必须是数字',
						format: '证件号码是10位或者15位数字'
					}} 
				/>
				<Field
					name="tag"
					type="text"
					label="兴趣标签："
					value={this.state.checkedList}
					onChange={this.onCheckboxChange}
					component={CheckboxGroupField}
					required
					helpDesc="长度校验"
					validations={{ 
						minLength: 2
					}} 
					validationErrors={{ 
						minLength: '请至少选择两个'
					}}
				>
					<Checkbox value="movie">电影</Checkbox>
					<Checkbox value="book">书籍</Checkbox>
					<Checkbox value="beauty">美妆</Checkbox>
					<Checkbox value="travel">旅行</Checkbox>
				</Field>
				<div className="zent-form__form-actions">
					<Button type="primary" htmlType="submit">获取表单值</Button>
					<Button type="primary" outline onClick={this.resetForm}>重置表单值</Button>
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
:::

#### 表单校验时机

表单的默认校验时机是 value 值改变的时候。可以修改 `validateOnChange`，`validateOnBlur` 来改变校验时机，如在 blur 时再校验（一般用于Input输入框）。

:::DEMO 不同校验时机
```jsx
import { Form } from 'zent';
const { Field, InputField, createForm } = Form;

const FormattedForm = (props) => {
	const { handleSubmit } = props;
	const submit = (values) => {
		console.log(values);
	}
	return (
		<Form horizontal onSubmit={handleSubmit(submit)}>
			<Field
				name="field1"
				type="text"
				component={InputField}
				label="Change时校验:"
				validations={{ 
					required: true,
					matchRegex: /^[a-zA-Z]+$/
				}}
				validationErrors={{
					required: '值不能为空',
					matchRegex: '只能为字母'
				}}
			/>
			<Field
				name="field2"
				type="text"
				component={InputField}
				label="Blur时校验:"
				validateOnChange={false}
				validations={{ 
					required: true,
					matchRegex: /^[a-zA-Z]+$/
				}}
				validationErrors={{
					required: '值不能为空',
					matchRegex: '只能为字母'
				}}
			/>
			<Field
				name="field3"
				type="text"
				component={InputField}
				label="submit时校验:"
				validateOnChange={false}
				validateOnBlur={false}
				validations={{
					required: true,
					matchRegex: /^[a-zA-Z]+$/
				}}
				validationErrors={{
					required: '值不能为空',
					matchRegex: '只能为字母'
				}}
			/>
			<div className="zent-form__form-actions">
				<Button type="primary" htmlType="submit">获取表单值</Button>
			</div>
		</Form>
	);
};
const WrappedForm = createForm()(FormattedForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::

#### 异步校验
异步校验在 blur 时触发，如果需要在自定义组件中手动触发异步校验，需要自己调用`props.onBlur(event)`。 `value` 值可以直接传给 `event` ，或者作为 `event` 的属性传入。

:::DEMO 异步校验
```jsx
import { Form } from 'zent';
const { Field, InputField, createForm } = Form;

const AsyncForm = (props) => {
	const asyncValidation = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie') {
				reject('用户名已被占用');
			} else {
				resolve();
			}
		}, 1000));
	}
	return (
		<Form horizontal>
			<Field
				name="name"
				type="text"
				label="用户名："
				value=""
				validations={{ required: true }}
				validationErrors={{ required: '不能为空' }}
				component={InputField}
				asyncValidation={asyncValidation}
			/>
		</Form>
	);
};
const WrappedForm = createForm()(AsyncForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::

### 格式化 `value`

`Form` 组件提供了 `format` 和 `nomalize` 方法 来对 `value` 进行格式化，它们的执行时机详见 [value 的生命周期](#field-zhong-value-de-sheng-ming-zhou-qi)。

:::DEMO 格式化 value 值
```jsx
import { Form } from 'zent';
const { Field, InputField, createForm } = Form;

const FormattedForm = () => {
	const lower = (value) => {
		return value && value.toLowerCase();
	}
	const upper = (value) => {
		return value && value.toUpperCase();
	}
	return (
		<Form horizontal>
			<Field
				name="field1"
				type="text"
				component={InputField}
				label="To Lower:"
				value="AAA"
				normalize={lower}
				format={lower}
			/>
			<Field
				name="field2"
				type="text"
				component={InputField}
				label="To Upper:"
				value="bbb"
				normalize={upper}
				format={upper}
			/>
		</Form>
	);
};
const WrappedForm = createForm()(FormattedForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::

### 表单操作

- `Form.createForm` 为组件注入 `zentForm` 属性，提供了表单和表单元素的各种操作方法，如获取表单元素值，重置获取表单元素值等，详见[`zenForm` API](#zentForm)
- `Form` 组件内部对表单提交的过程也进行了封装，可以把异步提交过程封装在一个函数里并 **返回promise 对象**，组件内部会根据 promise 对象的执行结果分别调用 `onSubmitSuccess` 和 `onSubmitFail` 方法，同时更新内部维护的 `isSubmitting` 属性（可以通过 `zentForm.isSubmitting()` 得到）。


:::DEMO 提交表单及结果处理
```jsx
import { Form, Button } from 'zent';
const { Field, InputField, createForm, SubmissionError } = Form;

const onSubmitFail = (error) => {
	alert(error);
}

const onSubmitSuccess = (result) => {
	alert(result);
}

const SubmitForm = (props) => {
	const { handleSubmit, zentForm } = props;
	const isSubmitting = zentForm.isSubmitting();

	const submit = (values, zentForm) => {
		let promise = new Promise((resolve) => setTimeout(resolve, 1000));
		return promise.then(() => {
			const random = Math.random() * 10;
			if (random > 4) {
				zentForm.setFieldExternalErrors({
					user: '用户名已被占用'
				});
				// 可以使用throw SubmissionError 在 onSubmitFail 中处理，也可以在这里直接 alert 错误信息
				throw new SubmissionError('用户名已被占用');
			} else {
				// 可以将返回值传入到 onSubmitSuccess ，也可以直接在这里处理掉
				return '注册成功';
			}
		});
	};

	const resetForm = () => {
		zentForm.resetFieldsValue();
	}
	return (
		<Form onSubmit={handleSubmit(submit)} horizontal>
			<Field
				name="user"
				type="text"
				component={InputField}
				label="用户名："
				value="111"
				validations={{ required: true }}
				validationErrors={{ required: '用户名不能为空' }}
			/>
			<Field
				name="password"
				type="password"
				component={InputField}
				label="密码："
				value="222"
				validations={{ required: true }}
				validationErrors={{ required: '密码不能为空' }}
			/>
			<Field
				name="confirmPassword"
				type="password"
				component={InputField}
				label="确认密码："
				value="222"
				validations={{
					required: true,
					isPasswordEqual(values, value) {
						if (values.password !== value) {
							return '两次密码输入不一致';
						}
						return true;
					}
				}}
				validationErrors={{
					required: '确认密码不能为空'
				}}
			/>
			<div className="zent-form__form-actions">
				<Button type="primary" htmlType="submit" loading={isSubmitting}>注册</Button>
				<Button type="primary" outline onClick={resetForm}>重置</Button>
			</div>
		</Form>
	);
};
const WrappedForm = createForm()(SubmitForm);

ReactDOM.render(
	<WrappedForm onSubmitFail={onSubmitFail} onSubmitSuccess={onSubmitSuccess} />
	, mountNode
)
```
:::

### 其他

#### `Fieldset` 组件

:::DEMO Fieldset
```jsx
import { Form } from 'zent';
const { Field, Fieldset, InputField, createForm } = Form;

const FieldsetForm = (props) => {
	const { handleSubmit } = props;
	const submit = (values, zentForm) => {
    alert(JSON.stringify(values));
  };

	return (
		<Form horizontal onSubmit={handleSubmit(submit)}>
			<Fieldset legend="Fieldset1">
				<Field
					name="name"
					type="text"
					label="用户名："
					value=""
					component={InputField}
				/>
			</Fieldset>
			<Fieldset legend="Fieldset2">
				<Field
					name="name2"
					type="text"
					label="用户名2："
					value=""
					component={InputField}
				/>
			</Fieldset>
			<div className="zent-form__form-actions">
				<Button type="primary" htmlType="submit">获取表单值</Button>
			</div>
		</Form>
	);
};
const WrappedForm = createForm()(FieldsetForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::

#### `Form` 布局

:::DEMO 三种 Form 布局
```jsx
import { Form, Radio } from 'zent';
const { Field, InputField, createForm } = Form;

const RadioGroup = Radio.Group;

class FieldForm extends React.Component {
	state = {
		formLayout: 'vertical'
	}

	onRadioChange = (e) => {
		this.setState({
			formLayout: e.target.value
		})
	}

	submit = (values, zentForm) => {
		alert(JSON.stringify(values));
	};

	render() {
		const { formLayout } = this.state;
		const { handleSubmit } = this.props;
		return (
			<div>
				<RadioGroup value={formLayout} onChange={this.onRadioChange}  className="form-layout">
					<Radio value="vertical">vertical</Radio>
					<Radio value="horizontal">horizontal</Radio>
					<Radio value="inline">inline</Radio>
				</RadioGroup>
				<Form inline={formLayout === 'inline'} horizontal={formLayout === 'horizontal'} onSubmit={handleSubmit(this.submit)}>
					<Field
						name="name"
						type="text"
						label="用户名："
						value=""
						component={InputField}
					/>
					<Field
						name="name2"
						type="text"
						label="用户名2："
						value=""
						component={InputField}
					/>
					<div className="zent-form__form-actions">
						<Button type="primary" htmlType="submit">获取表单值</Button>
					</div>
				</Form>
			</div>
		);
	}
};
const WrappedForm = createForm()(FieldForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
:::


### 组件原理

本组件核心由以下几部分组成：

- `createForm` 函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（`Field` 组件）实例。通过向子组件的 `props` 中注入 `zentForm` 属性来提供表单和表单元素的各种操作方法。
- `Form` 组件：作为整个表单的最顶层骨架，是对 `<form>` 标签的简单封装，定义了默认的 class 来提供基础样式。
- `Field` 组件：用来封装各种表单元素组件（如 `Input` 、 `Checkbox` 、`Select` 以及各种自定义组件）的一个高阶组件。其中维护了表单元素 value 值和校验错误等信息。Field 组件会向表单元素组件传入封装过的 `onChange` 、`onBlur` 回调和 `value` 、`error` 等表单元素需要的 props 。

具体的使用，详见 [API 说明](#api)。

### 使用指南

#### 封装自定义的表单元素组件
- `Field` 的展示完全由传入到 `component` 属性中的组件所控制。这个组件能够接收到所有从 `Field` 传入的 props （包括 `Field` 中构造的一些隐含的 props ，具体[`Form.Field` API](#form-field) ）。

- 对于一些常用的 `zent` 表单组件， `Form` 组件已经使用了 `getControlGroup` 函数进行了封装。如果产品设计上有一些特殊的需求，或者需要封装自定义的组件，也可以直接使用或者参考 `getControlGroup`的方式来对组件进行封装， 参考[demo 封装多个表单元素](#bao-han-duo-ge-biao-dan-yuan-su-de-biao-dan-yu-feng-zhuang)。

- **如果需要在一个 `Field` 中展示多个表单元素，可以将所有的表单元素封装在一个对象中传入 Field 的value 中。具体可以参考[demo 封装多个表单元素](#bao-han-duo-ge-biao-dan-yuan-su-de-biao-dan-yu-feng-zhuang)。**

#### `Field` 中 `value` 的生命周期
- 表单元素的初始值需要通过在 `Field` 中指定 `value` 值传入，如果 `value` 值的生命周期如下图所示：

```text
Field 中传入 value ---> 使用 format() 格式化 value ---> format 过的 value 传入 component 中渲染组件
															 ↑                                 |
															 |                                 ↓
															 |                          用户操作改变 value
															 |                                 |
															 |                                 ↓
		normalize 过的 value 写入 form 中维护, 用于数据提交 <--- 使用 normalize() 格式化 value
```

- 如果传入 `Field` 的 `value` 值是一个动态值，在外部改变 value 后会重新开始 value 的生命周期。

### API

#### **`Form`**

对 html 中 form 元素的一个简单封装, 提供默认的 className.

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | `''` | 否 |
| prefix | 自定义前缀 | string | `'zent'` | 否 |
| vertical | 垂直排列布局 | boolean  | `true` | 否 |
| horizontal | 水平排列布局 | boolean  | `false` | 否 |
| inline | 行内排列布局 | boolean | `false` | 否 |
| onSubmit | 表单提交回调 | func(e:Event) | `noop` | 否 |
| style | 内联样式 | object | null | 否 |

#### **`Form.createForm`**

##### **使用方式：`Form.createForm(options)(FormComponent)`**

##### **`options`**

`options` 支持的配置项如下:

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| formValidations | 用于添加自定义校验方法, 通过这种方式添加的方法在 validations 中使用时可以传额外的参数 | object | 否 |

⚠️注意：项目中的通用校验方法，可以通过在一个文件中定义公共的`formValidations`对象后引入。

##### **`createForm` 返回组件中可接收的 props**

`createForm` 方法构建了一个高阶组件，该组件可以定义了一些额外的 props 。

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| onChange | 任意表单元素修改后触发的回调，参数为所有表单元素值的对象 | func(values: Object) | 否 |
| onSubmitSuccess | 提交成功后的回调，参数是 submit 函数中 promise 的返回值 | func(submitResult: any) | 否 |
| onSubmitFail | 提交失败后的回调，参数要么是 SubmissionError 的一个实例，要么是 undefined | func(submitError: SubmissionError) | 否 |

⚠️注意：想要获取被 createForm 包裹的 FormComponent 的实例，可以在 createForm 创建的组件上添加 ref 然后调用`getWrappedForm`方法获取到。

##### **`zentForm`**

经过 `Form.createForm` 包装的组件通过 props 被添加了 `zenForm` 属性, 可以通过 `this.props.zentForm` 访问, `zentForm` 提供的 API 如下：

| 参数 | 说明 | 类型 |
|------|------|------|
| getFormValues | 获取与 form 绑定的所有表单元素值 | func |
| getFieldError | 获取某个 Field 的错误信息, 没有报错信息返回空 | func(name: String) |
| setFormPristine | 设置所有 Field 的状态为非原始状态, 用于在提交表单时让 Field 把没有显示出来的错误显示出来 | func(isPristine: Boolean) |
| setFieldExternalErrors | 设置外部传入的错误信息（比如服务端校验错误）， errors 的 key 为 Field 的 name ， value 为错误文案 | func(errors: Object) |
| resetFieldsValue | 把所有 Field 的值恢复到指定值或初始状态 | func(data: Object) |
| isValid | 表单的所有 Field 是否都通过了校验 | func |
| isSubmitting | 表单是否正在提交 | func |
| isValidating | 表单是否有 Field 在异步校验 | func |
| isFieldTouched | Field 是否变更过值 | func(name: String) |
| isFieldValidating | Field 是否在异步校验 | func(name: String) |

##### **`handleSubmit`**

`createForm` 还会为被包装的组件提供一个封装过的 `handleSubmit` 方法，具体使用可以参考[demo 表单提交](#biao-dan-ti-jiao)。

⚠️注意：如果希望在 `onSubmitFail` 回调中正确接收到 `error` 对象，需要在 `submit` 函数中抛出一个 `SubmissionError` 类型的对象

```jsx
const { SubmissionError } = Form;

submit() {
	// do submit
	...
	throw new SubmissionError('error message');
}

onSubmissionFail(submissionError) {
	if (submissionError && submissionError.errors === 'error message') {
		// do something
	}
}
```

#### **`Form.Field`**

所有需要维护 `value` 的表单元素组件都需要通过 `Field` 组件包装一下。
在 `Field` 组件上可以传入以下 props ，`component` 以外的其他 props （包括自定义的 props ），都会传入到 `component` 中所定义的表单元素组件中：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| name | 表单元素名 | string | 是 |
| component | 真正的表单元素组件，负责表单元素如何展示。可以是字符串(标准 html 元素名), 或者 React 组件 | string / React.Component | 是 |
| value | 表单元素初始值 | any | 是 |
| normalize | onChange 或者 onBlur 后格式化表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| format | 渲染前格式化表单元素值, 不影响真正存储的表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| onChange | value 值修改后的回调，会在 Field 中封装一层。(自定义组件需要自己调用由 Field 组件封装后传入的 `props.onChange()` 后才会执行) | func(event, newValue, previousValue, preventSetValue) | 否 |
| onBlur | blur 后的回调（会在 Field 中封装一层） | func(event, newValue, previousValue, preventSetValue) | 否 |
| onFocus| focus 后的回调（会在 Field 中封装一层） | func(event) | 否 |
| validations | 定义表单元素校验方法 | object | 否 |
| validationErrors | 定义表单元素检验方法对应的出错信息 | object | 否 |
| validateOnChange | 是否在触发change事件时执行表单校验 | boolean | 否 |
| validateOnBlur | 是否在触发blur事件时执行表单校验 | boolean | 否 |
| clearErrorOnFocus | 是否在触发focus事件时清空错误信息 | boolean | 否 |
| asyncValidation | 异步校验 func, 需要返回 Promise | func(values, value) | 否 |

除了上述参数之外， `Field` 组件会隐含地向被包裹的表单元素组件中传入以下 props ：

| 参数 | 说明 | 类型 | 
|------|------|------|
| isTouched | 表单元素值被改变过 | boolean |
| isPristine | 表单元素值没有被改变过 | boolean | 
| isActive | 表单元素为input且获得了焦点 | boolean | 
| error | 第一个校验错误文本信息（没有报错时为 null ） | string / Null | 
| errors | 校验错误文本信息数组（没有错误时为空数组） | array |

##### **获取 `Field` 对应 `component` 的实例**

可以通过在 `Field` 上加上 `ref`，然后调用 `getWrappedComponent` 方法来获取。
```
<Field
	ref={ref => { this.field = ref }}
	component={XxxComponent}
	...
/>

const component = field.getWrappedComponent();
```

#### **`Form.getControlGroup`**
`getControlGroup` 是一个用来快速封装自定义组件的函数，它返回一个满足通用布局与样式要求（左侧标签 、右侧表单元素）的stateless functional component 。同时支持将 `Field` 中的 错误提示信息展示出来。 

封装过的组件支持在 `Field` 上额外传入以下参数：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| label | 表单元素的label | string / React.Component | 否 |
| className | 添加到control-group 上的额外类名，可以用来覆盖子元素的样式 | string | 否 |
| helpDesc | 表单元素的说明性文字 | string / React.Component | 否 |
| required | 为 true 时会在 label 前添加红色的"*" | boolean | 否 |

##### **获取 `Control` 组件实例**

参照上方获取 `Field` 对应 `component` 的实例，然后调用 `getControlInstance` 方法。
```jsx
const component = field.getWrappedComponent().getControlInstance();
```

#### **内置 validation rules**
可以直接在 `Field` 的 `validations` 属性中使用，使用方法参考[demo 常用表单校验](#biao-dan-xiao-yan-de-shi-yong)。内置规则如下：

| 规则名 | 说明 | 可传参数 |
|------|------|------|
| required | 是否必填 | 任意，传 true 是为了表意，传其他值也是当作必填，下同 |
| isExisty | 是否非 null ，非 undefined | 任意 |
| matchRegex | 是否匹配指定正则表达式 | Regex |
| isEmail | 是否邮件类型字符串 | 任意 |
| isUrl | 是否 url 类型 | 任意 |
| isTrue | 是否true | 任意 |
| isFalse | 是否false | 任意 |
| isNumeric | 是否数字类型 | 任意 |
| isInt | 是否整数 | 任意 |
| isFloat | 是否小数 | 任意 |
| isLenght | 字符串或数组是否为指定长度 | 长度值(Number) |
| equals | 是否与指定值相等 | 指定值 |
| equalsField | 是否与表单中的其他元素值相等 | 其他 Field 的name(String) |
| maxLength | 字符串或数组不能超过指定长度 | 长度值(Number) |
| minLength | 字符串或数组不能小于指定长度 | 长度值(Number) |

<style>
.zent-form__controls .zent-switch-small {
	margin-top: 5px;
}

.zent-form__controls .zent-select {
	font-size: 0;
}

.zent-form__controls .zent-select .zent-select-text{
	font-size: 12px;
}

.form-layout {
	margin-bottom: 30px;
}
</style>

