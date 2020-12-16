import { PureComponent, Children } from 'react';
import cx from 'classnames';

const buildInDotsColors = ['black', 'blue', 'red', 'green'];

export interface ISwiperDotsProps {
  dotsColor: string;
  dotsSize?: 'normal' | 'small' | 'large';
  items: React.ReactNode;
  currentIndex: number;
  onDotsClick(index: number): void;
}

export default class SwiperDots extends PureComponent<ISwiperDotsProps> {
  isDotActive = (index: number, currentIndex: number, length: number) => {
    return (
      index === currentIndex ||
      (index === 0 && currentIndex > length - 1) ||
      (index === length - 1 && currentIndex < 0)
    );
  };

  isBuildInColor = (dotsColor: string) => {
    return buildInDotsColors.indexOf(dotsColor) !== -1;
  };

  render() {
    const {
      dotsColor,
      dotsSize,
      items,
      currentIndex,
      onDotsClick,
    } = this.props;
    const classString = cx(
      'zent-swiper__dots',
      `zent-swiper__dots-${dotsSize}`,
      {
        [`zent-swiper__dots-${dotsColor}`]: this.isBuildInColor(dotsColor),
      }
    );

    return (
      <ul className={classString}>
        {Children.map(items, (item, index) => {
          const isActive = this.isDotActive(
            index,
            currentIndex,
            (items as any).length
          );
          if (isActive && !this.isBuildInColor(dotsColor)) {
            return (
              <li
                key={index}
                style={{ background: dotsColor }}
                className="zent-swiper__dots-item zent-swiper__dots-item-active"
              />
            );
          }
          return (
            <li
              key={index}
              className={cx('zent-swiper__dots-item', {
                'zent-swiper__dots-item-active': isActive,
              })}
              onClick={() => onDotsClick(index)}
            />
          );
        })}
      </ul>
    );
  }
}
