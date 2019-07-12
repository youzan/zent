import * as React from 'react';
import { Omit } from 'utility-types';
import Group from './Group';
import { IButtonDirectiveProps, ButtonDirective } from './Directive';

export interface IButtonProps
  extends Omit<
      IButtonDirectiveProps<React.ButtonHTMLAttributes<HTMLButtonElement>>,
      'children'
    >,
    React.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  download?: string;
}

export class Button extends React.Component<IButtonProps> {
  static defaultProps = {
    type: 'default',
    size: 'medium',
    htmlType: 'button',
    bordered: true,
  };

  static Group = Group;
  static Directive = ButtonDirective;

  render() {
    const {
      href,
      target,
      htmlType,
      type,
      size,
      block,
      disabled,
      loading,
      outline,
      bordered,
      icon,
      children,
      download,
      ...props
    } = this.props;
    let child: React.ReactElement<IButtonProps>;
    if (href || target) {
      child = (
        <a
          href={disabled || loading ? undefined : href || ''}
          target={target}
          download={download}
          {...props}
        >
          {children}
        </a>
      );
    } else {
      child = (
        <button type={htmlType} disabled={!!(disabled || loading)} {...props}>
          {children}
        </button>
      );
    }
    return (
      <ButtonDirective
        type={type}
        size={size}
        block={block}
        disabled={disabled}
        loading={loading}
        outline={outline}
        bordered={bordered}
        icon={icon}
      >
        {child}
      </ButtonDirective>
    );
  }
}

export default Button;
