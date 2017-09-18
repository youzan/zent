import React from 'react';
import Button from 'button';

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
      {showLink && (
        <a className={linkCls} onClick={onClickLink}>
          {linkText}
        </a>
      )}
      {showError && <span className="error-tips">{errorText}</span>}
      <Button className="btn--confirm" type="primary" onClick={onClickButton}>
        {buttonText}
      </Button>
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
