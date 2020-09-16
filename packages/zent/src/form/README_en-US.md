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
- When using `FieldArray` in `View` mode, validators should be set on component, even if we are passing `model` to fields inside `FieldArray`.

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
- `FormCombinedTimeRangePickerField`
- `FormCombinedDateRangePickerField`
- `FormDateRangeQuickPickerField`

Zent also provides separate components that construct these components, including `FormControl`, `Label`, `FormError`.

### API

`Form` documentation consists of two parts：

- Zent Form components doc can be found [here](../../apidoc/classes/form.html)
- APIs not tied to Zent can be found [here](https://zent-contrib.github.io/formulr/), e.g. `useField` and other hooks, `Validators` and other low level APIs

#### Basic Usages

The `form` object has some basic capabilities：

- `form.submit` emits `submit` event explicitly. It automatically triggers the validation.
- `form.validate` triggers the validation.
- `form.patchValue` assigns value for specified fields.
- `form.initialize` assigns value for specified fields and set `initialValue` 。
- `form.reset` emits `reset` event explicitly. Reset all fields to `initialValue` . If `initialValue` does not exist, use `defaultValue`.
- `form.resetValue` Reset all fields to `initialValue` . If `initialValue` does not exist, use `defaultValue`. It doesn't emit `reset` event.
- `form.clear` Reset all fields to `defaultValue` and clear `initialValue` for them.

Note:

- `initialValue`: It's logically the first displayed value of the form component and can be updated.
- `defaultValue`: It's a value that's used when the form component has no user input and cannot be updated once the component is rendered.

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-18 -->
<!-- demo-slot-3 -->
<!-- demo-slot-15 -->

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

### `ValidatorMiddleware`

Validator middlewares ACTS on **validators**, which can be regarded as the decorators used to decorate functions. Middlewares can provide some additional capabilities for built-in validators. Using `FieldUtils.compose` can combine multiple middlewares into one.

Signature of middlewares:

```ts
type Middleware<T> = (next: IValidator<T>) => IValidator<T>;
```

#### Built-in ValidatorMiddlewares

- `when`
- `whenAsync`
- `message`

<!-- demo-slot-6 -->

### `Form` layouts

`Form` uses `flex` for layouts, provides two kind of layouts: `horizontal`， `vertical`.

<!-- demo-slot-7 -->

### `Field Array`

<!-- demo-slot-8 -->

### `Model First`

<!-- demo-slot-9 -->

### CombineErrors

Combine error display from multiple fields.

<!-- demo-slot-10 -->

### Others

<!-- demo-slot-11 -->

<!-- demo-slot-12 -->

<!-- demo-slot-13 -->

<!-- demo-slot-14 -->
