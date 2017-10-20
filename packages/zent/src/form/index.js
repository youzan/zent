import assign from 'lodash/assign';

import Form from './Form';
import createForm from './createForm';
import Field from './Field';
import FieldArray from './FieldArray';
import Fieldset from './Fieldset';
import FormSection from './FormSection';
import getControlGroup from './getControlGroup';
import unknownProps from './unknownProps';
import SubmissionError from './SubmissionError';
import InputField from './form_components/InputField';
import CheckboxField from './form_components/CheckboxField';
import CheckboxGroupField from './form_components/CheckboxGroupField';
import RadioGroupField from './form_components/RadioGroupField';
import SelectField from './form_components/SelectField';
import NumberInputField from './form_components/NumberInputField';
import ColorPickerField from './form_components/ColorPickerField';
import DateRangePickerField from './form_components/DateRangePickerField';
import SwitchField from './form_components/SwitchField';

import {
  FormCheckboxField,
  FormCheckboxGroupField,
  FormColorPickerField,
  FormDateRangePickerField,
  FormInputField,
  FormNumberInputField,
  FormRadioGroupField,
  FormSelectField,
  FormSwitchField
} from './form_components/FormComponentField';

export default assign(Form, {
  Form,
  createForm,
  Field,
  FieldArray,
  Fieldset,
  FormSection,
  getControlGroup,
  unknownProps,
  InputField,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
  SelectField,
  NumberInputField,
  ColorPickerField,
  DateRangePickerField,
  SwitchField,
  SubmissionError,
  FormCheckboxField,
  FormCheckboxGroupField,
  FormColorPickerField,
  FormDateRangePickerField,
  FormInputField,
  FormNumberInputField,
  FormRadioGroupField,
  FormSelectField,
  FormSwitchField
});
