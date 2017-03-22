import React from 'react';
import cx from 'zent-utils/classnames';

export default Control => ({ required = false, helpDesc = '', label = '', className = '', ...props }) => {
  const showError = props.isTouched && props.error;
  const groupClassName = cx({
    'zent-form__control-group': true,
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
        <Control {...props} />
        {showError && <p className="zent-form__error-desc">{props.error}</p>}
        {helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
      </div>
    </div>
  );
};
