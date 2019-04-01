import { PureComponent } from 'react';
import * as React from 'react';

export interface IFieldSetProps {
  legend: React.ReactNode;
}

export default class Fieldset extends PureComponent<IFieldSetProps> {
  render() {
    const { legend, children } = this.props;

    return (
      <fieldset className="zent-form__fieldset">
        <legend className="zent-form__legend">{legend}</legend>
        {children}
      </fieldset>
    );
  }
}
