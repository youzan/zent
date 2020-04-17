import * as React from 'react';
import { Children } from 'react';
import cx from 'classnames';
import AlertItem from './AlertItem';
import { IAlertProps } from './types';

interface IChildrenProps {
  children: React.ReactElement;
}

function setStyle(target, styles) {
  const { style } = target;
  Object.keys(styles).forEach(attribute => {
    style[attribute] = styles[attribute];
  });
}

export class ScrollAlert extends React.Component<IAlertProps & IChildrenProps> {
  static defaultProps = {
    type: 'info',
    loading: false,
  };

  state = { activeIndex: 0 };
  containerRef = React.createRef<HTMLDivElement>();
  firstChildRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const items = this.renderItem;
    this.setState({
      items: items.concat(items[items.length - 1]),
    });
    this.scrollInterval();
  }

  scrollInterval = (i = 1) => {
    // 6
    let duration = 600;
    let interval = 0;
    if (i === 1) {
      duration = 0;
      interval = 0;
      // console.log('interva0', i, duration, interval);
    } else if (i > 0 && i < this.renderItem.length) {
      duration = 600;
      interval = 2;
    } else if (i === this.renderItem.length) {
      duration = 600;
      interval = 2;
      // console.log('interval1', i, duration, interval);
    } else if (i > this.renderItem.length) {
      duration = 0;
      interval = 0;
      // this.transform(i, duration, interval);
      i = 1;
      // console.log('interval2', i, duration, interval);
    }

    this.transform(i, duration, interval);
  };

  transform = (i, duration, interval) => {
    this.setState({ activeIndex: i - 1 });
    setTimeout(() => {
      setStyle(this.containerRef.current, {
        transform: `translateY(-${this.containerHeight * i}px)`,
        'transition-duration': `${duration}ms`,
        'transition-timing-function': 'ease-in-out',
      });
      ++i;
      this.scrollInterval(i);
    }, interval * 1000);
  };

  cloneChildren = (children?: React.ReactNode) => {
    const length = Children.count(children);

    const clonedChildren = new Array(length + 1);
    Children.forEach(children, (child, index) => {
      clonedChildren[index + 1] = child;
      if (index === 0) {
        clonedChildren[length + 1] = child;
      } else if (index === length - 1) {
        clonedChildren[0] = child;
      }
    });

    return clonedChildren;
  };

  get renderItem() {
    const { children, outline, closed, ...restItemProps } = this.props;
    const { activeIndex } = this.state;

    const eles = Children.map(
      this.cloneChildren(children),
      (item: React.ReactElement, index) => {
        const props = Object.assign({}, restItemProps, { ...item.props });
        return (
          <AlertItem
            className={cx({ 'active-item': index === activeIndex })}
            {...props}
            key={index}
            scrollRef={!index ? this.firstChildRef : null}
          />
        );
      }
    );
    return eles;
  }

  get containerHeight() {
    return this.firstChildRef.current?.offsetHeight;
  }

  render() {
    const { className, outline, type } = this.props;
    const scrollCls = cx(
      'zent-scroll-alert',
      `zent-alert-style-${type}`,
      className,
      {
        ['zent-alert-outline']: outline,
      }
    );

    return (
      <div className={scrollCls}>
        <div
          className="scroll-container"
          ref={this.containerRef}
          style={{ height: this.containerHeight }}
        >
          {this.renderItem}
        </div>
      </div>
    );
  }
}
export default ScrollAlert;
