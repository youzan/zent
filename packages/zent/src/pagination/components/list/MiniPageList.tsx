import * as React from 'react';

import ArrowButton from '../button/ArrowButton';
import MiniPageJumper from '../jumper/MiniPageJumper';
import BasePageList from './BasePageList';

export default class MiniPageList extends BasePageList {
  resetActiveDoubleArrowButton() {}

  render() {
    const { layout, buttonBordered, current, onPageChange } = this.props;

    return (
      <div className="zent-pagination-page-list--mini">
        {layout.map(btn => {
          const { type } = btn;

          if (type === 'left-arrow') {
            return (
              <ArrowButton
                key={type}
                direction="left"
                disabled={btn.disabled}
                bordered={buttonBordered}
                onClick={this.onPrevPage}
              />
            );
          }

          if (type === 'right-arrow') {
            return (
              <ArrowButton
                key={type}
                direction="right"
                disabled={btn.disabled}
                bordered={buttonBordered}
                onClick={this.onNextPage}
              />
            );
          }

          if (type === 'mini-jumper') {
            return (
              <MiniPageJumper
                key={type}
                current={current}
                totalPages={btn.totalPages}
                onJump={onPageChange}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }

  onPrevPage = this.jumpToPageDelta(-1);

  onNextPage = this.jumpToPageDelta(1);
}
