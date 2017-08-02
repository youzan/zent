import React, { Component, PureComponent } from 'react';
import cx from 'classnames';

export default Control => {
  return class ControlGroup extends (PureComponent || Component) {
    getControlInstance = () => {
      return this.control;
    };

    render() {
      const {
        required = false,
        helpDesc = '',
        label = '',
        className = '',
        ...props
      } = this.props;

      const showError = props.isTouched && props.error;
      const groupClassName = cx({
        'zent-form__control-group': true,
        'zent-form__control-group--active': props.isActive,
        'has-error': showError,
        [className]: true
      });

      return (
        <div className={groupClassName}>
          <label className="zent-form__control-label">
            {required ? <em className="zent-form__required">*</em> : null}
            {label}
          </label>
          <div className="zent-form__controls">
            <Control {...props} ref={ref => (this.control = ref)} />
            {showError &&
              <p className="zent-form__error-desc">
                {props.error}
              </p>}
            {helpDesc &&
              <p className="zent-form__help-desc">
                {helpDesc}
              </p>}
          </div>
        </div>
      );
    }
  };
};
