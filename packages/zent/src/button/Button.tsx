import * as React from 'react';
import { Component, MouseEventHandler, CSSProperties, Children } from 'react';
import setClass from 'classnames';
import { Omit } from 'utility-types';
import omit from 'lodash-es/omit';
import Icon, { IconType } from '../icon';
import Group from './Group';

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
  'insertSpace',
  'className',
  'prefix',
];

const BTN_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST);

const A_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST);

const TWO_CN_CHAR_REG = /^[\u4e00-\u9fa5]{2}$/;

const wrapTextWithSpanTag = (children, isNeedInsertSpace) => {
  return Children.map(children, child => {
    if (typeof child === 'string') {
      if (isNeedInsertSpace && TWO_CN_CHAR_REG.test(child)) {
        // 按钮文字为两个中文文字的时候，中间空出一个空格空间
        return <span>{(child as string).split('').join(' ')}</span>;
      }
      return <span>{child}</span>;
    }
    return child;
  });
};

export interface IButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'medium' | 'large' | 'small';
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  bordered?: boolean;
  component?: React.ComponentType<any> | string;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  prefix?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: IconType;
  insertSpace?: boolean;
}

export class Button extends Component<IButtonProps> {
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
    insertSpace: false,
    prefix: 'zent',
  };

  static Group = Group;

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
    const { icon, children, insertSpace } = this.props;
    return insertSpace && React.Children.count(children) === 1 && !icon;
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

export default Button;
