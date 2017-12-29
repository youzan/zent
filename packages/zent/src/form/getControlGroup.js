import React, { Component, PureComponent } from 'react';
import cx from 'classnames';

import { isFunctional } from './utils';

export default Control => {
  return class ControlGroup extends (PureComponent || Component) {
    getControlInstance = () => {
      return this.control;
    };

    getShowError = () => {
      const {
        validateOnChange = true,
        validateOnBlur = true,
        isDirty,
        error,
        showError,
        isSubmitted,
        isActive
      } = this.props;

      const hasError = isDirty && error !== null;

      // 外部控制是否显示错误信息
      if (showError !== undefined) {
        return showError && error !== null;
      } else if (!validateOnChange && validateOnBlur) {
        return !isActive && hasError;
      } else if (!validateOnChange && !validateOnBlur) {
        // 如果validateOnChange和validateOnBlur都是false，未提交的在提交时显示错误信息，已提交的onBlur时显示错误信息
        return isSubmitted && hasError;
      }

      return hasError;
    };

    render() {
      const {
        required = false,
        helpDesc = '',
        notice = '',
        label = '',
        className = '',
        ...props
      } = this.props;

      const showError = this.getShowError();
      const groupClassName = cx({
        'zent-form__control-group': true,
        'zent-form__control-group--active': props.isActive,
        'has-error': showError,
        [className]: true
      });

      const controlRef = isFunctional(Control)
        ? {}
        : {
            ref: instance => {
              this.control = instance;
            }
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
