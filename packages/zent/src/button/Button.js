import React, { PureComponent } from 'react';
import setClass from 'classnames';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Icon from 'icon';

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
  'icon',
  'className',
  'prefix',
];

const BTN_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST);

const A_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST);

const TWO_CN_CHAR_REG = /^[\u4e00-\u9fa5]{2}$/;

const wrapTextWithSpanTag = (children, isNeedInsertSpace) => {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      if (isNeedInsertSpace && TWO_CN_CHAR_REG.test(child)) {
        // 按钮文字为两个中文文字的时候，中间空出一个空格空间
        return <span>{child.split('').join(' ')}</span>;
      }
      return <span>{child}</span>;
    }
    return child;
  });
};

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    block: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    outline: PropTypes.bool,
    bordered: PropTypes.bool,
    prefix: PropTypes.string,
  };

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
    prefix: 'zent',
  };

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

  isNeedInsertSpace() {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }

  // render a 标签
  renderLink(classNames, iconNode, wrappedChildren) {
    const { component, disabled, loading, href = '', target } = this.props;
    const Node = component || 'a';
    const nodeProps = omit(this.props, A_BLACK_LIST);

    return (
      <Node
        {...(disabled || loading ? {} : { href, target })}
        {...nodeProps}
        className={classNames}
        onClick={this.handleClick}
      >
        {iconNode}
        {wrappedChildren}
      </Node>
    );
  }

  // render button 标签
  renderButton(classNames, iconNode, wrappedChildren) {
    const { component, disabled, loading, htmlType } = this.props;
    const Node = component || 'button';
    const nodeProps = omit(this.props, BTN_BLACK_LIST);

    return (
      <Node
        {...nodeProps}
        {...(htmlType ? { type: htmlType } : {})}
        className={classNames}
        disabled={disabled || loading}
        onClick={this.handleClick}
      >
        {iconNode}
        {wrappedChildren}
      </Node>
    );
  }

  render() {
    const {
      href,
      target,
      type,
      size,
      block,
      disabled,
      loading,
      outline,
      bordered,
      prefix,
      icon,
      children,
    } = this.props;
    let renderer = href || target ? 'renderLink' : 'renderButton';
    let { className } = this.props;
    let classNames = setClass(
      {
        [`${prefix}-btn-${type}${outline ? '-outline' : ''}`]:
          type !== 'default',
        [`${prefix}-btn-${size}`]: size !== 'medium',
        [`${prefix}-btn-block`]: block,
        [`${prefix}-btn-loading`]: loading,
        [`${prefix}-btn-disabled`]: disabled,
        [`${prefix}-btn-border-transparent`]: !bordered,
      },
      `${prefix}-btn`,
      className
    );
    const iconNode = icon ? <Icon type={icon} /> : null;
    const wrappedChildren = wrapTextWithSpanTag(
      children,
      this.isNeedInsertSpace()
    );

    return this[renderer](classNames, iconNode, wrappedChildren);
  }
}
