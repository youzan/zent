---
title: Form
path: component/form
group: Data
---

## Form 表单组件

1. [基础用法](#ji-chu-yong-fa)
2. [表单校验](#biao-dan-xiao-yan)
3. [格式化 value](#ge-shi-hua-value)
4. [表单操作](#biao-dan-cao-zuo)
5. [其他](#qi-ta)
6. [组件原理](#zu-jian-yuan-li)
7. [使用指南](#shi-yong-zhi-nan)
8. [API](#api)

### API

#### 表单 `Form`

- `Form` 组件提供三种样式：`inline`，`horizontal`， `vertical`。
- 使用 `Form` 组件，必须先调用 `createForm` 方法包装，为表单注入 `zentForm` 属性，从而提供表单和表单元素的各种操作方法，详见 demo 和 [`zentForm` API](#zentform) 。


#### 表单域 `Field`

`Field` 组件本质上是一个辅助性的组件，不提供任何样式，只负责管理表单元素 value 值的生命周期和表单元素的 error 等信息。

- `Field` 必须要有 `name` 属性；
- `Field` 的展现形式由 `component` 属性传入的组件决定，`Form` 组件中内置了常用的表单元素组件 `FormInputField`，`FormSelectField`，`FormRadioGroupField`，`FormCheckboxField`，`FormCheckboxGroupField`，`FormNumberInputField`，`FormSwitchField`，`FormColorPickerField`，`FormDateRangePickerField`，也可以使用单独封装的自定义表单元素组件；
- `Form` 组件提供了 `getControlGroup` 方法，可以快速封装自定义表单元素组件，使用方法参考 demo 和 [`getControlGroup` API](#form-getcontrolgroup) 。

### 组件原理

本组件核心由以下几部分组成：

- `createForm` 函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（`Field` 组件）实例。通过向子组件的 `props` 中注入 `zentForm` 属性来提供表单和表单元素的各种操作方法。
- `Form` 组件：作为整个表单的最顶层骨架，是对 `<form>` 标签的简单封装，定义了默认的 class 来提供基础样式。
- `Field` 组件：用来封装各种表单元素组件（如 `Input` 、 `Checkbox` 、`Select` 以及各种自定义组件）的一个高阶组件。其中维护了表单元素 value 值和校验错误等信息。Field 组件会向表单元素组件传入封装过的 `onChange` 、`onBlur` 回调和 `value` 、`error` 等表单元素需要的 props 。

具体的使用，详见 [API 说明](#api)。

### 使用指南

#### 封装自定义的表单元素组件
- `Field` 的展示完全由传入到 `component` 属性中的组件所控制。这个组件能够接收到所有从 `Field` 传入的 props （包括 `Field` 中构造的一些隐含的 props ，具体[`Form.Field` API](#form-field) ）。

- 对于一些常用的 `zent` 表单组件， `Form` 组件已经使用了 `getControlGroup` 函数进行了封装。如果产品设计上有一些特殊的需求，或者需要封装自定义的组件，也可以直接使用或者参考 `getControlGroup`的方式来对组件进行封装， 参考 [demo 封装多个表单元素](#duo-ge-biao-dan-yuan-su-de-feng-zhuang)。

- **如果需要在一个 `Field` 中展示多个表单元素，可以将所有的表单元素封装在一个对象中传入 Field 的value 中。具体可以参考 [demo 封装多个表单元素](#duo-ge-biao-dan-yuan-su-de-feng-zhuang)。**

#### `Field` 中 `value` 的生命周期
- 表单元素的初始值需要通过在 `Field` 中指定 `value` 值传入，如果 `value` 值的生命周期如下图所示：

```
Field 中传入 value ---> 使用 format() 格式化 value ---> format 过的 value 传入 component 中渲染组件
															 ↑                                 |
															 |                                 ↓
															 |                          用户操作改变 value
															 |                                 |
															 |                                 ↓
		normalize 过的 value 写入 form 中维护, 用于数据提交 <--- 使用 normalize() 格式化 value
```

- 如果传入 `Field` 的 `value` 值是一个动态值，在外部改变 value 后会重新开始 value 的生命周期。

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
| setFormDirty | 设置所有 Field 的状态为非原始状态, 用于在提交表单时让 Field 把没有显示出来的错误显示出来 | func(isDirty: Boolean) |
| setFieldExternalErrors | 设置外部传入的错误信息（比如服务端校验错误）， errors 的 key 为 Field 的 name ， value 为错误文案 | func(errors: Object) |
| setFieldsValue | 设置表单 Field 的值为指定值 | func(data: Object) | 
| resetFieldsValue | 把所有 Field 的值恢复到指定值或初始状态 | func(data: Object) |
| initialize | 设置表单 Field 初始值 | func(data: Object) | 
| isValid | 表单的所有 Field 是否都通过了校验 | func |
| isSubmitting | 表单是否正在提交 | func |
| isValidating | 表单是否有 Field 在异步校验 | func |
| isFieldDirty | Field 是否变更过值 | func(name: String) |
| isFieldValidating | Field 是否在异步校验 | func(name: String) |

##### **`handleSubmit`**

`createForm` 还会为被包装的组件提供一个封装过的 `handleSubmit` 方法，具体使用可以参考[demo 表单操作](#biao-dan-cao-zuo)。

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
| isDirty | 表单元素值被改变过 | boolean |
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
| notice | 表单元素的重要提示性文字 | string / React.Component | 否 |
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

.form-layout {
	margin-bottom: 30px;
}

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
