import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  static propTypes = {
    href: PropTypes.string
  };

  render() {
    const { href, name, ...others } = this.props;
    if (this.props.children) {
      return this.props.children;
    }
    return href ? <a {...others} href={href}>{name}</a> : <span {...others}>{name}</span>;
  }
}
