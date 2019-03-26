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
import InputField from './form-components/InputField';
import CheckboxField from './form-components/CheckboxField';
import CheckboxGroupField from './form-components/CheckboxGroupField';
import RadioGroupField from './form-components/RadioGroupField';
import SelectField from './form-components/SelectField';
import NumberInputField from './form-components/NumberInputField';
import ColorPickerField from './form-components/ColorPickerField';
import DateRangePickerField from './form-components/DateRangePickerField';
import DateRangeQuickPickerField from './form-components/DateRangeQuickPickerField';
import SwitchField from './form-components/SwitchField';

import {
  FormCheckboxField,
  FormCheckboxGroupField,
  FormColorPickerField,
  FormDatePickerField,
  FormWeekPickerField,
  FormMonthPickerField,
  FormQuarterPickerField,
  FormYearPickerField,
  FormTimePickerField,
  FormTimeRangePickerField,
  FormDateRangePickerField,
  FormDateRangeQuickPickerField,
  FormInputField,
  FormNumberInputField,
  FormRadioGroupField,
  FormSelectField,
  FormSwitchField,
} from './form-components/FormComponentField';

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
  DateRangeQuickPickerField,
  SwitchField,
  SubmissionError,
  FormCheckboxField,
  FormCheckboxGroupField,
  FormColorPickerField,
  FormDatePickerField,
  FormWeekPickerField,
  FormMonthPickerField,
  FormQuarterPickerField,
  FormYearPickerField,
  FormTimePickerField,
  FormTimeRangePickerField,
  FormDateRangePickerField,
  FormDateRangeQuickPickerField,
  FormInputField,
  FormNumberInputField,
  FormRadioGroupField,
  FormSelectField,
  FormSwitchField,
});
