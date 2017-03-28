import React from 'react';
import { noop } from '../constants';

const PanelFooter = (props) => {
  const { linkCls, linkText, onClickLink, onClickButton, buttonText } = props;

  return (
    <div className="panel__footer">
      <a className={linkCls} onClick={onClickLink}>{linkText}</a>
      <button className="btn--confirm" type="button" onClick={onClickButton}>{buttonText}</button>
    </div>
  );
};

PanelFooter.defaultProps = {
  onClickLink: noop,
  onClickButton: noop
};

export default PanelFooter;
