import React, { PureComponent, Component } from 'react';

import CheckboxField from './CheckboxField';
import CheckboxGroupField from './CheckboxGroupField';
import ColorPickerField from './ColorPickerField';
import DateRangePickerField from './DateRangePickerField';
import InputField from './InputField';
import NumberInputField from './NumberInputField';
import RadioGroupField from './RadioGroupField';
import SelectField from './SelectField';
import SwitchField from './SwitchField';
import Field from '../Field';

export class FormCheckboxField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={CheckboxField} />;
  }
}

export class FormCheckboxGroupField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={CheckboxGroupField} />;
  }
}

export class FormColorPickerField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={ColorPickerField} />;
  }
}

export class FormDateRangePickerField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={DateRangePickerField} />;
  }
}

export class FormInputField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={InputField} />;
  }
}

export class FormNumberInputField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={NumberInputField} />;
  }
}

export class FormRadioGroupField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={RadioGroupField} />;
  }
}

export class FormSelectField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={SelectField} />;
  }
}

export class FormSwitchField extends (PureComponent || Component) {
  render() {
    return <Field {...this.props} component={SwitchField} />;
  }
}
