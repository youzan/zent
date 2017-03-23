## Form 表单组件

### 组件原理
组件核心由以下几部分组成：

- createForm函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（Field组件）实例。通过向子组件的props中注入zentForm属性来提供表单和表单元素的各种操作方法。
- Form组件：作为整个表单的最顶层骨架，是对<form>标签的简单封装，定义了默认的class来提供基础样式。
- Field组件：用来封装各种表单元素组件（如Input、Checkbox、Select以及各种自定义组件）的一个高阶组件。其中维护了表单元素value值和校验错误等信息。Field组件会向表单元素组件传入封装过的onChange、onBlur回调和value、error等表单元素需要的props。

**注意：**

1. 使用Form组件构造的组件必须调用createForm函数进行封装，否则children中的Field组件无法生效，控制台中会抛错。
2. Field组件本质上是一个辅助性的组件，本身不提供任何样式。它的作用是管理表单元素value值的生命周期和表单元素的error等信息。表单元素具体如何展现，是由Field组件component属性中传入的值所对应的组件决定的。


### 使用指南

#### 封装自定义的表单元素组件
前面已经说过，Field的展示完全由传入到component属性中的组件所控制。这个组件能够接收到所有从Field传入的props（包括Field中构造的一些隐含的props，具体看下方Field API）。

对于一些常用的zent表单组件，Form已经使用getControlGroup对其进行了封装（具体参考下方API）。如果产品设计上有一些特殊的需求，或者需要封装自定义的组件，也可以直接使用或者参考getControlGroup的方式来对组件进行封装。

**如果需要在一个Field中展示多个表单元素，可以将所有的表单元素封装在一个对象中传入Field的value中。具体可以参考“封装自定义组件”那个示例。**

#### Field中 value 的生命周期
表单元素的初始值需要通过在Field中指定value值传入，如果value值的生命周期如下图所示：

```text
Field 中传入 value -> 使用 format() 格式化 value -> format 过的 value 传入 component 中渲染组件
                           ↑                                 |
                           |                                 ↓
                           |                          用户操作改变 value
                           |                                 |
                           |                                 ↓
    normalize 过的 value 写入 form 中维护, 用于数据提交 <- 使用 normalize() 格式化 value
```

如果传入Field的value值是一个动态值，在外部改变value后会重新开始value的生命周期。


### 代码演示
#### 封装自定义组件
一般推荐为Field的component属性传入封装过的组件

这里有两个例子：

- 1.简单封装了一个input输入框
- 2.在一个Field里封装了两个表单元素，这也是一个常见的需求，做法就是将两个表单元素的value值封装在一个对象里传入到Field中。
 
:::DEMO  具体参考例子中的renderEmail和ContactPhone两个组件
```js
import cx from 'classnames';
import { Form, Select, Input } from 'zent';
const { Field, createForm } = Form;
const { SelectTrigger } = Select;
const countyCodeList = [
  { code: '+86', zh: 'zhongguo', eng: 'china', value: '中国 +86', index: 0 },
  { code: '+853', zh: 'aomen', eng: 'Macau', value: '中国澳门 +853', index: 1 }
];

const renderEmail = (props) => {
  const showError = props.isTouched && props.error;
  const className = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  return (
    <div className={className}>
      <label className="zent-form__control-label">邮箱：</label>
      <div className="zent-form__controls">
        <Input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        {showError && <span className="zent-form__help-block">{props.error}</span>}
      </div>
    </div>
  );
};
const ContactPhone = (props) => {
  const value = props.value;
  const showError = props.isTouched && props.error;
  const mobileClassName = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  const onSelectChange = (e, selectedItem) => {
    const newValue = Object.assign({}, value, {
      areacode: selectedItem.index
    });
    props.onChange(newValue);
  };
  const onPhoneChange = (e) => {
    const newValue = Object.assign({}, value, {
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
        {showError && <p className="zent-form__help-block">{props.error}</p>}
      </div>
    </div>
  );
};

const CustomFieldForm = () => {
	return (
      <Form horizontal>
        <Field name="email" component={renderEmail} value="11@youzan.com" validations={{ isEmail: true }} validationErrors={{ isEmail: '请输入正确的格式' }} />
        <Field
          name="contactPhone"
          value={{
            areacode: 1,
            mobile: 15899776666
          }}
          areadata={countyCodeList}
          component={ContactPhone}
          validations={{
            validMobile(values, value) {
              let mobile = +value.mobile;
              let mobileReg = /^\d{1,10}$/;
              return mobileReg.test(mobile);
            }
          }}
          validationErrors={{ validMobile: '请输入正确的手机号' }}
        />
      </Form>
    );
};
const WrappedForm = createForm()(CustomFieldForm);

ReactDOM.render(
	<WrappedForm />, mountNode
);
```
:::

#### 使用已封装的其他zent表单元素组件
为了减少代码量，Form组件内置了对常用的表单元素组件（Input、Checkbox、CheckboxGroup、RadioGroup、Select）的封装。这些组件的封装使用了getControlGroup函数（具体查看下方API）。

:::DEMO  封装过的组件额外支持的props，请查看getControlGroup的API。表单元素组件需要的props具体请查看对应组件的文档。
```js
import { Form } from 'zent';
const { Field, InputField, createForm } = Form;

const FieldForm = () => {
	return (
		<Form horizontal>
			<Field
				name="name"
				type="text"
				label={"用户名："}
				value="123"
				component={InputField}
				helpDesc={<span>我是说明<a href="https://youzan.com">我是链接</a></span>}
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

#### 格式化value值
Form组件提供了format和nomalize来对value进行格式化，它们的执行时机可以参考上面`value的生命周期`。

:::DEMO
```js
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

#### 表单提交
form 组件内部对表单提交的过程进行封装，可以把异步提交的过程封装在一个func里并返回一个**promise对象**，组件内部会根据promise对象的执行结果分别调用 `onSubmitSuccess` 和 `onSubmitFail` 方法，同时更新内部维护的 `isSubmitting` 属性（可以通过zentForm.isSubmitting()得到）。

:::DEMO
```js
import { Form } from 'zent';
const { Field, InputField, createForm, SubmissionError } = Form;

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
    		// 可以throw SubmissionError在onSubmitFail中处理，也可以在这里直接alert错误信息
    		throw new SubmissionError('用户名已被占用');
  		} else {
				// 返回值可以传入到onSubmitSuccess，或者直接在这里处理掉
				return '注册成功';
  		}
    });
  };
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
	      <button class="zent-btn zent-btn-primary" type="submit">{isSubmitting ? '注册中...' : '注册'}</button>
	    </div>
	  </Form>
	);
};
const WrappedForm = createForm()(SubmitForm);
const onSubmitFail = (error) => {
	alert(error);
}
const onSubmitSuccess = (result) => {
	alert(result);
}

ReactDOM.render(
	<WrappedForm onSubmitFail={onSubmitFail} onSubmitSuccess={onSubmitSuccess} />
	, mountNode
)
```
:::
#### 异步校验
异步校验在blur时触发，如果需要在自定义组件中手动触发异步校验，需要自己调用props.onBlur(event)。value值可以直接传给event，或者作为event的属性传入。

:::DEMO
```js
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

#### Fieldset组件

:::DEMO
```js
import { Form } from 'zent';
const { Field, Fieldset, InputField, createForm } = Form;

const FieldsetForm = (props) => {
	return (
		<Form horizontal>
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

### API

#### **Form**

对 html 中 form 元素的一个简单封装, 提供默认的 className.

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | `''` | 否 |
| prefix | 自定义前缀 | string | `'zent'` | 否 |
| horizontal | 水平排列布局 | boolean  | `false` | 否 |
| inline | 行内排列布局 | boolean | `false` | 否 |
| onSubmit | 表单提交回调 | func(e:Event) | `noop` | 否 |
| style | 内联样式 | object | null | 否 |

#### **Form.createForm(options)(FormComponent)**

使用方式如下：

##### options
`options` 支持的配置项如下:

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| formValidations | 用于添加自定义校验方法, 通过这种方式添加的方法在 validations 中使用时可以传额外的参数 | object | 否 |

*PS：项目中的通用校验方法，可以通过在一个文件中定义公共的`formValidations`对象来引入。*

##### createForm返回的组件可接收的props
createForm方法构建了一个高阶组件，该组件可以定义了一些额外的props。

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| onChange | 任意表单元素修改后触发的回调，参数为所有表单元素值的对象 | func(values: Object) | 否 |
| onSubmitSuccess | 提交成功后的回调，参数是submit函数中promise的返回值 | func(submitResult: any) | 否 |
| onSubmitFail | 提交失败后的回调，参数要么是SubmissionError的一个实例，要么是undefined | func(submitError: SubmissionError) | 否 |

##### zentForm prop
经过 `ZentForm.createForm` 包装的组件通过 props 被添加了 zenForm 属性, 所以在被包装的组件中可以访问到 `this.props.zentForm` 属性, `this.props.zentForm` 提供的 API 如下：

| 参数 | 说明 | 类型 |
|------|------|------|
| getFormValues | 获取与 form 绑定的所有表单元素值 | func |
| getFieldError | 获取某个 Field 的错误信息, 没有报错信息返回空 | func(name: String) |
| setFormPristine | 设置所有 Field 的状态为非原始状态, 用于在提交表单时让 Field 把没有显示出来的错误显示出来 | func(isPristine: Boolean) |
| setFieldExternalErrors | 设置外部传入的错误信息（比如服务端校验错误），errors的key为Field的name，value为错误文案 | func(errors: Object) |
| resetFieldsValue | 把所有 Field 的值恢复到指定值或初始状态 | func(data: Object) |
| isValid | 表单的所有 Field 是否都通过了校验 | func |
| isSubmitting | 表单是否正在提交 | func |
| isValidating | 表单是否有 Field 在异步校验 | func |
| isFieldTouched | Field 是否变更过值 | func(name: String) |
| isFieldValidating | Field 是否 | func(name: String) |

##### handleSubmit prop
createForm还会为被包装的组件提供一个封装过的`handleSubmit`方法，具体使用可以参考上方**表单提交**中的内容

注意：
如果希望在`onSubmitFail`回调中正确的接收到error对象，需要在submit函数中throw `SubmissionError`类型的对象

```js
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

#### **Form.Field**
所有需要维护value的表单元素组件都需要通过Field组件包装一下。
在Field组件上可以传入以下props，component以外的其他props（包括自定义的props），都会传入到component中所定义的表单元素组件中：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| name | 表单元素名 | string | 是 |
| component | 真正的表单元素组件，负责表单元素如何展示。可以是字符串(标准 html 元素名), 或者 React 组件 | string / React.Component | 是 |
| normalize | onChange 或者 onBlur 后格式化表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| format | 渲染前格式化表单元素值, 不影响真正存储的表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| onChange | value 值修改后的回调，会在Field中封装一层。(自定义组件需要自己调用由Field组件封装后传入的 `props.onChange()` 后才会执行) | func(event, newValue, previousValue, preventSetValue) | 否 |
| onBlur | blur 后的回调（会在Field中封装一层） | func(event, newValue, previousValue, preventSetValue) | 否 |
| validations | 定义表单元素校验方法 | object | 否 |
| validationErrors | 定义表单元素检验方法对应的出错信息 | object | 否 |
| asyncValidation | 异步校验 func, 需要返回 Promise | func(values, value) | 否 |
| value | 表单元素初始值 | any | 是 |

除了上述参数之外，Field组件会隐含地向被包裹的表单元素组件中传入以下props：

| 参数 | 说明 | 类型 | 
|------|------|------|
| isTouched | 表单元素值被改变过 | boolean |
| isPristine | 表单元素值没有被改变过 | boolean | 
| error | 第一个校验错误文本信息（没有报错时为null） | string / Null | 
| errors | 校验错误文本信息数组（没有错误时为空数组） | array |


#### **Form.getControlGroup**
getControlGroup是一个用来快速封装自定义组件的函数，它返回一个满足通用布局与样式要求（左侧label、右侧表单元素）的stateless functional component。同时支持将Field中的error信息展示出来。getControlGroup实现的比较简单，可以直接看源码。

```js
export default Control => ({ required = false, helpDesc = '', label = '', className = '', ...props }) => {
  const showError = props.isTouched && props.error;
  const groupClassName = cx({
    'zent-form__control-group': true,
    'has-error': showError,
    [className]: true
  });

  return (
    <div className={groupClassName}>
      <label className="zent-form__control-label">
        {required ? <em className="zent-form__required">*</em> : null}
        {label}
      </label>
      <div className="zent-form__controls">
        <Control {...props} />
        {showError && <p className="zent-form__error-desc">{props.error}</p>}
        {helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
      </div>
    </div>
  );
};
```

封装过的组件支持在Field上额外传入以下参数：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| label | 表单元素的label | string | 否 |
| className | 添加到control-group上的额外类名，可以用来覆盖子元素的样式 | string | 否 |
| helpDesc | 表单元素的说明性文字 | string | 否 |
| required | 为true时会在label前添加红色的"*" | boolean | 否 |

#### **内置validation rules**
可以直接在Field的validations属性中使用

```js
<Field
	...
	validations={{
	  required: true,
	  matchRegex: /^\d+/,
	  equals: 'pangzi',
	  equalsField: 'fieldName'
	}}
	...
/>
```

| 规则名 | 说明 | 可传参数 |
|------|------|------|
| required | 是否必填 | 任意，传true是为了表意，传其他值也是当作必填，下同 |
| isExisty | 是否非null，非undefined | 任意 |
| matchRegex | 是否匹配指定正则表达式 | Regex |
| isEmail | 是否邮件类型字符串 | 任意 |
| isUrl | 是否url类型 | 任意 |
| isTrue | 是否true | 任意 |
| isFalse | 是否false | 任意 |
| isNumeric | 是否数字类型 | 任意 |
| isInt | 是否整数 | 任意 |
| isFloat | 是否小数 | 任意 |
| isLenght | 字符串或数组是否为指定长度 | 长度值(Number) |
| equals | 是否与指定值相等 | 指定值 |
| equalsField | 是否与表单中的其他元素值相等 | 其他Field的name(String) |
| maxLength | 字符串或数组不能超过指定长度 | 长度值(Number) |
| minLength | 字符串或数组不能小于指定长度 | 长度值(Number) |
