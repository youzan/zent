import { Component } from 'react';
import cx from 'classnames';

import Item, { IBreadcrumbItemProps } from './Item';
import { getFoldItems } from './utils';

export interface IBreadcrumbProps {
  breads: IBreadcrumbItemProps[];
  className: string;
  maxItemCount?: number;
}

export interface IBreadcrumbState {
  isFolded: boolean;
}

export class Breadcrumb extends Component<IBreadcrumbProps, IBreadcrumbState> {
  static defaultProps = {
    className: '',
    breads: [],
  };

  state = {
    isFolded: true,
  };

  static Item = Item;

  render() {
    const { isFolded } = this.state;
    const { className, children = null, breads, maxItemCount } = this.props;

    const breadList = getFoldItems({
      breads,
      isFolded,
      maxItemCount,
      foldProps: {
        name: '...',
        className: 'zent-breadcrumb__fold',
        onClick: () => this.setState({ isFolded: false }),
      },
    });

    return (
      <div className={cx('zent-breadcrumb', className)}>
        {children}
        {breadList &&
          breadList.length > 0 &&
          breadList.map((item, index) => {
            return <Item {...item} key={index} />;
          })}
      </div>
    );
  }
}

export default Breadcrumb;
