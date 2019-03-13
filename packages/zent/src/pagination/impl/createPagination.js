import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import PageSizeChanger from '../components/PageSizeChanger';
import NormalPageList from '../components/list/NormalPageList';
import PageJumper from '../components/jumper/PageJumper';
import BasePagination from './BasePagination';

export default function createPagination(name, layoutFn) {
  return class PaginationTpl extends BasePagination {
    static propTypes = {
      current: PropTypes.number,
      total: PropTypes.number,
      pageSize: PropTypes.number,
      pageSizeOptions: PropTypes.array,
      onChange: PropTypes.func.isRequired,
      showQuickJumper: PropTypes.bool,
      showSizeChanger: PropTypes.bool,
      buttonBordered: PropTypes.bool,
      className: PropTypes.string,
    };

    constructor(props) {
      super(props);

      this.state = {
        layout: layoutFn(this.getLayoutOptions(props)),
      };
    }

    render() {
      const { layout } = this.state;
      const {
        current,
        pageSize,
        pageSizeOptions,
        showQuickJumper,
        showSizeChanger,
        buttonBordered,
        className,
      } = this.props;
      const total = this.getTotal();

      return (
        <div
          className={cx(`zent-pagination zent-pagination--${name}`, className)}
        >
          {showSizeChanger && (
            <PageSizeChanger
              pageSize={pageSize}
              total={total}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={this.onPageSizeChange}
            />
          )}
          <NormalPageList
            layout={layout}
            current={current}
            buttonBordered={buttonBordered}
            onPageChange={this.onPageChange}
          />
          {showQuickJumper && <PageJumper onJump={this.onPageChange} />}
        </div>
      );
    }

    componentWillReceiveProps(nextProps) {
      if (this.shouldUpdateLayout(this.props, nextProps)) {
        this.setState({
          layout: layoutFn(this.getLayoutOptions(nextProps)),
        });
      }
    }
  };
}
