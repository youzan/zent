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

`Form` 有两种运行模式(`FormStrategy`)，`View`和`Model`。`FormStrategy`指明了表单是由视图驱动的还是独立数据。

当使用`View`时，表单的组件和`hooks`接受一个`name`参数，根据`name`构建内部数据结构。

当使用`Model`时，数据结构是在表单外构建的，表单的组件和`hooks`必须直接传入该字段对应的`model`。

#### 表单域 `Field`

`Form` 组件中内置了常用的表单元素组件，也可以使用单独封装的自定义表单元素组件。

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

Zent 还提供了组合内置表单组件的基础组件，包括`FormControl`, `Label`, `FormError`。

#### 基础使用方法

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### 表单校验

#### 表单校验的使用

当`FormStrategy`是`View`，`useField`第二个参数和`useFieldArray`第三个参数支持传入 `Validator`数组来指定校验规则和校验提示；

表单校验函数定义:

```ts
function validate<T>(
	value: T,
	ctx: ValidatorContext
): IMaybeError<T> | Promise<IMaybeError<T>> | Observable<IMaybeError<T>>;
```

- 如果返回 `null` 表示校验通过，当校验失败时返回一个包含错误信息的对象。
- 支持返回`Promise`或`Observable`进行异步校验

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->

### 其他

### `Form` 布局

`Form` 组件使用`flex`布局，提供两种简单的样式：水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-6 -->

### `Field Array`

<!-- demo-slot-7 -->

### 从 Model 构建表单

<!-- demo-slot-8 -->

### CombineErrors

将多个字段的错误聚合到一起。

<!-- demo-slot-9 -->

### 其他

<!-- demo-slot-10 -->

<!-- demo-slot-11 -->

<!-- demo-slot-12 -->
