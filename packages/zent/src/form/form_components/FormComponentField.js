import React from 'react';

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

export const FormCheckboxField = props => {
  return <Field {...props} component={CheckboxField} />;
};

export const FormCheckboxGroupField = props => {
  return <Field {...props} component={CheckboxGroupField} />;
};

export const FormColorPickerField = props => {
  return <Field {...props} component={ColorPickerField} />;
};

export const FormDateRangePickerField = props => {
  return <Field {...props} component={DateRangePickerField} />;
};

export const FormInputField = props => {
  return <Field {...props} component={InputField} />;
};

export const FormNumberInputField = props => {
  return <Field {...props} component={NumberInputField} />;
};

export const FormRadioGroupField = props => {
  return <Field {...props} component={RadioGroupField} />;
};

export const FormSelectField = props => {
  return <Field {...props} component={SelectField} />;
};

export const FormSwitchField = props => {
  return <Field {...props} component={SwitchField} />;
};
