---
order: 7
zh-CN:
	title: 异步校验
	asyncValidationError: 用户名已被占用
	name: 用户名：
	validationError: 值不能为空
en-US:
	title: Asynchronous validation
	asyncValidationError: This name is occupied.
	name: name：
	validationError: The value should be non-empty.
---

```jsx
import { Form } from 'zent';
const { Field, FormInputField, createForm } = Form;

class AsyncForm extends React.Component {
	asyncValidation = (values, value) => {
		return new Promise((resolve, reject) => setTimeout(() => {
			if (value === 'pangxie') {
				reject('{i18n.asyncValidationError}');
			} else {
				resolve();
			}
		}, 1000));
	};

	render() {
		return (
			<Form horizontal>
				<FormInputField
					name="name"
					type="text"
					label="{i18n.name}"
					value=""
					validations={{ required: true }}
					validationErrors={{ required: '{i18n.validationError}' }}
					asyncValidation={this.asyncValidation}
				/>
			</Form>
		);
	}
}

const WrappedForm = createForm()(AsyncForm);

ReactDOM.render(
	<WrappedForm />
	, mountNode
)
```
