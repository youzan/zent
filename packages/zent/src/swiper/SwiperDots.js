import React, { Component } from 'react';
import cx from 'classnames';

export default class SwiperDots extends Component {
  render() {
    const {
      prefix,
      dotsColor,
      dotsSize,
      items,
      currentIndex,
      onDotsClick
    } = this.props;
    const classString = cx(
      `${prefix}-swiper__dots`,
      `${prefix}-swiper__dots-${dotsColor}`,
      `${prefix}-swiper__dots-${dotsSize}`
    );

    const clonedItems = [].slice.call(items);
    clonedItems.pop();
    clonedItems.shift();
    const { length } = clonedItems;

    return (
      <ul className={classString}>
        {clonedItems.map((item, index) => {
          return (
            <li
              key={index}
              className={cx(`${prefix}-swiper__dots-item`, {
                [`${prefix}-swiper__dots-item-active`]: index ===
                  currentIndex ||
                  (index === 0 && currentIndex > length - 1) ||
                  (index === length - 1 && currentIndex < 0)
              })}
              onClick={e => {
                e.stopPropagation();
                onDotsClick(index);
              }}
            />
          );
        })}
      </ul>
    );
  }
}
