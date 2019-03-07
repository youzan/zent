import * as React from 'react';
import { Component } from 'react';

export interface IBreadcrumbItemProps {
  className?: string;
  name: React.ReactNode;
  href?: string;
}

export class BreadcrumbItem extends Component<IBreadcrumbItemProps> {
  render() {
    const { href, name, ...others } = this.props;
    if (this.props.children) {
      return this.props.children;
    }
    return href ? (
      <a {...others} href={href}>
        {name}
      </a>
    ) : (
      <span {...others}>{name}</span>
    );
  }
}

export default BreadcrumbItem;
