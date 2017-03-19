import React, { Component, PropTypes } from 'react';
import { noop } from '../constants';

export default class PanelFooter extends Component {
  static PropTypes = {
    linkCls: PropTypes.string,
    linkText: PropTypes.string,
    onClickLink: PropTypes.func,
    buttonText: PropTypes.string,
    onClickButton: PropTypes.func
  }

  static defaultProps = {
    onClickLink: noop,
    onClickButton: noop,
  }

  render() {
    const { linkCls, linkText, onClickLink, onClickButton, buttonText } = this.props;

    return (
      <div className="panel__footer">
        <a className={linkCls} onClick={onClickLink}>{linkText}</a>
        <button className="btn--confirm" type="button" onClick={onClickButton}>{buttonText}</button>
      </div>
    );
  }
}
