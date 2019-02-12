import { Component } from 'react';

import memoize from 'lodash-es/memoize';

export default abstract class BasePageList extends Component<any, any> {
  abstract resetActiveDoubleArrowButton(): void;

  onPageNumberClick = memoize(page => () => {
    const { onPageChange } = this.props;

    onPageChange(page);
    this.resetActiveDoubleArrowButton();
  });

  jumpToPageDelta = (delta, cb?: () => void) => () => {
    const { current, onPageChange } = this.props;

    onPageChange(current + delta);
    cb && cb();
  };
}
