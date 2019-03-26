import React, { Component } from 'react';

import CheckboxField from './CheckboxField';
import CheckboxGroupField from './CheckboxGroupField';
import ColorPickerField from './ColorPickerField';
import DatePickerField from './DatePickerField';
import WeekPickerField from './WeekPickerField';
import MonthPickerField from './MonthPickerField';
import QuarterPickerField from './QuarterPickerField';
import YearPickerField from './YearPickerField';
import TimePickerField from './TimePickerField';
import TimeRangePickerField from './TimeRangePickerField';
import DateRangePickerField from './DateRangePickerField';
import DateRangeQuickPickerField from './DateRangeQuickPickerField';
import InputField from './InputField';
import NumberInputField from './NumberInputField';
import RadioGroupField from './RadioGroupField';
import SelectField from './SelectField';
import SwitchField from './SwitchField';
import Field from '../Field';

export class FormCheckboxField extends Component {
  render() {
    return <Field {...this.props} component={CheckboxField} />;
  }
}

export class FormCheckboxGroupField extends Component {
  render() {
    return <Field {...this.props} component={CheckboxGroupField} />;
  }
}

export class FormColorPickerField extends Component {
  render() {
    return <Field {...this.props} component={ColorPickerField} />;
  }
}

export class FormDatePickerField extends Component {
  render() {
    return <Field {...this.props} component={DatePickerField} />;
  }
}

export class FormWeekPickerField extends Component {
  render() {
    return <Field {...this.props} component={WeekPickerField} />;
  }
}

export class FormMonthPickerField extends Component {
  render() {
    return <Field {...this.props} component={MonthPickerField} />;
  }
}

export class FormQuarterPickerField extends Component {
  render() {
    return <Field {...this.props} component={QuarterPickerField} />;
  }
}

export class FormYearPickerField extends Component {
  render() {
    return <Field {...this.props} component={YearPickerField} />;
  }
}

export class FormTimePickerField extends Component {
  render() {
    return <Field {...this.props} component={TimePickerField} />;
  }
}

export class FormTimeRangePickerField extends Component {
  render() {
    return <Field {...this.props} component={TimeRangePickerField} />;
  }
}

export class FormDateRangePickerField extends Component {
  render() {
    return <Field {...this.props} component={DateRangePickerField} />;
  }
}

export class FormDateRangeQuickPickerField extends Component {
  render() {
    return <Field {...this.props} component={DateRangeQuickPickerField} />;
  }
}

export class FormInputField extends Component {
  render() {
    return <Field {...this.props} component={InputField} />;
  }
}

export class FormNumberInputField extends Component {
  render() {
    return <Field {...this.props} component={NumberInputField} />;
  }
}

export class FormRadioGroupField extends Component {
  render() {
    return <Field {...this.props} component={RadioGroupField} />;
  }
}

export class FormSelectField extends Component {
  render() {
    return <Field {...this.props} component={SelectField} />;
  }
}

export class FormSwitchField extends Component {
  render() {
    return <Field {...this.props} component={SwitchField} />;
  }
}
