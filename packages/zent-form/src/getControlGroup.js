import React from 'react';
import cx from 'classnames';

export default Control => ({ required = false, helpDesc = '', ...props }) => {
  const showError = props.isTouched && props.error;
  const className = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });

  return (
    <div className={className}>
      <label className="zent-form__control-label">
        {required ? <em className="zent-form__required">*</em> : null}
        {props.label}
      </label>
      <div className="zent-form__controls">
        <Control {...props} />
        {helpDesc && <p className="zent-form__help-desc">{helpDesc}</p>}
        {showError && <p className="zent-form__help-block">{props.error}</p>}
      </div>
    </div>
  );
};
