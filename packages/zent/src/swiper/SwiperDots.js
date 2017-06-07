import React, { PureComponent, Compoenet } from 'react';
import cx from 'classnames';

export default class SwiperDots extends (PureComponent || Compoenet) {
  isDotActive = (index, currentIndex, length) => {
    return (
      index === currentIndex ||
      (index === 0 && currentIndex > length - 1) ||
      (index === length - 1 && currentIndex < 0)
    );
  };

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
                [`${prefix}-swiper__dots-item-active`]: this.isDotActive(
                  index,
                  currentIndex,
                  items.length
                )
              })}
              onClick={() => onDotsClick(index)}
            />
          );
        })}
      </ul>
    );
  }
}
