import { Component } from 'react';

export default class BasePagination extends Component {
  shouldUpdateLayout(props, nextProps) {
    const { current, total, pageSize } = nextProps;

    return (
      current !== props.current ||
      total !== props.total ||
      pageSize !== props.pageSize
    );
  }

  getLayoutOptions(props) {
    const { current, total, pageSize } = props;

    return {
      current,
      total,
      pageSize,
    };
  }

  onPageChange = page => {
    const { current, total, pageSize, onChange } = this.props;
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
    const { total, current } = this.props;
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
}
