---
order: 3
zh-CN:
	title: 使用 getControlGroup 封装自定义表单元素组件
	imgText: 资料
	submit: 获取表单值
	reset: 重置表单值
	tip: 建议尺寸：640 x 640 像素；
en-US:
	title: Package custom field component using getControlGroup
	imgText: materials
	submit: submit
	reset: reset
	tip: Recommended size：640 x 640 pixels
---

```jsx
import { Form, NumberInput, ColorPicker, DateRangePicker, Switch, Upload, Notify } from 'zent';
import omit from 'lodash/omit';

const { Field, createForm, getControlGroup, unknownProps } = Form;

class UploadWrap extends React.Component {
	wrappedOnChange = (imgs) => {
		this.props.onChange(imgs);
	};

	render() {
		const passableProps = omit(this.props, unknownProps);
		const { value } = this.props;

		return (
			<div>
				<Upload {...passableProps} onUpload={this.wrappedOnChange} localOnly />
				{
					value && value.map((item, index) => {
						return (
							<img 
								width="80" 
								height="80" 
								key={index} 
								src={item.src} 
								style={{marginLeft: '10px'}} 
							/>
						);
					})
				}
			</div>
		);
	}
}

const UploadField = getControlGroup(UploadWrap);

class FieldForm extends React.Component {
	updateLocalImage = (data) => {
		return new Promise(resolve => {
			resolve(data);
		})
	};

	submit = (values, zentForm) => {
		Notify.success(JSON.stringify(values));
	};

	resetForm = () => {
		this.props.zentForm.resetFieldsValue();
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form horizontal onSubmit={handleSubmit(this.submit)}>
				<Field
					name="imgs"
					label="{i18n.imgText}:"
					component={UploadField}
					value={[]}
					maxSize={8 * 1000 * 1000}
					triggerInline
					tips="{i18n.tip}"
					onUpload={this.updateLocalImage}
				/>
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
