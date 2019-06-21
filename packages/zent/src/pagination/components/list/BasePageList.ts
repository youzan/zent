import { Component } from 'react';

import memoize from 'lodash-es/memoize';

export interface IPaginationBasePageListProps {
  layout: any[];
  current: number;
  buttonBordered?: boolean;
  onPageChange: (page: number) => void;
}

export default abstract class BasePageList<
  P extends IPaginationBasePageListProps = IPaginationBasePageListProps
> extends Component<P, any> {
  abstract resetActiveDoubleArrowButton(): void;

  onPageNumberClick = memoize(page => () => {
    const { onPageChange } = this.props;

    onPageChange(page);
    this.resetActiveDoubleArrowButton();
  });

  jumpToPageDelta = (delta: number, cb?: () => void) => () => {
    const { current, onPageChange } = this.props;

    onPageChange(current + delta);
    cb && cb();
  };
}
