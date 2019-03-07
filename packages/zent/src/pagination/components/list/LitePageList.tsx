import * as React from 'react';

import PageNumberButton from '../button/PageNumberButton';
import ArrowButton from '../button/ArrowButton';
import BasePageList from './BasePageList';

export default class LitePageList extends BasePageList {
  resetActiveDoubleArrowButton() {}

  render() {
    const { layout, buttonBordered } = this.props;

    return (
      <div className="zent-pagination-page-list--lite">
        {layout.map(btn => {
          const { type } = btn;

          if (type === 'number') {
            const { page, selected } = btn;
            return (
              <PageNumberButton
                bordered={buttonBordered}
                selected={selected}
                key={`page-${page}`}
                onClick={this.onPageNumberClick(page)}
              >
                {page}
              </PageNumberButton>
            );
          }

          if (type === 'left-arrow') {
            return (
              <ArrowButton
                direction="left"
                disabled={btn.disabled}
                bordered={buttonBordered}
                key={type}
                onClick={this.onPrevPage}
              />
            );
          }

          if (type === 'right-arrow') {
            return (
              <ArrowButton
                direction="right"
                disabled={btn.disabled}
                bordered={buttonBordered}
                key={type}
                onClick={this.onNextPage}
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
