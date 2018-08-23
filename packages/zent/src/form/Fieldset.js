import React, { PureComponent } from 'react';

export default class Fieldset extends PureComponent {
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
