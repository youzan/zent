import { Component } from 'react';

import { IPopProps } from '../../../pop';

export interface IPaginationBasePageListProps {
  layout: any[];
  current: number;
  buttonBordered?: boolean;
  onPageChange: (page: number) => void;
  lastPageHelp?: IPopProps;
}

export default abstract class BasePageList<
  P extends IPaginationBasePageListProps = IPaginationBasePageListProps
> extends Component<P, any> {
  abstract resetActiveDoubleArrowButton(): void;

  onPageNumberClick = page => () => {
    const { onPageChange } = this.props;

    onPageChange(page);
    this.resetActiveDoubleArrowButton();
  };

  jumpToPageDelta = (delta: number, cb?: () => void) => () => {
    const { current, onPageChange } = this.props;

    onPageChange(current + delta);
    cb && cb();
  };
}
