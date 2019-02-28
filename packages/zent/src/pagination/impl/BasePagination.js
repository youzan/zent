import { Component } from 'react';
import has from 'lodash/has';

export default class BasePagination extends Component {
  shouldUpdateLayout(props, nextProps) {
    const { current, pageSize } = nextProps;

    return (
      current !== props.current ||
      this.getTotal(nextProps) !== this.getTotal(props) ||
      pageSize !== props.pageSize
    );
  }

  getLayoutOptions(props) {
    const { current, pageSize } = props;

    return {
      current,
      total: this.getTotal(props),
      pageSize,
    };
  }

  onPageChange = page => {
    const { current, pageSize, onChange } = this.props;
    const total = this.getTotal();
    page = Math.max(1, page);
    page = Math.min(page, this.getTotalPages(total, pageSize));

    if (page !== current) {
      onChange({
        current: page,
        pageSize,
      });
    }
  };

  onPageSizeChange = pageSize => {
    const { current } = this.props;
    const total = this.getTotal();
    if (this.props.pageSize !== pageSize) {
      const maxPageNumber = this.getTotalPages(total, pageSize);
      const options = {
        pageSize,
        current: Math.min(current, maxPageNumber),
      };

      this.props.onChange(options);
    }
  };

  getTotalPages(total, pageSize) {
    return Math.ceil(total / pageSize);
  }

  /**
   * 兼容老的参数
   */
  getTotal(props) {
    props = props || this.props;

    if (has(props, 'total')) {
      return props.total || 0;
    }

    if (has(props, 'totalItem')) {
      return props.totalItem || 0;
    }
  }
}
