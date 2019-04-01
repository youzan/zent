import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import Item, { IBreadcrumbItemProps } from './Item';

export interface IBreadcrumbProps {
  breads: IBreadcrumbItemProps[];
  className: string;
  prefix: string;
}

export class Breadcrumb extends Component<IBreadcrumbProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    breads: [],
  };

  static Item = Item;

  render() {
    const { prefix, className, children = null, breads } = this.props;

    return (
      <div className={cx(`${prefix}-breadcrumb`, className)}>
        {children}
        {breads &&
          breads.length > 0 &&
          breads.map((item, index) => {
            return <Item {...item} key={index} />;
          })}
      </div>
    );
  }
}

export default Breadcrumb;
