import React, { Component } from 'react';
import setClass from 'zent-utils/classnames';
import omit from 'zent-utils/lodash/omit';

const BLACK_LIST = [
  'type',
  'size',
  'htmlType',
  'block',
  'component',
  'disabled',
  'loading',
  'outline',
  'bordered',
  'className',
  'prefix',
];

const BTN_BLACK_LIST = [
  'href',
  'target'
].concat(BLACK_LIST);

const A_BLACK_LIST = [
  'href',
  'target'
].concat(BLACK_LIST);

export default class Button extends Component {
  static propTypes ={
    type: React.PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'link'
    ]),
    size: React.PropTypes.oneOf([
      'large',
      'medium',
      'small'
    ]),
    htmlType: React.PropTypes.oneOf([
      'button',
      'submit',
      'reset'
    ]),
    className: React.PropTypes.string,
    block: React.PropTypes.bool,
    component: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
    disabled: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    prefix: React.PropTypes.string
  }

  static defaultProps = {
    type: 'default',
    size: 'medium',
    htmlType: 'button',
    className: '',
    block: false,
    disabled: false,
    loading: false,
    outline: false,
    bordered: true,
    prefix: 'zent'
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // 处理点击事件
  handleClick(event) {
    if (this.props.disabled || this.props.loading) return;

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  // render a 标签
  renderLink(classNames) {
    const Node = this.props.component || 'a';
    const disabled = this.props.disabled || this.props.loading;
    const { href = '', target } = this.props;
    const nodeProps = omit(this.props, A_BLACK_LIST);

    return (
      <Node
        {...disabled ? {} : { href, target }}
        {...nodeProps}
        className={classNames}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Node>
    );
  }

  // render button 标签
  renderButton(classNames) {
    const Node = this.props.component || 'button';
    const disabled = this.props.disabled || this.props.loading;
    const htmlType = this.props.htmlType;
    const nodeProps = omit(this.props, BTN_BLACK_LIST);

    return (
      <Node
        {...nodeProps}
        {...htmlType ? { type: htmlType } : {}}
        className={classNames}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Node>
    );
  }

  render() {
    let renderer = this.props.href || this.props.target ? 'renderLink' : 'renderButton';
    let { className, type, size, block, disabled, loading, outline, bordered, prefix } = this.props;
    let classNames = setClass({
      [`${prefix}-btn-${type}${outline ? '-outline' : ''}`]: type !== 'default',
      [`${prefix}-btn-${size}`]: size !== 'medium',
      [`${prefix}-btn-block`]: block,
      [`${prefix}-btn-loading`]: loading,
      [`${prefix}-btn-disabled`]: disabled,
      [`${prefix}-btn-border-transparent`]: !bordered
    }, `${prefix}-btn`, className);

    return this[renderer](classNames);
  }
}
