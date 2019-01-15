import { Component } from 'react';

import memoize from 'lodash/memoize';

export default class BasePageList extends Component {
  onPageNumberClick = memoize(page => () => {
    const { onPageChange } = this.props;

    onPageChange(page);
    this.resetActiveDoubleArrowButton();
  });

  jumpToPageDelta = (delta, cb) => () => {
    const { current, onPageChange } = this.props;

    onPageChange(current + delta);
    cb && cb();
  };
}
