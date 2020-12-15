---
title: Form
subtitle: 表单
path: component/form
group: 数据
scatter: true
---

## Form 表单组件

### ⚠️ 警告

这是新版的 `Form` 组件，和 `7.0.0` 之前版本的 `Form` 组件不兼容。

可以在[这里查看老版 `Form` 组件的文档](https://zent-contrib.github.io/zent-compat)。

### 表单元素

表单由一个或多个不同的表单元素组合而成：

- `Field` 元素，是表单的最小组成单位
- `FieldSet` 元素，是一系列表单元素的集合，每一个子元素有唯一的键（ `key` ），可以嵌套，在数据结构上与普通对象 `object` 类似，存在一个局部的表单上下文，使其内部的表单元素可以注册到集合上
- `FieldArray` 元素，是一系列表单元素的集合，每一个子元素有唯一的索引，可以嵌套，在数据结构上与数组 `Array` 类似
- `Form` 元素，是以上所有表单元素的集合，作为一个表单的根元素形成表单上下文

### 表单模型

每一种表单元素都有其对应的模型 `Model` ，他们都继承自一个基础模型 `BasicModel` ：

- `FieldModel` ，对应 `Field` 元素，提供对单个字段进行操作的能力
- `FieldSetModel` ，对应 `FieldSet` 元素，提供对字段集合进行操作的能力
- `FieldArrayModel` ，对应 `FieldArray` 元素，提供对字段集合进行顺序操作的能力，实现了普通数组所具备的“变异方法”
- `FormModel` ，对应 `Form` 元素，继承自 `FieldSetModel` ，提供对表单整体进行控制的能力，例如表单提交

### 模型对应的 Hook

表单模型封装了对状态的处理以及一些常用的表单操作，将这些能力与视图组件解耦，例如当前值、校验、脏检查、触碰检查等等，在视图组件中仅需要创建一个对应的 `Model` 对象并进行关联即可让组件拥有这些能力， Zent 提供了一些 Hook 用来简化 `Model` 与视图组件的关联：

- `useField` ，创建并返回一个 `FieldModel` 对象并将其与组件进行关联，**必须在 `Form` 组件内部使用，依赖表单上下文**
- `useFieldSet` ，创建并返回 `FieldSetModel` 对象以及局部的表单上下文，内部将 `FieldSetModel` 与组件进行关联并注册到上级的表单上下文中，**必须在 `Form` 组件内部使用，依赖表单上下文**
- `useFieldArray` ，创建并返回一个 `FieldArrayModel` 对象并将其与组件进行关联，**必须在 `Form` 组件内部使用，依赖表单上下文**
- `useForm` ，创建并返回一个 `FormModel` 对象

### Hook 对应的组件

进一步地， Zent 将 Hook 调用封装成了通用的组件，可以满足大多数常见的使用场景：

- `Field` ，对应 `useField`，通过 `render props` 的方式渲染一个普通的 UI 组件，为其附加表单能力，通常用来封装自定义的表单组件
- `FieldSet` ，对应 `useFieldSet`，内部会创建一个表单上下文
- `Form` ，接收一个 `form` 属性，即 `useForm` 的返回值，内部会创建一个表单上下文

`FieldArray` 通常会伴随动态增删的交互功能，因此 Zent 没有将其封装成一个组件，而是交由开发者根据需求进行二次封装，保证灵活性

### 内置的常用表单组件

由于 `Field` 并不适合直接在业务代码中使用，通常需要结合 UI 组件进行二次封装，因此 Zent 基于 `Field` 内置了一系列常用的 UI 表单组件：

- `FormInputField`
- `FormSelectField`
- `FormRadioGroupField`
- `FormCheckboxField`
- `FormCheckboxGroupField`
- `FormNumberInputField`
- `FormSwitchField`
- `FormColorPickerField`
- `FormDatePickerField`
- `FormWeekPickerField`
- `FormMonthPickerField`
- `FormQuarterPickerField`
- `FormYearPickerField`
- `FormTimePickerField`
- `FormTimeRangePickerField`
- `FormDateRangePickerField`
- `FormCombinedTimeRangePickerField`
- `FormCombinedDateRangePickerField`
- `FormDateRangeQuickPickerField`

可以通过 `props` 属性将属于内部 UI 组件的属性透传进去

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-18 -->
<!-- demo-slot-3 -->
<!-- demo-slot-15 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-19 -->
<!-- demo-slot-16 -->
<!-- demo-slot-6 -->
<!-- demo-slot-7 -->
<!-- demo-slot-8 -->
<!-- demo-slot-9 -->
<!-- demo-slot-10 -->
<!-- demo-slot-11 -->
<!-- demo-slot-12 -->
<!-- demo-slot-20 -->
<!-- demo-slot-13 -->
<!-- demo-slot-14 -->
<!-- demo-slot-17 -->

### API

#### useForm

| 参数     | 说明     | 类型          | 是否必须     |
| -------- | -------- | ------------- | ------------ | --- |
| strategy | 表单模式 | `FormStrategy | FormBuilder` | 是  |

#### Form

| 参数               | 说明                                                   | 类型                                                 | 是否必须  |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------------- | --------- | --- |
| form               | 表单模型                                               | `ZentForm`                                           | 是        |
| layout             | 布局                                                   | `horizontal                                          | vertical` | 否  |
| disabled           | 禁用                                                   | `boolean`                                            | 否        |
| disableEnterSubmit | 禁用表单内 `input` 元素的回车提交功能                  | `boolean`                                            | 否        |
| scrollToError      | 校验报错时滚动到第一个错误的位置                       | `boolean`                                            | 否        |
| willScrollToError  | 触发滚动到第一个错误前的回调函数，抛出错误可以终止滚动 | `(form: ZentForm<T>) => void \| Promise<void>`       | 否        |
| onSubmit           | 提交回调函数                                           | `(form: ZentForm, e?: React.SyntheticEvent) => void` | 否        |
| onSubmitSuccess    | 提交成功回调函数                                       | `() => void`                                         | 否        |
| onSubmitSuccess    | 提交成功回调函数                                       | `() => void`                                         | 否        |
| onReset            | 重置回调函数                                           | `e?: React.FormEvent<HTMLFormElement>) => void`      | 否        |

#### Field

属性继承自 `FormControl` 组件

##### 基础属性

| 参数              | 说明                                                           | 类型                                                          | 是否必须 |
| ----------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | -------- |
| required          | 是否必填，如果这项有值，会在校验规则里添加一个 `required` 规则 | `boolean \| string`                                           | 否       |
| helpDesc          | 表单项说明文案                                                 | `React.ReactNode`                                             | 否       |
| notice            | 表单项警示性文案                                               | `React.ReactNode`                                             | 否       |
| before            | 在表单项前面显示的自定义内容                                   | `React.ReactNode`                                             | 否       |
| after             | 在表单项后面显示的自定义内容                                   | `React.ReactNode`                                             | 否       |
| withoutError      | 设置不显示错误                                                 | `boolean`                                                     | 否       |
| modelRef          | 获取 `Model` 引用                                              | `React.RefObject<FieldModel<Value>>;`                         | 否       |
| validateOccasion  | 校验时机                                                       | `ValidateOccasion`                                            | 否       |
| touchWhen         | 触碰时机                                                       | `TouchWhen`                                                   | 否       |
| normalize         | 触发 onChange 时会先经过 `normalize` 再写入到内部的 `model `上 | `(value: Value, prevValue: Value) => Value`                   | 否       |
| format            | 渲染前会先经过 `format`                                        | `(value: Value) => Value`                                     | 否       |
| getValidateOption | 根据触发校验的源头获取校验规则                                 | `(source: 'blur' \| 'change') => ValidateOption \| undefined` | 否       |

##### View 模式属性

| 参数                  | 说明                                                                                   | 类型                             | 是否必须 |
| --------------------- | -------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| name                  | `View` 模式需指定字段名称                                                              | `string`                         | 是       |
| defaultValue          | 缺省值，作为没有用户输入时的值，不可变                                                 | `T \| (() => T)`                 | 否       |
| initialValue          | 初始值，在逻辑上作为字段首次展示的值，可变                                             | `T`                              | 否       |
| validators            | 校验规则列表，执行的时候会按数组顺序逐个调用，直到所有都通过或者在第一个失败的地方停止 | `IValidators<T>`                 | 否       |
| destroyOnUnmount      | 是否在组件 `unmount` 的时候清除数据                                                    | `boolean`                        | 否       |
| normalizeBeforeSubmit | 用于表单提交前格式化 `Field` 值的回调函数                                              | `INormalizeBeforeSubmit<T, any>` | 否       |

##### Model 模式属性

| 参数         | 说明                                | 类型                                                       | 是否必须 |
| ------------ | ----------------------------------- | ---------------------------------------------------------- | -------- |
| model        | `Model` 模式需指定字段模型          | `FieldModel<T> \| ModelRef<T, IModel<any>, FieldModel<T>>` | 是       |
| defaultValue | 仅当 model 是个 ModelRef 的时候有效 | `T \| (() => T)`                                           | 否       |
| initialValue | 仅当 model 是个 ModelRef 的时候有效 | `T`                                                        | 否       |
| validators   | 仅当 model 是个 ModelRef 的时候有效 | `IValidators<T>`                                           | 否       |

#### FieldSet

##### 基础属性

| 参数            | 说明                                                                                    | 类型                                | 是否必须 |
| --------------- | --------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| validators      | `Model` 模式需指定字段模型                                                              | `IValidators<$FieldSetValue<T>>`    | 否       |
| modelRef        | 获取 `Model` 引用                                                                       | `React.RefObject<FieldSetModel<T>>` | 否       |
| renderError     | 用于渲染整个 `FieldSet` 层面的错误                                                      | `IRenderError<T>`                   | 否       |
| scrollAnchorRef | 表单提交时滚动到错误时的 `DOM` 元素的 `ref` (来自 `React.createRef` 或 `React.useRef` ) | `React.RefObject<Element>`          | 否       |

##### View 模式属性

| 参数                  | 说明                                         | 类型                             | 是否必须 |
| --------------------- | -------------------------------------------- | -------------------------------- | -------- |
| name                  | `View` 模式需指定字段名称                    | `string`                         | 是       |
| destroyOnUnmount      | 是否在组件 `unmount` 的时候清除数据          | `boolean`                        | 否       |
| normalizeBeforeSubmit | 用于表单提交前格式化 `FieldSet` 值的回调函数 | `INormalizeBeforeSubmit<T, any>` | 否       |

##### Model 模式属性

| 参数  | 说明                       | 类型               | 是否必须 |
| ----- | -------------------------- | ------------------ | -------- |
| model | `Model` 模式需指定字段模型 | `FieldSetModel<T>` | 是       |

#### FormControl

| 参数         | 说明                                                                             | 类型                  | 是否必须 |
| ------------ | -------------------------------------------------------------------------------- | --------------------- | -------- |
| className    | 类名                                                                             | `string`              | 否       |
| sytle        | 样式                                                                             | `React.CSSProperties` | 否       |
| required     | 是否必填，仅控制 UI 的展示                                                       | `boolean`             | 否       |
| label        | 表单项的名称                                                                     | `React.ReactNode`     | 否       |
| withoutLabel | 默认不传 `label` 的时候也会留有 `label` 的空间，使用 `withoutLabel` 去掉这个留空 | `boolean`             | 否       |

#### CombineErrors

##### 基础属性

| 参数     | 说明 | 类型                                           | 是否必须 |
| -------- | ---- | ---------------------------------------------- | -------- |
| children | 类名 | `(error: IMaybeError<any>) => React.ReactNode` | 否       |

##### View 模式

| 参数  | 说明     | 类型       | 是否必须 |
| ----- | -------- | ---------- | -------- |
| names | 字段名称 | `string[]` | 是       |

##### Model 模式

| 参数   | 说明     | 类型                | 是否必须 |
| ------ | -------- | ------------------- | -------- |
| models | 字段模型 | `BasicModel<any>[]` | 是       |

#### FormError

| 参数      | 说明 | 类型                  | 是否必须 |
| --------- | ---- | --------------------- | -------- |
| className | 类名 | `string`              | 否       |
| sytle     | 样式 | `React.CSSProperties` | 否       |

#### FormLabel

| 参数     | 说明     | 类型      | 是否必须 |
| -------- | -------- | --------- | -------- |
| required | 是否必填 | `boolean` | 否       |

#### FormNotice

| 参数      | 说明 | 类型                  | 是否必须 |
| --------- | ---- | --------------------- | -------- |
| className | 类名 | `string`              | 否       |
| sytle     | 样式 | `React.CSSProperties` | 否       |

#### FormDescription

| 参数      | 说明 | 类型                  | 是否必须 |
| --------- | ---- | --------------------- | -------- |
| className | 类名 | `string`              | 否       |
| sytle     | 样式 | `React.CSSProperties` | 否       |

#### ValidateOption

- `ValidateOption.Empty`：仅在表单项被触碰过时才会校验自身
- `ValidateOption.Default`：等同于`ValidateOption.Empty`
- `ValidateOption.IncludeAsync`：校验时包含异步校验
- `ValidateOption.IncludeUntouched`：仅对满足`!!model.touched() === true`的字段进行校验
- `ValidateOption.IncludeChildrenRecursively`：递归校验下层的 `Field`，适用于直接从 `FieldSet` 和 `FieldArray` 触发的校验
- `ValidateOption.ExcludePristine`：不校验没有修改过的 `Field`
- `ValidateOption.StopPropagation`：禁止校验的冒泡行为（类似事件冒泡）

#### ValidatorMiddlewares

- `when`：条件校验
- `whenAsync`：条件校验的异步版本
- `message`：动态生成校验信息

#### useFieldValue / useFieldValid

##### View 模式

| 参数  | 说明     | 类型     | 是否必须 |
| ----- | -------- | -------- | -------- |
| field | 字段名称 | `string` | 是       |

##### Model 模式

| 参数  | 说明     | 类型     | 是否必须 |
| ----- | -------- | -------- | -------- |
| model | 字段模型 | `IModel` | 是       |

#### FieldValue / FieldValid

##### 基础属性

| 参数     | 说明     | 类型                                       | 是否必须 |
| -------- | -------- | ------------------------------------------ | -------- |
| children | 渲染函数 | `(value: T) => React.ReactElement \| null` | 否       |

##### View 模式

| 参数 | 说明     | 类型     | 是否必须 |
| ---- | -------- | -------- | -------- |
| name | 字段名称 | `string` | 是       |

##### Model 模式

| 参数  | 说明     | 类型     | 是否必须 |
| ----- | -------- | -------- | -------- |
| model | 字段模型 | `IModel` | 是       |
