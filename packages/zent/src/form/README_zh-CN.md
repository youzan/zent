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

### API

`Form` 的文档分为两部分：

- 和 Zent 相关的组件 API 文档可以在[这里搜索查看](../../apidoc/classes/form.html)。
- 其他和 Zent 无关的 [API 文档](https://zent-contrib.github.io/formulr/)，例如 `useField` 等 hooks 、`Validators` 以及其他底层基础组件。

#### Form 的运行模式

**这是使用 `Form` 时的一个非常重要的概念，请一定理解清楚。**

`Form` 有两种运行模式(`FormStrategy`)，`View` 和 `Model`。`FormStrategy` 指明了表单是由视图驱动的还是独立数据驱动。

- 当使用 `View` 模式时，表单项组件和 `hooks` 接受一个 `name` 参数，根据 `name` 构建内部数据结构。
- 当使用 `Model` 时，数据结构是在表单外构建的，表单的组件和 `hooks` 必须直接传入该字段对应的 `model`。

**不同模式下表单项会有一些参数不同。**

#### 基础使用方法

所有表单组件必须包裹在一个 `Form` 组件内部，`Form` 组件的参数请[参考这里](../../apidoc/interfaces/iformprops.html)。每一个表单项对应一个 `Field`，我们已经内置了 Zent 组件对应的 `Field` 组件；也可以使用自己封装的自定义表单项组件。

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
- `FormDateRangeQuickPickerField`

`Field` 组件支持的完整参数列表可以[参考这里](../../apidoc/interfaces/iformfieldpropsbase.html)，以及[这里除 `invalid` 之外的参数](../../apidoc/interfaces/iformcontrolprops.html)；这些都是两种模式下通用的参数。

- `View` 模式还支持[以下参数](../../apidoc/interfaces/iformfieldviewdrivenprops.html)
- `Model` 模式还支持[以下参数](../../apidoc/interfaces/iformfieldmodeldrivenprops.html)。注意，此模式下校验规则是设置在 model 上的，而不是表单项组件上

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### 表单校验

通过 `Field` 上的 `validators` 参数来设置表单项的校验规则；也可以在 `FieldArray` 或者 `FieldSet` 上设置校验规则，这是高级用法，请[参考这一节](#fei-field-ceng-ji-de-xiao-yan)。

表单校验函数定义:

```ts
function validate<T>(
	value: T,
	ctx: ValidatorContext
): IMaybeError<T> | Promise<IMaybeError<T>> | Observable<IMaybeError<T>>;
```

- 如果返回 `null` 或者 `undefined` 表示校验通过；当校验失败时返回一个[包含错误信息的对象](https://zent-contrib.github.io/formulr/interfaces/ivalidateresult.html)。
- 支持返回 `Promise` 或 `Observable` 进行异步校验
- 使用 `Form.createAsyncValidator` 来创建一个异步校验函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#createasyncvalidator)；通过 `Form.isAsyncValidator` 来判断函数是不是异步校验函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#isasyncvalidator)
- 通过 `Field` 的 `validateOccasion` 参数控制校验时机
- 通过 `Field` 的 `getValidateOption` 参数控制校验规则的运行时机以及哪些校验规则需要运行

#### 内置的校验规则

- [`Validators.min`](https://zent-contrib.github.io/formulr/globals.html#min)
- [`Validators.max`](https://zent-contrib.github.io/formulr/globals.html#max)
- [`Validators.required`](https://zent-contrib.github.io/formulr/globals.html#required)
- [`Validators.requiredTrue`](https://zent-contrib.github.io/formulr/globals.html#requiredtrue)
- [`Validators.email`](https://zent-contrib.github.io/formulr/globals.html#email)
- [`Validators.minLength`](https://zent-contrib.github.io/formulr/globals.html#minlength)
- [`Validators.maxLength`](https://zent-contrib.github.io/formulr/globals.html#maxlength)
- [`Validators.pattern`](https://zent-contrib.github.io/formulr/globals.html#pattern)

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->

### `Form` 布局

`Form` 组件使用 `flex` 布局，提供两种简单的样式：水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-6 -->

### `useFieldArray` 和 `FieldSet`

- `useFieldArray` 用于封装一组一样的表单项处理逻辑；`FieldSet` 用来封装一组相关的表单项处理逻辑。

- 注意并没有所谓的 `FieldArray` 组件，直接使用 `Form.useFieldArray` 这个 hooks 即可。该函数有两个重载的实现，分别对应 `Form` 的两种运行模式。

- `useFieldArray` 的参数定义请[参考这里](https://zent-contrib.github.io/formulr/globals.html#usefieldarray)。

- `useFieldArray` 返回值是一个 `FieldArrayModel`，通过 `children` 就能访问到所有数据，一般在 `render` 函数里对 `children` 做 `map` 操作即可。

- `FieldArrayModel` 上还有一些操作方法，例如 `push`/ `pop` 之类的，完整列表可以在[这里查看](https://zent-contrib.github.io/formulr/classes/fieldarraymodel.html)。查看时注意右上角把 `Only exported` 选项关闭。

- `FieldSet` 组件和 `Form` 一样有两种运行模式，`View` 模式可以通过 `name` 参数指定对应的数据来源；`Model` 模式则通过 `model` 参数显式的设置数据来源。

- `FieldSet` 两种模式公用的参数可以在[这里查看](../../apidoc/interfaces/ifieldsetprops.html)；`View` 模式额外的参数可以在[这里查看](../../apidoc/interfaces/iformfieldviewdrivenprops.html)。

<!-- demo-slot-7 -->

### 从 Model 构建表单

使用 `Form` 的 `Model` 模式需要自己手动创建 model，我们提供了 builder API 来帮助完成这个操作。每个函数返回的都是一个 `Builder` 对象，`Builder` 对象都有一个 `validators` 方法用来配置 model 的校验规则。**Builder API 都支持链式调用**。

- `Form.form` 参数是个对象，用来描述整个 `Form` model 的结构, [查看函数定义](https://zent-contrib.github.io/formulr/globals.html#form)
- `Form.field` 参数是 `Field` 的默认值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#field)
- `Form.set` 参数是个对象，用来描述这个表单集合的结构，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#set)
- `Form.array` 参数是一个其他函数返回的 `Builder` 对象，`array` 返回的 `Builder` 对象上有 `defaultValue` 用于设置这个 array 中的表单项的默认值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#array)

<!-- demo-slot-8 -->

### CombineErrors

这个组件用来将多个字段的错误聚合成一个错误展示，需要配合 `Field` 的 `withoutError` 参数使用。

<!-- demo-slot-9 -->

### 表单值的格式化

可以通过 `normalize` 和 `format` 参数来格式化 `Field` 的输入输出。

<!-- demo-slot-10 -->

### 读取表单值

试想一个使用场景：我们要实现一个活动编辑器，右侧是编辑框，左侧是实时预览；这种场景下除了需要一个地方来输入表单的各个值之外，还需要在另外一个地方读取这些表单值。

我们提供了一套统一的简单易用，并且使用姿势和 `Field` 非常相似的 API 来实现组件值的按需读取。这些组件只会监听所需的数据变化，不会因为没有监听的表单项变化了而产生重绘。

- `Field` 组件对应 `FieldValue`，`View` 模式下指定一个 `name`；`Model` 模式下指定一个 `model`
- `FieldSet` 组件对应 `FieldSetValue`，只有一个 `name` 参数；如果是 `Model` 模式下已经拿到对应的 model 对象了，那么直接将 `model.get(xxx)` 传给 `FieldValue` 组件即可
- `useFieldArray` 对应 `useFieldArrayValue`，`View` 模式下指定一个 `name`；`Model` 模式下指定一个 `model`

<!-- demo-slot-11 -->

### 非 `Field` 层级的校验

`FieldSet` 和 `FieldArray` 和 `Field` 一样可以设置校验规则，这些校验规则是运行在 `FieldSet` 和 `FieldArray` 层级的，能拿到下层的所有数据，可以用来实现跨 `Field` 的校验。

<!-- demo-slot-12 -->

### `Control`, `Label` 以及 `Error` 组件

实现自定义 `Field` 的时候会用到这些组件，它们只是样式组件，用来提供和内置 `Field` 组件一致样式和参数。

- `Control` 封装了 label、自定义组件以及错误信息的结构，[查看文档](../../apidoc/interfaces/iformcontrolprops.html)
- `Label` 表单项的 label 组件，适用于连 `Control` 也不想使用的场景，[查看文档](../../apidoc/interfaces/ilabelprops.html)
- `Error` 表单项的错误信息组件，同 `Label` 一样适用于深度自定义的场景，[查看文档](http://127.0.0.1:4396/apidoc/interfaces/iformerrorprops.html)

### `FieldUtils`

`FieldUtils` 提供一些有用的工具函数。

- useMAppend 用来按顺序调用一批函数，只使用它们的副作用，忽略返回值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usemappend)
- usePipe 用来从左往右按顺序调用一批函数，上一个函数的返回值作为下一个函数的参数，返回最后一个函数的返回值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usepipe)
- useCompositionHandler 用来在 `model` 上维护一个输入法编辑的状态, `model.isCompositing`，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usecompositionhandler)。组件内部会根据这个状态在输入法输入阶段跳过校验
- makeChangeHandler 生成一个 `onChange` 回调函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#makechangehandler)

### Hooks

`Form` 提供以下基础的 hooks，在内置的这些 `Form` 组件无法满足需要时，可以使用这些 hooks 来封装自定义的 `Form` 组件。

- `Form.useForm` [查看文档](https://zent-contrib.github.io/formulr/globals.html#useform)
- `Form.useField` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefield)
- `Form.useFieldArray` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefieldarray)
- `Form.useFieldSet` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefieldset)
