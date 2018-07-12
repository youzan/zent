---
title: Form
subtitle: 表单
path: component/form
group: 数据
scatter: true
---

## Form 表单组件

1. [使用指南](#shi-yong-zhi-nan)
2. [表单校验](#biao-dan-xiao-yan)
3. [格式化 value](#ge-shi-hua-value)
4. [表单操作](#biao-dan-cao-zuo)
5. [其他](#qi-ta)
6. [组件原理](#zu-jian-yuan-li)
7. [其他说明](#qi-ta-shuo-ming)
8. [API](#api)

### 使用指南

#### 表单 `Form`

- `Form` 组件提供三种样式：`inline`，`horizontal`， `vertical`。
- 使用 `Form` 组件，必须先调用 `createForm` 方法包装，为表单注入 `zentForm` 属性，从而提供表单和表单元素的各种操作方法，详见 demo 和 [`zentForm` API](#zentform) 。


#### 表单域 `Field`

`Field` 组件本质上是一个辅助性的组件，不提供任何样式，只负责管理表单元素 value 值的生命周期和表单元素的 error 等信息。

- `Field` 必须要有 `name` 属性；
- `Field` 的展现形式由 `component` 属性传入的组件决定，`Form` 组件中内置了常用的表单元素组件，也可以使用单独封装的自定义表单元素组件。
  * `FormInputField`
  * `FormSelectField`
  * `FormRadioGroupField`
  * `FormCheckboxField`
  * `FormCheckboxGroupField`
  * `FormNumberInputField`
  * `FormSwitchField`
  * `FormColorPickerField`
  * `FormDatePickerField`
  * `FormWeekPickerField`
  * `FormMonthPickerField`
  * `FormQuarterPickerField`
  * `FormYearPickerField`
  * `FormTimePickerField`
  * `FormTimeRangePickerField`
  * `FormDateRangePickerField`
  * `FormDateRangeQuickPickerField`
- `Form` 组件提供了 `getControlGroup` 方法，可以快速封装自定义表单元素组件，使用方法参考 demo 和 [`getControlGroup` API](#form-getcontrolgroup) 。

注：底层组件中的 `format` 属性因为名称和 `Field` 上的 `format` 属性冲突，`FormDatePickerField` 以及其他年月日相关的 `XyzPickerField` 的 `format` 属性变更为 `dateFormat`；`FormTimePickerField` 以及 `FormTimeRangePickerField` 的 `format` 属性变更为 `timeFormat`。


<!-- demo-slot-1 -->
<!-- demo-slot-2 -->

#### 使用 `getControlGroup` 封装自定义表单域

<!-- demo-slot-3 -->

#### 多个表单元素的封装

当一个 `Field` 里需要封装多个表单元素时，一般会将多个表单元素的 value 值封装在一个对象里传入到 `Field` 中。当无法使用 `getControlGroup` 满足封装要求时，可以自己封装组件，通过调用 `Field` 组件传入的 `onChange` 事件更改 `Field` 的 value。

⚠️注意：调用 `Field` 传入的 `onChange` 事件默认会覆盖原值，可以通过传入 `{ merge: true}` 参数来部分覆盖 value 值。

<!-- demo-slot-4 -->

### 表单校验

#### 表单校验的使用

- `Field` 组件支持传入 `validations` 和 `validationErrors` 来指定校验规则和校验提示；
- `validations` 对象支持预置的内部校验规则（详见[内置 validation rules](#nei-zhi-validation-rules) ）, 也支持传入自定义的校验函数，校验函数返回 `true` 时表示验证通过；
- 可以通过 `Form.createForm` 扩展内部校验规则，详见 [`Form.createForm` API](#form-createform) 。
- 默认在任一表单进行校验时，其他所有表单域都会进行校验。如果想修改这种默认行为，可以给 `Field` 的 `relatedFields` 属性为一组表单域的名字数组，这样当当前表单域校验时，只会校验这些指定的表单域。

<!-- demo-slot-5 -->

#### 表单校验时机

表单的默认校验时机是 value 值改变的时候。可以修改 `validateOnChange`，`validateOnBlur` 来改变校验时机，如在 blur 时再校验（一般用于Input输入框）。

如果你需要在提交时校验表单项，可以设置 `validateOnChange`，`validateOnBlur` 都为 `false`，并使用内置表单提交操作 `handleSubmit`。如果不使用 `handleSubmit` 处理表单提交操作，你需要在表单提交时使用 `zentForm.validateForm(true, callback)` 方法强制触发表单的校验，并在 `callback` 中处理后续逻辑。如果需要自主控制错误信息的展示，可以使用 `Field` 的 `displayError` 属性来控制错误信息的显示。

<!-- demo-slot-6 -->

#### 异步校验
异步校验在 blur 时触发，如果需要在自定义组件中手动触发异步校验，需要自己调用`props.onBlur(event)`。 `value` 值可以直接传给 `event` ，或者作为 `event` 的属性传入。

如果在没有触发异步校验的情况下（比如没有对表单项进行过操作）直接提交表单时，默认不会触发异步校验，使用内置的 `handleSubmit` 方法可以在提交表单时触发从未进行的异步校验。如果不使用 `handleSubmit` 处理表单提交操作，你需要在表单提交时使用 `zentForm.isFormAsyncValidated` 判断表单是否经过了异步校验，并根据结果选择是否使用 `zentForm.asyncValidateForm(resolve, reject)` 方法强制触发表单的异步校验。

<!-- demo-slot-7 -->

### 格式化 `value`

`Form` 组件提供了 `format` 和 `nomalize` 方法 来对 `value` 进行格式化，它们的执行时机详见 [value 的生命周期](#field-zhong-value-de-sheng-ming-zhou-qi)。

<!-- demo-slot-8 -->

### 表单操作

- `Form.createForm` 为组件注入 `zentForm` 属性，提供了表单和表单元素的各种操作方法，如获取表单元素值，重置获取表单元素值等，详见 [`zenForm` API](#zentform)
- `Form` 组件内部对表单提交的过程也进行了封装了 `handleSubmit` 方法，可以把异步提交过程封装在一个函数里并**返回 `Promise` 对象**，组件内部会根据 `Promise` 对象的执行结果分别调用 `onSubmitSuccess` 和 `onSubmitFail` 方法，同时更新内部维护的 `isSubmitting` 属性（可以通过 `zentForm.isSubmitting()` 得到）。此外，当设定 `scrollToError` 时，支持表单提交时自动滚动到第一个报错的表单域。

<!-- demo-slot-9 -->
<!-- demo-slot-10 -->

### 其他

#### `Form` 布局

`Form` 组件提供三种简单的样式：行内布局 `inline`，水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-11 -->

#### `Fieldset` 组件

<!-- demo-slot-12 -->

#### `FormSection` 组件

`FormSection` 组件可以复用切分为更小模块的表单域，其对应的表单数据是对象形式。`FormSection` 支持的参数详见[`Form.FormSection` API](#form-formsection)。

<!-- demo-slot-13 -->

#### `FieldArray` 组件

`FieldArray` 组件可以方便地渲染一组相同的单元域，并且可以增加和删除单元域，类似数组中元素的添加和删除。

`FieldArray` 会为其 `component` 注入 `fields` 这个属性，可以提供单元域的遍历、增加、删除等操作，该属性支持的属性和方法详见[`Form.FieldArray` API](#form-fieldarray)。

<!-- demo-slot-14 -->

### 组件原理

本组件核心由以下几部分组成：

- `createForm` 函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（`Field` 组件）实例。通过向子组件的 `props` 中注入 `zentForm` 属性来提供表单和表单元素的各种操作方法。
- `Form` 组件：作为整个表单的最顶层骨架，是对 `<form>` 标签的简单封装，定义了默认的 class 来提供基础样式。
- `Field` 组件：用来封装各种表单元素组件（如 `Input` 、 `Checkbox` 、`Select` 以及各种自定义组件）的一个高阶组件。其中维护了表单元素 value 值和校验错误等信息。Field 组件会向表单元素组件传入封装过的 `onChange` 、`onBlur` 回调和 `value` 、`error` 等表单元素需要的 props 。

具体的使用，详见 [API 说明](#api)。

### 其他说明

#### 封装自定义的表单元素组件
- `Field` 的展示完全由传入到 `component` 属性中的组件所控制。这个组件能够接收到所有从 `Field` 传入的 props （包括 `Field` 中构造的一些隐含的 props ，具体[`Form.Field` API](#form-field) ）。

- 对于一些常用的 `zent` 表单组件， `Form` 组件已经使用了 `getControlGroup` 函数进行了封装。如果产品设计上有一些特殊的需求，或者需要封装自定义的组件，也可以直接使用或者参考 `getControlGroup`的方式来对组件进行封装， 参考 [demo 封装多个表单元素](#duo-ge-biao-dan-yuan-su-de-feng-zhuang)。

- **如果需要在一个 `Field` 中展示多个表单元素，可以将所有的表单元素封装在一个对象中传入 Field 的value 中。具体可以参考 [demo 封装多个表单元素](#duo-ge-biao-dan-yuan-su-de-feng-zhuang)。**

#### `Field` 中 `value` 的生命周期
- 表单元素的初始值需要通过在 `Field` 中指定 `value` 值传入。 `value` 值的生命周期如下图所示：

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
| disableEnterSubmit | 禁止回车提交表单 | boolean | `true` | 否 |

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

| 参数 | 说明 | 类型 | 默认值 |是否必填 |
|------|------|------|------|------|
| onChange | 任意表单元素修改后触发的回调，参数为所有表单元素值的对象 | func(values: Object) | noop | 否 |
| onSubmitSuccess | 提交成功后的回调，参数是 submit 函数中 promise 的返回值 | func(submitResult: any) |noop | 否 |
| onSubmitFail | 提交失败后的回调，参数要么是 SubmissionError 的一个实例，要么是 undefined | func(submitError: SubmissionError) |noop | 否 |
| scrollToError | 表单提交时或者设置外部错误时，表单自动滚动至第一个报错表单域 | boolean | `false` | 否 |

⚠️注意：

1. `onChange`, `onSubmitSuccess`, `onSubmitFail`, `scrollToError` 也支持通过 `createForm` 的 `options` 参数传入；
2. 想要获取被 createForm 包裹的 FormComponent 的实例，可以在 createForm 创建的组件上添加 ref 然后调用`getWrappedForm`方法获取到。

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
| isFormAsyncValidated | 所有 field 是否都进行了异步校验 | func |
| validateForm | 强制表单进行同步校验 | func(forceValidate: Boolean, callback: Function, relatedFields: Array) |
| asyncValidateForm | 强制表单进行异步校验 | func(resolve: Function, reject: Function) |
| isFormSubmitFail | 表单是否提交失败，初始时为 `false` | func |
| isFormSubmitSuccess | 表单是否提交成功, 初始时为 `true` | func |
| updateFormSubmitStatus | 更新表单提交成功、失败状态 | func(submitSuccess: Boolean) |

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
| displayError | 显示错误信息 | boolean | 否 |
| relatedFields | 当前表单域对哪些表单域的校验有影响 | array | 否 |

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

#### **`Form.FormSection`**

`FormSection` 提供以下参数：

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|-----|------|
| name | 表单块的名字 | string | 无 | 是 |
| component | 包裹 `FormSection` 的 html 标签 | string |  `'div'` |否 |
| children | 表单块的子元素 | string / React.Component | 无 | 否 |

#### **`Form.FieldArray`**

`FieldArray` 组件支持如下：

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|-----|------|
| name | `FieldArray` 的名字 | string | 是 |
| value | 组件的值 | array | 否 |
| component | `FieldArray` 中展示的表单元素组件，可以是字符串(标准 html 元素名), 或者 React 组件 | string / React.Component | 是 |

`FieldArray` 会为其 `component` 注入 `fields` 属性并提供表单域数组的遍历、增加、删除等功能，其 API 如下所示：

| 参数 | 说明 | 类型 |
|------|------|------|
| name | `FieldArray` 的名字 | string |
| length | `FieldArray` 中表单域数组的长度 | number |
| forEach | 遍历 `FieldArray` 中表单域数组 | (callback: Function) => any |
| get | 获取 `FieldArray` 中表单域数组中某一项的值 | (index: Number) => any |
| getAll | 获取 `FieldArray` 中表单域数组的所有值 | func |
| map | 遍历 `FieldArray` 中表单域数组 | (callback: Function) => any|
| move | 移动 `FieldArray` 中表单域数组的某一项 | (fromPos: Number, toPos: Number) => any |
| pop | 删除 `FieldArray` 中表单域数组的最后一项 | func |
| push | 在 `FieldArray` 中表单域数组末尾添加一项 | (value: Object/String) => any |
| remove | 删除 `FieldArray` 中表单域数组中的某一项 | (index: Number) => any |
| removeAll | 删除 `FieldArray` 中整个表单域数组 | func |
| shift | 删除 `FieldArray` 中表单域数组的第一项 | func |
| swap | 交换 `FieldArray` 中表单域数组的某两项 | (indexA: Number, indexB: Number) => any |
| unshift | 在 `FieldArray` 中表单域数组的头部添加一项 | (value: Object/String) => any |
| concat | 在 `FieldArray` 中表单域数组末尾连接一个数组, 如果传入的不是数组，则会被添加到末尾 | (value: Object/String/Array) => any |
| replaceAll | 将 `FieldArray` 中表单域数组全部替换为传入的参数 | (value: Array) => any |

⚠️注意：遍历的回调函数 callback 将接受五个参数: item（`FieldArray` 中当前项的名字），index（`FieldArray` 中当前项的次序），key（`FieldArray` 中当前项的唯一 key 值），value（`FieldArray` 中当前项的值）， fieldsValue（`FieldArray` 的所有值）。为了保证 `FieldArray` 在删除和添加时数据正确，遍历时一定要给 `component` 中的子节点设置正确的 `name` 和 `key`, 详见使用参考 [FieldArray 基本使用](#fieldarray-zu-jian)

#### **内置 validation rules**
可以直接在 `Field` 的 `validations` 属性中使用，使用方法参考 [demo 常用表单校验](#biao-dan-xiao-yan-de-shi-yong)。内置规则如下：

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
| isLength | 字符串或数组是否为指定长度 | 长度值(Number) |
| equals | 是否与指定值相等 | 指定值 |
| equalsField | 是否与表单中的其他元素值相等 | 其他 Field 的name(String) |
| maxLength | 字符串或数组不能超过指定长度 | 长度值(Number) |
| minLength | 字符串或数组不能小于指定长度 | 长度值(Number) |
