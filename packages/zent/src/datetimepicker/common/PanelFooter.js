import React from 'react';
import { noop } from '../constants';

const PanelFooter = props => {
  const {
    linkCls,
    linkText,
    onClickLink,
    onClickButton,
    buttonText,
    showLink,
    showError,
    errorText
  } = props;

  return (
    <div className="panel__footer">
      {showLink &&
        <a className={linkCls} onClick={onClickLink}>
          {linkText}
        </a>}
      {showError &&
        <span className="error-tips">
          {errorText}
        </span>}
      <button className="btn--confirm" type="button" onClick={onClickButton}>
        {buttonText}
      </button>
    </div>
  );
};

PanelFooter.defaultProps = {
  onClickLink: noop,
  onClickButton: noop,
  showLink: true,
  showError: false,
  errorText: ''
};

export default PanelFooter;
