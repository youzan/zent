import React, { PureComponent } from 'react';
import cx from 'classnames';

import { isFunctional } from './utils';

export default Control => {
  return class ControlGroup extends PureComponent {
    getControlInstance = () => {
      return this.control;
    };

    render() {
      const {
        required = false,
        helpDesc = '',
        notice = '',
        label = '',
        className = '',
        displayError,
        ...props
      } = this.props;

      const showError =
        displayError === undefined
          ? props.isDirty && props.error !== null
          : displayError;
      const groupClassName = cx({
        'zent-form__control-group': true,
        'zent-form__control-group--active': props.isActive,
        'has-error': showError,
        [className]: true,
      });

      const controlRef = isFunctional(Control)
        ? {}
        : {
            ref: instance => {
              this.control = instance;
            },
          };

      return (
        <div className={groupClassName}>
          <label className="zent-form__control-label">
            {required ? <em className="zent-form__required">*</em> : null}
            {label}
          </label>
          <div className="zent-form__controls">
            <Control {...props} {...controlRef} />
            {showError && (
              <p className="zent-form__error-desc">{props.error}</p>
            )}
            {notice && <p className="zent-form__notice-desc">{notice}</p>}
            {helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
          </div>
        </div>
      );
    }
  };
};
