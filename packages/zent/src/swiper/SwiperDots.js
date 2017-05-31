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

    return (
      <ul className={classString}>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={cx(`${prefix}-swiper__dots-item`, {
                [`${prefix}-swiper__dots-item-active`]: index === currentIndex
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
