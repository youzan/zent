---
title: Form
path: component/form
group: Data Entry
scatter: true
---

## Form

1. [Guides](#guides)
2. [The validations of form](#the-validations-of-form)
3. [The format of value](#the-format-of-value)
4. [The operations of form](#the-operations-of-form)
5. [Others](#others)
6. [The internal realization of form](#the-internal-realization-of-fo)
7. [Other instructions](#other-instructions)
8. [API](#api)


### Guides

#### `Form`

- `Form` provides three kind of layouts: `inline`，`horizontal`， `vertical`.
- To use the `Form` component, you must first wrap it with `createForm` method, which will inject `zentForm` into the form and provide various operations of field and form. See more details in demos and [`zentForm` API] (#zentform).


#### `Field`

The `Field` component is essentially an ancillary component that only manages information such as the life cycle of the field's value and the error of the field. It does not provide any style.

- Property `name` is required when using `Field`;
- The representation of `Field` is determined by the component passed in by proptery `component`. In addition, `Form` provides several common field components. You can use custom field component packaged by yourself.
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
- `Form` also provides the `getControlGroup` method for quickly packaging custom field component. See more details in the demos and the [`getControlGroup` API] (#form-getcontrolgroup).

Note: The name of the `format` prop in date related picker components is changed to `dateFormat` because it conflicts with the `format` prop in `Field`. And `format` in `FormTimePickerField` and `FormTimeRangePickerField` is changed to `timeFormat`.

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->

#### Package custom field using `getControlGroup`

<!-- demo-slot-3 -->

#### Package multiple elements

When a `Field` needs to contains multiple elements, it is recommended to assemble the values of multiple elements into one object and passed it to the `Field` component. When using `getControlGroup` is not possible to satisfy your package requirements, you can wrap the component yourself and change the value of the field by calling the `onChange` function passed in by the `Field` component.

⚠️Ps：Calling the `onChange` function passed in by `Field` will override the original value. You can pass the second parameter as `{merge: true}` to `onChange` function, which will partially override the original value.

<!-- demo-slot-4 -->

### The validations of form

#### The usage of form validations

- The `Field` component supports passing `validations` and `validationErrors` to specify the validation rules and validation prompts;
- `validations` provides several internal validation rules(See more detail in section [Built-in validation rules](#built-in-validation-rules). It also supports custom validation function. When the validation function returns `true`, it is indicates that the validation is passed;
- Internal validation rules can be extended through using `Form.createForm`, which is explained in [`Form.createForm` API](#form-createform) 。
- When any field is validated, all of the other fields will be validated. If you want to change this default behavior, you can set the `relatedFields` property of `Field` as an array of fields' names so that when the current field is validated, only those specified fields will be valiated.

<!-- demo-slot-5 -->

#### Different timing when the validations are triggered

The default timing of validations is when the value of field changes. You can change the timing when the validation is triggered by specifing `validateOnChange`, `validateOnBlur`. For example, the field will trigger the validation in blur when set `validateOnChange` to be `false` and `validateOnBlur` to be `true`. Notice that these property are typically for input fields.

If you want to validate the form when submitting, yoy should set `validateOnChange` and `validateOnBlur` to be `false` and the built-in `handleSubmit` method to submit the form。If you don't want to use `handleSubmit`, you should use `zentForm.validateForm(true, callback)` to tigger the validations of form by yourself and deal with the submitting logic in `callback`. If you want to determine the show logic of error messages, you can set the property `displayError` of the field.

<!-- demo-slot-6 -->

#### Asynchronous validations

Asynchronous validations is usually triggered on blur. If you need to manually trigger asynchronous validations in a custom component, you need to call `props.onBlur (event)` yourself.  `value` can be passed to the function directly as the `event` parameter or an attribute of `event`.

If you submit a form without operating the fields that have asynchronous validations, these asynchronous validations will not be triggered by default. Using the built-in `handleSubmit` method for submitting will help to trigger the asynchronous verifications which have never been triggered. If you don't want to use `handleSubmit` method, you should use the `zentForm.isFormAsyncValidated` method to judge wheather the form has been asynchronous validated. Depending on the result, you should choose whether to use the `zentForm.asyncValidateForm (resolve, reject)` method to force the asynchronous validations of the form.

<!-- demo-slot-7 -->

### The format of `value`

The `Form` component provides` format` and `nomalize` methods for formatting` value`. The timing of their implementation is detailed in [The life-circle of value in Field](#the-life-circle-of-value-in-fi)。

<!-- demo-slot-8 -->

### The operations of form

- `Form.createForm` helps injecting the `zentForm` property into a component, which providing various methods for manipulating form and field, such as getting the values of form, resetting the values and so on. See more details in [zenForm API](#zentform);
- The submission process of form, which is the function `handleSubmit`, is also encapsulated in `Form` component. You can encapsulate the asynchronous commit process in a function and **return a Promise object **. Then `Form` components will call the `onSubmitSuccess` method and the `onSubmitFail` methods according to the results of the Promise object and maintains the updates of the `isSubmitting` property (`isSubmitting` is available via `zentForm.isSubmitting ()`). Otherwise, the form will scroll to the first error field automatically when submitting by setting the property `srcollToError`.

<!-- demo-slot-9 -->
<!-- demo-slot-10 -->

### Others

#### `Form` layouts

`Form` provides three kind of layouts: `inline`，`horizontal`， `vertical`.

<!-- demo-slot-11 -->

#### `Fieldset`

<!-- demo-slot-12 -->

#### `FormSection`

When there are several similar sections of fields in your form, you can use `FormSection` to reuse these fields. With `FormSection`, the values of form is a nested object. See more details in [`Form.FormSection` API](#form-formsection)。

<!-- demo-slot-13 -->

#### `FieldArray`

`FieldArray` helps to render an array of identical fields. You can add and delete the cell fields in the array, similary to the addition and deletion of elements in an array.

`FieldArray` injects the `fields` property for its `component`, which provides the traversal, addition, deletion and other operations of cell fields. See more details in [`Form.FieldArray` API](#form-fieldarray)。

<!-- demo-slot-14 -->

### The internal realization of form

The core components of form are as follows:

- The `createForm` function: It is used to build a higher-order component which maintains an instance of all the form elements (the` Field` component) in the form. The subcomponent will get various methods of manipulating form and form elements by injecting `zentForm` into the subcomponents through `props`.
- The `Form` component: As the toppest skeleton of the entire form, `Form` is a simple package of the `<form>` tag. The `Form` also defines the default class which provides base style.
- The `Field` component: It is a higher-order component which packages various fields, such as `Input`, `Checkbox`, `Select` and various custom components. The component will maintains the value and validation error of the field. The `Field` component also passes the encapsulated callback function of `onChange`, `onBlur` and the properties that are required by fields to form element components, such as `value`, `error` and so on.

See more details in [API](#api).

### Other instructions

#### Package custom fields

- The display of `Field` is entirely controlled by the `component` property which is passed into the component. This component can receive all the properties which are passed in from `Field` (including some implicit properties constructed in `Field`, which is described in detail in [`Form.Field` API](#form-field).

- For some popular form components in `zent`, the `Form` component provides several build-in components through the `getControlGroup` function. If there are some special requirements in your product design, you can also directly use the `getControlGroup` to package your own custom field components. See more details in the demo [Package multiple elements](#package-multiple-elements).

- **If you need to display multiple form elements in a single `Field`, you can use an object which is consists of all these values and pass it into the `Field` as the property `value`. See more details in the demo [Package multiple elements](#package-multiple-elements).**

#### The life-circle of `value` in `Field`

- The initial value of the `Field` needs to be passed in by specifying `value`. The life-circle of `value` is shown below:

```
pass value into Field ---> format the value using format() ---> use the value after fomatting to render
															 ↑                                     |
															 |                                     ↓
															 |                      The user changes the value by operationZ
															 |                                     |
															 |                                     ↓
		pass the value after normalizing to form for sumitting <--- format the value using normalize()
```

- If the `value` passed into the `Field` is a dynamic value, the life-cicle will restart after the value is changed externally.

### API

#### **`Form`**

`Form` is a simple package of the `form` tag. It provides a default class name.

| Property     |  Description  | Type     | Default  | Required |
|------|------|------|--------|--------|
| className | The custom class name | string | `''` | no |
| prefix | The custom prefix | string | `'zent'` | no |
| vertical | Whether to use the vertical layout | boolean  | `true` | no |
| horizontal | Whether to use the horizontal layout  | boolean  | `false` | no |
| inline | Whether to use the inline layout | boolean | `false` | no |
| onSubmit | The callback function that is triggered when the form is submitted. | func(e:Event) | `noop` | no |
| style | The style of form | object | null | no |
| disableEnterSubmit | Whether to disable the enter event to submit the form | boolean | `true` | no |

#### **`Form.createForm`**

##### **Use this function as follows：`Form.createForm(options)(FormComponent)`**

##### **`options`**

`options` supports the following configuartion items:

| Property     |  Description  | Type     | Required |
|------|------|------|------|
| formValidations | The property is used to add custom validation methods which can be passed extra parameters when used in validations. | object | no |

⚠️Ps: The interal validations in projects can be introduced by defining a common `formValidations` object in a file.

##### **`createForm` returns `props` that can be received in the component**

The `createForm` method builds a higher-order component that defines some additional `props`.

| Property     |  Description  | Type     | Default  | Required |
|------|------|------|------|------|
| onChange | The callback function that is triggered when any fields in the form. The parameter of this function is the object of all the values of fields. | func(values: Object) | noop | no |
| onSubmitSuccess | The callback function that is triggered when the form submission is successful. The parameter of this function is the return result of the promise in submit function. | func(submitResult: any) | noop | no |
| onSubmitFail | The callback function that is triggered when the form submission is failed. The parameter of this function is an instance of `SubmissionError` or `undefined`. | func(submitError: SubmissionError) | noop | no |
| scrollToError | The form automatically scrolls to the first field with error when the form is submitting or extra error is setting. | boolean | `false` | no |

⚠️Ps:

1. It is supported to set `onChange`, `onSubmitSuccess`, `onSubmitFail`, `scrollToError` through the parameter `options` of `createForm`;
2. To get an instance of a the form component which is wrapped by `createForm`, you can add a ref on the component created by `createForm` and then call the `getWrappedForm` method.

##### **`zentForm`**

The components packaged via `Form.createForm` will be added with the `zenForm` property in its `props`. You can accesss `zentForm` via `this.props.zentForm`. APIs provided by `zentForm` are as follows:

| Property     |  Description  | Type     |
|------|------|------|
| getFormValues | The function to get all the field's values in the form | func |
| getFieldError | The function to get the error messages of the specified field, which will return null when there is no error. | func(name: String) |
| setFormDirty | The function to set all the fields to be non-native state, which helps to display all the unshown errors when submitting the form | func(isDirty: Boolean) |
| setFieldExternalErrors | The function to set external error messages, such as the validation error from the server. The parameter `error` of this function is an object with keys being the names of fields and values being the corresponding error messages. | func(errors: Object) |
| setFieldsValue | The function to specify the value of a certain field. | func(data: Object) |
| resetFieldsValue | The funtion to set all the values of all the fields as the initial values or the specified values. | func(data: Object) |
| initialize | The funtion to set the initial values of the form. | func(data: Object) |
| isValid | The function to get the state whether all of the form fields have been validated. | func |
| isSubmitting | The function to get the state whether the form is sumitting. | func |
| isValidating | The function to get the state whether the form is in asynchronous validation. | func |
| isFieldDirty | The function to get the state whether the field has been changed. | func(name: String) |
| isFieldValidating | The function to get the state whether the field is in asynchronous validation. | func(name: String) |
| isFormAsyncValidated | The function to get the state whether all of the fields has been asynchronous validated. | func |
| validateForm | The function to validate the form. | func(forceValidate: Boolean, callback: Function, relatedFields: Array) |
| asyncValidateForm | The function to asynchronous validate the form. | func(resolve: Function, reject: Function) |
| isFormSubmitFail | The function to get the status whether the submission of the form failed. It is `false` when the form is in initial status. | func |
| isFormSubmitSuccess | The function to get the status whether the submission of the form is successful. It is `false` when the form is in initial status. | func |
| updateFormSubmitStatus | The function to update the status of the form's submission. | func(submitSuccess: Boolean) |

##### **`handleSubmit`**

`createForm` also provides an encapsulated `handleSubmit` method for the wrapped components. For more information, see the demo [The operations of form] (#the-operations-of-form).

⚠️Ps: If you want to correctly receive the `error` object in the callback function `onSubmitFail`, you need to throw a `SubmissionError` object in the `submit` function.

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

All the field components that need to maintain `value` need to be wrapped by the `Field` component.
The following `props` will be passed into the `Field` component. All the `props` expect for `component` (including the custom `props`) will be passed to the field component defined in `component`:

| Property     |  Description  | Type     |  Required |
|------|------|------|------|
| name | The name of the field | string | yes |
| component | The real component of the field which will determine how the field is displayed. The value of this property can be string (standard html tag name) or React node. | string / React.Component | yes |
| value | The initial value of the field | any | yes |
| normalize | The normalization function of value when the field is changed or on blur. | func(value, previousValue, nextValues, previousValues) | no |
| format | The format function of value before the field's rendering which will not affect the value stored in the form. | func(value, previousValue, nextValues, previousValues) | no |
| onChange | The callback function that is triggered when the field's value is changed. This function is encapsulated in `Field` so that the custom field components should call `props.onChange()` function by yourself. | func(event, newValue, previousValue, preventSetValue) | no |
| onBlur | The callback function that is triggered when the field is on blur. This function is encapsulated in `Field`. | func(event, newValue, previousValue, preventSetValue) | no |
| onFocus| The callback function that is triggered when the field is on focus. This function is encapsulated in `Field`. | func(event) | no |
| validations | The validations of the field. | object | no |
| validationErrors | The error massages of the validations. | object | no |
| validateOnChange | Whether to trigger the field's validations when the field is changed. | boolean | no |
| validateOnBlur | Whether to trigger the field's validations when the field is on blur. | boolean | no |
| clearErrorOnFocus | Whether to clear the error messages when the field in on focus. | boolean | no |
| asyncValidation | The asynchronous validations which should return a Promise object. | func(values, value) | no |
| displayError | Whether to display the error message | boolean | no |
| relatedFields | The fields should be validated when current field is validated. | array | no |

In addition to the above parameters, the `Field` component implicitly passes the following props to the wrapped field component:

| Property     |  Description  | Type     |
|------|------|------|
| isDirty | Whether the field is changed. | boolean |
| isActive | Whethe the field is input and has been on focus | boolean |
| error | The first error message of the field. It is null when there is no error. | string / Null |
| errors | The array of the error messages. It is an empty array when there is no error. | array |

##### **Get the instance of component in `Field`**

You can get the instance of the field component through adding a ref in `Field` and calling the `getWrappedComponent` function.
```
<Field
	ref={ref => { this.field = ref }}
	component={XxxComponent}
	...
/>

const component = field.getWrappedComponent();
```

#### **`Form.getControlGroup`**

`getControlGroup` is a function that is used to quickly wrap a custom component. It returns a stateless functional component that satisfies common layout and style requirements (left label, right form element). At the same time, it supports to display the field's error message.

The packaged components support the following properties which can be pass from `Field`:

| Property     |  Description  | Type     | Required |
|------|------|------|------|
| label | The label of the field | string / React.Component | no |
| className | The extra class name which will be added to the control-group and will override the style of the child component. | string | no |
| helpDesc | The help description of the field. | string / React.Component | no |
| notice | The import notice of the field. | string / React.Component | no |
| required | Show a red asterisk before the label when this propoerty is true. | boolean | no |

##### **Get the instance of `Control`**

Similar to getting the instance of the component of `Field` above, you can call the `getControlInstance` method.

```jsx
const component = field.getWrappedComponent().getControlInstance();
```
#### **`Form.FormSection`**

`FormSection` provides the following properties:

| Property     |  Description  | Type     | Default  | Required |
|------|------|------|-----|------|
| name | The name of `FormSection` | string | null | yes |
| component | The html tag which wrapped the form section  | string |  `'div'` | no |
| children | The children of `FormSection` | string / React.Component | null | no |

#### **`Form.FieldArray`**

`FieldArray` provides the following properties:

| Property     |  Description  | Type     | Required |
|------|------|------|-----|------|
| name | The name of `FieldArray` | string | Yes |
| value | `FieldArray` value | array | No |
| component | The real component of the `FieldArray` which will determine how the `FieldArray` is displayed. The value of this property can be string (standard html tag name) or React node. | string / React.Component | Yes |

`FieldArray` will inject the `fields` property for the `component`, which provides the traversal, addition, deletion and other operations of field array. APIs provided by `fields` are as follows:

| Property     |  Description  | Type     |
|------|------|------|
| name | The name of `FieldArray` | string |
| length | The length of the field array | number |
| forEach | The traversal function of the field array | (callback: Function) => any |
| get | The function to get the value of last item in the field array | (index: Number) => any |
| getAll | The function to get all the values of the field array. | func |
| map | The function to map the field array. | (callback: Function) => any |
| move | The function to move the curtain item in the field array. | (fromPos: Number, toPos: Number) => any |
| pop | The function to remove the last item of the field array. | func |
| push | The function to add one item at the end of the field array. | (value: Object/String) => any |
| remove | The function to remove the curtain item of the field array. | (index: Number) => any |
| removeAll | The function to remove all the item of the field array. | func |
| shift | The function to remove the first item of the field array. | func |
| swap | The function to swap two items of the field array. | (indexA: Number, indexB: Number) => any |
| unshift | The function to add one item to the head of the field array. | (value: Object/String) => any |
| concat | The function to concat another array at the end of the field array. If the passed in value is not an array, it will be pushed to the end of the field array | (value: Object/String/Array) => any |
| replaceAll | Replace all field array with the new one | (value: Array) => any |

⚠️Ps: The callback function of `forEach` and `map` will receive five paramters: item(the name of the current item in the field array), index(the index of the current item in the field array), key(the unique key of the current item in the field array), value(the value of the current item in the field array), fieldsValue(the values of the field array). In order to ensure that the data of FieldArray is correct when deleted and added, you should set the correct `name` and` key` of the child nodes in `component` when traversing. The usage of `FieldArray` is in the demo [The basic usage of FieldArray](#fieldarray).

#### **Built-in validation rules**

You can use it directly in the `validations` property of `Field`. See more details in the demo [The usage of form validations] (#the-usage-of-form-validations). The built-in rules are as follows:

| Rule    | Required | Parameters |
|------|------|------|
| required | Whether the value is required. | Any. Passing `true` or any other value means this rule in effect. This instructions apply to all the following rules. |
| isExisty | Whether the value is not `null` or not `undefined`.  | Any |
| matchRegex | Whether the value matches the regular expression. | Regex |
| isEmail | Whether the value is an email. | Any |
| isUrl | Whether the value is a website link. | Any |
| isTrue | Whether the value is `true`. | Any |
| isFalse | Whether the value is `false` | Any |
| isNumeric | Whether the value is a numeric type. | Any |
| isInt | Whether the value is a integer type. | Any |
| isFloat | Whether the value is a decimal type. | Any |
| isLength | Whether the length of the strging of the array is the specified length. | The value of length(Number) |
| equals | Whether the value is equal to the specified value | specified value |
| equalsField | Whether the value is equal to the value of other field | The name of other field(String) |
| maxLength | The maximum length of the string or the array | The value of length(Number) |
| minLength | The minimum length of the string or the array | The value of length(Number) |
