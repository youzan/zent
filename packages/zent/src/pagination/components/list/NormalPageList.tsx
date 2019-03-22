import * as React from 'react';

import ArrowButton from '../button/ArrowButton';
import PageNumberButton from '../button/PageNumberButton';
import BasePageList from './BasePageList';

export default class NormalPageList extends BasePageList {
  state = {
    activeDoubleArrowButton: '',
  };

  render() {
    const { layout, buttonBordered } = this.props;
    const { activeDoubleArrowButton } = this.state;

    return (
      <div className="zent-pagination-page-list--normal">
        {layout.map(btn => {
          const { type } = btn;

          if (type === 'number') {
            const { page, selected } = btn;
            return (
              <PageNumberButton
                selected={selected}
                key={`page-${page}`}
                bordered={buttonBordered}
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
                key={type}
                bordered={buttonBordered}
                onClick={this.onPrevPage}
              />
            );
          }

          if (type === 'right-arrow') {
            return (
              <ArrowButton
                direction="right"
                disabled={btn.disabled}
                key={type}
                bordered={buttonBordered}
                onClick={this.onNextPage}
              />
            );
          }

          if (type === 'double-left-arrow') {
            return (
              <ArrowButton
                direction="left"
                double
                active={activeDoubleArrowButton === 'left'}
                key={type}
                bordered={buttonBordered}
                onClick={this.onFastForwardPrevPage}
              />
            );
          }

          if (type === 'double-right-arrow') {
            return (
              <ArrowButton
                direction="right"
                double
                active={activeDoubleArrowButton === 'right'}
                key={type}
                bordered={buttonBordered}
                onClick={this.onFastForwardNextPage}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }

  onPrevPage = this.jumpToPageDelta(-1, this.resetActiveDoubleArrowButton);

  onNextPage = this.jumpToPageDelta(1, this.resetActiveDoubleArrowButton);

  onFastForwardPrevPage = this.jumpToPageDelta(-5, () => {
    this.setState({
      activeDoubleArrowButton: 'left',
    });
  });

  onFastForwardNextPage = this.jumpToPageDelta(5, () => {
    this.setState({
      activeDoubleArrowButton: 'right',
    });
  });

  resetActiveDoubleArrowButton = () => {
    this.setState({
      activeDoubleArrowButton: '',
    });
  };
}
