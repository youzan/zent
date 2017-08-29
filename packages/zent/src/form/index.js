import assign from 'lodash/assign';

import Form from './Form';
import createForm from './createForm';
import Field from './Field';
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

export default assign(Form, {
  Form,
  createForm,
  Field,
  Fieldset,
  FormSection,
  getControlGroup,
  unknownProps,
  InputField,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
  SelectField,
  SubmissionError
});
