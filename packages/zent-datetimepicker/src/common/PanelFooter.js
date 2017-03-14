import React, { Component } from 'react';

function noop() { }

export default class PanelFooter extends Component {
  static defaultProps = {
    onClickLink: noop,
    onClickButton: noop,
    linkText: '',
    linkCls: '',
    buttonText: '确认'
  }
  render() {
    const { onClickLink, onClickButton, linkText, linkCls, buttonText } = this.props;
    return (
      <div className="panel__footer">
        <a className={linkCls} onClick={onClickLink}>{linkText}</a>
        <button className="btn--confirm" type="button" onClick={onClickButton}>{buttonText}</button>
      </div>
    );
  }
}
