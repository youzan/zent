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

### API 文档

`Form` 的 API 较多，请直接查阅 tsdoc 生成的 API 文档，在[这里搜索查看](../../apidoc)即可。

### Form 的分层结构

为了帮助更好的理解和使用 `Form`，先从设计的角度对 `Form` 做一个概述。`Form` 设计上可以大致分为 3 层：

- 数据层：这一层在内部由一个叫 `formulr` 的内部包构成，它和 UI 无关
- React 绑定层：这一层也在 `formulr` 内，但只包含最基础的 Hooks（例如 `useField` 等），依旧和 UI 无关
- UI 层：这一层负责处理数据层和 `Zent` 组件库的适配，这一层只处理 UI 逻辑，不关心数据的具体处理逻辑

### 数据层

数据层主要由各种类型的 model, validator 以及 builder 构成。model 主要分为以下几种：

- `IModel` 这是最底层 interface，所有 model 都实现它
- `BasicModel` 这是一个 model 的基类，所有 model 都继承自它
- `FieldModel` 单个表单域的 model
- `FieldArrayModel` 一组相同表单域的 model
- `FieldSetModel` 一组有相关性的表单域，通常这些表单域作为一个整体才有意义，比如手机号的国家代码+号码
- `FormModel` 继承自 `FieldSetModel`，从数据层看就是 `FieldSetModel`，但是额外添加了一些表单顶层才需要的能力
- `ModelRef` 类似 React 的 ref 概念，它的用处是在不知道具体的 model 类型时用作占位元素。只有 `View` 模式下才会出现。

不管 model 是什么类型，一个 model 上一定维护着值、校验状态、错误信息以及 touched 等一些基础状态，以及读取/操作这些信息的方法。具体的方法和属性可以通过上面提到的 [API 文档](../../apidoc)中搜索相应的 model 类型查看。

validator 和 builder 下文会详细说明。

⚠️ 注意：不要直接操作 `FieldArrayModel` 和 `FieldSetModel` 的 `children` 属性（本身就是只读属性），请使用 model 上提供的 mutation API 操作，否则会破坏 model 内部数据一致性，导致不可预期的问题。

### Form 的运行模式

**这是使用 `Form` 时的一个非常重要的概念，请一定理解清楚。另外，我们推荐使用 `Model` 模式，而非 `View` 模式。**

在 `ModelRef` 里提到了 `Form` 的 `View` 模式，这里详细说明以下 `Form` 的两种运行模式(`FormStrategy`)，`View` 模式和 `Model` 模式。

- `View` 模式是指表单的 model 是通过 UI 的结构，由 `Form` 自动推导生成的。简单来说，先有 UI，再有 model。上面提到的 `ModelRef` 即是在一些场景下 model 还未生成时用来做占位的，所以才说 `ModelRef` 仅出现在 `View` 模式下。
- `Model` 模式则是由开发者创建好表单的 model 结构，然后作为 `Form` 的初始化参数传入的，所以是先有 model，再有 UI。

`FormStrategy` 指明了表单是由视图驱动（View 模式）的还是独立数据驱动（Model 模式），两种模式在使用 API 时也会有差异。

- 当使用 `View` 模式时，表单项组件和 `hooks` 接受一个 `name` 参数而不是一个 model。
- 当使用 `Model` 时，由于数据层是在表单外构建的，表单组件和 `hooks` 必须直接传入该字段对应的 `model`，而不是 `name`。
- 除了上述区别之外，**不同模式下表单组件以及 `hooks` 会有一些参数不同**，具体请查阅 [API 文档](apidoc)。

### 常用 `Form` API

`form` 对象具备一些基础的能力：

- `form.submit()` 显式触发表单提交事件，会自动触发表单校验。
- `form.isSubmitting` 表单是否在提交中。
- `form.isSubmitFailed` 表单上一次提交是否失败。
- `form.isSubmitSucceeded` 表单上一次提交是否成功。
- `form.validate()` 触发一次表单校验。
- `form.isValid()` 表单是否通过校验，不会自动触发 `form.validate`。
- `form.isValidating()` 表单是否正在校验过程中。
- `form.model` 获取表单对应的 model 对象。
- `form.getValue()` 获取表单当前的值。
- `form.getSubmitValue()` 获取表单当前的值，用于需要在提交前通过 `normalizeBeforeSubmit` 格式化表单值的场景。
- `form.patchValue()` 更新给定字段的值。
- `form.initialize()` 初始化表单值，同时将这个值作为表单的 `initialValue` 。
- `form.resetValue()` 将所有字段重置为 `initialValue` ，不会触发表单事件，如果 `initialValue` 不存在，则使用 `defaultValue` 。
- `form.clear()` 将所有字段赋值为 `defaultValue` ，同时清空 `initialValue` 。
- `form.reset()` 显式触发表单重置事件 。

#### `defaultValue` vs `initialValue`

- `initialValue`：初始值，在逻辑上作为表单首次展示的值，可以被更新。
- `defaultValue`：缺省值，在表单没有输入时使用的值，组件一旦渲染就不可再被更新。

### Hooks

`Form` 提供以下基础的 hooks，在内置的这些 `Form` 组件无法满足需要时，可以使用这些 hooks 来封装自定义的 `Form` 组件。

- `Form.useForm` [查看文档](https://zent-contrib.github.io/formulr/globals.html#useform)
- `Form.useField` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefield)
- `Form.useFieldArray` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefieldarray)
- `Form.useFieldSet` [查看文档](https://zent-contrib.github.io/formulr/globals.html#usefieldset)

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
- `FormCombinedTimeRangePickerField`
- `FormCombinedDateRangePickerField`
- `FormDateRangeQuickPickerField`

`Field` 组件支持的完整参数列表可以[参考这里](../../apidoc/interfaces/iformfieldpropsbase.html)，以及[这里除 `invalid` 之外的参数](../../apidoc/interfaces/iformcontrolprops.html)；这些都是两种模式下通用的参数。

- `View` 模式还支持[以下参数](../../apidoc/interfaces/iformfieldviewdrivenprops.html)。
- `Model` 模式还支持[以下参数](../../apidoc/interfaces/iformfieldmodeldrivenprops.html)。注意，此模式下校验规则正常是设置在 model 上的，而不是表单项组件上。
- 在 `View` 模式下使用 `FieldArray` 时，由于该组件的特殊性，虽然此时传给 `Field` 的是 `model`（按上述规则这就是 `Model` 模式），但是校验规则还是需要设置在表单项上。
- 如果需要给 `Field` 封装的组件传递 props，需要将所有 props 通过 `props` 传递，例如 `<FormInputField props={{ spellCheck: false }} />`，`spellCheck` 将会被透传到 `Input` 组件上；如果直接写在 `FormInputField` 上不会生效。

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-15 -->

### 表单校验

通过 `Field` 上的 `validators` 参数来设置表单项的校验规则；也可以在 `FieldArray` 或者 `FieldSet` 上设置校验规则，这是高级用法，请[参考这一节](#fei-field-ceng-ji-de-xiao-yan)。

表单校验函数定义:

```ts
type AsyncValidator<T> = (
	value: T,
	ctx: ValidatorContext<T>
) => Promise<IMaybeError<T>> | Observable<IMaybeError<T>> | null;

type SyncValidator<T> = (value: T, ctx: ValidatorContext<T>) => IMaybeError<T>;
```

- 如果返回 `null` 或者 `undefined` 表示校验通过；当校验失败时返回一个[包含错误信息的对象](https://zent-contrib.github.io/formulr/interfaces/ivalidateresult.html)。
- 支持返回 `Promise` 或 `Observable` 进行异步校验
- 使用 `Form.createAsyncValidator` 来创建一个异步校验函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#createasyncvalidator)；通过 `Form.isAsyncValidator` 来判断函数是不是异步校验函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#isasyncvalidator)
- 通过 `Field` 的 `validateOccasion` 参数控制校验时机
- 通过 `Field` 的 `getValidateOption` 参数控制校验规则的运行时机以及哪些校验规则需要运行
- `validator` 的执行顺序是 `validators` 数组的元素顺序，通常建议把异步校验放在最后

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

### 非 `Field` 层级的校验

`FieldSet` 和 `FieldArray` 和 `Field` 一样可以设置校验规则，这些校验规则是运行在 `FieldSet` 和 `FieldArray` 层级的，能拿到下层的所有数据，可以用来实现跨 `Field` 的校验。

<!-- demo-slot-13 -->

### 校验选项

校验选项共有以下几种：

- `ValidateOption.Empty`：默认行为
- `ValidateOption.Default`：等同于`ValidateOption.Empty`
- `ValidateOption.IncludeAsync`：校验时包含异步校验
- `ValidateOption.IncludeUntouched`：仅对满足`!!model.touched() === true`的字段进行校验
- `ValidateOption.IncludeChildrenRecursively`：递归校验下层的 `Field`，适用于直接从 `Form`，`FieldSet` 或者 `FieldArray` 触发的校验
- `ValidateOption.ExcludePristine`：不校验没有修改过的 `Field`
- `ValidateOption.StopPropagation`：禁止校验的冒泡行为（类似事件冒泡）

校验选项是一个 `BitSet`，在自定义表单组件中，使用 `Model` 上的 `validate` 方法进行校验时，使用 `|` 运算符联合所需的选项作为参数传入即可。

不传参数调用 `form.validate()` 等价于 `form.validate(ValidateOption.Default | ValidateOption.IncludeChildrenRecursively)`。如果调用 `form.validate` 时手动指定校验选项的话需要自行设置需要的所有选项，包括默认的两个选项。

<!-- demo-slot-16 -->

### 校验中间件

校验中间件作用于**校验函数本身**，可以把它视作用来装饰函数的装饰器；通过中间件可以为内置的校验函数提供一些额外能力，例如条件校验；使用 `FieldUtils.compose` 可以将多个中间件组合成一个；

校验中间件的函数签名：

```ts
type Middleware<T> = (next: IValidator<T>) => IValidator<T>;
```

#### 内置的校验中间件

- `when` 满足条件时才执行校验逻辑
- `whenAsync` 同 `when`，适用于移步校验函数
- `message` 根据值返回动态的错误信息

<!-- demo-slot-6 -->

#### 订阅校验状态

这个功能虽然不是很常用，但是 Zent 提供了 2 种监听表单校验状态的方法：

- `Form.FieldValid`：接收 `name` 或 `model`，将其校验状态作为 `children` 的第一个参数
- `Form.useFieldValid`：接收 `name` 或 `model`，返回其校验状态
- `Form.useFormValid`：接收 `ZentForm` 对象（即 `useForm` 的返回值），返回表单的校验状态

<!-- demo-slot-19 -->

### `useFieldArray` 和 `FieldSet`

- `useFieldArray` 用于封装一组一样的表单项处理逻辑；`FieldSet` 用来封装一组相关的表单项处理逻辑。

- 注意并没有所谓的 `FieldArray` 组件，直接使用 `Form.useFieldArray` 这个 hooks 即可。该函数有两个重载的实现，分别对应 `Form` 的两种运行模式。

- `useFieldArray` 的参数定义请[参考这里](https://zent-contrib.github.io/formulr/globals.html#usefieldarray)。

- `useFieldArray` 返回值是一个 `FieldArrayModel`，通过 `children` 就能访问到所有数据，一般在 `render` 函数里对 `children` 做 `map` 操作即可。

- `FieldArrayModel` 上还有一些操作方法，例如 `push`/ `pop` 之类的，完整列表可以在[这里查看](https://zent-contrib.github.io/formulr/classes/fieldarraymodel.html)。查看时注意右上角把 `Only exported` 选项关闭。

- `FieldSet` 组件和 `Form` 一样有两种运行模式，`View` 模式可以通过 `name` 参数指定对应的数据来源；`Model` 模式则通过 `model` 参数显式的设置数据来源。

- `FieldSet` 两种模式公用的参数可以在[这里查看](../../apidoc/interfaces/ifieldsetprops.html)；`View` 模式额外的参数可以在[这里查看](../../apidoc/interfaces/iformfieldviewdrivenprops.html)。

<!-- demo-slot-8 -->

### Builder API 和 Model 模式

使用 `Form` 的 `Model` 模式需要自己手动创建 model，我们提供了 builder API 来帮助完成这个操作。每个函数返回的都是一个 `Builder` 对象，`Builder` 对象都有一个 `validators` 方法用来配置 model 的校验规则。**Builder API 都支持链式调用**。

- `Form.form` 参数是个对象，用来描述整个 `Form` model 的结构, [查看函数定义](https://zent-contrib.github.io/formulr/globals.html#form)
- `Form.field` 参数是 `Field` 的默认值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#field)
- `Form.set` 参数是个对象，用来描述这个表单集合的结构，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#set)
- `Form.array` 参数是一个其他函数返回的 `Builder` 对象，`array` 返回的 `Builder` 对象上有 `defaultValue` 用于设置这个 array 中的表单项的默认值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#array)

<!-- demo-slot-9 -->

### 表单值的格式化

- 可以通过 `normalize` 和 `format` 参数来格式化 `Field` 的输入输出
- 也可以使用 `normalizeBeforeSubmit` 属性和 `form.getSubmitValue()` 方法，在不改变 model 内存储值的情况下修改表单提交的值

<!-- demo-slot-11 -->

### 读取/订阅表单值

试想一个使用场景：我们要实现一个活动编辑器，右侧是编辑框，左侧是实时预览；这种场景下除了需要一个地方来输入表单的各个值之外，还需要在另外一个地方读取这些表单值。我们提供了一套统一的简单易用，并且使用姿势和 `Field` 非常相似的 API 来实现组件值的按需读取。这些组件只会监听所需的数据变化，不会因为没有监听的表单项变化了而产生重绘。

- `Field` 组件对应 `FieldValue`，`View` 模式下指定一个 `name`；`Model` 模式下指定一个 `model`
- `FieldSet` 组件对应 `FieldSetValue`，只有一个 `name` 参数；如果是 `Model` 模式下已经拿到对应的 model 对象了，那么直接将 `model.get(xxx)` 传给 `FieldValue` 组件即可
- `Form.useFieldArray` 对应 `useFieldArrayValue`，`View` 模式下指定一个 `name`；`Model` 模式下指定一个 `model`。注意，它只会监听 `children` 的增、删行为，不会监听 `children` 内部的变动
- `Form.useFieldValue` 提供了一种 hooks 的风格来获取表单值（包括 FieldSet、FieldArray、Field），它可以深度监听表单值
- `Form.useFormValue` 提供了一种 hooks 的风格来获取整个表单的值，它可以深度监听表单值

⚠️ 注意：订阅单个表单项的值一般不会有什么问题，但是订阅 `FieldArray`, `FieldSet` 或者 `Form` 的值时需要谨慎，因为这些是容器类型，订阅它们意味着需要订阅它们内部包含的所有表单项的变化，这是一个非常耗资源并且影响性能的操作，所以不推荐大范围频繁使用。针对这个问题，开发模式下会有一个警告信息来提醒使用者。

<!-- demo-slot-12 -->
<!-- demo-slot-20 -->

### 通过 Model 订阅数据

由于 `useFieldValue` 依赖了 `FormContext` ，因此在表单外部监听数据变更无法通过它来实现。此时可以使用 `useModelValue` 来对 model 进行订阅，类似的 Hook 还有 `useModelValid`，它们的内部实现不依赖 `FormContext` ，可以在任意组件内监听任意字段的数据变更（只需要获取到字段的 model 引用）。

<!-- demo-slot-21 -->

### 表单值联动

<!-- demo-slot-14 -->

### 自定义表单项

实现自定义 `Field` 的时候会用到这些组件，它们只是样式组件，用来提供和内置 `Field` 组件一致样式和参数。

- `Control` 封装了 label、自定义组件以及错误信息的结构，[查看文档](../../apidoc/interfaces/iformcontrolprops.html)
- `Label` 表单项的 label 组件，适用于连 `Control` 也不想使用的场景，[查看文档](../../apidoc/interfaces/ilabelprops.html)
- `Error` 表单项的错误信息组件，同 `Label` 一样适用于深度自定义的场景，[查看文档](../../apidoc/interfaces/iformerrorprops.html)
- `useFormChild` 使用上述组件时，如果希望支持自动滚动到错误处，需要在组件内使用这个 Hook 关联 model 和 DOM 节点，[查看文档](../../apidoc/globals.html#useformchild)
- `CombineErrors` 这个组件用来将多个字段的错误聚合成一个错误展示，需要配合 `Field` 的 `withoutError` 参数使用。

<!-- demo-slot-18 -->
<!-- demo-slot-3 -->
<!-- demo-slot-10 -->

### `Form` 布局

`Form` 组件使用 `flex` 布局，提供两种简单的样式：水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-7 -->

### 表单上下文

使用`FormContext`对整个表单的行为进行控制，目前支持对`Label`组件进行样式自定义

```ts
interface IZentFormContext {
	labelStyle?: CSSProperties;
}
```

<!-- demo-slot-17 -->

### `FieldUtils`

`FieldUtils` 提供一些有用的工具函数。

- useMulti 用来按顺序调用一批函数，只使用它们的副作用，忽略返回值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usemulti)
- usePipe 用来从左往右按顺序调用一批函数，上一个函数的返回值作为下一个函数的参数，返回最后一个函数的返回值，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usepipe)
- useCompositionHandler 用来在 `model` 上维护一个输入法编辑的状态, `model.isCompositing`，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#usecompositionhandler)。组件内部会根据这个状态在输入法输入阶段跳过校验
- makeChangeHandler 生成一个 `onChange` 回调函数，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#makechangehandler)
- compose 与 usePipe 类似，区别是 usePipe 作为 hook 使用，而 compose 可以用在任何地方，例如组合多个校验函数中间件，[查看函数定义](https://zent-contrib.github.io/formulr/globals.html#compose)
