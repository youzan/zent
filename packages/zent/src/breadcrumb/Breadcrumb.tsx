import { Component } from 'react';
import cx from 'classnames';

import Item, { IBreadcrumbItemProps } from './Item';

export interface IBreadcrumbProps {
  breads: IBreadcrumbItemProps[];
  className: string;
}

export class Breadcrumb extends Component<IBreadcrumbProps> {
  static defaultProps = {
    className: '',
    breads: [],
  };

  static Item = Item;

  render() {
    const { className, children = null, breads } = this.props;

    return (
      <div className={cx('zent-breadcrumb', className)}>
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
