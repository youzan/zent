---
title: Form
path: component/form
group: Data Entry
scatter: true
---

## Form

### ⚠️ Warning

This is a new `Form` component, it's not compatible with the `Form` component before `7.0.0`.

The documentation for old `Form` component can be viewed [here](https://zent-contrib.github.io/zent-compat).

### Guides

`FormStrategy` is the way how form constructs.There are two kinds of form strategies, `View` and `Model`.

- Using `View` means the form data is constructed by the view structure. Under this strategy, all form components/hooks use a `name` for construct the internal model.
- Using `Model` means the form data is constructed separately, and form components/hooks use `model` object from the constructed form model.

#### `Field`

Zent provides several common field components. You can use custom field component packaged by yourself.

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

Zent also provides separate components that construct these components, including `FormControl`, `Label`, `FormError`.

### API

`Form` documentation consists of two parts：

- Zent Form components doc can be found [here](../../apidoc/classes/form.html)
- APIs not tied to Zent can be found [here](https://zent-contrib.github.io/formulr/), e.g. `useField` and other hooks, `Validators` and other low level APIs

#### Basic Usages

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### The validations of form

#### The usage of form validations

When `FormStrategy` is `View`, second parameter of `useField` and third parameter of `useArrayField` accepts a optional validator array.

Custom form validation function:

```ts
function validate<T>(
	value: T,
	ctx: ValidatorContext
): IMaybeError<T> | Promise<IMaybeError<T>> | Observable<IMaybeError<T>>;
```

- returning null represents no error, return error object if it is not valid.
- returning a `Promise` of `Observable` is supported for asynchronous validation.

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->

#### Built-in rules

- [min](https://zent-contrib.github.io/formulr/globals.html#min)
- [max](https://zent-contrib.github.io/formulr/globals.html#max)
- [required](https://zent-contrib.github.io/formulr/globals.html#required)
- [requiredTrue](https://zent-contrib.github.io/formulr/globals.html#requiredtrue)
- [email](https://zent-contrib.github.io/formulr/globals.html#email)
- [minLength](https://zent-contrib.github.io/formulr/globals.html#minlength)
- [maxLength](https://zent-contrib.github.io/formulr/globals.html#maxlength)
- [pattern](https://zent-contrib.github.io/formulr/globals.html#pattern)

### `Form` layouts

`Form` uses `flex` for layouts, provides two kind of layouts: `horizontal`， `vertical`.

<!-- demo-slot-6 -->

### `Field Array`

<!-- demo-slot-7 -->

### `Model First`

<!-- demo-slot-8 -->

### CombineErrors

Combine error display from multiple fields.

<!-- demo-slot-9 -->

### Others

<!-- demo-slot-10 -->

<!-- demo-slot-11 -->

<!-- demo-slot-12 -->
