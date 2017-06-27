import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const { string, number, func, bool } = PropTypes;

export default class Pager extends (PureComponent || Component) {
  static propTypes = {
    content: string,
    current: bool,
    onClick: func,
    target: number
  };

  state = {
    pageLabel: this.props.content
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageLabel: nextProps.content
    });
  }

  onClick = () => {
    const { target, current, onChange } = this.props;

    // 有目标，且不是当前页的时候
    if (target && !current) {
      onChange(target);
    }
  };

  render() {
    const { current, type, target } = this.props;
    const className = cx({
      pager: true,
      'pager--current': current,
      'pager--omni': type === 'omni',
      'pager--disabled': type !== 'omni' && !target
    });

    return (
      <div className={className} onClick={this.onClick}>
        {this.props.content}
      </div>
    );
  }
}
