import React, { PureComponent, Component } from 'react';
import cx from 'classnames';

const buildInDotsColors = ['black', 'blue', 'red', 'green'];

export default class SwiperDots extends (PureComponent || Component) {
  isDotActive = (index, currentIndex, length) => {
    return (
      index === currentIndex ||
      (index === 0 && currentIndex > length - 1) ||
      (index === length - 1 && currentIndex < 0)
    );
  };

  isBuildInColor = dotsColor => {
    return buildInDotsColors.indexOf(dotsColor) !== -1;
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
      `${prefix}-swiper__dots-${dotsSize}`,
      {
        [`${prefix}-swiper__dots-${dotsColor}`]: this.isBuildInColor(dotsColor)
      }
    );

    return (
      <ul className={classString}>
        {items.map((item, index) => {
          const isActive = this.isDotActive(index, currentIndex, items.length);
          if (isActive && !this.isBuildInColor(dotsColor)) {
            return (
              <li
                key={index}
                style={{ background: dotsColor }}
                className={`${prefix}-swiper__dots-item ${prefix}-swiper__dots-item-active`}
              />
            );
          }
          return (
            <li
              key={index}
              className={cx(`${prefix}-swiper__dots-item`, {
                [`${prefix}-swiper__dots-item-active`]: isActive
              })}
              onClick={() => onDotsClick(index)}
            />
          );
        })}
      </ul>
    );
  }
}
