# zent-form

[![npm version](https://img.shields.io/npm/v/zent-form.svg?style=flat)](https://www.npmjs.com/package/zent-form) [![downloads](https://img.shields.io/npm/dt/zent-form.svg)](https://www.npmjs.com/package/zent-form)

表单组件

[toc]

## 组件原理
组件核心由以下几部分组成：

- createForm函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（Field组件）实例。通过向子组件的props中注入zentForm属性来提供表单和表单元素的各种操作方法。
- Form组件：作为整个表单的最顶层骨架，是对<form>标签的简单封装，定义了默认的class来提供基础样式。
- Field组件：用来封装各种表单元素组件（如Input、Checkbox、Select以及各种自定义组件）的一个高阶组件。其中维护了表单元素value值和校验错误等信息。Field组件会向表单元素组件传入封装过的onChange、onBlur回调和value、error等表单元素需要的props。

注意：

1. 使用Form组件构造的组件必须调用createForm函数进行封装，否则children中的Field无法生效，控制台中会抛错。
2. Field组件本质上是一个辅助性的组件，本身不提供任何样式。它的作用是管理表单元素value值的生命周期和表单元素的error等信息。真正控制表单元素如何展现的是Field component属性中传入的组件。

## 使用指南

### 创建表单

```js
class FormComponent extends React.Component {
  render() {
    return (
      <Form>
        // 各种表单元素
        <Field
        	// 表单元素名，必需要有
          name="a"
          type="number"
          // 表单元素组件
          component={InputField}
          label="a"
          value="2"
          validations={{
            required: true,
            // 使用自定义校验方法时可以额外传入参数
            isMoreThan: 'b'
            lessThan100(values, value) {
            	return +value < 100;
            }
          }}
          validationErrors={{
            required: '不能为空',
            isMoreThan: 'a必须大于b',
            lessThan100: 'a必须小于100'
          }}
        />
        <Field
          name="b"
          type="number"
          component={InputField}
          label="b"
          value="3"
        />
      </Form>
    )
  }
}

FormComponent = Form.createForm({
  // 在这里定义的校验方法可以在定义 validations 时额外接收一个参数。也可以在独立文件中定义，跨页面共享校验方法。
  formValidations: {
    isMoreThan(values, value, otherField) {
      return Number(value) > Number(values[otherField])
    },
    ...
  }
})(FormComponent);
```
### 表单提交

form 组件内部对表单提交的过程进行封装，可以把异步提交的过程封装在一个func里并返回一个**promise对象**，组件内部会根据promise对象的执行结果分别调用 `onSubmitSuccess` 和 `onSubmitFail` 方法，同时更新内部维护的 `isSubmitting` 属性（可以通过zentForm.isSubmitting()得到）.

```js
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const submit = (values) => {
    return sleep(1000)
      .then(() => {
        console.log(values)
      }).catch((error) => {
      	  console.log(error)
      });
  }

  class SubmitForm extends React.Component {
    render() {
      const { zentForm, handleSubmit } = this.props
      const isSubmitting = zentForm.isSubmitting()

      return (
        <Form onSubmit={handleSubmit(submit)}>
          ...
          <button type="submit">{isSubmitting ? '提交中' : '提交'}</button>
        </Form>
      )
    }
  }

  class FormContainer extends React.Component {
    onSubmitSuccess(result) {
      ...
    }

    onSubmitFail(error) {
      ...
    }

    render() {
      return (
        <SubmitForm
          onSubmitSuccess={this.onSubmitSuccess}
          onSubmitFail={this.onSubmitFail}
        />
      )
    }
  }
```

### 封装自定义的表单元素组件
前面已经说过，Field的展示完全由传入到component属性中的组件所控制。这个组件能够接收到所有从Field传入的props（包括Field中构造的一些隐含的props，具体看下方Field API）。

对于一些常用的zent表单组件，Form已经使用getControlGroup对其进行了封装（具体参考下方API）。如果产品设计上有一些特殊的需求，或者需要封装自定义的组件，也可以直接使用或者参考getControlGroup的方式来对组件进行封装。

### Field中 value 的生命周期
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

## API

### Form

对 html 中 form 元素的一个简单封装, 提供默认的 className.

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | `''` | 否 |
| prefix | 自定义前缀 | string | `'zent'` | 否 |
| horizontal | 水平排列布局 | boolean  | `false` | 否 |
| inline | 行内排列布局 | boolean | `false` | 否 |
| onSubmit | 表单提交回调 | func(e:Event) | `noop` | 否 |
| style | 内联样式 | object | null | 否 |

### Form.createForm(options)(FormComponent)

使用方式如下：

#### options
`options` 支持的配置项如下:

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| formValidations | 用于添加自定义校验方法, 通过这种方式添加的方法在 validations 中使用时可以传额外的参数 | object | 否 |

*项目中的通用校验方法，可以通过在一个文件中定义公共的formValidations对象来引入。*

#### createForm返回的组件可接收的props
 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| onChange | 任意表单元素修改后触发的回调，参数为所有表单元素值的对象 | func(values: Object) | 否 |
| onSubmitSuccess | 提交成功后的回调，参数是submit函数中promise的返回值 | func(submitResult: any) | 否 |
| onSubmitFail | 提交失败后的回调，参数要么是SubmissionError的一个实例，要么是undefined | func(submitError: SubmissionError) | 否 |

#### zentForm prop
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

#### handleSubmit prop
createForm还会为被包装的组件提供一个封装过的`handleSubmit`方法，具体使用可以参考上方**表单提交**中的内容

注意：
如果希望在`onSubmitFail`回调中正确的接收到error对象，需要在submit函数中throw SubmissionError类型的对象

```js
const { SubmissionError } = Form;

...
throw new SubmissionError('error message');
...

onSubmissionFail(submissionError) {
	if (submissionError && submissionError.errors === 'error message') {
		// do something
	}
}
```

### Form.Field
所有需要维护value的表单元素组件都需要通过Field组件包装一下。
在Field组件上可以传入以下props，component以外的其他props（包括自定义的props），都会传入到component中所定义的表单元素组件中：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| name | 表单元素名 | string | 是 |
| component | 真正的表单元素组件，负责表单元素如何展示。可以是字符串(标准 html 元素名), 或者 React 组件 | string / React.Component | 是 |
| normalize | onChange 或者 onBlur 后格式化表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| format | 渲染前格式化表单元素值, 不影响真正存储的表单元素值 | func(value, previousValue, nextValues, previousValues) | 否 |
| onChange | value 值修改后的回调(自定义组件需要调用 `props.onChange()` 才会触发)，会在Field中封装一层 | func(event, newValue, previousValue, preventSetValue) | 否 |
| onBlur | blur 后的回调（会在Field中封装一层） | func(event, newValue, previousValue, preventSetValue) | 否 |
| validations | 定义表单元素校验方法 | object | 否 |
| validationErrors | 定义表单元素检验方法对应的出错信息 | object | 否 |
| asyncValidation | 异步校验 func, 需要返回 Promise | func(values, value) | 否 |
| value | 表单元素初始值 | any | 是 |

除了上述参数之外，Field组件会隐含地向被包裹的表单元素组件中传入以下props：

| 参数 | 说明 | 类型 | 
|------|------|------|
| isTouched | 表单元素值被改变过 | Boolean |
| isPristine | 表单元素值没有被改变过 | Boolean | 
| error | 第一个校验错误文本信息（没有报错时为null） | String / Null | 
| errors | 校验错误文本信息数组（没有错误时为空数组） | Array |


### Form.getControlGroup
getControlGroup是一个用来快速封装自定义组件的函数，它返回一个满足通用布局与样式要求（左侧label、右侧表单元素）的stateless functional component。同时支持将Field中的error信息展示出来。getControlGroup实现的比较简单，可以直接看源码。

```js
export default Control => ({ required = false, helpDesc = '', label = '', ...props }) => {
  const showError = props.isTouched && props.error;
  const className = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });

  return (
    <div className={className}>
      <label className="zent-form__control-label">
        {required ? <em className="zent-form__required">*</em> : null}
        {label}
      </label>
      <div className="zent-form__controls">
        <Control {...props} />
        {showError && <p className="zent-form__help-block">{props.error}</p>}
        {helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
      </div>
    </div>
  );
};
```

封装过的组件支持在Field上额外传入以下参数：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| label | 表单元素的label | String | 否 |
| helpDesc | 表单元素的说明性文字 | String | 否 |
| required | 为true时会在label前添加红色的"*" | Boolean | 否 |

### 内置对其他zent组件的封装
为了减少代码量，Form组件内置了对常用的表单元素组件（Input、Checkbox、CheckboxGroup、RadioGroup、Select）的封装。这些组件的封装使用了上述的getControlGroup函数。

使用方法：

```js
import { Form } from 'zent';
const { Field, InputField } = Form;
...
<Field
	name="name"
	type="text"
	label="用户名："
	value="123"
	component={InputField}
	helpDesc={<span>我是说明<a href="https://youzan.com">我是链接</a></span>}
	required
/>
...
```

### 内置validation rules
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

